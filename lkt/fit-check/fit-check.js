(() => {
  "use strict";

  const form = document.querySelector("[data-testid='fit-form']");
  const panel = document.querySelector("[data-testid='review-panel']");
  const preview = document.querySelector("[data-testid='request-preview']");
  const openEmail = document.querySelector("[data-testid='open-email']");
  const copyButton = document.querySelector("[data-testid='copy-request']");
  const copyStatus = document.querySelector("#copy-status");

  if (!form || !panel || !preview || !openEmail || !copyButton || !copyStatus) {
    return;
  }

  const clean = (value) => String(value || "").replace(/\r\n?/g, "\n").trim();
  const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];

  const attributionParams = () => {
    const current = new URLSearchParams(window.location.search);
    if (attributionKeys.some((key) => current.has(key))) {
      return current;
    }

    try {
      const referrer = new URL(document.referrer);
      return referrer.origin === window.location.origin ? referrer.searchParams : current;
    } catch (_error) {
      return current;
    }
  };

  const attribution = () => {
    const params = attributionParams();
    return attributionKeys
      .map((key) => {
        const value = clean(params.get(key)).replace(/[^\p{L}\p{N} ._/-]/gu, "").slice(0, 80);
        return value ? `${key}: ${value}` : "";
      })
      .filter(Boolean);
  };

  const buildRequest = () => {
    const data = new FormData(form);
    const constraints = clean(data.get("constraints")) || "None stated.";
    const source = attribution();
    return [
      "Local Knowledge Terminal — free collection fit check",
      "",
      "Collection or use case:",
      clean(data.get("collection")),
      "",
      "Language goal:",
      clean(data.get("language_goal")),
      "",
      "Intended readers:",
      clean(data.get("readers")),
      "",
      "Existing machine:",
      clean(data.get("hardware")),
      "",
      "Sample format and approximate size:",
      clean(data.get("sample")),
      "",
      "Important privacy or delivery constraints:",
      constraints,
      "",
      "Rights confirmation: I have the right to use the source material.",
      "Scope confirmation: I understand the fixed USD 250 sprint begins only after a free fit check and excludes hardware, shipping, custom OCR, and production deployment.",
      ...(source.length ? ["", "Page attribution:", ...source] : []),
    ].join("\n");
  };

  const resetReview = () => {
    if (document.body.dataset.fitState === "reviewed") {
      document.body.dataset.fitState = "editing";
      panel.hidden = true;
      copyStatus.textContent = "";
    }
  };

  form.addEventListener("input", resetReview);
  form.addEventListener("change", resetReview);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      document.body.dataset.fitState = "invalid";
      form.reportValidity();
      return;
    }

    const request = buildRequest();
    const subject = "Local Knowledge Terminal — free collection fit check";
    preview.textContent = request;
    openEmail.href = `mailto:contact@lazying.art?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(request)}`;
    panel.hidden = false;
    copyStatus.textContent = "";
    document.body.dataset.fitState = "reviewed";
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
    panel.querySelector("h3").focus?.({ preventScroll: true });
  });

  copyButton.addEventListener("click", async () => {
    const request = preview.textContent;
    if (!request) {
      return;
    }
    try {
      await navigator.clipboard.writeText(request);
      copyStatus.textContent = "Request copied. Nothing has been sent.";
    } catch (_error) {
      const helper = document.createElement("textarea");
      helper.value = request;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.select();
      const copied = document.execCommand("copy");
      helper.remove();
      copyStatus.textContent = copied
        ? "Request copied. Nothing has been sent."
        : "Copy was blocked. Select the request text above and copy it manually.";
    }
  });
})();

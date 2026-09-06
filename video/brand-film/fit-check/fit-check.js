(() => {
  "use strict";

  const subject = "AI Clip Assembly — free fit check";
  const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
  const maxBodyBytes = 12288;

  const form = document.querySelector("[data-testid='fit-form']");
  const formStatus = document.querySelector("#fit-form-status");
  const panel = document.querySelector("[data-testid='review-panel']");
  const heading = document.querySelector("[data-testid='review-heading']");
  const preview = document.querySelector("[data-testid='request-preview']");
  const openEmail = document.querySelector("[data-testid='open-email']");
  const copyButton = document.querySelector("[data-testid='copy-request']");
  const submissionStatus = document.querySelector("#submission-status");

  if (!form || !formStatus || !panel || !heading || !preview || !openEmail || !copyButton || !submissionStatus) {
    return;
  }

  let preparedRequest = "";

  const clean = (value) => String(value || "").replace(/\r\n?/g, "\n").trim();

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
    return attributionKeys.reduce((result, key) => {
      const value = clean(params.get(key));
      if (value && Array.from(value).length <= 80 && /^[\p{L}\p{N} ._/-]+$/u.test(value)) {
        result[key] = value;
      }
      return result;
    }, {});
  };

  const buildPayload = () => {
    const data = new FormData(form);
    return {
      offer: "ai_clip_assembly",
      contact_email: clean(data.get("contact_email")),
      clip_inventory: clean(data.get("clip_inventory")),
      rights_scope: clean(data.get("rights_scope")),
      audience_destination: clean(data.get("audience_destination")),
      story: clean(data.get("story")),
      finish: clean(data.get("finish")),
      delivery: clean(data.get("delivery")),
      rights_confirmed: Boolean(data.get("rights")),
      scope_confirmed: Boolean(data.get("scope")),
      website: String(data.get("website") || ""),
      ...attribution(),
    };
  };

  const buildRequest = (payload) => {
    const optional = (key) => payload[key] || "None stated.";
    const source = attributionKeys
      .filter((key) => payload[key])
      .map((key) => `${key}: ${payload[key]}`);
    return [
      subject,
      "",
      "Contact email:", payload.contact_email,
      "",
      "Clip count, durations, and aspect ratios:", payload.clip_inventory,
      "",
      "Rights controlled for the requested use:", payload.rights_scope,
      "",
      "Audience and destination:", payload.audience_destination,
      "",
      "First-frame to last-frame change:", payload.story,
      "",
      "Finishing inputs and constraints:", optional("finish"),
      "",
      "Deadline and native-project requirement:", payload.delivery,
      "",
      "Rights confirmation: I control the requested use or can identify the licenses and permissions that allow it.",
      "Scope confirmation: I understand the fixed USD 500 pilot begins only after a positive fit check and has the stated boundaries.",
      ...(source.length ? ["", "Page attribution:", ...source] : []),
    ].join("\n");
  };

  const resetReview = () => {
    if (!preparedRequest) return;
    preparedRequest = "";
    panel.hidden = true;
    formStatus.textContent = "";
    submissionStatus.textContent = "";
    document.body.dataset.fitState = "editing";
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

    preparedRequest = buildRequest(buildPayload());
    if (new TextEncoder().encode(preparedRequest).byteLength > maxBodyBytes) {
      preparedRequest = "";
      document.body.dataset.fitState = "invalid";
      formStatus.textContent = "Please shorten the answers and review again.";
      formStatus.focus?.({ preventScroll: true });
      return;
    }

    preview.textContent = preparedRequest;
    openEmail.href = `mailto:lach@lazying.art?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(preparedRequest)}`;
    panel.hidden = false;
    formStatus.textContent = "";
    submissionStatus.textContent = "Continue with Open in email or Copy request. Nothing has been sent.";
    document.body.dataset.fitState = "reviewed";
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
    heading.focus?.({ preventScroll: true });
  });

  copyButton.addEventListener("click", async () => {
    if (!preparedRequest) return;
    try {
      await navigator.clipboard.writeText(preparedRequest);
      submissionStatus.textContent = "Request copied. Nothing was sent by copying.";
    } catch (_error) {
      const helper = document.createElement("textarea");
      helper.value = preparedRequest;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.select();
      const copied = document.execCommand("copy");
      helper.remove();
      submissionStatus.textContent = copied
        ? "Request copied. Nothing was sent by copying."
        : "Copy was blocked. Select the request text above and copy it manually.";
    }
  });
})();

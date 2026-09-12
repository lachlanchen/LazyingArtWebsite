(() => {
  "use strict";

  const encryptedIntakeAvailable = false;
  const subject = "KiCad Plugin Evaluation — free fit check";
  const maxBodyBytes = 12288;
  const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
  const loadedAt = Date.now();

  const form = document.querySelector("[data-testid='fit-form']");
  const formStatus = document.querySelector("#fit-form-status");
  const panel = document.querySelector("[data-testid='review-panel']");
  const heading = document.querySelector("[data-testid='review-heading']");
  const preview = document.querySelector("[data-testid='request-preview']");
  const reviewConfirmed = document.querySelector("[data-testid='review-confirmed']");
  const sendButton = document.querySelector("[data-testid='send-fit-check']");
  const openEmail = document.querySelector("[data-testid='open-email']");
  const copyButton = document.querySelector("[data-testid='copy-request']");
  const submissionStatus = document.querySelector("#submission-status");

  if (!form || !formStatus || !panel || !heading || !preview || !reviewConfirmed ||
      !sendButton || !openEmail || !copyButton || !submissionStatus) {
    return;
  }

  let preparedPayload = null;
  let preparedRequest = "";

  const clean = (value) => String(value || "").replace(/\r\n?/g, "\n").trim();
  const attributionParams = () => {
    const current = new URLSearchParams(window.location.search);
    if (attributionKeys.some((key) => current.has(key))) return current;
    try {
      const referrer = new URL(document.referrer);
      return referrer.origin === window.location.origin ? referrer.searchParams : current;
    } catch (_error) {
      return current;
    }
  };
  const attribution = () => {
    const params = attributionParams();
    const result = {};
    attributionKeys.forEach((key) => {
      const value = clean(params.get(key));
      if (value && Array.from(value).length <= 80 && /^[\p{L}\p{N} ._/-]+$/u.test(value)) {
        result[key] = value;
      }
    });
    return result;
  };

  const buildPayload = () => {
    const data = new FormData(form);
    return {
      offer: "kicad_plugin_evaluation",
      contact_email: clean(data.get("contact_email")),
      plugin: clean(data.get("plugin")),
      authorization: clean(data.get("authorization")),
      environment: clean(data.get("environment")),
      presets: clean(data.get("presets")),
      expected_behavior: clean(data.get("expected_behavior")),
      delivery: clean(data.get("delivery")),
      constraints: clean(data.get("constraints")),
      rights_confirmed: Boolean(data.get("rights")),
      scope_confirmed: Boolean(data.get("scope")),
      website: String(data.get("website") || ""),
      client_elapsed_ms: Math.min(86400000, Math.max(0, Date.now() - loadedAt)),
      ...attribution(),
    };
  };

  const buildRequest = (payload) => {
    const optional = (name) => payload[name] || "None stated.";
    const source = attributionKeys
      .filter((key) => payload[key])
      .map((key) => `${key}: ${payload[key]}`);
    return [
      subject,
      "",
      "Contact email:", payload.contact_email,
      "",
      "Plugin name, version, and public page:", payload.plugin,
      "",
      "Role, authorization, and package license:", payload.authorization,
      "",
      "Supported KiCad version and operating system:", payload.environment,
      "",
      "Up to four setting presets:", payload.presets,
      "",
      "Expected behavior, including infeasible radii:", payload.expected_behavior,
      "",
      "Preferred delivery and deadline:", payload.delivery,
      "",
      "Other constraints:", optional("constraints"),
      "",
      "Authorization confirmation: I am authorized to request this evaluation and, after written acceptance, to provide the plugin package under terms that allow installation and testing in the agreed environment.",
      "Scope confirmation: I understand the fixed USD 400 evaluation covers one plugin version, one KiCad 10/Linux environment, the project-owned seven-case fixture, up to four agreed presets, evidence, a report, and one correction pass. Buyer boards, code repair, security certification, electrical or fabrication review, production installation, redistribution, guarantees, ongoing support, and unlimited revisions are excluded.",
      ...(source.length ? ["", "Page attribution:", ...source] : []),
    ].join("\n");
  };

  const resetReview = () => {
    formStatus.textContent = "";
    if (!preparedPayload) return;
    preparedPayload = null;
    preparedRequest = "";
    panel.hidden = true;
    reviewConfirmed.checked = false;
    sendButton.disabled = true;
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
    const payload = buildPayload();
    const request = buildRequest(payload);
    if (new TextEncoder().encode(JSON.stringify(payload)).byteLength > maxBodyBytes) {
      document.body.dataset.fitState = "invalid";
      formStatus.textContent = "Please shorten the answers and review again.";
      formStatus.focus?.({ preventScroll: true });
      return;
    }
    preparedPayload = Object.freeze(payload);
    preparedRequest = request;
    preview.textContent = preparedRequest;
    openEmail.href = `mailto:contact@lazying.art?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(preparedRequest)}`;
    reviewConfirmed.checked = false;
    panel.hidden = false;
    formStatus.textContent = "";
    submissionStatus.textContent = encryptedIntakeAvailable
      ? ""
      : "Continue with Open in email or Copy request. Nothing has been sent.";
    document.body.dataset.fitState = "reviewed";
    sendButton.disabled = true;
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
    heading.focus?.({ preventScroll: true });
  });

  reviewConfirmed.addEventListener("change", () => {
    sendButton.disabled = true;
  });
  sendButton.addEventListener("click", () => {});

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

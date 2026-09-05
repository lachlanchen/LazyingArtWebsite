(() => {
  "use strict";

  const endpoint = "https://blog.lazying.art/wp-json/lazyingart/v1/lkt-fit-check";
  const subject = "Manuscript Build & Redline Sprint — free fit check";
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

  if (
    !form ||
    !formStatus ||
    !panel ||
    !heading ||
    !preview ||
    !reviewConfirmed ||
    !sendButton ||
    !openEmail ||
    !copyButton ||
    !submissionStatus
  ) {
    return;
  }

  let preparedPayload = null;
  let preparedBody = "";
  let preparedRequest = "";
  let sending = false;
  let accepted = false;

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
    const result = {};
    attributionKeys.forEach((key) => {
      const value = clean(params.get(key));
      if (
        value &&
        Array.from(value).length <= 80 &&
        /^[\p{L}\p{N} ._/-]+$/u.test(value)
      ) {
        result[key] = value;
      }
    });
    return result;
  };

  const buildPayload = () => {
    const data = new FormData(form);
    return {
      offer: "manuscript",
      contact_email: clean(data.get("contact_email")),
      role: clean(data.get("role")),
      shape: clean(data.get("shape")),
      venue: clean(data.get("venue")),
      problem: clean(data.get("problem")),
      outputs: clean(data.get("outputs")),
      handling: clean(data.get("handling")),
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
      "Contact email:",
      payload.contact_email,
      "",
      "Role and source rights:",
      payload.role,
      "",
      "Length and source shape:",
      payload.shape,
      "",
      "Target journal, template, and deadline:",
      payload.venue,
      "",
      "Current build or redline problem:",
      payload.problem,
      "",
      "Required outputs:",
      optional("outputs"),
      "",
      "Confidentiality and automation policy:",
      payload.handling,
      "",
      "Other constraints:",
      optional("constraints"),
      "",
      "Rights confirmation: I am authorized to request this work and will not send source files before acceptance.",
      "Scope confirmation: I understand the fixed USD 250 sprint has the stated boundaries.",
      ...(source.length ? ["", "Page attribution:", ...source] : []),
    ].join("\n");
  };

  const updateSendAvailability = () => {
    sendButton.disabled =
      sending || accepted || !preparedPayload || !reviewConfirmed.checked;
  };

  const setFormDisabled = (disabled) => {
    form.querySelectorAll("input, textarea, button").forEach((control) => {
      control.disabled = disabled;
    });
  };

  const resetReview = () => {
    if (sending || accepted) {
      return;
    }
    formStatus.textContent = "";
    if (!preparedPayload) {
      return;
    }
    preparedPayload = null;
    preparedBody = "";
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
    if (sending) {
      return;
    }
    if (!form.checkValidity()) {
      document.body.dataset.fitState = "invalid";
      form.reportValidity();
      return;
    }

    const payload = buildPayload();
    const body = JSON.stringify(payload);
    if (new TextEncoder().encode(body).byteLength > maxBodyBytes) {
      document.body.dataset.fitState = "invalid";
      formStatus.textContent = "Please shorten the answers and review again.";
      formStatus.focus?.({ preventScroll: true });
      return;
    }

    preparedPayload = Object.freeze(payload);
    preparedBody = body;
    preparedRequest = buildRequest(preparedPayload);
    accepted = false;
    preview.textContent = preparedRequest;
    openEmail.href = `mailto:contact@lazying.art?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(preparedRequest)}`;
    reviewConfirmed.checked = false;
    reviewConfirmed.disabled = false;
    panel.hidden = false;
    panel.removeAttribute("aria-busy");
    formStatus.textContent = "";
    submissionStatus.textContent = "";
    document.body.dataset.fitState = "reviewed";
    updateSendAvailability();
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
    heading.focus?.({ preventScroll: true });
  });

  reviewConfirmed.addEventListener("change", updateSendAvailability);

  sendButton.addEventListener("click", async () => {
    if (
      sending ||
      accepted ||
      !preparedPayload ||
      !preparedBody ||
      !reviewConfirmed.checked
    ) {
      return;
    }

    sending = true;
    setFormDisabled(true);
    reviewConfirmed.disabled = true;
    panel.setAttribute("aria-busy", "true");
    submissionStatus.textContent = "Sending fit check…";
    updateSendAvailability();

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        cache: "no-store",
        referrerPolicy: "strict-origin-when-cross-origin",
        headers: { "Content-Type": "application/json" },
        body: preparedBody,
      });
      if (response.status !== 202) {
        throw new Error("request not accepted");
      }

      const result = await response.json();
      if (
        !result ||
        result.status !== "accepted" ||
        result.message !== "Request received for review." ||
        !/^[a-f0-9]{32}$/.test(String(result.receipt || ""))
      ) {
        throw new Error("invalid acceptance receipt");
      }

      accepted = true;
      document.body.dataset.fitState = "accepted";
      submissionStatus.textContent = `${result.message} Reference: ${result.receipt}`;
    } catch (_error) {
      document.body.dataset.fitState = "error";
      submissionStatus.textContent =
        "We couldn’t submit the request. Use Open in email or Copy request below.";
      setFormDisabled(false);
      reviewConfirmed.disabled = false;
    } finally {
      sending = false;
      panel.removeAttribute("aria-busy");
      updateSendAvailability();
      submissionStatus.focus?.({ preventScroll: true });
    }
  });

  copyButton.addEventListener("click", async () => {
    if (!preparedRequest) {
      return;
    }
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

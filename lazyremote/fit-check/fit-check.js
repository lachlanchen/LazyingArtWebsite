(() => {
  "use strict";

  const endpoint = "https://blog.lazying.art/wp-json/lazyingart/v1/lkt-fit-check";
  const encryptedIntakeAvailable = true;
  const isChinese = document.documentElement?.lang === "zh-Hans";
  const localize = (english, chinese) => isChinese ? chinese : english;
  const subject = localize("LazyRemote Network Fit Review — free fit check", "LazyRemote 网络适配评估 — 免费适配确认");
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
  let preparedBody = "";
  let preparedRequest = "";
  let sending = false;
  let accepted = false;

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

  document.querySelectorAll("[data-fit-language-link]").forEach((link) => {
    const target = new URL(link.href);
    Object.entries(attribution()).forEach(([key, value]) => target.searchParams.set(key, value));
    link.href = target.toString();
  });

  const buildPayload = () => {
    const data = new FormData(form);
    return {
      offer: "lazyremote",
      contact_email: clean(data.get("contact_email")),
      target: clean(data.get("target")),
      endpoints: clean(data.get("endpoints")),
      relay: clean(data.get("relay")),
      network: clean(data.get("network")),
      goal: clean(data.get("goal")),
      constraints: clean(data.get("constraints")),
      rights_confirmed: Boolean(data.get("rights")),
      scope_confirmed: Boolean(data.get("scope")),
      website: String(data.get("website") || ""),
      client_elapsed_ms: Math.min(86400000, Math.max(0, Date.now() - loadedAt)),
      ...attribution(),
    };
  };

  const buildRequest = (payload) => {
    const source = attributionKeys
      .filter((key) => payload[key])
      .map((key) => `${key}: ${payload[key]}`);
    return [
      subject,
      "",
      localize("Contact email: / 联系邮箱", "联系邮箱："), payload.contact_email,
      "",
      localize("Device or service to reach / 需要访问的设备或服务:", "需要访问的设备或服务："), payload.target,
      "",
      localize("Existing endpoints / 现有终端:", "现有终端："), payload.endpoints,
      "",
      localize("Reachable relay / 可连接的中继:", "可连接的中继："), payload.relay,
      "",
      localize("NAT, CGNAT, and port constraints / 网络与端口限制:", "网络与端口限制："), payload.network,
      "",
      localize("Required access and users / 访问目标与用户:", "访问目标与用户："), payload.goal,
      "",
      localize("Other constraints / 其他限制:", "其他限制："), payload.constraints || localize("None stated / 未说明", "未说明"),
      "",
      localize("Authorization: I own or am authorized to assess these computers and networks.", "授权：这些电脑和网络归我所有，或我已获得评估授权。"),
      localize("Scope: I understand the fixed USD 250 review covers one reachable relay and up to three existing computers. It returns a topology and exposure map, identity and host-verification review, and recovery, rollback, and acceptance checklist. Deployment, hardware, hosting, router or firewall changes, wake-on-LAN, desktop capture, ongoing support, and connectivity guarantees are excluded.", "范围：我了解固定价格 USD 250 的评估涵盖一台可连接的中继和最多三台现有电脑，交付网络拓扑与监听暴露图、密钥角色与主机验证审查，以及恢复、回滚和验收清单。不含部署、硬件、托管、路由器或防火墙改动、网络唤醒、桌面捕获、持续支持或连通性保证。"),
      ...(source.length ? ["", localize("Page attribution:", "来源标记："), ...source] : []),
    ].join("\n");
  };

  const updateSendAvailability = () => {
    sendButton.disabled = !encryptedIntakeAvailable || sending || accepted ||
      !preparedPayload || !reviewConfirmed.checked;
  };
  const setFormDisabled = (disabled) => {
    form.querySelectorAll("input, textarea, button").forEach((control) => {
      control.disabled = disabled;
    });
  };
  const resetReview = () => {
    if (sending || accepted) return;
    formStatus.textContent = "";
    if (!preparedPayload) return;
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
    if (sending) return;
    if (!form.checkValidity()) {
      document.body.dataset.fitState = "invalid";
      form.reportValidity();
      return;
    }
    const payload = buildPayload();
    const body = JSON.stringify(payload);
    if (new TextEncoder().encode(body).byteLength > maxBodyBytes) {
      document.body.dataset.fitState = "invalid";
      formStatus.textContent = localize("Please shorten the answers and review again.", "请精简回答后重新预览。");
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
    reviewConfirmed.disabled = !encryptedIntakeAvailable;
    panel.hidden = false;
    panel.removeAttribute("aria-busy");
    formStatus.textContent = "";
    submissionStatus.textContent = encryptedIntakeAvailable ? "" :
      localize("Continue with Open in email or Copy request. Nothing has been sent.", "请用“用邮件发送”或“复制内容”继续。目前尚未发送。");
    document.body.dataset.fitState = "reviewed";
    updateSendAvailability();
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
    heading.focus?.({ preventScroll: true });
  });

  reviewConfirmed.addEventListener("change", updateSendAvailability);
  sendButton.addEventListener("click", async () => {
    if (!encryptedIntakeAvailable || sending || accepted || !preparedPayload ||
        !preparedBody || !reviewConfirmed.checked) return;
    sending = true;
    setFormDisabled(true);
    reviewConfirmed.disabled = true;
    panel.setAttribute("aria-busy", "true");
    submissionStatus.textContent = localize("Sending fit check…", "正在发送适配请求……");
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
      if (response.status !== 202) throw new Error("request not accepted");
      const result = await response.json();
      if (!result || result.status !== "accepted" ||
          result.message !== "Request received for review." ||
          !/^[a-f0-9]{32}$/.test(String(result.receipt || ""))) {
        throw new Error("invalid acceptance receipt");
      }
      accepted = true;
      document.body.dataset.fitState = "accepted";
      submissionStatus.textContent = localize(`${result.message} Reference: ${result.receipt}`, `已收到适配请求。查询编号：${result.receipt}`);
    } catch (_error) {
      document.body.dataset.fitState = "error";
      submissionStatus.textContent =
        localize("We couldn’t submit the request. Use Open in email or Copy request below.", "暂时无法提交。请使用下方“用邮件发送”或“复制内容”。");
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
    if (!preparedRequest) return;
    try {
      await navigator.clipboard.writeText(preparedRequest);
      submissionStatus.textContent = localize("Request copied. Nothing was sent by copying.", "内容已复制；复制操作不会发送请求。");
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
        ? localize("Request copied. Nothing was sent by copying.", "内容已复制；复制操作不会发送请求。")
        : localize("Copy was blocked. Select the request text above and copy it manually.", "无法自动复制，请选中上方内容并手动复制。");
    }
  });
})();

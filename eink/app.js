(function () {
  "use strict";

  var bundle = window.EINK_I18N;
  if (!bundle || !bundle.en) {
    return;
  }

  var supported = Object.keys(bundle);
  var timezone = "";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch (error) {
    timezone = "";
  }

  function normalizeLanguage(value) {
    if (!value) {
      return null;
    }
    var code = String(value).trim().replace(/_/g, "-").toLowerCase();
    if (code.indexOf("zh") === 0) {
      if (
        code.indexOf("hant") >= 0 ||
        /-(tw|hk|mo)(-|$)/.test(code) ||
        /Asia\/(Taipei|Hong_Kong|Macau)/i.test(timezone)
      ) {
        return "zh-Hant";
      }
      return "zh-Hans";
    }
    var shortCode = code.split("-")[0];
    return supported.find(function (item) {
      return item.toLowerCase() === shortCode;
    }) || null;
  }

  function detectLanguage() {
    var query = normalizeLanguage(new URLSearchParams(window.location.search).get("lang"));
    if (query) {
      return query;
    }

    try {
      var saved = normalizeLanguage(window.localStorage.getItem("lazyingart-eink-language"));
      if (saved) {
        return saved;
      }
    } catch (error) {
      // Continue with browser detection.
    }

    var browserLanguages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language];
    for (var index = 0; index < browserLanguages.length; index += 1) {
      var language = normalizeLanguage(browserLanguages[index]);
      if (language) {
        return language;
      }
    }
    return "en";
  }

  var currentLanguage = detectLanguage();

  var releasePage = "https://github.com/lachlanchen/Kindle/releases/latest";
  var downloads = {
    windows: "https://github.com/lachlanchen/Kindle/releases/latest/download/Kindle-Book-Sender-Windows-x64.exe",
    linux: "https://github.com/lachlanchen/Kindle/releases/latest/download/Kindle-Book-Sender-Linux-x86_64.tar.gz",
    "mac-arm64": "https://github.com/lachlanchen/Kindle/releases/latest/download/Kindle-Book-Sender-macOS-Apple-Silicon.zip",
    "mac-intel": "https://github.com/lachlanchen/Kindle/releases/latest/download/Kindle-Book-Sender-macOS-Intel.zip",
    all: releasePage
  };
  var platformKeys = {
    windows: "platform.windows",
    linux: "platform.linux",
    "mac-arm64": "platform.macArm",
    "mac-intel": "platform.macIntel",
    all: "platform.all"
  };

  function validPlatform(value) {
    return Object.prototype.hasOwnProperty.call(downloads, value) ? value : null;
  }

  function savedPlatform() {
    try {
      return validPlatform(window.localStorage.getItem("lazyingart-eink-download-platform"));
    } catch (error) {
      return null;
    }
  }

  function detectPlatform() {
    var userAgent = String(navigator.userAgent || "").toLowerCase();
    var platform = String(
      (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || ""
    ).toLowerCase();
    var combined = platform + " " + userAgent;

    if (/iphone|ipad|ipod|android/.test(combined)) {
      return "all";
    }
    if (/windows|win32|win64/.test(combined)) {
      return "windows";
    }
    if (/macintosh|mac os|macintel|macarm/.test(combined)) {
      if (/arm64|aarch64|macarm/.test(combined)) {
        return "mac-arm64";
      }
      return "mac-arm64";
    }
    if (/linux|x11/.test(combined)) {
      return /arm|aarch64/.test(combined) ? "all" : "linux";
    }
    return "all";
  }

  var storedPlatform = savedPlatform();
  var currentPlatform = storedPlatform || detectPlatform();
  var platformWasChosen = Boolean(storedPlatform);

  function translated(key) {
    return (bundle[currentLanguage] && bundle[currentLanguage][key]) || bundle.en[key] || key;
  }

  function withPlatform(key, platformName) {
    return translated(key).replace("{platform}", platformName);
  }

  function updateDownloadUI() {
    var platformName = translated(platformKeys[currentPlatform]);
    var downloadUrl = downloads[currentPlatform] || releasePage;
    var actionLabel = currentPlatform === "all"
      ? translated("sender.openReleases")
      : withPlatform("sender.downloadFor", platformName);

    document.querySelectorAll("[data-direct-download]").forEach(function (link) {
      link.href = downloadUrl;
      link.setAttribute("title", actionLabel);
      if (link.hasAttribute("data-download-label")) {
        link.textContent = actionLabel;
        link.setAttribute("aria-label", actionLabel);
      }
    });

    var platformSelect = document.querySelector("[data-platform-select]");
    if (platformSelect) {
      platformSelect.value = currentPlatform;
      platformSelect.setAttribute("aria-label", translated("sender.platformLabel"));
    }
    var note = document.querySelector("[data-platform-note]");
    if (note) {
      note.textContent = withPlatform(
        platformWasChosen ? "sender.selectedPlatform" : "sender.detectedPlatform",
        platformName
      );
    }
  }

  function refinePlatformDetection() {
    if (
      platformWasChosen ||
      !navigator.userAgentData ||
      typeof navigator.userAgentData.getHighEntropyValues !== "function"
    ) {
      return;
    }
    navigator.userAgentData.getHighEntropyValues(["architecture", "platform"]).then(function (values) {
      var platform = String(values.platform || "").toLowerCase();
      var architecture = String(values.architecture || "").toLowerCase();
      var refined = currentPlatform;
      if (platform.indexOf("mac") >= 0) {
        refined = /arm|aarch64/.test(architecture) ? "mac-arm64" : "mac-intel";
      } else if (platform.indexOf("linux") >= 0) {
        refined = /arm|aarch64/.test(architecture) ? "all" : "linux";
      }
      if (refined !== currentPlatform) {
        currentPlatform = refined;
        updateDownloadUI();
      }
    }).catch(function () {
      // The synchronous browser detection remains a safe recommendation.
    });
  }

  function updateUrl(language) {
    var url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  }

  function applyLanguage(language, persist) {
    currentLanguage = language;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      element.textContent = translated(element.getAttribute("data-i18n"));
    });

    document.title = translated("meta.title");
    var description = document.querySelector('meta[name="description"]');
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogDescription = document.querySelector('meta[property="og:description"]');
    if (description) {
      description.content = translated("meta.description");
    }
    if (ogTitle) {
      ogTitle.content = translated("meta.title");
    }
    if (ogDescription) {
      ogDescription.content = translated("meta.description");
    }

    var select = document.querySelector("[data-language-select]");
    if (select) {
      select.value = language;
      select.setAttribute("aria-label", translated("a11y.language"));
    }
    var menu = document.querySelector("[data-menu-button]");
    if (menu) {
      menu.setAttribute("aria-label", translated("a11y.menu"));
    }
    updateDownloadUI();

    updateUrl(language);
    if (persist) {
      try {
        window.localStorage.setItem("lazyingart-eink-language", language);
      } catch (error) {
        // The choice still applies for this visit.
      }
    }
  }

  applyLanguage(currentLanguage, false);

  var select = document.querySelector("[data-language-select]");
  if (select) {
    select.addEventListener("change", function (event) {
      applyLanguage(event.target.value, true);
    });
  }

  var platformSelect = document.querySelector("[data-platform-select]");
  if (platformSelect) {
    platformSelect.addEventListener("change", function (event) {
      currentPlatform = validPlatform(event.target.value) || "all";
      platformWasChosen = true;
      try {
        window.localStorage.setItem("lazyingart-eink-download-platform", currentPlatform);
      } catch (error) {
        // The choice still applies for this visit.
      }
      updateDownloadUI();
    });
  }
  refinePlatformDetection();

  var menuButton = document.querySelector("[data-menu-button]");
  var navigation = document.querySelector("[data-nav]");
  function closeMenu() {
    if (menuButton && navigation) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("open");
    }
  }
  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      var open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      navigation.classList.toggle("open", !open);
    });
    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  var header = document.querySelector("[data-header]");
  function updateHeader() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 8);
    }
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = Number(entry.target.getAttribute("data-delay") || 0);
          window.setTimeout(function () {
            entry.target.classList.add("visible");
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -25px" });
    items.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    items.forEach(function (item) {
      item.classList.add("visible");
    });
  }

  var year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();

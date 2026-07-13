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

  function translated(key) {
    return (bundle[currentLanguage] && bundle[currentLanguage][key]) || bundle.en[key] || key;
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

(function () {
  var STORAGE_KEY = "octa-theme";
  var root = document.documentElement;

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* ignore */
    }
  }

  function applyTheme(theme) {
    var isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";

    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", isDark ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
      btn.setAttribute(
        "title",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    });
  }

  function currentTheme() {
    return root.classList.contains("dark") ? "dark" : "light";
  }

  function toggleTheme() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    storeTheme(next);
    applyTheme(next);
  }

  function initToggles() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      if (btn.dataset.themeBound === "1") return;
      btn.dataset.themeBound = "1";
      btn.addEventListener("click", toggleTheme);
    });
    applyTheme(currentTheme());
  }

  var stored = getStoredTheme();
  if (stored === "dark" || stored === "light") {
    applyTheme(stored);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initToggles);
  } else {
    initToggles();
  }
})();

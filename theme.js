(function () {
    var STORAGE_KEY = "ruflo-theme";

    function setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            // Ignore storage errors.
        }
        updateToggleLabel(theme);
    }

    function getSavedTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function preferredTheme() {
        var saved = getSavedTheme();
        if (saved === "light" || saved === "dark") {
            return saved;
        }
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function updateToggleLabel(theme) {
        var btn = document.getElementById("theme-toggle");
        if (!btn) {
            return;
        }
        btn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
        btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }

    function createToggle() {
        if (document.getElementById("theme-toggle")) {
            return;
        }

        var target = document.querySelector("header nav") ||
            document.querySelector("header") ||
            document.querySelector("nav") ||
            document.querySelector(".navbar") ||
            document.querySelector(".top-nav");

        if (!target) {
            target = document.createElement("nav");
            target.className = "theme-nav-fallback";
            if (document.body.firstChild) {
                document.body.insertBefore(target, document.body.firstChild);
            } else {
                document.body.appendChild(target);
            }
        }

        var btn = document.createElement("button");
        btn.id = "theme-toggle";
        btn.className = "theme-toggle";
        btn.type = "button";

        btn.addEventListener("click", function () {
            var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
            setTheme(current === "dark" ? "light" : "dark");
        });

        if (getComputedStyle(target).display.indexOf("flex") >= 0) {
            target.appendChild(btn);
        } else {
            var wrapper = document.createElement("div");
            wrapper.style.marginTop = "8px";
            wrapper.appendChild(btn);
            target.appendChild(wrapper);
        }

        updateToggleLabel(document.documentElement.getAttribute("data-theme") || "light");
    }

    document.addEventListener("DOMContentLoaded", function () {
        setTheme(preferredTheme());
        createToggle();
    });
})();

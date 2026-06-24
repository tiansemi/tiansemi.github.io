(function () {
  "use strict";

  const mount = document.querySelector("[data-site-nav]");
  if (!mount) return;

  const root = mount.dataset.siteRoot || "./";
  const normalise = (path) => path.replace(/index\.html$/, "").replace(/\/+$/, "") || "/";
  const currentPath = normalise(window.location.pathname);
  const items = [
    ["Accueil", root], ["Club", `${root}club/`], ["Apprentissage", `${root}apprentissage/`],
    ["Blog", `${root}blog/`], ["Portfolio", `${root}portfolio/`], ["Contact", `${root}#contact`]
  ];
  const isActive = (label, href) => label !== "Contact" && normalise(new URL(href, window.location.href).pathname) === currentPath;
  const markup = `<header class="site-nav" data-header><div class="site-nav__inner"><a class="site-nav__brand" href="${root}" aria-label="Accueil TianSemi">TianSemi<span>.</span></a><button class="site-nav__toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false" data-nav-toggle-btn><span></span><span></span><span></span></button><nav class="site-nav__links" aria-label="Navigation principale" data-navbar>${items.map(([label, href]) => `<a href="${href}"${isActive(label, href) ? ' aria-current="page"' : ""}>${label}</a>`).join("")}<button class="site-nav__theme" type="button" aria-label="Changer de thème" data-theme-btn></button></nav></div></header>`;
  const replaceHeader = mount.tagName === "HEADER";
  if (replaceHeader) mount.outerHTML = markup;
  else mount.innerHTML = markup;
  const component = replaceHeader ? document.querySelector(".site-nav[data-header]") : mount;

  const toggle = component.querySelector("[data-nav-toggle-btn]");
  const nav = component.querySelector("[data-navbar]");
  toggle.addEventListener("click", () => { const open = nav.classList.toggle("active"); toggle.setAttribute("aria-expanded", String(open)); });
  nav.addEventListener("click", (event) => { if (event.target.matches("a")) { nav.classList.remove("active"); toggle.setAttribute("aria-expanded", "false"); } });

  const themeButton = component.querySelector("[data-theme-btn]");
  const applyTheme = (theme) => { document.body.classList.toggle("light_theme", theme === "light_theme"); document.body.classList.toggle("dark_theme", theme !== "light_theme"); themeButton.classList.toggle("active", theme === "light_theme"); };
  applyTheme(localStorage.getItem("theme") || "dark_theme");
  themeButton.addEventListener("click", () => { const next = document.body.classList.contains("light_theme") ? "dark_theme" : "light_theme"; localStorage.setItem("theme", next); applyTheme(next); });
}());

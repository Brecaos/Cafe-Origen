/* ==========================================================
   Café Origen · Interacciones
   1. Header flotante al hacer scroll
   2. Menú móvil (abrir / cerrar)
   3. Animaciones de aparición con IntersectionObserver
   4. Año automático en el footer
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1. Header flotante ---------- */
  const header = document.getElementById("header");

  const updateHeader = () => {
    header.classList.toggle("header--floating", window.scrollY > 56);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------- 2. Menú móvil ---------- */
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  const setMenu = (open) => {
    nav.classList.toggle("nav--open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  menuToggle.addEventListener("click", () => {
    setMenu(!nav.classList.contains("nav--open"));
  });

  // Cierra el menú al elegir una opción
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  // Cierra el menú con la tecla Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  /* ---------- 3. Animaciones de aparición ---------- */
  const animatedElements = document.querySelectorAll("[data-reveal]");

  if (!("IntersectionObserver" in window)) {
    animatedElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" }
    );

    animatedElements.forEach((element) => observer.observe(element));
  }

  /* ---------- 4. Año del footer ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
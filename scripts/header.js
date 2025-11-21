// header.js — simple accessible mobile nav toggle
(function () {
  const toggle = document.querySelector(".header-toggle");
  const nav = document.querySelector(".header-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close nav when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("open")) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
})();
export function addDialogEvent() {
  const dialog = document.querySelector(".dialog-overview");
  if (!dialog) return;

  const openButtons = document.querySelectorAll(
    ".header-contact-me, .btn.header-contact-me"
  );
  const closeButton = dialog.querySelector('sl-button[slot="footer"]');

  openButtons.forEach((openButton) => {
    if (!openButton) return;
    openButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof dialog.show === "function") dialog.show();
      else dialog.setAttribute("open", "");
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      if (typeof dialog.hide === "function") dialog.hide();
      else dialog.removeAttribute("open");
    });
  }
}

export function addDialogEvent() {
  const dialog = document.querySelector(".dialog-overview");
  const openButton = document.querySelector(".header-contact-me");
  const closeButton = dialog.querySelector('sl-button[slot="footer"]');

  openButton.addEventListener("click", () => dialog.show());
  closeButton.addEventListener("click", () => dialog.hide());
}

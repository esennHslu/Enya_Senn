document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");

  // Guard in case something is missing on a page
  if (!nav || !toggle) return;
console.log("Nav toggle script loaded");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
});

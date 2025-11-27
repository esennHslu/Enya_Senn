document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".site-nav");
    const toggle = document.querySelector(".nav-toggle");

    toggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
});

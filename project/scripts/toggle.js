const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');

toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
});
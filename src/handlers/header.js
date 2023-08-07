import { handleMain } from "./main";

function handleMenuButton() {
  const menuButton = document.getElementById('menu');
  const nav = document.querySelector('nav');

  menuButton.addEventListener('click', () => {
    nav.classList.toggle('slide-in');
    nav.classList.toggle('slide-out');
  });
}

function handleHomeButton() {
  const button = document.getElementById('home-button');

  button.addEventListener('click', handleMain);
}

function handleHeader() {
  handleMenuButton();
  handleHomeButton();
}

export { handleHeader };
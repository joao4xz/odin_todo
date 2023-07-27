function handleMenuButton() {
  const menuButton = document.getElementById('menu');
  const nav = document.querySelector('nav');

  menuButton.addEventListener('click', () => {
    nav.classList.toggle('hidden');
  });
}

function handleHeader() {
  handleMenuButton();
}

export { handleHeader };
import { createAddProjectHUD } from "../dom/nav";

function handleInboxButton() {
  const inboxButton = document.getElementById('inbox-button');

  inboxButton.addEventListener('click', () => {
    console.log('Inbox Button');
  });
}

function handleTodayButton() {
  const todayButton = document.getElementById('today-button');

  todayButton.addEventListener('click', () => {
    console.log('Today Button');
  });
}

function handleUpcomingButton() {
  const upcomingButton = document.getElementById('upcoming-button');

  upcomingButton.addEventListener('click', () => {
    console.log('Upcoming Button');
  });
}

function handleProjectButton() {
  const projectButton = document.getElementById('project-button');

  projectButton.addEventListener('click', () => {
    console.log('Project Button');
  });
}

function handleAddProjectButton() {
  const addProjectButton = document.getElementById('add-project-button');

  addProjectButton.addEventListener('click', () => {
    createAddProjectHUD();
  });
}

function handleDropdownColor() {
  const colorSelector = document.getElementById('color-selector');
  const colors = document.querySelectorAll('.color');

  colorSelector.addEventListener('click', () => {
    colors.forEach(color => {
      color.classList.toggle('hidden');
    });
  });
}

function handleCancelButton() {
  const cancelButton = document.getElementById('cancel-button');
  const overlay = document.getElementById('overlay');

  cancelButton.addEventListener('click', () => {
    overlay.remove();
  });
}

function handleAddButton() {
  const addButton = document.getElementById('add-button');

  addButton.addEventListener('click', () => {
    console.log('Add');
  });
}

export function handleOverlay() {
  const overlay = document.getElementById('overlay');

  overlay.addEventListener('click', (event) => {
    const isFormOrDescendant = event.target.closest('form');
    if (!isFormOrDescendant) {
      overlay.remove();
    }
  });
}

export function handleAddProjectHUD() {
  handleDropdownColor();
  handleCancelButton();
  handleAddButton();
}

export function handleNav() {
  handleInboxButton();
  handleTodayButton();
  handleUpcomingButton();
  handleProjectButton();
  handleAddProjectButton();
}

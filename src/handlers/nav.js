import { createAddProjectHUD } from "../dom/nav";
import { createEditProjectHUD } from "../dom/nav";
import { addProject } from "../dom/nav";
import { saveProject } from "../dom/nav";
import { removeOverlay } from "../dom/nav";

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

function handleProjectsButton() {
  const projectButton = document.getElementById('project-button');

  projectButton.addEventListener('click', () => {
    console.log('Projects Button');
  });
}

function handleAddProjectButton() {
  const addProjectButton = document.getElementById('add-project-button');

  addProjectButton.addEventListener('click', () => {
    createAddProjectHUD('Add project');
    handleAddProjectHUD();
  });
}

function handleDropdownColor() {
  const colorSelector = document.getElementById('color-selector');
  const colors = document.getElementById('colors');

  colorSelector.addEventListener('click', () => {
    colors.classList.toggle('hidden');
  });
}

function handleDropdownOptions() {
  const colors = document.getElementById('colors');

  const currentSvgColor = document.getElementById('current-color-svg');
  const currentTextColor = document.getElementById('current-color-text');

  colors.addEventListener('click', (event) => {
    const targetColor = event.target.closest('.color');
    if (targetColor) {
      const currentCircleColor = currentSvgColor.querySelector('circle');
      const colorText = targetColor.querySelector('p').textContent;
      currentCircleColor.setAttribute('fill', colorText);
      currentTextColor.textContent = colorText;
      colors.classList.toggle('hidden');
    }
  });
}

function handleCancelButton() {
  const cancelButton = document.getElementById('cancel-button');

  cancelButton.addEventListener('click', () => {
    removeOverlay();
  });
}

function handleAddButton() {
  const addButton = document.getElementById('add-button');

  addButton.addEventListener('click', () => {
    addProject();
  });
}

function handleProjects() {
  const projects = document.getElementById('projects');

  projects.addEventListener('click', (event) => {
    const targetButton = event.target.closest('button');
    if (targetButton) {
      const targetProject = targetButton.closest('.project');
      if (targetProject) {
        const firstButton = targetProject.querySelector('button:first-child');
        const secondButton = targetProject.querySelector('button:last-child');

        if (targetButton === firstButton) {
          console.log(targetProject.querySelector('p').textContent);
        } else if (targetButton === secondButton) {
          handleEditProject(targetProject);
        }
      }
    }
  });
}

function handleEditProject(targetProject) {
  console.log('Edit action');
  createEditProjectHUD('Edit project', targetProject);
  handleEditProjectHUD(targetProject);
}

function handleSaveButton(targetProject) {
  const saveButton = document.getElementById('add-button');

  saveButton.addEventListener('click', () => {
    saveProject(targetProject);
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

function handleAddProjectHUD() {
  handleDropdownColor();
  handleDropdownOptions();
  handleCancelButton();
  handleAddButton();
}

function handleEditProjectHUD(targetProject) {
  handleDropdownColor();
  handleDropdownOptions();
  handleCancelButton();
  handleSaveButton(targetProject);
}

export function handleNav() {
  handleInboxButton();
  handleTodayButton();
  handleUpcomingButton();
  handleProjectsButton();
  handleAddProjectButton();
  handleProjects();
}

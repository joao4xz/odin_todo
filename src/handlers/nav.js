import { createAddProjectHUD, createEditProjectHUD, addProject, removeOverlay } from "../dom/nav";
import { createMainPage, renderTodayTasks, renderUpcomingTasks } from "../dom/main";
import { printProjects, validateAddProject, validateEditProject } from "../data/projects";

function handleInboxButton() {
  const inboxButton = document.getElementById('inbox-button');
  
  inboxButton.addEventListener('click', () => {
    const tabName = document.getElementById('tab-name');
    if(inboxButton.querySelector('p').textContent !== tabName.textContent) {
      createMainPage('Inbox', 'blue');
    }
  });
}

function handleTodayButton() {
  const todayButton = document.getElementById('today-button');

  todayButton.addEventListener('click', () => {
    const tabName = document.getElementById('tab-name');
    if(todayButton.querySelector('p').textContent !== tabName.textContent) {
      createMainPage('Today', 'green');
      renderTodayTasks();
      printProjects();
    }
  });
}

function handleUpcomingButton() {
  const upcomingButton = document.getElementById('upcoming-button');

  upcomingButton.addEventListener('click', () => {
    const tabName = document.getElementById('tab-name');
    if(upcomingButton.querySelector('p').textContent !== tabName.textContent) {
      createMainPage('Upcoming', 'purple');
      renderUpcomingTasks();
      printProjects();
    }
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
    if(validateAddProject(document.getElementById('name').value)) {
      addProject(document.getElementById('name').value, document.getElementById('current-color-text').innerText);
      createMainPage(document.getElementById('projects').lastChild.querySelector('p').textContent, document.getElementById('projects').lastChild.querySelector('circle').getAttribute('fill').toLowerCase());
    }
    else {
      document.getElementById('name').classList.add('border-2', 'border-red-500');
    }
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
          createMainPage(targetProject.querySelector('p').textContent, targetProject.querySelector('circle').getAttribute('fill').toLowerCase());
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
    if(validateEditProject(document.getElementById('name').value, targetProject.querySelector('p').textContent)) {
      saveProject(targetProject);
      createMainPage(targetProject.querySelector('p').textContent, targetProject.querySelector('circle'). getAttribute('fill').toLowerCase());
    }
    else {
      document.getElementById('name').classList.add('border-2', 'border-red-500');
    }
  });
}

function handleInput() {
  const nameInput = document.getElementById('name');

  nameInput.addEventListener('click', () => {
    nameInput.classList.remove('border-2', 'border-red-500');
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
  handleInput();
  handleDropdownColor();
  handleDropdownOptions();
  handleCancelButton();
  handleAddButton();
}

export function handleEditProjectHUD(targetProject) {
  handleInput();
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

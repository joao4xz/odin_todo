import { getProject, printProjects, pushProject } from "../data/projects";
import { createAddTaskHUD, createMainPage, createTask } from "../dom/main";
import { deleteCurrentProject } from "../dom/main";
import { createEditProjectHUD } from "../dom/nav";
import { handleEditProjectHUD } from "../handlers/nav";
import { removeOverlay } from "../dom/nav";
import { deleteProject } from "../data/projects";
import { pushTask, validateTask } from "../data/tasks";

function handleMainSortButton() {
  const sortButton = document.getElementById('sort');

  sortButton.addEventListener('click', () => {
    console.log('Sort');
  });
}

function handleMainEditButton() {
  const editButton = document.getElementById('edit');

  editButton.addEventListener('click', () => {
    const targetProject = getProject(document.getElementById('tab-name').textContent);
    createEditProjectHUD('Edit Project', targetProject);
    handleEditProjectHUD(targetProject);
  });
}

function handleMainDeleteButton() {
  const deleteButton = document.getElementById('delete');

  deleteButton.addEventListener('click', () => {
    console.log('Delete');
    deleteCurrentProject();
  });
}

function handleCancelWarningButton() {
  const cancelButton = document.getElementById('cancel-button');

  cancelButton.addEventListener('click', () => {
    removeOverlay();
  });
}

function handleDeleteWarningButton() {
  const deleteButton = document.getElementById('delete-button');

  deleteButton.addEventListener('click', () => {
    const tabName = document.getElementById('tab-name');
    getProject(tabName.textContent).remove();
    deleteProject(tabName.textContent);
    createMainPage('Inbox', 'blue');
    removeOverlay();
  })
}

function handleAddTaskButton() {
  const addTaskButton = document.getElementById('add-task');

  addTaskButton.addEventListener('click', () => {
    createAddTaskHUD('Add task');
    handleTaskHUDButtons();
  });
}

function handlePriorityButtons() {
  const priorityButtons = document.getElementById('priority-buttons');

  priorityButtons.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if(button){
      const buttons = priorityButtons.querySelectorAll('button');

      buttons.forEach((btn) => {
        btn.classList.remove('bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-gray-500', 'selected');
      });

      if(button.classList.contains('border-red-600')){
        button.classList.toggle('bg-red-500');
        button.classList.toggle('selected');
      }
      else if(button.classList.contains('border-yellow-600')){
        button.classList.toggle('bg-yellow-500');
        button.classList.toggle('selected');
      }
      else if(button.classList.contains('border-blue-600')){
        button.classList.toggle('bg-blue-500');
        button.classList.toggle('selected');
      }
      else if(button.classList.contains('border-gray-600')){
        button.classList.toggle('bg-gray-500');
        button.classList.toggle('selected');
      }
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
    const title = document.getElementById('task-name').value;
    const description = document.getElementById('task-description').value;
    const date = document.getElementById('task-date').value;
    const priority = document.querySelector('.selected');
    const priorityColor = priority.id.slice(0, priority.id.indexOf('-priority'));
    if(validateTask(title)) {
      createTask(title, description, date, priorityColor);
      pushTask(title, description, date, priorityColor);
      removeOverlay();
      printProjects();
    }
  });
}

function handleTaskHUDButtons() {
  handlePriorityButtons();
  handleCancelButton();
  handleAddButton();
}

function handleTaskCheckButton() {
  const tasks = document.getElementById('tasks');

  tasks.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if(button && button.classList.contains('border-red-600')){
      button.classList.toggle('bg-red-500');
    }
    else if(button && button.classList.contains('border-yellow-600')){
      button.classList.toggle('bg-yellow-500');
    }
    else if(button && button.classList.contains('border-blue-600')){
      button.classList.toggle('bg-blue-500');
    }
    else if(button && button.classList.contains('border-gray-600')){
      button.classList.toggle('bg-gray-500');
    }
  });
}

function handleTaskEditButton() {

}

function handleTaskDeleteButton() {
  
}

function handleTaskButtons() {
  handleTaskCheckButton();
  handleTaskEditButton();
  handleTaskDeleteButton();
}

export function handleWarningButtons() {
  handleCancelWarningButton();
  handleDeleteWarningButton();
}

export function handleMainPageButtons(headerTextContent) {
  handleMainSortButton();
  if(headerTextContent !== 'Inbox' && headerTextContent !== 'Today' && headerTextContent !== 'Upcoming'){
    handleMainEditButton();
    handleMainDeleteButton();
  }
  handleAddTaskButton();
  handleTaskButtons();
}

export function handleMain() {
  createMainPage('Inbox', 'blue');
}
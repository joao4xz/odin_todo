import { getProject, printProjects, deleteProject, getProjectTaskArray } from "../data/projects";
import { createAddTaskHUD, createMainPage, createTask, createEditTaskHUD, saveTask, createDeleteTaskHUD } from "../dom/main";
import { deleteCurrentProject } from "../dom/main";
import { createEditProjectHUD, removeOverlay } from "../dom/nav";
import { handleEditProjectHUD } from "../handlers/nav";
import { deleteTask, pushTask, validateTask } from "../data/tasks";

function handleMainSortButton() {
  const sortButton = document.getElementById('sort');

  sortButton.addEventListener('click', () => {
    document.querySelector('.sort-dropdown').classList.toggle('hidden');
    document.querySelector('.sort-dropdown').classList.toggle('block');
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
    handleAddTaskHUDButtons();
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
        btn.classList.add('bg-white');
      });

      if(button.classList.contains('border-red-600')){
        button.classList.toggle('bg-red-500');
        button.classList.toggle('bg-white');
        button.classList.toggle('selected');
      }
      else if(button.classList.contains('border-yellow-600')){
        button.classList.toggle('bg-yellow-500');
        button.classList.toggle('bg-white');
        button.classList.toggle('selected');
      }
      else if(button.classList.contains('border-blue-600')){
        button.classList.toggle('bg-blue-500');
        button.classList.toggle('bg-white');
        button.classList.toggle('selected');
      }
      else if(button.classList.contains('border-gray-600')){
        button.classList.toggle('bg-gray-500');
        button.classList.toggle('bg-white');
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

function handleAddTaskHUDButtons() {
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
    
    const task = event.target.closest('.task');
    const taskTitle = task.querySelector('.title');
    const taskDescription  = task.querySelector('.description');
    const taskDate = task.querySelector('.date');
    const taskDateSVG = task.querySelector('svg');

    if(button && button.classList.contains('priority')) {
      taskTitle.classList.toggle('line-through');
      taskDescription.classList.toggle('line-through');
      taskDate.classList.toggle('line-through');
      taskTitle.classList.toggle('text-zinc-400');
      taskDescription.classList.toggle('text-zinc-400');
      taskDate.classList.toggle('text-zinc-400');
      taskDateSVG.classList.toggle('fill-zinc-400');

      const taskArray = getProjectTaskArray(document.getElementById('tab-name').textContent);
      for (const task of taskArray) {
        if(task.title === taskTitle.textContent) {
          task.isDone = !task.isDone;
          printProjects();
          break;
        }
      }
    }
  });
}

function handleEditDeleteButtons() {
  const tasks = document.getElementById('tasks');

  tasks.addEventListener('click', (event) => {
    const targetButton = event.target.closest('button');
    if (targetButton) {
      const targetTask = targetButton.closest('.task');
      const targetButtonsDiv = targetButton.closest('.task-buttons');
      if (targetButtonsDiv) {
        const firstButton = targetButtonsDiv.querySelector('button:first-child');
        const secondButton = targetButtonsDiv.querySelector('button:last-child');

        if (targetButton === firstButton) {
          createEditTaskHUD('Edit task', targetTask);
          handleEditTaskHUDButtons(targetTask);
        } else if (targetButton === secondButton) {
          createDeleteTaskHUD(targetTask);
          handleTaskDeleteButtons(targetTask);
          console.log(`Delete ${targetTask.querySelector('.text-xl').textContent}`);
        }
      }
    }
  });
}

function handleEditTaskHUDButtons(targetTask) {
  handlePriorityButtons();
  handleCancelButton();
  handleSaveButton(targetTask);
}

function handleSaveButton(targetTask) {
  const saveButton = document.getElementById('add-button');

  saveButton.addEventListener('click', () => {
    if(validateTask(document.getElementById('task-name').value)) {
      saveTask(targetTask);
    }
  });
}

function handleDeleteButton(targetTask) {
  const deleteButton = document.getElementById('delete-button');

  deleteButton.addEventListener('click', () => {
    deleteTask(targetTask);
    targetTask.remove();
    printProjects();
    removeOverlay();
  });
}

function handleTaskDeleteButtons(targetTask) {
  handleCancelButton();
  handleDeleteButton(targetTask);
}

function handleTaskButtons() {
  handleTaskCheckButton();
  handleEditDeleteButtons();
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
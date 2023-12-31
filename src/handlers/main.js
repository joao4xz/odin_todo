import { getProject, printProjects, deleteProject, getProjectTaskArray } from "../data/projects";
import { createAddTaskHUD, createMainPage, createTask, createEditTaskHUD, saveTask, createDeleteTaskHUD, cleanTasks, deleteCurrentProject } from "../dom/main";
import { createEditProjectHUD, removeOverlay } from "../dom/nav";
import { handleEditProjectHUD } from "../handlers/nav";
import { deleteTask, pushTask, validateAddTask, validateEditTask } from "../data/tasks";
import { compareAsc } from "date-fns";

function handleMainSortButton() {
  const sortButton = document.getElementById('sort');

  sortButton.addEventListener('click', () => {
    document.querySelector('.sort-dropdown').classList.toggle('hidden');
    document.querySelector('.sort-dropdown').classList.toggle('block');
  });
  handleSortDropdown();
}

function handleSortDropdown() {
  const defaultOption = document.getElementById('default');
  const priorityOption = document.getElementById('priority');
  const dateOption = document.getElementById('date');
  const statusOption = document.getElementById('status');
  const sortDropdown = document.querySelector('.sort-dropdown');

  document.addEventListener('click', (event) => {
    if(!event.target.closest('.sort-dropdown') && !event.target.closest('#sort')) {
      document.querySelector('.sort-dropdown').classList.remove('block');
      document.querySelector('.sort-dropdown').classList.add('hidden');
    }
  })

  sortDropdown.addEventListener('click', (event) => {
    const sortEvent = event.target.closest('button').id;

    const taskArray = getProjectTaskArray(document.getElementById('tab-name').textContent);
    
    cleanTasks();

    defaultOption.classList.remove('bg-zinc-300');
    priorityOption.classList.remove('bg-zinc-300');
    dateOption.classList.remove('bg-zinc-300');
    statusOption.classList.remove('bg-zinc-300');
    defaultOption.classList.add('hover:bg-slate-100');
    priorityOption.classList.add('hover:bg-slate-100');
    dateOption.classList.add('hover:bg-slate-100');
    statusOption.classList.add('hover:bg-slate-100');


    if(sortEvent === 'default') {
      defaultOption.classList.remove('hover:bg-slate-100');
      defaultOption.classList.add('bg-zinc-300');
      for (let i = 0; i < taskArray.length; i++) {
        createTask(taskArray[i].title, taskArray[i].description, taskArray[i].date, taskArray[i].priorityColor, taskArray[i].isDone);
      }
    }
    else if(sortEvent === 'priority') {
      priorityOption.classList.remove('hover:bg-slate-100');
      priorityOption.classList.add('bg-zinc-300');
      const sortedArray = [];
      let redCounter = 0;
      let yellowCounter = 0;
      let blueCounter = 0;
      let grayCounter = 0;
      for (let i = 0; i < taskArray.length; i++) {
        if(taskArray[i].priorityColor === 'red') {
          sortedArray.splice(redCounter, 0, taskArray[i]);
          redCounter++;
        }
        else if(taskArray[i].priorityColor === 'yellow') {
          sortedArray.splice(redCounter + yellowCounter, 0, taskArray[i]);
          yellowCounter++;
        }
        else if(taskArray[i].priorityColor === 'blue') {
          sortedArray.splice(redCounter + yellowCounter + blueCounter, 0, taskArray[i]);
          blueCounter++;
        }
        else if(taskArray[i].priorityColor === 'gray') {
          sortedArray.splice(redCounter + yellowCounter + blueCounter + grayCounter, 0, taskArray[i]);
          grayCounter++;
        }
      }
      for (let i = 0; i < sortedArray.length; i++) {
        createTask(sortedArray[i].title, sortedArray[i].description, sortedArray[i].date, sortedArray[i].priorityColor, sortedArray[i].isDone);
      }
      console.log(sortedArray);
    }
    else if(sortEvent === 'date') {
      dateOption.classList.remove('hover:bg-slate-100');
      dateOption.classList.add('bg-zinc-300');
      const sortedArray = [...taskArray];
      sortedArray.sort((date1, date2) => compareAsc(new Date(date1.date), new Date(date2.date)));

      for (let i = 0; i < sortedArray.length; i++) {
        createTask(sortedArray[i].title, sortedArray[i].description, sortedArray[i].date, sortedArray[i].priorityColor, sortedArray[i].isDone);
      }
      console.log(sortedArray);
    }
    else if(sortEvent === 'status') {
      statusOption.classList.remove('hover:bg-slate-100');
      statusOption.classList.add('bg-zinc-300');
      const sortedArray = [...taskArray];
      sortedArray.sort((obj1, obj2) => {
        if(obj1.isDone === obj2.isDone) {
          return 0;
        }
        else if(obj1.isDone < obj2.isDone) {
          return -1;
        }
        else if(obj1.isDone > obj2.isDone) {
          return 1;
        }
      });
      for (let i = 0; i < sortedArray.length; i++) {
        createTask(sortedArray[i].title, sortedArray[i].description, sortedArray[i].date, sortedArray[i].priorityColor, sortedArray[i].isDone);
      }
      console.log(sortedArray);
    }
    console.log(taskArray);
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

function handleTaskInput() {
  const nameInput = document.getElementById('task-name');
  const descriptionInput = document.getElementById('task-description');

  nameInput.addEventListener('click', () => {
    nameInput.classList.remove('border-2', 'border-red-500');
  });
  descriptionInput.addEventListener('click', () => {
    descriptionInput.classList.remove('border-2', 'border-red-500');
  })
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
    const validation = validateAddTask(title, description);
    if(validation === true) {
      createTask(title, description, date, priorityColor);
      pushTask(title, description, date, priorityColor);
      removeOverlay();
      printProjects();
    }
    else if(validation === 'title') {
      document.getElementById('task-name').classList.add('border-2', 'border-red-500');
    }
    else if(validation === 'description') {
      document.getElementById('task-description').classList.add('border-2', 'border-red-500');
    }
  });
}

function handleAddTaskHUDButtons() {
  handleTaskInput();
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
  handleTaskInput();
  handlePriorityButtons();
  handleCancelButton();
  handleSaveButton(targetTask);
}

function handleSaveButton(targetTask) {
  const saveButton = document.getElementById('add-button');

  saveButton.addEventListener('click', () => {
    const validation = validateEditTask(document.getElementById('task-name').value, document.getElementById('task-description').value, targetTask.querySelector('.title').textContent);
    if(validation === true) {
      saveTask(targetTask);
    }
    else if(validation === 'title') {
      document.getElementById('task-name').classList.add('border-2', 'border-red-500');
    }
    else if(validation === 'description') {
      document.getElementById('task-description').classList.add('border-2', 'border-red-500');
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
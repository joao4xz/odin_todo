import { handleMainPageButtons } from "../handlers/main";
import { createOverlay, removeOverlay } from "./nav";
import { handleWarningButtons } from "../handlers/main";
import { getProjectTaskArray, getTodayTaskArray, getUpcomingTaskArray } from "../data/projects";
import { parse, format, isToday, parseISO, isFuture } from 'date-fns';
import { printProjects } from "../data/projects";

export function createMainPage(headerTextContent, headerLineColor) {
  cleanMainPage();

  const mainContainer = document.getElementById('main-container');

  const mainHeader = document.createElement('div');
  mainHeader.classList.add('flex', 'justify-between', 'gap-10', 'border-b', `border-[${headerLineColor}]`, 'pb-3');

  const headerText = document.createElement('div');
  headerText.classList.add('text-4xl');
  headerText.id = 'tab-name';
  headerText.textContent = headerTextContent;

  const headerButtons = document.createElement('div');
  headerButtons.classList.add('flex', 'gap-2', 'text-lg', 'text-gray-600', 'items-end');
  headerButtons.id = 'tab-options';

  const sortContainer = document.createElement('div');
  sortContainer.classList.add('relative');

  const sortButton = document.createElement('button');
  sortButton.classList.add('flex', 'gap-1', 'items-center', 'hover:bg-slate-300', 'rounded-md', 'px-1');
  sortButton.id = 'sort';

  const sortSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  sortSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  sortSVG.classList.add('w-6');
  sortSVG.setAttribute('viewBox', '0 0 24 24');

  const sortSVGtitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  sortSVGtitle.textContent = 'Sort';

  const sortSVGpath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  sortSVGpath.setAttribute('d', 'M18 21L14 17H17V7H14L18 3L22 7H19V17H22M2 19V17H12V19M2 13V11H9V13M2 7V5H6V7H2Z');

  sortSVG.appendChild(sortSVGtitle);
  sortSVG.appendChild(sortSVGpath);

  const sortText = document.createElement('p');
  sortText.textContent = 'Sort';

  sortButton.appendChild(sortSVG);
  sortButton.appendChild(sortText);

  const sortDropdown = document.createElement('div');
  sortDropdown.setAttribute('class', 'absolute top-full bg-slate-50 flex flex-col items-center rounded-md shadow-xl hidden sort-dropdown');

  const defaultOption = document.createElement('button');
  defaultOption.setAttribute('type', 'button');
  defaultOption.setAttribute('class', 'bg-zinc-300 px-3 w-full rounded-t-md');
  defaultOption.textContent = 'Default';
  defaultOption.id = 'default';

  const priorityOption = document.createElement('button');
  priorityOption.setAttribute('type', 'button');
  priorityOption.setAttribute('class', 'hover:bg-slate-100 px-3 w-full');
  priorityOption.textContent = 'Priority';
  priorityOption.id = 'priority';

  const dateOption = document.createElement('button');
  dateOption.setAttribute('type', 'button');
  dateOption.setAttribute('class', 'hover:bg-slate-100 px-3 w-full');
  dateOption.textContent = 'Date';
  dateOption.id = 'date';

  const statusOption = document.createElement('button');
  statusOption.setAttribute('type', 'button');
  statusOption.setAttribute('class', 'hover:bg-slate-100 px-3 w-full rounded-b-md');
  statusOption.textContent = 'Status';
  statusOption.id = 'status';

  sortDropdown.appendChild(defaultOption);
  sortDropdown.appendChild(priorityOption);
  sortDropdown.appendChild(dateOption);
  sortDropdown.appendChild(statusOption);

  sortContainer.appendChild(sortButton)
  sortContainer.appendChild(sortDropdown);

  headerButtons.appendChild(sortContainer);

  if(headerTextContent !== 'Inbox' &&
     headerTextContent !== 'Today' &&
     headerTextContent !== 'Upcoming'){
       const editButton = document.createElement('button');
       editButton.classList.add('flex', 'gap-1', 'items-center', 'hover:bg-slate-300', 'rounded-md', 'px-1');
       editButton.id = 'edit';
     
       const editSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
       editSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
       editSVG.classList.add('w-6');
       editSVG.setAttribute('viewBox', '0 0 24 24');
     
       const editSVGtitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
       editSVGtitle.textContent = 'Edit';
     
       const editSVGpath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
       editSVGpath.setAttribute('d', 'M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z');
     
       editSVG.appendChild(editSVGtitle);
       editSVG.appendChild(editSVGpath);
     
       const editText = document.createElement('p');
       editText.textContent = 'Edit';
     
       editButton.appendChild(editSVG);
       editButton.appendChild(editText);

       const deleteButton = document.createElement('button');
       deleteButton.classList.add('flex', 'items-center', 'hover:bg-slate-300', 'rounded-md', 'px-1');
       deleteButton.id = 'delete';
     
       const deleteSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
       deleteSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
       deleteSVG.classList.add('w-6');
       deleteSVG.setAttribute('viewBox', '0 0 24 24');
     
       const deleteSVGtitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
       deleteSVGtitle.textContent = 'Delete';
     
       const deleteSVGpath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
       deleteSVGpath.setAttribute('d', 'M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z');
     
       deleteSVG.appendChild(deleteSVGtitle);
       deleteSVG.appendChild(deleteSVGpath);

       const deleteText = document.createElement('p');
       deleteText.textContent = 'Delete';
     
       deleteButton.appendChild(deleteSVG);
       deleteButton.appendChild(deleteText);

       headerButtons.appendChild(editButton);
       headerButtons.append(deleteButton);
  }

  mainHeader.appendChild(headerText);
  mainHeader.appendChild(headerButtons);

  const tasks = document.createElement('div');
  tasks.classList.add('flex', 'flex-col', 'mb-1');
  tasks.id = 'tasks';

  const addTaskButton = document.createElement('button');
  addTaskButton.classList.add('flex', 'items-center', 'gap-2', 'hover:bg-slate-300', 'rounded-lg', 'px-3', 'py-1');
  addTaskButton.id = 'add-task';

  if(headerTextContent !== 'Today' &&
     headerTextContent !== 'Upcoming') {
    const addTaskButtonSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    addTaskButtonSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    addTaskButtonSVG.classList.add('w-4', 'fill-zinc-600');
    addTaskButtonSVG.setAttribute('viewBox', '0 0 512 512');
  
    const addTaskButtonSVGtitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    addTaskButtonSVGtitle.textContent = 'Add task';
  
    const addTaskButtonSVGpath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    addTaskButtonSVGpath.setAttribute('d', 'M492 236H276V20c0-11.046-8.954-20-20-20s-20 8.954-20 20v216H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h216v216c0 11.046 8.954 20 20 20s20-8.954 20-20V276h216c11.046 0 20-8.954 20-20s-8.954-20-20-20z');
  
    addTaskButtonSVG.appendChild(addTaskButtonSVGtitle);
    addTaskButtonSVG.appendChild(addTaskButtonSVGpath);
  
    const addTaskButtonText = document.createElement('p');
    addTaskButtonText.textContent = 'Add task';
  
    addTaskButton.appendChild(addTaskButtonSVG);
    addTaskButton.appendChild(addTaskButtonText);
  }


  mainContainer.appendChild(mainHeader);
  mainContainer.appendChild(tasks);
  mainContainer.appendChild(addTaskButton);

  handleMainPageButtons(headerTextContent);

  if(headerTextContent !== 'Today' && headerTextContent !== 'Upcoming') {
    renderTasks();
  }
}

export function cleanMainPage() {
  const mainContainer = document.getElementById('main-container');
  mainContainer.textContent = '';
}

export function cleanTasks() {
  const tasks = document.getElementById('tasks');
  tasks.textContent = '';
}

export function createDeleteWarning(title) {
  const overlay = createOverlay();

  const container = document.createElement('form');
  container.classList.add('flex', 'flex-col', 'bg-slate-300', 'text-zinc-700', 'text-xl', 'px-10', 'pb-8', 'pt-6', 'gap-3','rounded-xl', 'shadow-xl');

  const header = document.createElement('h2');
  header.textContent = 'Delete?';
  header.classList.add('font-bold', 'text-2xl')

  const p = document.createElement('p');
  p.textContent = `Are you sure you want to delete `;

  const span = document.createElement('span');
  span.classList.add('font-semibold');
  span.textContent = title;

  const questionMark = document.createTextNode('?');

  p.appendChild(span);
  p.appendChild(questionMark);

  const buttons = document.createElement('div');
  buttons.classList.add('flex', 'gap-3', 'justify-end', 'mt-3');
  
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.classList.add('bg-zinc-700', 'text-slate-200', 'px-3', 'rounded-md');
  cancelButton.setAttribute('type', 'button');
  cancelButton.id = 'cancel-button';

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('bg-red-700', 'text-slate-200', 'px-3', 'rounded-md');
  deleteButton.setAttribute('type', 'button');
  deleteButton.id = 'delete-button'

  buttons.appendChild(cancelButton);
  buttons.appendChild(deleteButton);

  container.appendChild(header);
  container.appendChild(p);
  container.appendChild(buttons);

  overlay.appendChild(container);
}

export function deleteCurrentProject() {
  const tabName = document.getElementById('tab-name');
  createDeleteWarning(tabName.textContent);
  handleWarningButtons();
}

export function createAddTaskHUD(header) {
  const overlay = createOverlay();

  const container = document.createElement('form');
  container.classList.add('flex', 'flex-col', 'bg-slate-300', 'text-zinc-700', 'text-xl', 'px-10', 'pb-8', 'pt-6', 'gap-4','rounded-xl', 'shadow-xl');

  const hudHeader = document.createElement('h2');
  hudHeader.textContent = header;
  hudHeader.classList.add('text-2xl', 'font-bold', 'self-center');

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('flex', 'flex-col', 'gap-1');
  
  const taskTitle = document.createElement('label');
  taskTitle.textContent = 'Task name';
  taskTitle.setAttribute('for', 'task-name');
  
  const taskTitleInput = document.createElement('input');
  taskTitleInput.setAttribute('type', 'text');
  taskTitleInput.setAttribute('id', 'task-name');
  taskTitleInput.setAttribute('name', 'task-name');
  
  titleContainer.appendChild(taskTitle);
  titleContainer.appendChild(taskTitleInput);

  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('flex', 'flex-col', 'gap-1');

  const taskDescription = document.createElement('label');
  taskDescription.textContent = 'Description';
  taskDescription.setAttribute('for', 'task-description');

  const taskDescriptionInput = document.createElement('input');
  taskDescriptionInput.setAttribute('type', 'text');
  taskDescriptionInput.setAttribute('id', 'task-description');
  taskDescriptionInput.setAttribute('name', 'task-description');

  descriptionContainer.appendChild(taskDescription);
  descriptionContainer.appendChild(taskDescriptionInput);

  const dateContainer = document.createElement('div');
  dateContainer.classList.add('flex', 'flex-col', 'gap-1');

  const taskDate = document.createElement('label');
  taskDate.textContent = 'Due date';
  taskDate.setAttribute('for', 'task-date');

  const taskDateInput = document.createElement('input');
  taskDateInput.setAttribute('type', 'date');
  taskDateInput.setAttribute('id', 'task-date');
  taskDateInput.setAttribute('name', 'task-date');

  dateContainer.appendChild(taskDate);
  dateContainer.appendChild(taskDateInput);

  const priorityContainer = document.createElement('div');
  priorityContainer.classList.add('flex', 'flex-col', 'gap-2');

  const taskPriority = document.createElement('label');
  taskPriority.textContent = 'Task Priority';
  taskPriority.setAttribute('for', 'task-priority');

  const priorityButtons = document.createElement('div');
  priorityButtons.classList.add('flex', 'justify-around');
  priorityButtons.id = 'priority-buttons';

  const redPriority = document.createElement('button');
  redPriority.setAttribute('type', 'button');
  redPriority.setAttribute('id', 'red-priority');
  redPriority.classList.add('w-5', 'h-5', 'rounded-full', 'border-2', 'border-red-600', 'ease-linear', 'duration-200', 'bg-white');

  const yellowPriority = document.createElement('button');
  yellowPriority.setAttribute('type', 'button');
  yellowPriority.setAttribute('id', 'yellow-priority');
  yellowPriority.classList.add('w-5', 'h-5', 'rounded-full', 'border-2', 'border-yellow-600', 'ease-linear', 'duration-200', 'bg-white');

  const bluePriority = document.createElement('button');
  bluePriority.setAttribute('type', 'button');
  bluePriority.setAttribute('id', 'blue-priority');
  bluePriority.classList.add('w-5', 'h-5', 'rounded-full', 'border-2', 'border-blue-600', 'ease-linear', 'duration-200', 'bg-white');

  const grayPriority = document.createElement('button');
  grayPriority.setAttribute('type', 'button');
  grayPriority.setAttribute('id', 'gray-priority');
  grayPriority.classList.add('w-5', 'h-5', 'rounded-full', 'border-2', 'border-gray-600', 'ease-linear', 'duration-200', 'bg-gray-500', 'selected');

  priorityButtons.appendChild(redPriority);
  priorityButtons.appendChild(yellowPriority);
  priorityButtons.appendChild(bluePriority);
  priorityButtons.appendChild(grayPriority);

  priorityContainer.appendChild(taskPriority);
  priorityContainer.appendChild(priorityButtons);

  const buttons = document.createElement('div');
  buttons.classList.add('flex', 'gap-5', 'justify-center', 'mt-3');

  const cancelButton = document.createElement('button');
  cancelButton.id = 'cancel-button';
  cancelButton.classList.add('bg-slate-50', 'flex-1', 'rounded', 'hover:bg-slate-100');
  cancelButton.setAttribute('type', 'button');
  cancelButton.textContent = 'Cancel';

  const addButton = document.createElement('button');
  addButton.id = 'add-button';
  addButton.classList.add('bg-slate-50', 'flex-1', 'rounded', 'hover:bg-slate-100');
  addButton.setAttribute('type', 'button');
  addButton.textContent = 'Add';

  buttons.appendChild(cancelButton);
  buttons.appendChild(addButton);

  container.appendChild(hudHeader);
  container.appendChild(titleContainer);
  container.appendChild(descriptionContainer);
  container.appendChild(dateContainer);
  container.appendChild(priorityContainer);
  container.appendChild(buttons);

  overlay.appendChild(container);
}

export function createTask(title, description, date, priority, isDone) {
  const tasks = document.getElementById('tasks');

  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task', 'flex', 'border-b', 'border-slate-300', 'pb-3', 'first-of-type:mt-4', 'mt-1', 'justify-between');

  const leftDiv = document.createElement('div');
  leftDiv.classList.add('left', 'flex');

  const finishTaskButtonDiv = document.createElement('div');
  finishTaskButtonDiv.classList.add('pt-1');

  const finishTaskButton = document.createElement('button');
  finishTaskButton.setAttribute('type', 'button');
  finishTaskButton.classList.add('priority', 'w-5', 'h-5', 'rounded-full', 'border-2', `border-${priority}-600`, 'ease-linear', 'duration-200');

  finishTaskButtonDiv.appendChild(finishTaskButton);

  const taskTextDiv = document.createElement('div');
  taskTextDiv.classList.add('ml-2');

  const taskTitle = document.createElement('p');
  taskTitle.classList.add('text-xl', 'title');
  taskTitle.textContent = title;

  const taskDescription = document.createElement('p');
  taskDescription.classList.add('text-xs', 'mb-1', 'description');
  taskDescription.textContent = description;

  const taskDateDiv = document.createElement('div');
  taskDateDiv.classList.add('flex', 'items-center');

  if(date) {
    const taskDateIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    taskDateIcon.setAttribute('class', 'w-4 h-4');
    taskDateIcon.setAttribute('viewBox', '0 0 24 24');
    taskDateIcon.innerHTML = '<title>calendar</title><path d="M7,2H8C8.55,2 9,2.45 9,3V4H14V3C14,2.45 14.45,2 15,2H16C16.55,2 17,2.45 17,3V4C18.66,4 20,5.34 20,7V18C20,19.66 18.66,21 17,21H6C4.34,21 3,19.66 3,18V7C3,5.34 4.34,4 6,4V3C6,2.45 6.45,2 7,2M15,4H16V3H15V4M8,4V3H7V4H8M6,5C4.9,5 4,5.9 4,7V8H19V7C19,5.9 18.1,5 17,5H6M4,18C4,19.1 4.9,20 6,20H17C18.1,20 19,19.1 19,18V9H4V18M12,13H17V18H12V13M13,14V17H16V14H13Z" />';

    const taskDate = document.createElement('p');
    taskDate.classList.add('text-xs', 'date');
    const dateObject = parse(date, 'yyyy-MM-dd', new Date());
    taskDate.textContent = format(dateObject, 'MMM d');;

    taskDateDiv.appendChild(taskDateIcon);
    taskDateDiv.appendChild(taskDate);

    if(isDone === true) {
      taskDate.classList.toggle('line-through');
      taskDate.classList.toggle('text-zinc-400');
      taskDateIcon.classList.toggle('fill-zinc-400');
    }
  }

  if(isDone === true) {
    taskTitle.classList.toggle('line-through');
    taskDescription.classList.toggle('line-through');
    taskTitle.classList.toggle('text-zinc-400');
    taskDescription.classList.toggle('text-zinc-400');
    finishTaskButton.classList.toggle(`bg-${priority}-500`);
  }

  taskTextDiv.appendChild(taskTitle);
  taskTextDiv.appendChild(taskDescription);
  taskTextDiv.appendChild(taskDateDiv);

  leftDiv.appendChild(finishTaskButtonDiv);
  leftDiv.appendChild(taskTextDiv);

  const rightDiv = document.createElement('div');
  rightDiv.classList.add('right');

  if(document.getElementById('tab-name').textContent !== 'Today' &&
     document.getElementById('tab-name').textContent !== 'Upcoming'){
    const taskButtonsDiv = document.createElement('div');
    taskButtonsDiv.classList.add('task-buttons', 'flex', 'gap-1');

    const editButton = document.createElement('button');
    editButton.classList.add('hover:bg-slate-300', 'rounded');
    editButton.innerHTML = '<svg class="w-6 hover:fill-slate-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Edit</title><path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" /></svg>';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('hover:bg-slate-300', 'rounded');
    deleteButton.innerHTML = '<svg class="w-6 hover:fill-slate-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Delete</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"></path></svg>';

    taskButtonsDiv.appendChild(editButton);
    taskButtonsDiv.appendChild(deleteButton);

    rightDiv.appendChild(taskButtonsDiv);
  }

  taskDiv.appendChild(leftDiv);
  taskDiv.appendChild(rightDiv);

  tasks.appendChild(taskDiv);
}

function renderTasks() {
  const tasks = getProjectTaskArray(document.getElementById('tab-name').textContent);

  for (let i = 0; i < tasks.length; i++) {
    createTask(tasks[i].title, tasks[i].description, tasks[i].date, tasks[i].priorityColor, tasks[i].isDone);
  }
}

export function renderTodayTasks() {
  const tasks = getTodayTaskArray();
  const todayTasks = getProjectTaskArray('Today');

  let j = 0;
  for (let i = 0; i < tasks.length; i++) {
    if(isToday(parseISO(tasks[i].date))){
      todayTasks[j] = tasks[i];
      createTask(todayTasks[j].title, todayTasks[j].description, todayTasks[j].date, todayTasks[j].priorityColor, todayTasks[j].isDone);
      j++;
    }
  }
}

export function renderUpcomingTasks() {
  const tasks = getUpcomingTaskArray();
  const upcomingTasks = getProjectTaskArray('Upcoming');

  let j = 0;
  for (let i = 0; i < tasks.length; i++) {
    if(isFuture(parseISO(tasks[i].date))){
      upcomingTasks[j] = tasks[i];
      createTask(upcomingTasks[j].title, upcomingTasks[j].description, upcomingTasks[j].date, upcomingTasks[j].priorityColor, upcomingTasks[j].isDone);
      j++;
    }
  }
}

export function createEditTaskHUD(header, targetTask) {
  console.log(`Title: ${targetTask.querySelector('.title').textContent}`);
  console.log(`Description: ${targetTask.querySelector('.description').textContent}`);
  console.log(`Date: ${targetTask.querySelector('.date').textContent}`);
  createAddTaskHUD(header);

  document.getElementById('task-name').value = targetTask.querySelector('.title').textContent;
  document.getElementById('task-description').value = targetTask.querySelector('.description').textContent;

  const dateInput = document.getElementById('task-date');

  const dateObject = parse(targetTask.querySelector('.date').textContent, 'MMM d', new Date());

  dateInput.value = format(dateObject, 'yyyy-MM-dd');

  const priority = targetTask.querySelector('.priority');
  const priorityButtons = document.getElementById('priority-buttons').querySelectorAll('button');
  for (const button of priorityButtons) {
    button.classList.remove('bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-gray-500', 'selected');
    button.classList.add('bg-white');
    if(priority.classList.contains('border-red-600') && button.classList.contains('border-red-600')){
      button.classList.toggle('bg-red-500');
      button.classList.toggle('bg-white');
      button.classList.toggle('selected');
    }
    else if(priority.classList.contains('border-yellow-600') && button.classList.contains('border-yellow-600')){
      button.classList.toggle('bg-yellow-500');
      button.classList.toggle('bg-white');
      button.classList.toggle('selected');
    }
    else if(priority.classList.contains('border-blue-600') && button.classList.contains('border-blue-600')){
      button.classList.toggle('bg-blue-500');
      button.classList.toggle('bg-white');
      button.classList.toggle('selected');
    }
    else if(priority.classList.contains('border-gray-600') && button.classList.contains('border-gray-600')){
      button.classList.toggle('bg-gray-500');
      button.classList.toggle('bg-white');
      button.classList.toggle('selected');
    }
  }

  const saveButton = document.getElementById('add-button');
  saveButton.textContent = 'Save'; 
}

export function saveTask(targetTask) {
  const project = getProjectTaskArray(document.getElementById('tab-name').textContent);

  for (const task of project) {
    if(targetTask.querySelector('.title').textContent === task.title) {
      task.title = document.getElementById('task-name').value;
      task.description = document.getElementById('task-description').value;      
      task.date = document.getElementById('task-date').value;
      const priority = document.querySelector('.selected');
      task.priority = priority.id.slice(0, priority.id.indexOf('-priority'));

      targetTask.querySelector('.title').textContent = task.title;
      targetTask.querySelector('.description').textContent = task.description;

      const dateObject = parse(task.date, 'yyyy-MM-dd', new Date());
      targetTask.querySelector('.date').textContent = format(dateObject, 'MMM d');;

      targetTask.querySelector('.priority').classList.remove('border-red-600', 'border-yellow-600', 'border-blue-600', 'border-gray-600', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-gray-500');
      targetTask.querySelector('.priority').classList.add(`border-${task.priority}-600`);
      if(task.isDone) {
        targetTask.querySelector('.priority').classList.add(`bg-${task.priority}-500`);
      }
      printProjects();
      break;
    }
  };
  removeOverlay();
}

export function createDeleteTaskHUD(targetTask) {
  createDeleteWarning(targetTask.querySelector('.title').textContent);
}
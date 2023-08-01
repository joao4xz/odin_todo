import { handleMainPageButtons } from "../handlers/main";
import { createOverlay } from "./nav";
import { handleWarningButtons } from "../handlers/main";

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

  headerButtons.appendChild(sortButton);

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

  mainContainer.appendChild(mainHeader);
  mainContainer.appendChild(tasks);
  mainContainer.appendChild(addTaskButton);

  handleMainPageButtons(headerTextContent);
}

export function cleanMainPage() {
  const mainContainer = document.getElementById('main-container');
  mainContainer.textContent = '';
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

  handleWarningButtons();
}

export function deleteCurrentProject() {
  const tabName = document.getElementById('tab-name');
  createDeleteWarning(tabName.textContent);
}
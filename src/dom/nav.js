import { editProject, pushProject } from "../data/projects";
import { handleOverlay } from "../handlers/nav";

export function createOverlay() {
  const overlay = document.createElement('div');

  overlay.id = 'overlay';
  overlay.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-black', 'bg-opacity-50', 'grid', 'place-items-center', 'z-20');

  document.body.appendChild(overlay);
  handleOverlay();

  return overlay;
}

export function removeOverlay() {
  const overlay = document.getElementById('overlay');

  if(overlay) {
    overlay.remove();
  }
}

function createCircleSVG(color) {
  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgElement.setAttribute('width', '24');
  svgElement.setAttribute('height', '24');
  svgElement.setAttribute('viewBox', '0 0 24 24');

  // Create the circle element inside the SVG
  const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circleElement.setAttribute('cx', '12');
  circleElement.setAttribute('cy', '12');
  circleElement.setAttribute('r', '5');
  circleElement.setAttribute('fill', `${color}`);
  circleElement.setAttribute('stroke-width', '2');

  // Append the circle element to the SVG
  svgElement.appendChild(circleElement);

  return svgElement;
}

function createDropdownColor(colors, colorDropdown) {
  colors.forEach(color => {
    const button = document.createElement('button');
    button.classList.add('color', 'w-full');
    button.setAttribute('type', 'button');
  
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex', 'items-center', 'gap-1', 'hover:bg-slate-200');

    const svgColor = createCircleSVG(color);
    const textColor = document.createElement('p');
    textColor.textContent = color;

    buttonContainer.appendChild(svgColor);
    buttonContainer.append(textColor);
    
    button.appendChild(buttonContainer);
    colorDropdown.appendChild(button);
  });
}

export function createAddProjectHUD(header) {
  const form = document.createElement('form');
  form.classList.add('flex', 'flex-col', 'bg-slate-300', 'text-zinc-700', 'text-xl', 'px-8', 'pb-6', 'pt-4', 'rounded-xl', 'shadow-xl');

  const hudHeader = document.createElement('h2');
  hudHeader.textContent = header
  hudHeader.classList.add('text-2xl', 'mb-2', 'font-bold', 'self-center');

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Name';
  nameLabel.setAttribute('for', 'name');

  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('id', 'name');
  nameInput.setAttribute('name', 'name');

  const colorLabel = document.createElement('label');
  colorLabel.textContent = 'Color';
  colorLabel.setAttribute('for', 'color');

  const colorSelectorBox = document.createElement('div');
  colorSelectorBox.classList.add('relative');

  const colorSelector = document.createElement('button');
  colorSelector.id = 'color-selector'
  colorSelector.classList.add('bg-slate-50', 'w-full', 'flex', 'justify-between', 'items-center');
  colorSelector.setAttribute('type', 'button');

  const colorSelectorInnerBox = document.createElement('div');
  colorSelectorInnerBox.classList.add('flex', 'items-center', 'gap-1');

  const currentSvgColor = createCircleSVG('Red');
  currentSvgColor.id = 'current-color-svg';
  const currentTextColor = document.createElement('p');
  currentTextColor.textContent = 'Red';
  currentTextColor.id = 'current-color-text';

  colorSelectorInnerBox.appendChild(currentSvgColor);
  colorSelectorInnerBox.appendChild(currentTextColor);

  const downArrowSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  downArrowSVG.setAttribute('class', 'w-7');
  downArrowSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  downArrowSVG.setAttribute('viewBox', '0 0 24 24');

  // Create the path element inside the SVG
  const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathElement.setAttribute(
    'd',
    'M5.84,9.59L11.5,15.25L17.16,9.59L16.45,8.89L11.5,13.84L6.55,8.89L5.84,9.59Z'
  );

  downArrowSVG.appendChild(pathElement);

  const colorDropdown = document.createElement('div');
  colorDropdown.id = 'colors'
  colorDropdown.classList.add('absolute', 'hidden', 'w-full', 'border', 'border-solid', 'border-slate-500', 'bg-slate-50', 'max-h-60', 'overflow-y-scroll');

  createDropdownColor([
    'Red',
    'Orange',
    'Green',
    'Lime',
    'Yellow',
    'Blue',
    'Cyan',
    'Gray',
    'Fuchsia',
    'Maroon',
    'Black',
    'Purple',
    'Pink',
    'Tomato',
    'Lavender'
  ], colorDropdown)

  const buttonArea = document.createElement('div');
  buttonArea.classList.add('flex', 'gap-4');

  const cancelButton = document.createElement('button');
  cancelButton.id = 'cancel-button';
  cancelButton.classList.add('bg-slate-50', 'mt-5', 'flex-1', 'rounded', 'hover:bg-slate-100');
  cancelButton.setAttribute('type', 'button');
  cancelButton.textContent = 'Cancel';

  const addButton = document.createElement('button');
  addButton.id = 'add-button';
  addButton.classList.add('bg-slate-50', 'mt-5', 'flex-1', 'rounded', 'hover:bg-slate-100');
  addButton.setAttribute('type', 'button');
  addButton.textContent = 'Add';

  buttonArea.appendChild(cancelButton);
  buttonArea.appendChild(addButton);

  colorSelector.appendChild(colorSelectorInnerBox);
  colorSelector.appendChild(downArrowSVG);

  colorSelectorBox.appendChild(colorSelector);
  colorSelectorBox.appendChild(colorDropdown);
  colorSelectorBox.appendChild(buttonArea);

  form.appendChild(hudHeader);
  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(colorLabel);
  form.appendChild(colorSelectorBox);

  const overlay = createOverlay();
  overlay.appendChild(form);
}

export function addProject(title, color) {
  const project = document.getElementById('projects');

  const projectContainer = document.createElement('div');
  projectContainer.classList.add('project', 'flex', 'items-center', 'justify-between', 'hover:bg-slate-200', 'rounded-lg', 'group');

  const projectButton = document.createElement('button');
  projectButton.classList.add('flex', 'items-center', 'gap-2', 'flex-1', 'p-2');
  projectButton.setAttribute('type', 'button');

  const svgCircle = createCircleSVG(color);
  const projectName = document.createElement('p');
  projectName.textContent = title;

  projectButton.appendChild(svgCircle);
  projectButton.appendChild(projectName);

  const editButton = document.createElement('button');
  editButton.classList.add('w-10', 'p-2');
  editButton.setAttribute('type', 'button');

  const editSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  editSvg.setAttribute('class', 'fill-zinc-600 hover:fill-zinc-500 hidden group-hover:inline');
  editSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  editSvg.setAttribute('viewBox', '0 0 24 24');

  const svgTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  svgTitle.textContent = 'Edit';

  const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svgPath.setAttribute('d', 'M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z');

  editSvg.appendChild(svgTitle);
  editSvg.appendChild(svgPath);

  editButton.appendChild(editSvg);

  projectContainer.appendChild(projectButton);
  projectContainer.appendChild(editButton);

  project.appendChild(projectContainer);

  pushProject(title, color, projectContainer);
  
  removeOverlay();
}

export function createEditProjectHUD(header, targetProject) {
  createAddProjectHUD(header);
  
  const clickedProject = targetProject.querySelector('p').textContent;
  const clickedColor = targetProject.querySelector('circle').getAttribute('fill');

  const nameInput = document.getElementById('name');
  nameInput.value = clickedProject;

  const currentTextColor = document.getElementById('current-color-text');
  const currentSvgColor = document.getElementById('current-color-svg');

  currentTextColor.textContent = clickedColor.charAt(0).toUpperCase() + clickedColor.slice(1);
  currentSvgColor.querySelector('circle').setAttribute('fill', clickedColor);

  const saveButton = document.getElementById('add-button');
  saveButton.textContent = 'Save'; 
}

export function saveProject(targetProject) {
  const newProjectName = document.getElementById('name').value;
  const newColor = document.getElementById('current-color-text').textContent;

  editProject(targetProject.querySelector('p').textContent, newProjectName, newColor);
  targetProject.querySelector('p').textContent = newProjectName;
  targetProject.querySelector('circle').setAttribute('fill', newColor);

  removeOverlay();
}
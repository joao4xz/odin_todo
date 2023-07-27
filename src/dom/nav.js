import { handleAddProjectHUD } from "../handlers/nav";
import { handleOverlay } from "../handlers/nav";

function createOverlay() {
  const overlay = document.createElement('div');

  overlay.id = 'overlay';
  overlay.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-black', 'bg-opacity-50', 'grid', 'place-items-center');

  document.body.appendChild(overlay);
  handleOverlay();

  return overlay;
}

function createCircleSVG(color, parentDiv) {
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

  // Create the text node
  const textNode = document.createTextNode(`${color}`);

  parentDiv.appendChild(svgElement);
  parentDiv.appendChild(textNode);
}

function createDropdownColor(colors, colorDropdown) {
  colors.forEach(color => {
    const button = document.createElement('button');
    button.classList.add('w-full');
    button.setAttribute('type', 'button');
  
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex', 'items-center', 'gap-1', 'hover:bg-slate-200');
  
    createCircleSVG(color, buttonContainer);
  
    button.appendChild(buttonContainer);
    colorDropdown.appendChild(button);
  });
}

export function createAddProjectHUD() {
  const form = document.createElement('form');
  form.classList.add('flex', 'flex-col', 'bg-slate-300', 'text-zinc-700', 'text-xl', 'p-10', 'rounded-xl', 'shadow-xl');

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

  createCircleSVG('Red', colorSelectorInnerBox);

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
  colorDropdown.classList.add('color', 'absolute', 'hidden', 'w-full', 'border', 'border-solid', 'border-slate-500', 'bg-slate-50', 'max-h-60', 'overflow-y-scroll');

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
  cancelButton.classList.add('bg-slate-50', 'mt-5', 'flex-1', 'rounded');
  cancelButton.setAttribute('type', 'button');
  cancelButton.textContent = 'Cancel';

  const addButton = document.createElement('button');
  addButton.id = 'add-button';
  addButton.classList.add('bg-slate-50', 'mt-5', 'flex-1', 'rounded');
  addButton.setAttribute('type', 'button');
  addButton.textContent = 'Add';

  buttonArea.appendChild(cancelButton);
  buttonArea.appendChild(addButton);

  colorSelector.appendChild(colorSelectorInnerBox);
  colorSelector.appendChild(downArrowSVG);

  colorSelectorBox.appendChild(colorSelector);
  colorSelectorBox.appendChild(colorDropdown);
  colorSelectorBox.appendChild(buttonArea);

  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(colorLabel);
  form.appendChild(colorSelectorBox);

  const overlay = createOverlay();
  overlay.appendChild(form);

  handleAddProjectHUD();
}
import { getProject } from "../data/projects";
import { createMainPage } from "../dom/main";
import { deleteCurrentProject } from "../dom/main";
import { createEditProjectHUD } from "../dom/nav";
import { handleEditProjectHUD } from "../handlers/nav";

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

export function handleMainPageButtons(headerTextContent) {
  handleMainSortButton();
  if(headerTextContent !== 'Inbox' && headerTextContent !== 'Today' && headerTextContent !== 'Upcoming'){
    handleMainEditButton();
    handleMainDeleteButton();
  }
}

export function handleMain() {
  createMainPage('Inbox', 'blue');
}
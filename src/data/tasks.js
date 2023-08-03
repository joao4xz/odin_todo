import { getProjectTaskArray } from "./projects";

export function pushTask(title, description, date, priorityColor) {
  const obj = {};
  obj.title = title;
  obj.description = description;
  obj.date = date;
  obj.priorityColor = priorityColor;

  getProjectTaskArray(document.getElementById('tab-name').textContent).push(obj);
}

export function validateTask(title) {
  const regex = /^[a-zA-Z0-9\s,.?!-_]{1,}$/;
  return regex.test(title) && isTaskUnique(title);
}

function isTaskUnique(title) {
  const project = getProjectTaskArray(document.getElementById('tab-name').textContent);
  for (const task of project) {
    if(title.toLowerCase() === task.title.toLowerCase()) {
      return false;
    }
  }
  return true;
}

export function deleteTask(targetTask) {
  const tasks = getProjectTaskArray(document.getElementById('tab-name').textContent);

  for (let i = 0; i < tasks.length; i++) {
    if(targetTask.querySelector('.title').textContent === tasks[i].title) {
      tasks.splice(i, 1);
      break;
    }
  };
}
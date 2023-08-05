import { getProjectTaskArray } from "./projects";

export function pushTask(title, description, date, priorityColor) {
  const obj = {};
  obj.title = title;
  obj.description = description;
  obj.date = date;
  obj.priorityColor = priorityColor;
  obj.isDone = false;

  getProjectTaskArray(document.getElementById('tab-name').textContent).push(obj);
}

export function validateAddTask(title, description) {
  const titleRegex = /^[a-zA-Z0-9\s,.?!_-]{1,}$/;
  const descriptionRegex = /^[a-zA-Z0-9\s,.?!_-]*$/;

  const isTitleValid = titleRegex.test(title);
  const isDescriptionValid = descriptionRegex.test(description);
  console.log(description);
  console.log(isDescriptionValid);
  const isTitleUnique = isTaskUnique(title);

  if(isTitleValid && isDescriptionValid && isTitleUnique) {
    console.log('true');
    return true;
  }
  else {
    if (!isTitleValid) {
      return 'title';
    } else if (!isDescriptionValid) {
      return 'description';
    } else {
      return 'title';
    }
  }
}

function isTaskUnique(title, oldTitle) {
  const project = getProjectTaskArray(document.getElementById('tab-name').textContent);
  for (const task of project) {
    if(title.toLowerCase() === task.title.toLowerCase()) {
      if(oldTitle && oldTitle.toLowerCase() === task.title.toLowerCase()) {
        continue;
      }
      return false;
    }
  }
  return true;
}

export function validateEditTask(title, description, oldTitle) {
  const regex = /^[a-zA-Z0-9\s,.?!-_]{1,}$/;
  return regex.test(title) && regex.test(description) && isTaskUnique(title, oldTitle);
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
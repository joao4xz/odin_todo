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
  return regex.test(title);
}
export const projects = [
  {
    "title": "inbox",
    "color": "blue",
    "node": document.getElementById('inbox-button'),
    "tasks": [
    ]
  },
  {
    "title": "today",
    "color": "green",
    "node": document.getElementById('today-button'),
    "tasks": [
    ]
  },
  {
    "title": "upcoming",
    "color": "purple",
    "node": document.getElementById('upcoming-button'),
    "tasks": [
    ]
  },
]

export function pushProject(title, color, node) {
  const obj = {};
  obj.title = title;
  obj.color = color;
  obj.node = node;
  obj.tasks = [];

  projects.push(obj);
  
  printProjects();
}

export function editProject(oldTitle, title, color) {
  projects.forEach(project => {
    if(oldTitle === project.title) {
      project.title = title;
      project.color = color;
      
      printProjects();
    }
  });
}

export function getProject(title) {
  for (const project of projects) {
    if (project.title.toLowerCase() === title.toLowerCase()) {
      return project.node;
    }
  }
}

export function getProjectTaskArray(title) {
  for(let i = 0; i < projects.length; i++){
    if(projects[i].title.toLowerCase() === title.toLowerCase()){
      return projects[i].tasks;
    }
  }
}

export function deleteProject(title) {
  for (let i = 0; i < projects.length; i++) {
    if(title === projects[i].title) {
      projects.splice(i, 1);
      break;
    }
  }
}

export function validateAddProject(title) {
  const titleRegex = /^[A-Za-z0-9 _-]{3,21}$/;
  
  if(titleRegex.test(title) && isTitleUnique(title)) {
    return true
  }
  return false
}

export function validateEditProject(title, oldTitle) {
  const titleRegex = /^[A-Za-z0-9 _-]{3,21}$/;
  
  if(titleRegex.test(title) && isTitleUnique(title, oldTitle)) {
    return true
  }
  return false
}

function isTitleUnique(title, oldTitle) {
  for (const project of projects) {
    if(title.toLowerCase() === project.title.toLowerCase()) {
      if(oldTitle && oldTitle.toLowerCase() === project.title.toLowerCase()) {
        continue;
      }
      return false;
    }
  }
  return true;
}

export function printProjects() {
  console.clear();
  projects.forEach(project => {
    console.log(`Title: ${project.title}`);
    console.log(`Color: ${project.color}`);
    console.log(project.node);
    console.log(project.tasks);
  });
}
import './styles/style.css';
import { handleHeader } from './handlers/header.js';
import { handleNav } from './handlers/nav.js';
import { handleMain } from './handlers/main';
import { printProjects } from './data/projects';
import { addProject } from './dom/nav';
import { createTask } from './dom/main';
import { pushTask } from './data/tasks';

handleHeader();
handleNav();
handleMain();

addProject('The Odin Project', 'red');

function addTask(title, description, date, priorityColor) {
  createTask(title, description, date, priorityColor);
  pushTask(title, description, date, priorityColor);
}

addTask('Submit project report', 'Write and submit the final project report', '2023-08-08', 'yellow');
addTask('Finish todo app', 'Finish todo app project and post it on discord', '2023-08-07', 'red');
addTask('Revise code', 'Review and refactor the code for better optimization', '2023-08-06', 'gray');
addTask('Prepare presentation', 'Create slides and rehearse the presentation', '2023-08-10', 'blue');
addTask('Submit assignment', 'Complete the assignment and submit it online', '2023-08-14', 'red');
addTask('Prepare meeting agenda', 'Create an agenda for the team meeting and distribute it to the members', '2023-08-07', 'blue');
addTask('Study for exam', 'Review lecture notes and practice problems for the upcoming exam', '2023-08-01', 'yellow');
addTask('Clean the house', 'Tidy up the house and do some cleaning', '2023-08-26', 'gray');

printProjects();
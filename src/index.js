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

createTask('Finish todo app', 'Finish todo app project and post it on discord', '2023-8-29', 'red');
createTask('Submit project report', 'Write and submit the final project report', '2023-8-30', 'yellow');
createTask('Prepare presentation', 'Create slides and rehearse the presentation', '2023-8-31', 'blue');
createTask('Revise code', 'Review and refactor the code for better optimization', '2023-9-1', 'gray');

pushTask('Finish todo app', 'Finish todo app project and post it on discord', '2023-8-29', 'red');
pushTask('Submit project report', 'Write and submit the final project report', '2023-8-30', 'yellow');
pushTask('Prepare presentation', 'Create slides and rehearse the presentation', '2023-8-31', 'blue');
pushTask('Revise code', 'Review and refactor the code for better optimization', '2023-9-1', 'gray');

printProjects();
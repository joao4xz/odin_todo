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

createTask('Submit project report', 'Write and submit the final project report', '2023-08-30', 'yellow');
createTask('Finish todo app', 'Finish todo app project and post it on discord', '2023-08-29', 'red');
createTask('Revise code', 'Review and refactor the code for better optimization', '2023-09-01', 'gray');
createTask('Prepare presentation', 'Create slides and rehearse the presentation', '2023-08-31', 'blue');
createTask('Submit assignment', 'Complete the assignment and submit it online', '2023-08-25', 'red');
createTask('Prepare meeting agenda', 'Create an agenda for the team meeting and distribute it to the members', '2023-08-07', 'blue');
createTask('Study for exam', 'Review lecture notes and practice problems for the upcoming exam', '2023-08-27', 'yellow');
createTask('Clean the house', 'Tidy up the house and do some cleaning', '2023-08-26', 'gray');

pushTask('Submit project report', 'Write and submit the final project report', '2023-08-30', 'yellow');
pushTask('Finish todo app', 'Finish todo app project and post it on discord', '2023-08-29', 'red');
pushTask('Revise code', 'Review and refactor the code for better optimization', '2023-09-01', 'gray');
pushTask('Prepare presentation', 'Create slides and rehearse the presentation', '2023-08-31', 'blue');
pushTask('Submit assignment', 'Complete the assignment and submit it online', '2023-08-25', 'red');
pushTask('Prepare meeting agenda', 'Create an agenda for the team meeting and distribute it to the members', '2023-08-07', 'blue');
pushTask('Study for exam', 'Review lecture notes and practice problems for the upcoming exam', '2023-08-27', 'yellow');
pushTask('Clean the house', 'Tidy up the house and do some cleaning', '2023-08-26', 'gray');

printProjects();
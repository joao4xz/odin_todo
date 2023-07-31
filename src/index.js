import './styles/style.css';
import { handleHeader } from './handlers/header.js';
import { handleNav } from './handlers/nav.js';
import { handleMain } from './handlers/main';
import { printProjects } from './data/projects';
import { addProject } from './dom/nav';

handleHeader();
handleNav();
handleMain();

printProjects();
addProject('The Odin Project', 'red');
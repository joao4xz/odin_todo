import './styles/style.css';

function helloWorld() {
  const div = document.createElement('div');
  div.textContent = 'Hello World';
  return div;
}

document.body.appendChild(helloWorld());
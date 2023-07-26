function handleInboxButton() {
  const inboxButton = document.getElementById('inbox-button');

  inboxButton.addEventListener('click', () => {
    console.log('Inbox Button');
  });
}

function handleTodayButton() {
  const todayButton = document.getElementById('today-button');

  todayButton.addEventListener('click', () => {
    console.log('Today Button');
  });
}

function handleUpcomingButton() {
  const upcomingButton = document.getElementById('upcoming-button');

  upcomingButton.addEventListener('click', () => {
    console.log('Upcoming Button');
  });
}

function handleProjectButton() {
  const projectButton = document.getElementById('project-button');

  projectButton.addEventListener('click', () => {
    console.log('Project Button');
  });
}

function handleAddProjectButton() {
  const addProjectButton = document.getElementById('add-project-button');

  addProjectButton.addEventListener('click', () => {
    console.log('Add project Button');
  });
}

function navButtons() {
  handleInboxButton();
  handleTodayButton();
  handleUpcomingButton();
  handleProjectButton();
  handleAddProjectButton();
}

export { navButtons };

const taskInput = document.getElementById('new-task');// Add a new task.
const addButton = document.getElementsByTagName('button')[0];// first button
const incompleteTaskHolder = document.getElementById('incomplete-tasks');// ul of #incomplete-tasks
const completedTasksHolder = document.getElementById('completed-tasks');// completed-tasks

// New task list item
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  // input (checkbox)
  const checkBox = document.createElement('input');// checkbx
  // label
  const label = document.createElement('label');// label
  // input (text)
  const editInput = document.createElement('input');// text
  // button.edit
  const editButton = document.createElement('button');// edit button

  // button.delete
  const deleteButton = document.createElement('button');// delete button

  label.innerText = taskString;

  checkBox.type = 'checkbox';
  editInput.type = 'text';

  editButton.innerText = 'Edit';// innerText encodes special characters, HTML does not.
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';
  // and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  console.log('Add Task...');
  // Create a new list item with the text from the #new-task:
  const listItem = createNewTaskElement(taskInput.value);
  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};
// Edit an existing task.
const editTask = function () {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const containsClass = listItem.classList.contains('editMode');
  // If class of the parent is .editmode
  if (containsClass) {
    // switch to .editmode
    // label becomes the inputs value.
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  // toggle .editmode on the parent.
  listItem.classList.toggle('editMode');
};
// Delete task.
const deleteTask = function () {
  console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
};
// Mark task completed
let taskCompleted = function () {
  console.log('Complete Task...');

  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};


let taskIncomplete = function () {
  console.log('Incomplete Task...');

  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const ajaxRequest = function () {
  console.log('AJAX Request');
};

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');

  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

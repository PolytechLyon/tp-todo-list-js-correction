const editTodoItemBlock = document.getElementById('edit-item');
const newTodoItemBlock = document.getElementById('new-item');
const editTodoItemTitleEl = document.getElementById('edit-todo-item-title');
const newTodoItemTitleEl = document.getElementById('new-todo-item-title')
const todoListEl = document.getElementById('todo-list');

let itemEdited;

function editItem(el) {
    editTodoItemTitleEl.value = el.innerText;
    editTodoItemBlock.hidden = false;
    newTodoItemBlock.hidden = true;
    editTodoItemTitleEl.focus();
    itemEdited = el;
}

function resetEdit() {
    editTodoItemTitleEl.value = '';
    itemEdited = undefined;
    editTodoItemBlock.hidden = true;
    newTodoItemBlock.hidden = false;
}

function cancelEdit() {
    resetEdit();
}

function confirmEdit() {
    itemEdited.innerText = editTodoItemTitleEl.value;
    resetEdit();
}

function addItem() {
    const title = newTodoItemTitleEl.value;
    newTodoItemTitleEl.value = '';
    const listItemEl = document.createElement('li');
    const listItemTitleEl = document.createElement('span');
    const listItemDeleteEl = document.createElement('button');
    const listItemEditEl = document.createElement('button');
    listItemTitleEl.innerText = title;
    listItemDeleteEl.innerText = 'Delete';
    listItemEditEl.innerText = 'Edit';
    listItemDeleteEl.addEventListener('click', () => listItemEl.remove());
    listItemEditEl.addEventListener('click', () => editItem(listItemTitleEl));
    listItemEl.append(listItemTitleEl);
    listItemEl.append(listItemDeleteEl);
    listItemEl.append(listItemEditEl);
    todoListEl.append(listItemEl);
}


function addItemOnEnter(event) {
    event.key === 'Enter' && addItem();
}

function confirmEditOnEnter(event) {
    event.key === 'Enter' && confirmEdit();
}

document.getElementById('new-todo-item-title').addEventListener('keypress', addItemOnEnter);
document.getElementById('new-todo-item-add').addEventListener('click', addItem);
document.getElementById('edit-todo-item-title').addEventListener('keypress', confirmEditOnEnter);
document.getElementById('edit-todo-item-confirm').addEventListener('click', confirmEdit);
document.getElementById('edit-todo-item-cancel').addEventListener('click', cancelEdit);

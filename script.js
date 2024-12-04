const editTodoItemBlock = document.getElementById('edit-item');
const newTodoItemBlock = document.getElementById('new-item');
const editTodoItemTitleEl = document.getElementById('edit-todo-item-title');
const newTodoItemTitleEl = document.getElementById('new-todo-item-title')
const todoListEl = document.getElementById('todo-list');
const listItemTemplateEl= document.getElementById('list-item-template')
    .content
    .firstElementChild;

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
    const listItemEl = listItemTemplateEl.cloneNode(true);
    const listItemTitleEl = listItemEl.querySelector('.content');
    const listItemDeleteEl = listItemEl.querySelector('.delete');
    const listItemEditEl = listItemEl.querySelector('.edit');
    listItemTitleEl.innerText = title;
    listItemDeleteEl.innerText = 'Delete';
    listItemEditEl.innerText = 'Edit';
    listItemDeleteEl.addEventListener('click', () => listItemEl.remove());
    listItemEditEl.addEventListener('click', () => editItem(listItemTitleEl));
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

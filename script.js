const editTodoItemBlock = document.getElementById('edit-item');
const newTodoItemBlock = document.getElementById('new-item');
const editTodoItemTitleEl = document.getElementById('edit-todo-item-title');
const newTodoItemTitleEl = document.getElementById('new-todo-item-title')
const todoListEl = document.getElementById('todo-list');
const items = load();

let itemEdited;

function load() {
    const storage = localStorage.getItem('todo_list_items');
    return storage ? JSON.parse(storage) : [];
}

function save() {
    localStorage.setItem('todo_list_items', JSON.stringify(items));
}

function editItem(item) {
    const el = item.element;
    editTodoItemTitleEl.value = el.innerText;
    editTodoItemBlock.hidden = false;
    newTodoItemBlock.hidden = true;
    editTodoItemTitleEl.focus();
    itemEdited = item;
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
    itemEdited.titke = itemEdited.element.innerText = editTodoItemTitleEl.value;
    save();
    resetEdit();
}

function removeItem(item) {
    const index = items.indexOf(item);
    items.splice(index, 1);
    save();
    item.element.remove();
}

function addItem() {
    const title = newTodoItemTitleEl.value;
    const item = {
        title,
        checked: false,
    };
    appendTitle(item);
    newTodoItemTitleEl.value = '';
    items.push(item);
    save();
}

function appendTitle(item) {
    const { title } = item;
    const listItemEl = document.createElement('li');
    const listItemTitleEl = document.createElement('span');
    const listItemDeleteEl = document.createElement('button');
    const listItemEditEl = document.createElement('button');
    listItemTitleEl.innerText = title;
    listItemDeleteEl.innerText = 'Delete';
    listItemEditEl.innerText = 'Edit';
    listItemDeleteEl.addEventListener('click', () => removeItem(item));
    listItemEditEl.addEventListener('click', () => editItem(item));
    listItemEl.append(listItemTitleEl);
    listItemEl.append(listItemDeleteEl);
    listItemEl.append(listItemEditEl);
    todoListEl.append(listItemEl);
    item.element = listItemEl;
}


function addItemOnEnter(event) {
    event.key === 'Enter' && addItem();
}

function confirmEditOnEnter(event) {
    event.key === 'Enter' && confirmEdit();
}

items.forEach(appendTitle);

document.getElementById('new-todo-item-title').addEventListener('keypress', addItemOnEnter);
document.getElementById('new-todo-item-add').addEventListener('click', addItem);
document.getElementById('edit-todo-item-title').addEventListener('keypress', confirmEditOnEnter);
document.getElementById('edit-todo-item-confirm').addEventListener('click', confirmEdit);
document.getElementById('edit-todo-item-cancel').addEventListener('click', cancelEdit);

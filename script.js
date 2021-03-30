"use strict"
let todoList = [];
const body = document.querySelector('body');
const wrapperTodo = document.querySelector('.wrapper-todo');
const wrapperModal = document.querySelector('.wrapper-modal');
const wrapperModalRemove = document.querySelector('.wrapper-modal__remove');
const buttonCreate = document.querySelector('.button-create');
const buttonDelete = document.querySelector('.button-delete');
const buttonAddedReminder = document.querySelector('.button__added-reminder');
const buttonSearch = document.querySelector('.navbar-search__button');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const inputSearch = document.querySelector('.navbar-search__placeholder');
class ToDo {
    constructor(title, description,id) {
        this.title = title;
        this.description = description;
        this.id = id;
    }
}
body.addEventListener('click', e => {
    if (e.target.classList.contains('button-close')) {
        wrapperModal.classList.replace('open', 'close');
        wrapperModalRemove.classList.replace('open', 'close');
        modalTitle.classList.remove('red');
        modalDescription.classList.remove('red');
    }
})
buttonAddedReminder.addEventListener('click', () => {
    wrapperModal.classList.add('open');
    wrapperModal.classList.replace('close', 'open');
})
modalTitle.onkeyup = function () {
    if (this.value.match(/^[ ]+$/)) { 
        this.value = '';
        modalTitle.classList.add('red');
    }
}
modalDescription.onkeyup = function () {
    if (this.value.match(/^[ ]+$/)) { 
        this.value = '';
        modalDescription.classList.add('red');
    }
}
buttonCreate.addEventListener('click', () => {
    if (modalTitle.value || modalDescription.value ) {
        let newTodo = new ToDo(modalTitle.value, modalDescription.value, Date.now());
        todoList.unshift(newTodo);
        wrapperModal.classList.replace('open', 'close');
        modalTitle.classList.remove('red');
        modalDescription.classList.remove('red');
        renderTodo(todoList);
        handlerResetValue();
    }
})
function getTemplete(item) {
    return wrapperTodo.innerHTML =
            `<div class="todo update-todo" id="${item.id}" onclick="changeTodo(this.id)">
                <h2 class="todo-title">${item.title}</h2>
                <p class="todo-description">${item.description}</p>
                <div class="wrapper-delete">
                    <button class="delete-todo" id="${item.id}" onclick="deleteTodo(this.id)" type="button"></button>
                </div>
            </div>`
};
function renderTodo(todoList) {
    wrapperTodo.innerHTML = todoList.map((item) => {
        return getTemplete(item)
    }).join('')
};
function handlerResetValue() {
    modalTitle.value = '';
    modalDescription.value = '';
};
function changeTodo(clickedId) {
    wrapperModal.classList.replace('close','open');
    buttonCreate.textContent = "Сохранить";
    const getClick = clickedId;
    const findElemArray = todoList.find(item => item.id === +getClick);
    modalTitle.value = findElemArray.title;
    modalDescription.value = findElemArray.description;
    if (modalTitle.value || modalDescription.value) {
        findElemArray.title = modalTitle.value;
        findElemArray.description = modalDescription.value;
        const filterArray = todoList.filter((item) => item.id !== +getClick);
        todoList = filterArray;
        renderTodo(todoList);
    }
}
function deleteTodo(clickedId) {
    event.stopPropagation();
    wrapperModalRemove.classList.add('open');
    wrapperModalRemove.classList.replace('close', 'open');
    buttonDelete.addEventListener('click', () => {
    const getClick = clickedId;
    const filterArray = todoList.filter((item) => item.id !== +getClick);
    todoList = filterArray;
    let getIdParents = document.getElementById(+getClick);
    getIdParents.remove();
    renderTodo(todoList);
    })
}
buttonSearch.addEventListener('click', () => {
    const searchFilter = todoList.filter((i) => i.title.toLocaleLowerCase().startsWith(inputSearch.value)  || i.description.toLocaleLowerCase().startsWith(inputSearch.value));
    const searchSort = searchFilter.sort((a, b) => a.title.localeCompare(b.title));
    renderTodo(searchSort);
})
if (!inputSearch.value) {
    renderTodo(todoList);
};
renderTodo(todoList)
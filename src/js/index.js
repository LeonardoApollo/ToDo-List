'use strict';

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const emptyList = document.querySelector('#emptyList');
const cardMain = document.querySelector('.card__main');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

// Глобалный запрет пробела как первого символа
taskInput.oninput = () => {
    if (taskInput.value.charAt(0) === ' ') {
        taskInput.value = '';
    }
}

form.addEventListener('submit', addTask);

taskList.addEventListener('click', deleteTask);

taskList.addEventListener('click', doneTask);

function addTask(event) {
    event.preventDefault();

    // Проверка на добавление пустой строки
    if (taskInput.value.trim() == "") return;

    const taskText = taskInput.value;
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    tasks.push(newTask)

    saveToLS();

    renderTask(newTask);

    taskInput.value = '';
    taskInput.focus();

    checkEmptyList()
}

function deleteTask(event) {
    if(event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('li');

    const id = Number(parentNode.id);

    const index = tasks.findIndex((task) => task.id === id);

    tasks.splice(index, 1);

    saveToLS();

    // Метод с фильтрацией массива
    // tasks = tasks.filter((task) => task.id !== id);

    parentNode.remove();

    checkEmptyList()
}

function doneTask(event) {
    if(event.target.dataset.action !== 'done') return;

    const parentNode = event.target.closest('li');

    const id = Number(parentNode.id);

    const task = tasks.find((task) => task.id === id);

    task.done = !task.done;

    saveToLS();

    const taskTitle = parentNode.querySelector('.task-item__title');
    taskTitle.classList.toggle('done');

    const doneBtn = parentNode.querySelector('.btn-action');
    doneBtn.blur();
}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group__item empty-list">
                                    <img src="icons/coffe.png" alt="Empty">
                                    <div class="empty-list__title">Список дел пуст</div>
                                </li>`;
        taskList.insertAdjacentHTML('afterbegin', emptyListHTML);
        cardMain.classList.remove('first');
    }
    
    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ?
            emptyListEl.remove() :
            null;
        cardMain.classList.add('first');
    }
}

function saveToLS() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const cssClass = task.done ?
        "task-item__title done" :
        "task-item__title";

    const taskHTML = `
                <li id="${task.id}" class="list-group__item task-item">
                    <span class="${cssClass}">${task.text}</span>
                    <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                            <img src="icons/accept.png" alt="Done">
                        </button>
                        <button type="button" data-action="delete" class="btn-action">
                            <img src="icons/denied.png" alt="Done">
                        </button>
                    </div>
                </li>`;

    taskList.insertAdjacentHTML('beforeend', taskHTML);
}
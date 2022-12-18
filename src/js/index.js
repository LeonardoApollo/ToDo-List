'use strict';

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const emptyList = document.querySelector('#emptyList');
const cardMain = document.querySelector('.card__main');

form.addEventListener('submit', addTask);

taskList.addEventListener('click', deleteTask);

taskList.addEventListener('click', doneTask);

function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value;
    
    const taskHTML = `
                <li class="list-group__item task-item">
                    <span class="task-item__title">${taskText}</span>
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

    taskInput.value = '';
    taskInput.focus();

    if(taskList.children.length > 1) {
        emptyList.classList.add('none');
        cardMain.classList.add('first');
    }
}

function deleteTask(event) {
    if(event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('li');
    parentNode.remove()

    if(taskList.children.length === 1) {
        emptyList.classList.remove('none');
        cardMain.classList.remove('first');
    }
}

function doneTask(event) {
    if(event.target.dataset.action !== 'done') return;

    const parentNode = event.target.closest('li');
    const taskTitle = parentNode.querySelector('.task-item__title');
    taskTitle.classList.toggle('done');

    const doneBtn = parentNode.querySelector('.btn-action');
    doneBtn.blur();
}
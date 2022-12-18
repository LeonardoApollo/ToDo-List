/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};


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
  const taskHTML = "\n                <li class=\"list-group__item task-item\">\n                    <span class=\"task-item__title\">".concat(taskText, "</span>\n                    <div class=\"task-item__buttons\">\n                        <button type=\"button\" data-action=\"done\" class=\"btn-action\">\n                            <img src=\"icons/accept.png\" alt=\"Done\">\n                        </button>\n                        <button type=\"button\" data-action=\"delete\" class=\"btn-action\">\n                            <img src=\"icons/denied.png\" alt=\"Done\">\n                        </button>\n                    </div>\n                </li>");
  taskList.insertAdjacentHTML('beforeend', taskHTML);
  taskInput.value = '';
  taskInput.focus();

  if (taskList.children.length > 1) {
    emptyList.classList.add('none');
    cardMain.classList.add('first');
  }
}

function deleteTask(event) {
  if (event.target.dataset.action !== 'delete') return;
  const parentNode = event.target.closest('li');
  parentNode.remove();

  if (taskList.children.length === 1) {
    emptyList.classList.remove('none');
    cardMain.classList.remove('first');
  }
}

function doneTask(event) {
  if (event.target.dataset.action !== 'done') return;
  const parentNode = event.target.closest('li');
  const taskTitle = parentNode.querySelector('.task-item__title');
  taskTitle.classList.toggle('done');
  const doneBtn = parentNode.querySelector('.btn-action');
  doneBtn.blur();
}
/******/ })()
;
import assert from 'assert';
import { createTodoItemElList } from "./todoList.js";

// todoListを渡したらテストできる
describe('appendList', function () {
    document.body.innerHTML = `<template id="todo-item-template">
    <li class="todo-item">
      <label class="todo-toggle__container">
        <input
          data-todo-id="-1"
          type="checkbox"
          class="todo-toggle"
          value="checked"
          />
        <span class="todo-toggle__checkmark"></span>
      </label>
      <div class="todo-name"></div>
      <div data-todo-id="-1" class="todo-remove-button">x</div>
    </li>
  </template>`;

  
    
})
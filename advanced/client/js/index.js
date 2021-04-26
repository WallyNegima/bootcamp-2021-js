import { fetchTodoList, createTodo, updateTodoDone } from "./api/todoList.js";
import { createTodoItemElList } from "./domCreator/todoList.js";


const createTodoAndUpdateList = async (event) => {
  event.preventDefault()
  try {
    // post
    const createTodoForm = document.forms.createTodo;
    await createTodo(createTodoForm.elements.name.value)
    createTodoForm.elements.name.value = ""
  } catch (e) {
    console.error(e)
  }

  try {
    // refetch
    const resp = await fetchTodoList();
    // create elements
    const todoItemElList = createTodoItemElList(resp.todoList);
    // update dom 
    const todoListEl = document.getElementById("todo-list")
    while (todoListEl.firstChild) {
      todoListEl.removeChild(todoListEl.firstChild);
    }    
    todoItemElList.forEach(el => {
      todoListEl.appendChild(el)
    })
  } catch (e) {
    console.error(e)
  }
}

const updateDone = async (event) => {
  event.preventDefault()
  try {
    const todoId = event.target.getAttribute("data-todo-id");
    const checked = event.target.checked;
    console.debug(todoId, checked);
    await updateTodoDone(todoId, checked);
  } catch (e) {
    console.error(e)
  }
}

const init = async () => {
  try {
    // fetch
    const resp = await fetchTodoList();
    // create elements
    const todoItemElList = createTodoItemElList(resp.todoList);
    // update dom 
    const todoListEl = document.getElementById("todo-list")
    todoItemElList.forEach(el => {
      todoListEl.appendChild(el)
    })
  } catch (e) {
    
  }
}

const main = async () => {
  await init();

  // set create event
  const createTodoForm = document.forms.createTodo;
  createTodoForm.addEventListener('submit', createTodoAndUpdateList);
  // DONEのチェックボックス
  const checkBoxList = document.querySelectorAll('.todo-toggle');
  checkBoxList.forEach(el => {
    el.addEventListener('change', updateDone);
  })
};

main();

// テストしたい
// todoList渡したら正しくDOM作られる？？
// todo一個で正しいノード(チェックボックスのチェックや、name反映されてる？)作られる？？
// submit押したらイベント発火される？？
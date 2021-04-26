import { fetchTodoList, createTodo, updateTodoDone, deleteTodo } from "./api/todoList.js";
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

    addEventListenersForTodoList()
  } catch (e) {
    console.error(e)
  }
}

const updateDone = async (event) => {
  event.preventDefault()
  try {
    const todoId = event.target.getAttribute("data-todo-id");
    const name = event.target.parentElement.parentElement.querySelectorAll("div")[0].textContent
    const checked = event.target.checked;
    await updateTodoDone(todoId, name, checked);
  } catch (e) {
    console.error(e)
  }
}

const deleteTodoAndUpdateList = async (event) => {
  event.preventDefault();
  try {
    const todoId = event.target.getAttribute("data-todo-id");
    await deleteTodo(todoId)
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

    addEventListenersForTodoList()
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
    console.error(e)
  }
}

const addEventListenersForTodoList = () => {
    // DONEのチェックボックス
    const checkBoxList = document.querySelectorAll('.todo-toggle');
    checkBoxList.forEach(el => {
      el.addEventListener('change', updateDone);
    })
    // DONEのチェックボックス
    const deleteButtonList = document.querySelectorAll('.todo-remove-button');
    deleteButtonList.forEach(el => {
      el.addEventListener('click', deleteTodoAndUpdateList);
    })
}

const main = async () => {
  await init();

  // set create event
  const createTodoForm = document.forms.createTodo;
  createTodoForm.addEventListener('submit', createTodoAndUpdateList);
  addEventListenersForTodoList()
};

main();

// テストしたい
// todoList渡したら正しくDOM作られる？？
// todo一個で正しいノード(チェックボックスのチェックや、name反映されてる？)作られる？？
// submit押したらイベント発火される？？
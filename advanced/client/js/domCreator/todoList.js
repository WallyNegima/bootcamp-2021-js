// document.querySelector(...) を使ったテストってできるんだっけ？？
export const createTodoItem = (todo) => {
  if ('content' in document.createElement('template')) {

    // 新しい行を複製して表に挿入します。
    const template = document.querySelector('#todo-item-template');

    const clone = template.content.cloneNode(true);
    const checkBox = clone.querySelector("input");
    checkBox.dataset.todoId = todo.id;
    checkBox.dataset.todoName = todo.name;
    checkBox.value = todo.done;
    checkBox.checked = todo.done;
    const divs = clone.querySelectorAll("div");
    divs[0].textContent = todo.name ? todo.name : "-"
    divs[1].dataset.todoId = todo.id;
    return clone
  } else {
    // HTML template 要素に対応していないので
    const item = document.createElement("li")
    item.classList.add("todo-item");
    const label = document.createElement("label")
    label.classList.add("todo-toggle__container");
    const checkBox = document.createElement("input")
    checkBox.dataset.todoId = todo.id;
    checkBox.classList.add("todo-toggle");
    checkBox.value = todo.done;
    checkBox.checked = todo.done;
    checkBox.type = "checkbox";
    const span = document.createElement("span")
    span.classList.add("todo-toggle__checkmark");
    label.appendChild(checkBox)
    label.appendChild(span)
    item.appendChild(label)
    const todoNameDiv = document.createElement("div")
    todoNameDiv.classList.add("todo-name");
    todoNameDiv.appendChild(document.createTextNode(todo.name ? todo.name : "-"))
    item.appendChild(todoNameDiv)
    const removeButton = document.createElement("div")
    removeButton.classList.add("todo-remove-button");
    removeButton.appendChild(document.createTextNode("x"))
    removeButton.dataset.todoId = todo.id;
    item.appendChild(removeButton)
    return item
  }
}

export const createTodoItemElList = (todoList) => {
    const todoItemElList = [];
    todoList.forEach((todo) => {
        const todoItem = createTodoItem(todo);
        todoItemElList.push(todoItem);
      })
    return todoItemElList;
}
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
    // 表に行を追加するほかの方法を探します。
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
const FETCH_TODO_LIST = "http://localhost:3000/todo";
const CREATE_TODO = "http://localhost:3000/todo";
const UPDATE_TODO_DONE = "http://localhost:3000/todo/";
const DELETE_TODO = "http://localhost:3000/todo/";

export const fetchTodoList = async () => {
    const todoListResp = await fetch(FETCH_TODO_LIST);
    return todoListResp.json()
}

export const createTodo = async (name) => {
    const resp = await fetch(CREATE_TODO,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        })
    return resp.json()
}

export const updateTodoDone = async (todoId, name, done) => {
    const resp = await fetch(UPDATE_TODO_DONE + todoId,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ done, name })
        })
    return resp.json()
}


export const deleteTodo = async (todoId) => {
    const resp = await fetch(DELETE_TODO + todoId,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        });
    return resp;
} 
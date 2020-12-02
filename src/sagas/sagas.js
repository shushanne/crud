import axios from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";


const baseUrl = "https://todo.eachbase.com/api/ShushanArakelian/todos";

function fetchTodos() {
    return axios(baseUrl, {
        method: "GET",
        headers: { "Content-Type": "aplication/json" },
    }).then(res => res.data)
        .catch((error) => { throw error })
}

function* getTodos() {
    try {
        const response = yield call(fetchTodos);
        yield put({ type: "GET_TODOS_SUCCESS", todos: response })
    }
    catch (e) {
        yield put({ message: e.message })
    }
}

function postTodo(title, description) {
    return axios("baseUrl", {
        method: "POST",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify(title, description)
    }).then(res => res.data)
        .catch((error) => { throw error })
}


function* addTodo() {
    try {
        const response = yield call(postTodo);
        yield put({ type: "POST_TODO_SUCCESS", todos: response })
    }
    catch (e) {
        yield put({ message: e.message })
    }
}

function deleteTodo(id) {
    return axios(`baseUrl${id}`, {
        method: "DELETE",
        body: id
    }).then(res => res.data)
        .catch((error) => { throw error })
}

function* removeTodo() {
    try {
        const response = yield call(deleteTodo);
        yield put({ type: "DELETE_TODO_SUCCESS", todos: response })
    }
    catch (e) {
        yield put({ message: e.message })
    }
}

function editTodo(id) {
    return axios(`baseUrl${id}`, {
        method: "PUT",
        body: id
    }).then(res => res.data)
        .catch((error) => { throw error })
}

function* changeTodo() {
    try {
        const response = yield call(editTodo);
        yield put({ type: "PUT_TODO_SUCCESS", todos: response })
    }
    catch (e) {
        yield put({ message: e.message })
    }
}


function updateTodo(id, title, description) {
    return axios(`baseUrl${id}`, {
        method: "PATCH",
        body: JSON.stringify(id, title, description)
    }).then(res => res.data)
        .catch((error) => { throw error })
}

function* newTodo() {
    try {
        const response = yield call(updateTodo);
        yield put({ type: "PATCH_TODO_SUCCESS", todos: response })
    }
    catch (e) {
        yield put({ message: e.message })
    }
}

export default function* watchtodoSagas() {
    yield all([
        takeEvery("GET_TODOS_REQUEST", getTodos),
        takeEvery("POST_TODO_REQUEST", addTodo),
        takeEvery("DELETE_TODO_REQUEST", removeTodo),
        takeEvery("GET_TODO_REQUEST", changeTodo),
        takeEvery("PATCH_TODO_REQUEST", newTodo)
    ]);
}

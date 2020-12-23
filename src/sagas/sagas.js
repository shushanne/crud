import axios from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";


const baseUrl = "";

function fetchTodosApi() {
    return axios(baseUrl, {
        method: "GET",
        headers: { "Content-Type": "aplication/json" },
    }).then(res => res.data)
        .catch((error) => { throw error })
}

function* fetchTodos() {
    try {
        const response = yield call(fetchTodosApi);
        yield put({ type: "GET_TODOS_SUCCESS", todos: response })
    }
    catch (e) {
        yield put({ rype: "GET_TODOS_FAILURE", message: e.message })
    }
}

function createTodoApi(title, description) {
    return axios(baseUrl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(title, description)
    }).then(res => res.data)
        .catch((error) => { throw error })
}

function* createTodo({ title, description }) {
    try {
        const addData = yield call(createTodoApi, title, description)
        yield put({ type: "POST_TODO_REQUEST", addData })
    } catch (e) {
        return e.message
    }
}

function deleteTodoAPI(id) {
    return axios(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.data)
        .catch((error) => { throw error })
}

function* deleteTodo({ id }) {
    try {
        const deleteData = yield call(deleteTodoAPI, id)
        yield put({ type: "DELETE_TODO_REQUEST", deleteData })
    } catch (e) {
        return e.message
    }
}

function editTodoApi(id) {
    return axios(`${baseUrl}/${id}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.data)
        .catch((error) => { throw error })
}

function* editTodo({ id }) {
    try {
        const editData = yield call(editTodoApi, id);
        yield put({ type: "GET_TODO_REQUEST", editData })
    } catch (e) {
        return e.message
    }
}

function updateTodoApi(id, title, description) {
    return axios(`${baseUrl}/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(title, description)
    }).then(res => res.data)
        .catch((error) => { throw error })
}

function* updateTodo({ title, description }) {
    try {
        const newData = yield call(updateTodoApi, title, description);
        yield put({ type: "PATCH_TODO_REQUEST", newData })
    } catch (e) {
        return e.message
    }
}



export default function* watchtodoSagas() {
    yield all([
        takeEvery("GET_TODOS_REQUEST", fetchTodos),
        takeEvery("POST_TODO_REQUEST", createTodo),
        takeEvery("DELETE_TODO_REQUEST", deleteTodo),
        takeEvery("GET_TODO_REQUEST", editTodo),
        takeEvery("PATCH_TODO_REQUEST", updateTodo)
    ]);
}

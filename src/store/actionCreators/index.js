import * as type from '../actionTypes/index';

export const getTodos = (todos) => ({
    type: type.GET_TODOS_REQUEST,
    todos
})
export const addTodo = (title, description) => ({
    type: type.POST_TODO_REQUEST,
    title,
    description
})
export const deleteTodo = (id) => ({
    type: type.DELETE_TODO_REQUEST,
    id
})
export const editTodo = (id, todo) => ({
    type: type.GET_TODO_REQUEST,
    id,
})
export const updateTodo = (id, title, description) => ({
    type: type.PATCH_TODO_REQUEST,
    id,
    title,
    description
})
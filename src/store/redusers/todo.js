import { nanoid } from "nanoid";
import randomColor from "randomcolor";
import * as type from "../actionTypes/index";

const initialState = {
    todo: [],
    loading: false,
    error: null,
}

export default function todos(state = initialState, action) {
    switch (action.type) {
        case type.GET_TODOS_REQUEST: {
            return { ...state, loading: true }
        }
        case type.GET_TODOS_SUCCESS: {
            return { ...state, loading: false, todo: action.todos }
        }
        case type.GET_TODOS_FAILURE: {
            return { ...state, loading: false, error: action.message }
        }
        case type.POST_TODO_REQUEST: {
            const content = {
                title: action.title,
                description: action.description,
                color: randomColor({ luminosity: 'bright', format: 'rgba' }),
                id: nanoid(),
                isEdit: false,
                isUpdate: false,
            }
            return { ...state, todo: [...state.todo, content] }
        }
        case type.POST_TODO_SUCCESS: {
            return { ...state, loading: false, todo: [...state.todo, action.title, action.description] }
        }
        case type.POST_TODO_FAILURE: {
            return { ...state, loading: false, error: action.message }
        }
        case type.DELETE_TODO_REQUEST: {
            const removeTodo = state.todo.filter(
                item => item.id !== action.id)
            return { ...state, todo: removeTodo }
        }
        case type.DELETE_TODO_SUCCESS: {
            return { ...state, loading: false, todo: action.id }
        }
        case type.DELETE_TODO_FAILURE: {
            return { ...state, loading: false, error: action.message }
        }
        case type.PUT_TODO_REQUEST: {
            const editTodo = state.todo.map(
                item => item.id === action.id ? {
                    ...item, isEdit: true
                } : item)
            return { ...state, todo: editTodo }
        }
        case type.PUT_TODO_SUCCESS: {
            return { ...state, loading: false, todo: action.id }
        }
        case type.PUT_TODO_FAILURE: {
            return { ...state, loading: false, error: action.message }
        }
        case type.PATCH_TODO_REQUEST: {
            const updateTodo = state.todo.map(
                item => item.id === action.id ? {
                    ...item, isUpdate: true, title: action.title, description: action.description
                } : item)
            return { ...state, todo: updateTodo }
        }
        case type.PATCH_TODO_SUCCESS: {
            return { ...state, loading: false, todo: [...state.todo, action.id, action.title, action.description] }
        }
        case type.PATCH_TODO_FAILURE: {
            return { ...state, loading: false, error: action.message }
        }
        default:
            return state
    }
}
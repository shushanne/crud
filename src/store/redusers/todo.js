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
        case type.DELETE_TODO_REQUEST: {
            const removeTodo = state.todo.filter(
                item => item.id !== action.id)
            return { ...state, todo: removeTodo }
        }
        case type.GET_TODO_REQUEST: {
            const editTodo = state.todo.map(
                item => item.id === action.id ? {
                    ...item, isEdit: true
                } : item)
            return { ...state, todo: editTodo }
        }
        case type.PATCH_TODO_REQUEST: {
            const updateTodo = state.todo.map(
                item => item.id === action.id ? {
                    ...item, isUpdate: true, title: action.title, description: action.description
                } : item)
            return { ...state, todo: updateTodo }
        }
        default:
            return state
    }
}
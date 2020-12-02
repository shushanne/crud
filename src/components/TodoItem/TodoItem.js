import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, updateTodo } from '../../store/actionCreators/index';
import style from "./todo-item.module.css";

const TodoItem = ({ id, item }) => {
    const [inputTitleEdit, setInputTitileEdit] = useState(item.title)
    const [inputDescriptionEdit, setInputDescriptionEdit] = useState(item.description);

    const dispatch = useDispatch()

    const deleteTask = () => {
        dispatch(deleteTodo(id))
    }

    const editTask = () => {
        dispatch(editTodo(id))
    }

    const updateTask = () => {
        dispatch(updateTodo(id, inputTitleEdit, inputDescriptionEdit))
    }

    return (
        <div className={style.TodoItem} style={{ background: item.color }}>
            {!item.isEdit ?
                <>
                    <p className={style.Text}>{item.title}</p>
                    <p className={style.Text}>{item.description}</p>
                    <div>
                        <button
                            className={style.Btn}
                            type='submit'
                            onClick={deleteTask}>Remove</button>
                        <button
                            className={style.Btn}
                            type='submit'
                            onClick={editTask} >Edit</button>
                    </div>
                </> : !item.isUpdate ?
                    <>
                        <input
                            className={style.Input}
                            type="text"
                            value={inputTitleEdit}
                            onChange={(e) => setInputTitileEdit(e.target.value)}
                        />
                        <input
                            className={style.Input}
                            type="text"
                            value={inputDescriptionEdit}
                            onChange={(e) => setInputDescriptionEdit(e.target.value)}
                        />
                        <button
                            className={style.Btn}
                            type='submit'
                            onClick={updateTask}>Update</button>
                    </> :
                    <>
                        <p className={style.Text}>{inputTitleEdit}</p>
                        <p className={style.Text}>{inputDescriptionEdit}</p>
                        <button
                            className={style.Btn}
                            type='submit'
                            onClick={deleteTask}>Remove</button>
                    </>
            }
        </div>
    )
}
export default TodoItem
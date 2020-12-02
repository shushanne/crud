import React from "react";
import style from "./todo-form.module.css";

const ToDoForm = ({ addTask, inputTitle, inputDescription, titleValue, descriptionValue }) => {
    return (
        <form className={style.TodoForm} onSubmit={addTask}>
            <label>Title</label>
            <input
                className={style.Input}
                type="text"
                placeholder="text goes here"
                value={inputTitle}
                onChange={titleValue}
            />
            <label>Description</label>
            <input
                className={style.Input}
                type="text"
                placeholder="description goes here"
                value={inputDescription}
                onChange={descriptionValue}
            />
            <input
                className={style.Input}
                type="submit"
                value="Create"
            />
        </form>
    )
}

export default ToDoForm
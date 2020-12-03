import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import ToDoForm from "../../components/TodoForm/TodoForm";
import TodoItem from "../../components/TodoItem/TodoItem";
import { addTodo, getTodos } from "../../store/actionCreators/index";
import { allTodo, isError, isLoading } from "../../store/selectors/index";
import style from "./todo-builder.module.css";

const TodoBuilder = () => {
    const [inputTitle, setInputTitile] = useState("");
    const [inputDescription, setInputDescription] = useState("");

    const titleValue = (e) => {
        setInputTitile(e.target.value)
    }

    const descriptionValue = (e) => {
        setInputDescription(e.target.value)
    }

    const getTask = useSelector(allTodo);
    const loading = useSelector(isLoading);
    const error = useSelector(isError);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodos())
    }, [])

    const addTask = (e) => {
        e.preventDefault()
        inputTitle && inputDescription &&
            dispatch(addTodo(inputTitle, inputDescription))
        setInputTitile("")
        setInputDescription("")
    }

    return (
        <div className={style.TodoBuilder}>
            <Header />
            <ToDoForm
                inputTitle={inputTitle}
                inputDescription={inputDescription}
                titleValue={titleValue}
                descriptionValue={descriptionValue}
                addTask={addTask}
            />
            <>
                {/* {loading && <div>Loading...</div>} */}
                {getTask.length > 0 && getTask.map(item => (
                    <TodoItem
                        key={item.id}
                        id={item.id}
                        item={item}
                    />
                ))}
                {getTask.length === 0 && <div className={style.Available}>No Items Available</div>}
                {error && !loading && <div>{error}</div>}
            </>
        </div>
    );
}

export default TodoBuilder;
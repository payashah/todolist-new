import React, { useEffect, useState } from "react";
import "./TodoList.css";
import DeleteAllModal from "../../Components/DeleteAllModal/DeleteAllModal";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
    setNewTodo, deleteTodo, moveDownTodo, moveUpTodo, removeAllTodo, submitTodo, setSelectIndex, setDraggedItemIndex,
    DragOver, keyDownDelete, setNewTodoJson, setEditingIndex, setEditingField, keyDownEnter, blure
} from "../../Redux/Store/StoreTodoList";
import { v4 as uuidv4 } from "uuid"

export default function TodoList() {

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

    const TodoList = useSelector((state) => state.todoListStore.todos)
    const NewTodo = useSelector((state) => state.todoListStore.newTodo)
    const NewTodoJson = useSelector((state) => state.todoListStore.newTodoJson)
    const SelectedIndex = useSelector((state) => state.todoListStore.selectedIndex)
    const DraggedItemIndex = useSelector((state) => state.todoListStore.draggedItemIndex)
    const Delete = useSelector((state) => state.todoListStore.delete)
    const Enter = useSelector((state) => state.todoListStore.enter)
    const EditingIndex = useSelector((state) => state.todoListStore.editingIndex)
    const EditingField = useSelector((state) => state.todoListStore.editingField)
    const dispatch = useDispatch()


    const inputChangeHandler = (event) => {
        dispatch(setNewTodo(event.target.value))
    };

    const submitTodoHandler = (event) => {
        event.preventDefault();

        if (NewTodo.trim() !== "") {
            dispatch(submitTodo({ todo: NewTodo },

            ))
        }
    };

    const deleteTodoHandler = (id) => {

        dispatch(deleteTodo({ id }))
    };

    const deleteAllHandler = (event) => {
        event.preventDefault();
        setIsShowDeleteModal(true);
    };

    const acceptDeleteAll = () => {
        setIsShowDeleteModal(false);
        dispatch(removeAllTodo())
    };
    const rejectDeleteAll = () => {
        setIsShowDeleteModal(false);
    };

    const moveUpTodoHandler = (id) => {
        dispatch(moveUpTodo({ id }))
    };

    const moveDownTodoHandler = (id) => {

        dispatch(moveDownTodo({ id }))

    };



    // ------------------------ Start Drag & Drap ---------------------------

    const handleSelectItem = (index) => {
        dispatch(setSelectIndex(index))
    };

    const handleDragStart = (index) => {
        dispatch(setDraggedItemIndex(index))
        dispatch(setSelectIndex(index))
    };

    const handleDragOver = (index) => {

        if (DraggedItemIndex !== null && DraggedItemIndex !== index) {
            dispatch(DragOver(index))
            dispatch(setDraggedItemIndex(index))
        }
    };

    const handleDragEnd = () => {

        dispatch(setDraggedItemIndex())
        dispatch(setSelectIndex())

        // setDraggedItemIndex(null);
        // setSelectedIndex(null);
    };

    // ------------------------ End Drag & Drap ---------------------------

    const handelChangeJson = (event) => {
        dispatch(setNewTodoJson(event.target.value))
        // setNewTodoJson(event.target.value)
    }

    const handleKeyDown = (event) => {

        if (event.key === Delete && SelectedIndex !== null) {

            dispatch(keyDownDelete())

            dispatch(setSelectIndex())
        }
        if (event.key === Enter && EditingIndex !== null) {

            dispatch(keyDownEnter())
            // dispatch(setEditingIndex())                  ///////نباید ایندکس مقدار اولیه را بگیرد////////
            dispatch(setEditingField())
        }
    };

    const handleEditField = (index, field) => {

        dispatch(setEditingIndex(index))
        dispatch(setEditingField(field))

        {
            field === 'title' ?
                dispatch(setNewTodoJson(TodoList[index].title)) :
                dispatch(setNewTodoJson(TodoList[index].id))
        }

    };



    const handleBlur = () => {

        if (EditingIndex !== null) {

            // dispatch(blure())
            // const items = [...TodoList];
            // items[EditingIndex][EditingField] =
            //     EditingField === "id" ? parseInt(NewTodo, 10) : NewTodo;
        }

        // dispatch(setEditingIndex())                  ///////نباید ایندکس مقدار اولیه را بگیرد////////
        dispatch(setEditingField())
        // setEditingIndex(null);
        // setEditingField(null);
    };


    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [SelectedIndex, EditingIndex, EditingField, setNewTodoJson, TodoList]);

    return (
        <>
            <form className="todolist-ctrl">
                <div className="todolist">
                    <input
                        className="todolist-input"
                        type="text"
                        placeholder="Enter New Todo ..."
                        value={NewTodo}
                        onChange={inputChangeHandler}
                        maxLength={30}
                    />
                    {NewTodo?.trim() !== "" ? (
                        <button className="todolist-btn" onClick={submitTodoHandler}>
                            Submit
                        </button>
                    ) : (
                        <button
                            className="todolist-btn"
                            onClick={submitTodo}
                            disabled
                            style={{ color: "silver" }}
                        >
                            Submit
                        </button>
                    )}
                    {TodoList?.length > 1 ? (
                        <button className="todolist-btn" onClick={deleteAllHandler}
                        >
                            Delete All
                        </button>
                    ) : (
                        <button
                            className="todolist-btn"
                            disabled
                            style={{ color: "silver" }}
                        >
                            Delete All
                        </button>
                    )}
                </div>
            </form>
            <ul className="todolist-ul">
                {TodoList.map((todo, index) => (
                    <li className="todolist-ul-li" key={todo.id}>
                        <p className="todolist-ul-li-title"> {todo.title}</p>
                        <div className="todolist-ul-li-btnBox">
                            <button
                                className="todolist-ul-li-btnBox-btn delete"
                                onClick={() => deleteTodoHandler(todo.id)}
                            >
                                Delete
                            </button>
                            <button
                                className="todolist-ul-li-btnBox-btn move"
                                onClick={() => moveUpTodoHandler(todo.id)}
                            >
                                <MdOutlineKeyboardDoubleArrowUp className="todolist-ul-li-btnBox-btn-icon"></MdOutlineKeyboardDoubleArrowUp>
                            </button>
                            <button
                                className="todolist-ul-li-btnBox-btn move"
                                onClick={() => moveDownTodoHandler(todo.id)}
                            >
                                <MdKeyboardDoubleArrowDown className="todolist-ul-li-btnBox-btn-icon"></MdKeyboardDoubleArrowDown>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {isShowDeleteModal && (
                <DeleteAllModal
                    accept={acceptDeleteAll}
                    reject={rejectDeleteAll}
                ></DeleteAllModal>
            )}

            ----------------------------------- JSON ------------------------------------------------

            {
                TodoList.length > 0 && <div className="json">
                    <h1 className="json-title">Todo List JSON Format :</h1>
                    {TodoList.map((item, index) => (
                        <div className="json-items"
                            key={item.id}
                            onDragStart={() => handleDragStart(index)}
                            onClick={() => handleSelectItem(index)}
                            onDragOver={(e) => {
                                e.preventDefault();
                                handleDragOver(index);
                            }}
                            onDragEnd={handleDragEnd}
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                color: "white",
                            }}
                        >
                            {EditingIndex === index && EditingField === "id" ? (
                                <input
                                    type="number"
                                    value={NewTodoJson}
                                    onChange={handelChangeJson}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                    autoFocus
                                    style={{ marginBottom: "5px" }}
                                />
                            ) : (
                                <span
                                    onClick={() => handleEditField(index, "id")}
                                    style={{ marginBottom: "5px" }}
                                >
                                    {`{ id : ${item.id} ,`}
                                </span>
                            )}

                            {EditingIndex === index && EditingField === "title" ? (

                                <input
                                    type="text"
                                    value={NewTodoJson}
                                    onChange={handelChangeJson}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                    autoFocus
                                    style={{ marginBottom: "5px" }}
                                />
                            ) : (
                                <span
                                    onClick={() => handleEditField(index, "title")}
                                    style={{ marginBottom: "5px" }}
                                >
                                    {` title : ${item.title} }`}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            }
        </>
    );
}

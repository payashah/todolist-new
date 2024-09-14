import React, { useEffect, useState } from "react";
import "./TodoList.css";
import DeleteAllModal from "../../Components/DeleteAllModal/DeleteAllModal";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
    setNewTodo, deleteTodo, moveDownTodo, moveUpTodo, removeAllTodo, submitTodo, setSelectIndex, setDraggedItemIndex,
    DragOver, keyDownDelete, setEditingIndex, setEditingField, keyDownEnter
} from "../../Redux/Store/StoreTodoList";
import { v4 as uuidv4 } from "uuid"

export default function TodoList() {

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

    const TodoList = useSelector((state) => state.todoListStore.todos)
    const NewTodo = useSelector((state) => state.todoListStore.newTodo)
    const SelectedIndex = useSelector((state) => state.todoListStore.selectedIndex)
    const DraggedItemIndex = useSelector((state) => state.todoListStore.draggedItemIndex)
    const Delete = useSelector((state) => state.todoListStore.delete)
    const Enter = useSelector((state) => state.todoListStore.enter)
    const EditingIndex = useSelector((state) => state.todoListStore.editingIndex)
    const EditingField = useSelector((state) => state.todoListStore.editingField)
    const dispatch = useDispatch()


    const inputChangeHandler = (event) => {

        dispatch(setNewTodo(event.target.value))

        // setNewTodo(event.target.value);
    };

    const submitTodoHandler = (event) => {
        event.preventDefault();

        if (NewTodo.trim() !== "") {

            dispatch(submitTodo({ todo: NewTodo },
                // setTodos((prevState) => {
                //     return [...prevState, newestTodo];
                // }),

                // setNewTodo("")
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

        // const todoListAfterMoveUp = [...todos];
        // [todoListAfterMoveUp[index], todoListAfterMoveUp[index - 1]] = [
        //     todoListAfterMoveUp[index - 1], // todoListAfterMoveUp[index],
        // ];
        // const todoListAfterMoveUpRegular = todoListAfterMoveUp.map(
        //     (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
        // );
        // setTodos(todoListAfterMoveUpRegular);

    };

    const moveDownTodoHandler = (id) => {

        dispatch(moveDownTodo({ id }))

        // if (index < todos.length - 1) {
        //     const todoListAfterMoveDown = [...todos];
        //     [todoListAfterMoveDown[index], todoListAfterMoveDown[index + 1]] = [
        //         todoListAfterMoveDown[index + 1],
        //         todoListAfterMoveDown[index],
        //     ];
        //     const todoListAfterMoveDownRegular = todoListAfterMoveDown.map(
        //         (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
        //     );
        //     setTodos(todoListAfterMoveDownRegular);
        // }
    };




    // const [selectedIndex, setSelectedIndex] = useState(null);
    // const [draggedItemIndex, setDraggedItemIndex] = useState(null);
    // const [editingIndex, setEditingIndex] = useState(null);
    // const [editingField, setEditingField] = useState(null);



    const handleSelectItem = (index) => {

        dispatch(setSelectIndex(index))

        // setSelectedIndex(index);
    };

    const handleDragStart = (index) => {
        dispatch(setDraggedItemIndex(index))
        dispatch(setSelectIndex(index))

        // setDraggedItemIndex(index);
        // setSelectedIndex(index);
    };

    const handleDragOver = (index) => {

        if (DraggedItemIndex !== null && DraggedItemIndex !== index) {

            dispatch(DragOver(index))
            // const items = [...TodoList];
            // const item = items[DraggedItemIndex];
            // items.splice(DraggedItemIndex, 1);
            // items.splice(index, 0, item);
            dispatch(setDraggedItemIndex(index))
            // setDraggedItemIndex(index);

            // const todoListAfterDragRegular = items.map((todo, newIndex) => ({ ...todo, id: newIndex + 1 }))
            // setTodos(todoListAfterDragRegular)

        }
    };

    const handleDragEnd = () => {

        dispatch(setDraggedItemIndex())
        dispatch(setSelectIndex())

        // setDraggedItemIndex(null);
        // setSelectedIndex(null);
    };

    // ------------------------ Drag & Drap ---------------------------



    const handleKeyDown = (event) => {

        if (event.key === Delete && SelectedIndex !== null) {

            dispatch(keyDownDelete())
            // const newItems = TodoList.filter((_, index) => index !== SelectedIndex);

            // const todoListAfterDragDeleteRegular = newItems.map(
            //     (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
            // );

            // setTodos(todoListAfterDragDeleteRegular);

            dispatch(setSelectIndex())
            // setSelectedIndex(null);
        }
        if (event.key === Enter && EditingIndex !== null) {
            // const items = [...TodoList];
            // items[editingIndex][editingField] =
            //     editingField === "id" ? parseInt(NewTodo, 10) : NewTodo;

            // const todoListAfterDragEnterRegular = items.map(
            //     (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
            // );

            // setTodos(todoListAfterDragEnterRegular);


            dispatch(setEditingIndex())
            dispatch(setEditingField())

            // setEditingIndex(null);
            // setEditingField(null);
        }
    };

    const handleEditField = (index, field) => {

        dispatch(setEditingIndex(index))
        dispatch(setEditingField(field))


        // setEditingIndex(index);
        // setEditingField(field);
        // setNewTodo(TodoList[index][field]);
    };



    const handleBlur = () => {

        if (EditingIndex !== null) {
            const items = [...TodoList];
            items[EditingIndex][EditingField] =
                EditingField === "id" ? parseInt(NewTodo, 10) : NewTodo;
            // setTodos(items);
        }
        setEditingIndex(null);
        setEditingField(null);
    };


    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [SelectedIndex, EditingIndex, EditingField, NewTodo, TodoList]);

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
                        <p className="todolist-ul-li-title">{index + 1} - {todo.title}</p>
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
                                    value={NewTodo}
                                    onChange={inputChangeHandler}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                    autoFocus
                                    style={{ marginBottom: "5px" }}
                                />
                            ) : (
                                <span
                                // onClick={() => handleEditField(index, "id")}
                                // style={{ marginBottom: "5px" }}
                                >
                                    {`{ Id : ${item.id} ,`}
                                </span>
                            )}

                            {EditingField === index && EditingField === "title" ? (
                                <input
                                    type="text"
                                    value={NewTodo}
                                    onChange={inputChangeHandler}
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
                                    {` Title : ${item.title} }`}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            }
        </>
    );
}

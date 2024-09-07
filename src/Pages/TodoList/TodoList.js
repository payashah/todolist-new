import React, { useEffect, useState } from "react";
import "./TodoList.css";
import DeleteAllModal from "../../Components/DeleteAllModal/DeleteAllModal";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, removeAllTodo, submitTodo } from "../../Redux/Store/StoreTodoList";
import { v4 as uuidv4 } from "uuid"

export default function TodoList() {
    // const [todos, setTodos] = useState([]);

    const [newTodo, setNewTodo] = useState("");
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

    const TodoList = useSelector((state) => state.todoListStore)
    const dispatch = useDispatch()

    const inputChangeHandler = (event) => {
        setNewTodo(event.target.value);
    };



    const submitTodoHandler = (event) => {
        event.preventDefault();

        if (newTodo.trim() !== "") {

            dispatch(submitTodo({ todo: newTodo },
                // setTodos((prevState) => {
                //     return [...prevState, newestTodo];
                // }),

                setNewTodo("")
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




    // const moveUpTodo = (index) => {
    //     if (index > 0) {
    //         const todoListAfterMoveUp = [...todos];
    //         [todoListAfterMoveUp[index], todoListAfterMoveUp[index - 1]] = [
    //             todoListAfterMoveUp[index - 1],
    //             todoListAfterMoveUp[index],
    //         ];
    //         const todoListAfterMoveUpRegular = todoListAfterMoveUp.map(
    //             (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
    //         );
    //         setTodos(todoListAfterMoveUpRegular);
    //     }
    // };
    // const moveDownTodo = (index) => {
    //     if (index < todos.length - 1) {
    //         const todoListAfterMoveDown = [...todos];
    //         [todoListAfterMoveDown[index], todoListAfterMoveDown[index + 1]] = [
    //             todoListAfterMoveDown[index + 1],
    //             todoListAfterMoveDown[index],
    //         ];
    //         const todoListAfterMoveDownRegular = todoListAfterMoveDown.map(
    //             (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
    //         );
    //         setTodos(todoListAfterMoveDownRegular);
    //     }
    // };




    // const [selectedIndex, setSelectedIndex] = useState(null);
    // const [draggedItemIndex, setDraggedItemIndex] = useState(null);
    // const [editingIndex, setEditingIndex] = useState(null);
    // const [editingField, setEditingField] = useState(null);
    // const [newValue, setNewValue] = useState("");

    // const handleDragStart = (index) => {

    //     setDraggedItemIndex(index);
    //     setSelectedIndex(index);
    // };

    // const handleDragOver = (index) => {

    //     if (draggedItemIndex !== null && draggedItemIndex !== index) {
    //         const items = [...todos];
    //         const item = items[draggedItemIndex];
    //         items.splice(draggedItemIndex, 1);
    //         items.splice(index, 0, item);
    //         setDraggedItemIndex(index);

    //         const todoListAfterDragRegular = items.map((todo, newIndex) => ({ ...todo, id: newIndex + 1 }))
    //         setTodos(todoListAfterDragRegular)

    //     }
    // };

    // // ------------------------ Drag & Drap ---------------------------

    // const handleDragEnd = () => {

    //     setDraggedItemIndex(null);
    //     setSelectedIndex(null);
    // };

    // const handleKeyDown = (event) => {

    //     if (event.key === "Delete" && selectedIndex !== null) {
    //         const newItems = todos.filter((_, index) => index !== selectedIndex);

    //         const todoListAfterDragDeleteRegular = newItems.map(
    //             (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
    //         );

    //         setTodos(todoListAfterDragDeleteRegular);
    //         setSelectedIndex(null);
    //     }
    //     if (event.key === "Enter" && editingIndex !== null) {
    //         const items = [...todos];
    //         items[editingIndex][editingField] =
    //             editingField === "id" ? parseInt(newValue, 10) : newValue;

    //         const todoListAfterDragEnterRegular = items.map(
    //             (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
    //         );

    //         setTodos(todoListAfterDragEnterRegular);
    //         setEditingIndex(null);
    //         setEditingField(null);
    //     }
    // };

    // const handleEditField = (index, field) => {

    //     setEditingIndex(index);
    //     setEditingField(field);
    //     setNewValue(todos[index][field]);
    // };

    // const handleChange = (e) => {

    //     setNewValue(e.target.value);
    // };

    // const handleBlur = () => {

    //     if (editingIndex !== null) {
    //         const items = [...todos];
    //         items[editingIndex][editingField] =
    //             editingField === "id" ? parseInt(newValue, 10) : newValue;
    //         setTodos(items);
    //     }
    //     setEditingIndex(null);
    //     setEditingField(null);
    // };
    // const handleSelectItem = (index) => {

    //     setSelectedIndex(index);
    // };

    // useEffect(() => {
    //     window.addEventListener("keydown", handleKeyDown);
    //     return () => {
    //         window.removeEventListener("keydown", handleKeyDown);
    //     };
    // }, [selectedIndex, editingIndex, editingField, newValue, todos]);

    return (
        <>
            <form className="todolist-ctrl">
                <div className="todolist">
                    <input
                        className="todolist-input"
                        type="text"
                        placeholder="Enter New Todo ..."
                        value={newTodo}
                        onChange={inputChangeHandler}
                        maxLength={30}
                    />
                    {newTodo.trim() !== "" ? (
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
                    {TodoList.length > 1 ? (
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
                            // onClick={() => moveUpTodo(index)}
                            >
                                <MdOutlineKeyboardDoubleArrowUp className="todolist-ul-li-btnBox-btn-icon"></MdOutlineKeyboardDoubleArrowUp>
                            </button>
                            <button
                                className="todolist-ul-li-btnBox-btn move"
                            // onClick={() => moveDownTodo(index)}
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
                // todos.length > 0 && <div className="json">
                //     <h1 className="json-title">Todo List JSON Format :</h1>
                //     {todos.map((item, index) => (
                //         <div className="json-items"
                //             key={item.id}
                //             onDragStart={() => handleDragStart(index)}
                //             onClick={() => handleSelectItem(index)}
                //             onDragOver={(e) => {
                //                 e.preventDefault();
                //                 handleDragOver(index);
                //             }}
                //             onDragEnd={handleDragEnd}
                //             style={{
                //                 cursor: "pointer",
                //                 display: "flex",
                //                 color: "white",
                //             }}
                //         >
                //             {editingIndex === index && editingField === "id" ? (
                //                 <input
                //                     type="number"
                //                     value={newValue}
                //                     onChange={handleChange}
                //                     onKeyDown={handleKeyDown}
                //                     onBlur={handleBlur}
                //                     autoFocus
                //                     style={{ marginBottom: "5px" }}
                //                 />
                //             ) : (
                //                 <span
                //                     onClick={() => handleEditField(index, "id")}
                //                     style={{ marginBottom: "5px" }}
                //                 >
                //                     {`{ Id : ${item.id} ,`}
                //                 </span>
                //             )}

                //             {editingIndex === index && editingField === "title" ? (
                //                 <input
                //                     type="text"
                //                     value={newValue}
                //                     onChange={handleChange}
                //                     onKeyDown={handleKeyDown}
                //                     onBlur={handleBlur}
                //                     autoFocus
                //                     style={{ marginBottom: "5px" }}
                //                 />
                //             ) : (
                //                 <span
                //                     onClick={() => handleEditField(index, "title")}
                //                     style={{ marginBottom: "5px" }}
                //                 >
                //                     {` Title : ${item.title} }`}
                //                 </span>
                //             )}
                //         </div>
                //     ))}
                // </div>
            }
        </>
    );
}

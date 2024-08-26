import React, { useState } from 'react'
import "./TodoList.css"
import DeleteAllModal from '../../Components/DeleteAllModal/DeleteAllModal'
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

export default function TodoList() {

    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState("")
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)

    const inputChangeHandler = (event) => {
        setNewTodo(event.target.value)

    }

    const submitTodo = (event) => {
        event.preventDefault()


        if (newTodo.trim() !== "") {
            let newestTodo = {
                id: todos.length + 1,
                title: newTodo,
            }
            setTodos(prevState => {
                return [...prevState, newestTodo]
            })
            setNewTodo("")
        }
    }

    const deleteTodo = (index) => {
        const todoListAfterDelete = todos.filter((todo, todoID) => {
            return todoID !== index
        })
        const todoListAfterDeleteRegular = todoListAfterDelete.map((todo, newIndex) => ({ ...todo, id: newIndex + 1 }))


        setTodos(todoListAfterDeleteRegular)
    }
    const deleteAllHandler = (event) => {
        event.preventDefault()
        setIsShowDeleteModal(true)
    }

    const moveUpTodo = (index) => {
        if (index > 0) {
            const todoListAfterMoveUp = [...todos];
            [todoListAfterMoveUp[index], todoListAfterMoveUp[index - 1]] =
                [todoListAfterMoveUp[index - 1], todoListAfterMoveUp[index]];
            const todoListAfterMoveUpRegular = todoListAfterMoveUp.map((todo, newIndex) => ({ ...todo, id: newIndex + 1 }))
            setTodos(todoListAfterMoveUpRegular)
        }

    }
    const moveDownTodo = (index) => {
        if (index < todos.length - 1) {
            const todoListAfterMoveDown = [...todos];
            [todoListAfterMoveDown[index], todoListAfterMoveDown[index + 1]] =
                [todoListAfterMoveDown[index + 1], todoListAfterMoveDown[index]];
            const todoListAfterMoveDownRegular = todoListAfterMoveDown.map((todo, newIndex) => ({ ...todo, id: newIndex + 1 }))
            setTodos(todoListAfterMoveDownRegular)
        }
    }
    const acceptDeleteAll = () => {
        setIsShowDeleteModal(false)
        setTodos([])
    }
    const rejectDeleteAll = () => {
        setIsShowDeleteModal(false)
    }

    return (
        <>
            <form className='todolist-ctrl'>
                <div className='todolist'>
                    <input className='todolist-input' type="text"
                        placeholder='Enter New Todo ...'
                        value={newTodo}
                        onChange={inputChangeHandler}
                        maxLength={20}
                    />
                    {
                        newTodo.trim() !== "" ? (<button className='todolist-btn' onClick={submitTodo}>Submit</button>) :
                            (<button className='todolist-btn' onClick={submitTodo} disabled style={{ color: "silver" }}>Submit</button>)
                    }
                    {
                        todos.length > 1 ? (<button className='todolist-btn' onClick={deleteAllHandler}>Delete All</button>) :
                            (<button className='todolist-btn' disabled style={{ color: "silver" }}>Delete All</button>)
                    }

                </div>
            </form>
            <ul className='todolist-ul'>
                {todos.map((todo, index) => (
                    <li className='todolist-ul-li' key={index}>
                        <p className='todolist-ul-li-title'>{todo.title}</p>
                        <div className='todolist-ul-li-btnBox'>
                            <button className='todolist-ul-li-btnBox-btn delete' onClick={() => deleteTodo(index)}>Delete</button>
                            <button className='todolist-ul-li-btnBox-btn move' onClick={() => moveUpTodo(index)}>
                                <MdOutlineKeyboardDoubleArrowUp></MdOutlineKeyboardDoubleArrowUp>
                            </button>
                            <button className='todolist-ul-li-btnBox-btn move' onClick={() => moveDownTodo(index)}>
                                <MdKeyboardDoubleArrowDown></MdKeyboardDoubleArrowDown>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {
                isShowDeleteModal && <DeleteAllModal accept={acceptDeleteAll} reject={rejectDeleteAll}></DeleteAllModal>
            }
        </>

    )
}



















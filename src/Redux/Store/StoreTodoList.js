import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid"

const getIniitialState = () => {
    const savedTodos = localStorage.getItem("todosState");
    return savedTodos
        ? JSON.parse(savedTodos)
        : {
            todos: [],
            newTodo: "",
            newTodoJson: "",
            selectedIndex: null,
            draggedItemIndex: null,
            editingIndex: null,
            editingField: null,
            delete: "Delete",
            enter: "Enter"

        }
}

const initialState = getIniitialState()
const saveLocalStorage = (state) => {
    localStorage.setItem("todosState", JSON.stringify(state))
}

const Slice = createSlice({
    name: "TodoList",
    initialState,
    reducers: {
        setNewTodo: (state, action) => {
            state.newTodo = action.payload
            saveLocalStorage(state)

        },
        setNewTodoJson: (state, action) => {
            state.newTodoJson = action.payload
            saveLocalStorage(state)

        },
        submitTodo: (state, action) => {
            const newestTodo = {
                id: state.todos.length + 1,
                title: action.payload.todo
            };

            state.todos.push(newestTodo)
            state.newTodo = ""
            saveLocalStorage(state)

        },

        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => {
                return todo.id !== action.payload.id;
            });
            saveLocalStorage(state)

        },

        removeAllTodo: (state, action) => {
            const NewRemoveAllTodo = {
                ...state,
                todos: []

            }
            saveLocalStorage(NewRemoveAllTodo)
            return NewRemoveAllTodo

        },

        moveUpTodo: (state, action) => {
            const todoListAfterMoveUp = [...state.todos];
            const indexOfTodoMoveUp = todoListAfterMoveUp.findIndex(
                (todo) => todo.id === action.payload.id
            );
            if (indexOfTodoMoveUp > 0) {
                const tempUp = todoListAfterMoveUp[indexOfTodoMoveUp]

                todoListAfterMoveUp.splice(indexOfTodoMoveUp, 1)

                todoListAfterMoveUp.splice(indexOfTodoMoveUp - 1, 0, tempUp)
            }

            const NewMoveUpTodo = {
                ...state,
                todos: todoListAfterMoveUp,
            }
            saveLocalStorage(NewMoveUpTodo)
            return NewMoveUpTodo

        },


        moveDownTodo: (state, action) => {

            const todoListAfterMoveDown = [...state.todos];
            const indexOfTodoMoveDown = todoListAfterMoveDown.findIndex(
                (todo) => todo.id === action.payload.id
            );

            if (indexOfTodoMoveDown < todoListAfterMoveDown.length - 1) {

                const tempDown = todoListAfterMoveDown[indexOfTodoMoveDown]

                todoListAfterMoveDown.splice(indexOfTodoMoveDown, 1)
                todoListAfterMoveDown.splice(indexOfTodoMoveDown + 1, 0, tempDown)
            }

            const NewMoveDownTodo = {
                ...state,
                todos: todoListAfterMoveDown

            }

            saveLocalStorage(NewMoveDownTodo)
            return NewMoveDownTodo

        },

        //////////////////// Start Drag & Drop //////////////////////

        setSelectIndex: (state, action) => {
            state.selectedIndex = action.payload
            saveLocalStorage(state)
        },
        setDraggedItemIndex: (state, action) => {
            state.draggedItemIndex = action.payload
            saveLocalStorage(state)

        },
        setDragStart: (state, action) => {
            saveLocalStorage(state)

        },
        DragOver: (state, action, index) => {
            const items = [...state.todos];
            const item = items[state.draggedItemIndex];
            items.splice(state.draggedItemIndex, 1);
            items.splice(index, 0, item);

            const NewDragOver = {
                ...state,
                todos: items
            }
            saveLocalStorage(NewDragOver)
            return NewDragOver

        },

        //////////////////// End Drag & Drop //////////////////////

        keyDownDelete: (state, action, index) => {

            const newItems = state.todos.filter((_, index) => index !== state.selectedIndex);

            const NewKeyDownDelete = {
                ...state,
                todos: newItems
            }
            saveLocalStorage(NewKeyDownDelete)
            return NewKeyDownDelete

        },

        ////////// For Press Delete Btn/////////

        setEditingIndex: (state, action) => {
            state.editingIndex = action.payload
            saveLocalStorage(state)

        },
        setEditingField: (state, action) => {
            state.editingField = action.payload
            saveLocalStorage(state)

        },

        keyDownEnter: (state, action) => {

            const items = [...state.todos];

            items[state.editingIndex][state.editingField] =
                state.editingField === "id" ? parseInt(state.newTodoJson, 10) : state.newTodoJson;
            saveLocalStorage(state)


        },

        blure: (state, action) => {
            const items = [...state.todos];
            items[state.editingIndex][state.editingField] =
                state.editingField === "id" ? parseInt(state.newTodoJson, 10) : state.newTodoJson;
            saveLocalStorage(state)

        }

    }
})

export const { setNewTodo, setNewTodoJson, submitTodo, deleteTodo, removeAllTodo, moveUpTodo, moveDownTodo, setSelectIndex, setDraggedItemIndex,
    DragOver, keyDownDelete, setEditingIndex, setEditingField, keyDownEnter, blure } = Slice.actions
export default Slice.reducer

import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid"

const initialState = {
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

const Slice = createSlice({
    name: "TodoList",
    initialState,
    reducers: {
        setNewTodo: (state, action) => {
            state.newTodo = action.payload

        },
        setNewTodoJson: (state, action) => {
            state.newTodoJson = action.payload
        },
        submitTodo: (state, action) => {
            const newestTodo = {
                id: state.todos.length + 1,
                title: action.payload.todo
            };

            state.todos.push(newestTodo)
            state.newTodo = ""
        },

        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => {
                return todo.id !== action.payload.id;
            });
            // .map((todo, newIndex) => ({ ...todo, id: (newIndex) + 1 }))


        },

        removeAllTodo: (state, action) => {
            return {
                ...state,
                todos: []
            }
        },

        moveUpTodo: (state, action) => {
            const todoListAfterMoveUp = [...state.todos];
            const indexOfTodoMoveUp = todoListAfterMoveUp.findIndex(
                (todo) => todo.id === action.payload.id
            );
            if (indexOfTodoMoveUp > 0) {
                const tempUp = todoListAfterMoveUp[indexOfTodoMoveUp]

                todoListAfterMoveUp.splice(indexOfTodoMoveUp, 1)                  // حذف آیتم از موقعیت فعلی

                todoListAfterMoveUp.splice(indexOfTodoMoveUp - 1, 0, tempUp)                  // اضافه کردن آیتم به موقعیت جدید
            }
            // const todoListAfterMoveUpRegular = todoListAfterMoveUp.map(
            //     (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
            // )

            return {
                ...state,
                todos: todoListAfterMoveUp,
            }

        },
        moveDownTodo: (state, action) => {

            const todoListAfterMoveDown = [...state.todos];
            const indexOfTodoMoveDown = todoListAfterMoveDown.findIndex(
                (todo) => todo.id === action.payload.id
            );

            if (indexOfTodoMoveDown < todoListAfterMoveDown.length - 1) {

                const tempDown = todoListAfterMoveDown[indexOfTodoMoveDown]

                todoListAfterMoveDown.splice(indexOfTodoMoveDown, 1)                  // حذف آیتم از موقعیت فعلی

                todoListAfterMoveDown.splice(indexOfTodoMoveDown + 1, 0, tempDown)                  // اضافه کردن آیتم به موقعیت جدید
            }

            return {
                ...state,
                todos: todoListAfterMoveDown
            }

        },

        //////////////////// Start Drag & Drop //////////////////////

        setSelectIndex: (state, action) => {
            state.selectedIndex = action.payload
        },
        setDraggedItemIndex: (state, action) => {
            state.draggedItemIndex = action.payload

        },
        setDragStart: (state, action) => {

        },
        DragOver: (state, action, index) => {
            const items = [...state.todos];
            const item = items[state.draggedItemIndex];
            items.splice(state.draggedItemIndex, 1);
            items.splice(index, 0, item);

            // const todoListAfterDragRegular = items.map((todo, newIndex) => ({ ...todo, id: newIndex + 1 }))
            return {
                ...state,
                todos: items
            }

        },

        //////////////////// End Drag & Drop //////////////////////

        keyDownDelete: (state, action, index) => {

            const newItems = state.todos.filter((_, index) => index !== state.selectedIndex);
            // const todoListAfterDragDeleteRegular = newItems.map(
            //     (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
            // );

            return {
                ...state,
                todos: newItems
            }
        },  ////////// For Press Delete Btn/////////

        setEditingIndex: (state, action) => {
            state.editingIndex = action.payload

        },
        setEditingField: (state, action) => {
            state.editingField = action.payload

        },

        keyDownEnter: (state, action) => {

            const items = [...state.todos];

            items[state.editingIndex][state.editingField] = state.editingField === "id" ? parseInt(state.newTodoJson, 10) : state.newTodoJson;


            // const todoListAfterDragEnterRegular = items.map(
            //     (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
            // );

        },

        blure: (state, action) => {
            const items = [...state.todos];
            items[state.editingIndex][state.editingField] = state.editingField === "id" ? parseInt(state.newTodoJson, 10) : state.newTodoJson;

            // return {
            //     ...state,
            //     todos: items
            // }
        }

    }
})

export const { setNewTodo, setNewTodoJson, submitTodo, deleteTodo, removeAllTodo, moveUpTodo, moveDownTodo, setSelectIndex, setDraggedItemIndex,
    DragOver, keyDownDelete, setEditingIndex, setEditingField, keyDownEnter, blure } = Slice.actions
export default Slice.reducer


// const todoListAfterMoveUpRegular = todoListAfterMoveUp.map(
//     (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
// );
// state.push(todoListAfterMoveUpRegular);
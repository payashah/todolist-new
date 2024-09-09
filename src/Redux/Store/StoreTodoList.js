import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid"

const Slice = createSlice({
    name: "TodoList",
    initialState: [],
    reducers: {
        submitTodo: (state, action) => {
            const newestTodo = {
                id: state.length,
                title: action.payload.todo
            };

            state.push(newestTodo)
        },

        deleteTodo: (state, action) => {
            const todoListAfterDelete = state.filter((todo) => {
                return todo.id !== action.payload.id;
            });

            const todoListAfterDeleteRegular = todoListAfterDelete.map(
                (todo, newindex) => ({ ...todo, id: (newindex) + 1 })
            );
            return todoListAfterDeleteRegular
        },

        removeAllTodo: (state, action) => {
            return []

        },

        moveUpTodo: (state, action) => {

            const todoListAfterMoveUp = [...state];
            const indexOfTodoToMoveUp = todoListAfterMoveUp.findIndex(
                (todo) => todo.id === action.payload.id
            );

            if (indexOfTodoToMoveUp > 0) {
                const temp = todoListAfterMoveUp[indexOfTodoToMoveUp]

                // حذف آیتم از موقعیت فعلی

                todoListAfterMoveUp.splice(indexOfTodoToMoveUp, 1)

                // اضافه کردن آیتم به موقعیت جدید

                todoListAfterMoveUp.splice(indexOfTodoToMoveUp - 1, 0, temp)
            }

            return todoListAfterMoveUp



            // if (indexOfTodoToMoveUp > 0) {
            //     [todoListAfterMoveUp[indexOfTodoToMoveUp - 1], [todoListAfterMoveUp[indexOfTodoToMoveUp]]] =
            //         [todoListAfterMoveUp[indexOfTodoToMoveUp], todoListAfterMoveUp[indexOfTodoToMoveUp - 1]]
            // }
            // const todoListAfterMoveUpRegular = todoListAfterMoveUp.map(
            //     (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
            // );
            // return (todoListAfterMoveUpRegular);

        }
    }
})

export const { submitTodo, deleteTodo, removeAllTodo, moveUpTodo } = Slice.actions
export default Slice.reducer


// const todoListAfterMoveUpRegular = todoListAfterMoveUp.map(
//     (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
// );
// state.push(todoListAfterMoveUpRegular);
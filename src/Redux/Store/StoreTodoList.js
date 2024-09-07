import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"

const Slice = createSlice({
    name: "TodoList",
    initialState: [],
    reducers: {
        submitTodo: (state, action) => {
            const newestTodo = {
                id: uuidv4(),
                title: action.payload.todo
            };

            state.push(newestTodo)
        },

        deleteTodo: (state, action) => {
            const todoListAfterDelete = state.filter((todo) => {
                return todo.id !== action.payload.id;
            });
            const todoListAfterDeleteRegular = todoListAfterDelete.map(
                (todo) => ({ ...todo, id: uuidv4() + 1 })
            );
            return todoListAfterDeleteRegular
        },

        removeAllTodo: (state, action) => {
            return []

        },

        moveUpTodo: (state, action) => {

        }
    }
})

export const { submitTodo, deleteTodo, removeAllTodo } = Slice.actions
export default Slice.reducer 
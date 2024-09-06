import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: "TodoList",
    initialState: [],
    reducers: {
        submitTodo: (state, action) => {
            return action.payload
        }
        // deleteTodo: (state, action) => {
        //     const todoListAfterDelete = state.filter((todo) => {
        //         return todo.id !== action.payload.id
        //     })
        //     return todoListAfterDelete
        // }
    }
})

export const { submitTodo, deleteTodo } = Slice.actions
export default Slice.reducer
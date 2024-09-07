import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name: "TodoList",
    initialState: [],
    reducers: {
        submitTodo: (state, action) => {
            const newestTodo = {
                id: new Date(),
                title: action.payload.todo
            };

            state.push(newestTodo)
        },
        // deleteTodo: (state, action) => {
        //     const todoListAfterDelete = state.filter((todo, todoID, index) => {
        //         return todoID !== index;
        //     });
        //     const todoListAfterDeleteRegular = todoListAfterDelete.map(
        //         (todo, newIndex) => ({ ...todo, id: newIndex + 1 })
        //     );
        //     return todoListAfterDeleteRegular
        // }
    }
})

export const { submitTodo, deleteTodo } = Slice.actions
export default Slice.reducer 
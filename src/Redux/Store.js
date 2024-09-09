import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./Store/StoreTodoList"

const store = configureStore({
    reducer: {
        todoListStore: todoListReducer
    }
})

export default store
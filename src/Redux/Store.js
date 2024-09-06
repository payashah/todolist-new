import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./Store/StoreTodoList"

const Store = configureStore({
    reducer: todoListReducer
})

export default Store
import { configureStore } from "@reduxjs/toolkit";
import { todoReducer, counterReducer } from "./reducer";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    counter: counterReducer,
  },
});
export default store;

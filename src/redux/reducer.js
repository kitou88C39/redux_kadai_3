import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    onCountUp: (state, action) => {
      state.value += action.payload;
    },
    onCountDown: (state, action) => {
      state.value -= action.payload;
    },
  },
});
export const { onCountUp, onCountDown } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;

const initialState = {
  todos: [],
};

const addTodoReducer = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    //todoを追加
    addTodos: (state, action) => {
      return [...state, action.payload];
    },
    //todoを削除
    removeTodos: (state, action) => {
      return state?.filter((item) => item.id !== action.payload);
    },
    //todoを更新
    updateTodos: (state, action) => {
      return state?.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            balance: action.payload.balance,
          };
        }
        return todo;
      });
    },
  },
});

export const { addTodos, removeTodos, updateTodos } = addTodoReducer.actions;
export const todoReducer = addTodoReducer.reducer;

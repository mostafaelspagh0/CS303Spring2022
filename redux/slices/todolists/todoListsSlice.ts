import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const initialState: TodoList = {
  lastId: 0,
  todos: [],
  isRefresh: false,
  error: null,
};

export const loadTasksFromServer = createAsyncThunk(
  "todolists/loadTasksFromServer",
  async () =>
    fetch("https://jsonplaceholder.typicode.com/todos?userId=1").then((res) =>
      res.json()
    )
);

export const todoListsSlice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string }>) => {
      const todo = {
        userId: 1,
        id: state.lastId + 1,
        title: action.payload.title,
        completed: false,
      };
      state.todos.push(todo);
      state.lastId = todo.id;
    },
    deleteTodo: (state, action: PayloadAction<{ todoId: number }>) => {
      const todoId = action.payload.todoId;
      const todoIndex = state.todos.findIndex((todo) => todo.id === todoId);
      if (todoIndex !== -1) {
        state.todos.splice(todoIndex, 1);
      }
    },
    toggleTodoDone: (state, action: PayloadAction<{ todoId: number }>) => {
      const todoId = action.payload.todoId;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: {
    [loadTasksFromServer.fulfilled.type]: (state, action) => {
      state.todos = action.payload;
      let maxId = 0;
      for (const todo of action.payload) {
        if (todo.id > maxId) {
          maxId = todo.id;
        }
      }
      state.lastId = maxId;
      state.error = null;
      state.isRefresh = false;
    },
    [loadTasksFromServer.rejected.type]: (state, action) => {
      state.isRefresh = false;
      state.error = action.error.message;
    },
    [loadTasksFromServer.pending.type]: (state, action) => {
      state.isRefresh = true;
    },
  },
});

export const { addTodo, deleteTodo, toggleTodoDone } = todoListsSlice.actions;
export const selectTodoList = (state: RootState) => state.todos;

export default todoListsSlice.reducer;

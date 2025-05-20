import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types/Todo";
import { loadTodos, saveTodos } from "../../utils/localStorage";

const initialState: Todo[] = loadTodos();

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        content: action.payload,
        completed: false,
      };
      state.push(newTodo);
      saveTodos(state);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const updated = state.filter((todo) => todo.id !== action.payload);
      saveTodos(updated);
      return updated;
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
      saveTodos(state);
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) => {
      const todo = state.find((t) => t.id === action.payload.id);
      if (todo) todo.content = action.payload.content;
      saveTodos(state);
    },
    reorderTodos: (
      state,
      action: PayloadAction<{ startIndex: number; endIndex: number }>
    ) => {
      const { startIndex, endIndex } = action.payload;
      const [removed] = state.splice(startIndex, 1);
      state.splice(endIndex, 0, removed);
      saveTodos(state);
    },
    setAllTodos: (state, action: PayloadAction<Todo[]>) => {
      saveTodos(action.payload);
      return action.payload;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  reorderTodos,
  setAllTodos,
} = todoSlice.actions;
export default todoSlice.reducer;

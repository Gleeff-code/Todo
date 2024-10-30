import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TodoFilter } from '@/pages/Todos/types/TodoFilter';
import type { Todo } from '@/types/Todo';

interface TodoState {
  todos: Todo[];
  todo: Todo | null;
  activeTodoFilter: TodoFilter;
}

const initialState: TodoState = {
  todos: [],
  todo: null,
  activeTodoFilter: 'all',
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
    setTodo(state, action: PayloadAction<Todo | null>) {
      state.todo = action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos = [...state.todos, action.payload];
    },
    changeTodo(state, action: PayloadAction<Partial<Todo>>) {
      state.todos = state.todos.map((todo) => (todo.id === action.payload.id ? { ...todo, ...action.payload } : todo));
    },
    setActiveTodoFilter(state, action: PayloadAction<TodoFilter>) {
      state.activeTodoFilter = action.payload;
    },
  },
});

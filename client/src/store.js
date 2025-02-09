import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import todoReducer from './features/todoSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
    users: userReducer,
  },
});
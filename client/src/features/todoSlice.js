import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(`${API_URL}/todos`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await axios.post(`${API_URL}/todos`, todo, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  const response = await axios.put(`${API_URL}/todos/${todo.id}`, {
    title: todo.title,  // Ensure title is sent
    completed: todo.completed,  // Ensure completed is sent
  }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;  // Expect updated todo from backend
});


export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`${API_URL}/todos/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
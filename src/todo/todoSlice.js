import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        postTodos: (state, action) => {
            state.todos = action.payload;
        },
    },
});

export const { postTodos } = todoSlice.actions;

export default todoSlice.reducer;

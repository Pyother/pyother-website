import { createSlice } from '@reduxjs/toolkit';

const EmailSlice = createSlice({
    name: 'email',
    initialState: {
        email: null,
        topic: null,
        message: null,
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setTopic: (state, action) => {
            state.topic = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        eraseAll: (state) => {
            state.email = null;
            state.topic = null;
            state.message = null;
        }
    },
});

export const { setEmail, setTopic, setMessage, eraseAll } = EmailSlice.actions;
export default EmailSlice.reducer;
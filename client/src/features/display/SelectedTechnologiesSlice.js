import { createSlice } from '@reduxjs/toolkit';

export const selectedTechnologiesSlice = createSlice({
    name: 'selectedTechnologies',
    initialState: {
        value: [],
    },
    reducers: {
        setSelectedTechnologies: (state, action) => {
            state.value = action.payload;
        },
        pushTechnology: (state, action) => {
            state.value.push(action.payload);
        },
        removeTechnology: (state, action) => {
            state.value = state.value.filter(technology => technology !== action.payload);
        },
    },
});

export const { setSelectedTechnologies, pushTechnology, removeTechnology } = selectedTechnologiesSlice.actions;
export default selectedTechnologiesSlice.reducer;
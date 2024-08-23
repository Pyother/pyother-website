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
            if (!state.value.includes(action.payload) && action.payload !== '') {
                state.value.push(action.payload);
            }
            document.getElementById('projects').scrollIntoView({behavior: 'smooth'});
        },
        removeTechnology: (state, action) => {
            state.value = state.value.filter(technology => technology !== action.payload);
            document.getElementById('projects').scrollIntoView({behavior: 'smooth'});
        },
    },
});

export const { setSelectedTechnologies, pushTechnology, removeTechnology } = selectedTechnologiesSlice.actions;
export default selectedTechnologiesSlice.reducer;
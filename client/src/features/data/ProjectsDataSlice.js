import { createSlice } from '@reduxjs/toolkit';

const projectsDataSlice = createSlice({
    name: 'projectsData',
    initialState: {
        projects: [],
        status: 'idle',
    },
    reducers: {
        setProjectsData: (state, action) => {
            state.projects = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    }
});

export const { setProjectsData, setStatus } = projectsDataSlice.actions;
export default projectsDataSlice.reducer;
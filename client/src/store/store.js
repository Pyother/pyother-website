import { configureStore } from '@reduxjs/toolkit';
import projectsDataReducer from '../features/data/ProjectsDataSlice';

const store = configureStore({
    reducer: {
        projectsData: projectsDataReducer,
        
    }
});

export default store;
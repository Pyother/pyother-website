import { configureStore } from '@reduxjs/toolkit';
import projectsDataReducer from '../features/data/ProjectsDataSlice';
import selectedTechnologiesReducer from '../features/display/SelectedTechnologiesSlice';

const store = configureStore({
    reducer: {
        projectsData: projectsDataReducer,
        selectedTechnologies: selectedTechnologiesReducer,
    }
});

export default store;
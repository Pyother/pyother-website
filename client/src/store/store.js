import { configureStore } from '@reduxjs/toolkit';
import projectsDataReducer from '../features/data/ProjectsDataSlice';
import servicesDataReducer from '../features/data/ServicesDataSlice';
import selectedTechnologiesReducer from '../features/display/SelectedTechnologiesSlice';

const store = configureStore({
    reducer: {
        projectsData: projectsDataReducer,
        servicesData: servicesDataReducer,
        selectedTechnologies: selectedTechnologiesReducer,
    }
});

export default store;
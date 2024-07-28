import { configureStore } from '@reduxjs/toolkit';
import deviceTypeReducer from '../features/display/DeviceTypeSlice';
import projectsDataReducer from '../features/data/ProjectsDataSlice';
import servicesDataReducer from '../features/data/ServicesDataSlice';
import selectedTechnologiesReducer from '../features/display/SelectedTechnologiesSlice';

const store = configureStore({
    reducer: {
        deviceType: deviceTypeReducer,
        projectsData: projectsDataReducer,
        servicesData: servicesDataReducer,
        selectedTechnologies: selectedTechnologiesReducer,
    }
});

export default store;
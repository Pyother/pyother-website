import { createSlice } from '@reduxjs/toolkit';

export const servicesDataSlice = createSlice({
    name: 'servicesData',
    initialState: {
        services: [],
        status: 'idle',
    },
    reducers: {
        setServicesData: (state, action) => {
            state.services = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    }
});

export const { setServicesData, setStatus } = servicesDataSlice.actions;
export default servicesDataSlice.reducer;
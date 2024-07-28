import { createSlice } from '@reduxjs/toolkit';

const deviceTypeSlice = createSlice({
    name: 'deviceType',
    initialState: {
        value: window.innerWidth > 960 ? 'desktop' : 'mobile'
    },
    reducers: {
        setDeviceType: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setDeviceType } = deviceTypeSlice.actions;
export default deviceTypeSlice.reducer;
import { createTheme } from '@mui/material/styles';

const colorsTheme = createTheme({
    palette: {
        primary: {
            main: '#003366',
        },
        secondary: {
            main: '#ffcc00',
        },
        dark: {
            main: '#1c2028'
        },
        light: {
            main: '#f0f0f0'
        },
        accentGreen: {
            main: '#00d67d',
            light: '#66e6a7',
            dark: '#00a35e'
        },
        accentBlue: {
            main: '#91b9fc',
            light: '#c0d4ff',
            dark: '#6a8ecb'
        }
        
    }
});

export default colorsTheme;
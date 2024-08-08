import React from 'react';
import {
    Stack,
    Typography,

} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import colorsTheme from '../../assets/themes/colorsTheme';

const ServiceItem = ({ name, description, photo }) => {
    return (
        <ThemeProvider theme={colorsTheme}>
            <Stack className="service-item">
                <div 
                    className="photo-container center"
                    style={{backgroundColor: 'inherit !important'}}
                >
                    {photo && <img src={`data:image/jpeg;base64,${photo}`} alt={name} className="photo"
                        style={{width: '3em', height: '3em'}}
                    />}
                </div>
                <Typography 
                    variant="h6" 
                    className="center"
                    style={{marginBottom: '0.5em'}}
                >
                    {name}
                </Typography>
                <Typography 
                    variant="body1" 
                    className="description"
                    style={{textAlign: 'center', marginBottom: '0.5em', color: 'grey'}}
                >
                    {description}
                </Typography>
            </Stack>
        </ThemeProvider>
    );
}

export default ServiceItem;
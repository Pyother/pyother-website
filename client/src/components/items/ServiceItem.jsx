import React from 'react';
import {
    Stack,
    Typography,

} from '@mui/material';

const ServiceItem = ({ name, description }) => {
    return (
        <Stack className="service-item">
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body1">{description}</Typography>
        </Stack>
    );
}

export default ServiceItem;
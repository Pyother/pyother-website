import React, { useEffect } from 'react';

import { 
    Stack,
    Typography,

} from '@mui/material';



export const Content = () => {

    return(
        <Stack className="content">
            <Typography variant="h5">
                Projekty
            </Typography>
            <Typography variant="h5">
                Fotografia
            </Typography>
        </Stack>
    )
}
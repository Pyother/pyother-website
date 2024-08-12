import React from 'react';
import {
    Stack,
    Typography,
    Divider,
} from '@mui/material';

export const SectionHeadline = ({ title, subtitle, section_id, position, fullMode }) => {
    
    return (
        <Stack className="section-headline center" spacing={2} id={section_id}>
            <Typography 
                variant="h6" 
                className="section-headline-title center"
            >
                {title}
            </Typography>
            <Typography 
                variant="p" 
                className={ fullMode ? "section-headline-subtitle center full" : "section-headline-subtitle center scaled" }
                style={{ 
                    width: "100% !important",
                    marginLeft: "1em"
                }}
            >
                {subtitle}
            </Typography>
        </Stack>
    )
}
import React from 'react';
import {
    Stack,
    Typography,
    Divider,
} from '@mui/material';

export const SectionHeadline = ({ title, subtitle, section_id, position }) => {
    return (
        <Stack className="section-headline center" spacing={2} id={section_id}>
            <Typography 
                variant="h6" 
                className={ position === "center" ? "section-headline-title center" : "section-headline-title-left" }
            >
                {title}
            </Typography>
            <Typography 
                variant="p" 
                className={ position === "center" ? "section-headline-subtitle center" : "section-headline-subtitle-left" }
                style={{ 
                    width: position !== "center" ? "100% !important" : "auto",
                    marginLeft: position !== "center" ? "1em" : "0px"
                }}
            >
                {subtitle}
            </Typography>
        </Stack>
    )
}
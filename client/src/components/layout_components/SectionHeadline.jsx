import React from 'react';
import {
    Stack,
    Typography,
    Divider,
} from '@mui/material';

export const SectionHeadline = ({ title, subtitle, section_id }) => {
    return (
        <Stack className="section-headline center" spacing={2} id={section_id}>
            <Typography variant="h6" className="section-headline-title center">{title}</Typography>
            <Typography variant="p" className="section-headline-subtitle center">{subtitle}</Typography>
        </Stack>
    )
}
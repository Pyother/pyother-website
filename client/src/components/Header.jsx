// * React and Redux:
import React from 'react';

// * MUI:
import { 
    Stack,
    IconButton,
    Typography,
    Button,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Header = () => {
    return (
        <Stack className="header">
            <Stack direction="row" spacing={2} className="media-stack">
                <IconButton className="icon-button">
                    <FacebookIcon />
                </IconButton>
                <IconButton className="icon-button">
                    <InstagramIcon />
                </IconButton>
                <IconButton className="icon-button">
                    <GitHubIcon />
                </IconButton>
            </Stack>
            <Typography variant="h4" align="center" className="title">
                Piotr Sobol 
            </Typography>
            <Typography variant="p" align="center" className="subtitle">
                Frontend Developer
            </Typography>
            <Stack direction="row" spacing={2} className="navigation-stack">
                <Button className="icon-button">
                    Projekty
                </Button>
                <Button className="icon-button">
                    Fotografia
                </Button>
            </Stack>
        </Stack>
    )   
}
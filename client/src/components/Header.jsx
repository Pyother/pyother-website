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
                <IconButton>
                    <FacebookIcon />
                </IconButton>
                <IconButton>
                    <InstagramIcon />
                </IconButton>
                <IconButton>
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
                <Button>
                    Projekty
                </Button>
                <Button>
                    Fotografia
                </Button>
            </Stack>
        </Stack>
    )   
}
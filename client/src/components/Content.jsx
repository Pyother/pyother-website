// * React and Redux:
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// * MUI:
import { 
    Grid,
    Stack,
    Typography,
} from '@mui/material';

// * Own components:
import ProjectItem from './items/ProjectItem';

export const Content = () => {

    const projectsData = useSelector(state => state.projectsData);

    return (
        <Stack className="content">
            <Typography variant="h5" className="section-title">
                Projekty
            </Typography>
            {
                (projectsData.status === 'idle' || projectsData.status === 'error') ?
                <>Ładowanie ...</> : 
                <Grid container spacing={3}>
                    {projectsData.projects.map((project) => (
                        <Grid item xs={12} sm={6} md={4} key={project._id}>
                            <ProjectItem
                                name={project.name}
                                description={project.description}
                                photo={project.photo}
                            />
                        </Grid>
                    ))}
                </Grid>
            }
            <Typography variant="h5" className="section-title">
                Fotografia
            </Typography>
        </Stack>
    )
}

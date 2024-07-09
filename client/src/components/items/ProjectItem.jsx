// * React and Redux:
import React from 'react';

// * MUI:
import { 
    Stack,
    Typography,
} from '@mui/material';

const ProjectItem = ({ name, description, photo }) => {
    return (
        <Stack className="project-item">
            <div className="photo-container center">
                {photo && <img src={`data:image/jpeg;base64,${photo}`} alt={name} className="photo"/>}
            </div>
            <Typography variant="h6" className="project-title">{name}</Typography>
            <p>{description}</p>
        </Stack>
    )
}

export default ProjectItem;

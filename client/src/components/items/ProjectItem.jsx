// * React and Redux:
import React from 'react';

// * MUI:
import { 
    Stack,
    Typography,
    Chip,
    Avatar,
} from '@mui/material';

// * Own components:
import findIcon from '../../services/data_display/findIcon';

const ProjectItem = ({ name, description, photo, technologies }) => {
    return (
        <Stack className="project-item">
            <div className="photo-container center">
                {photo && <img src={`data:image/jpeg;base64,${photo}`} alt={name} className="photo"/>}
            </div>
            <Typography variant="h6" className="project-title">{name}</Typography>
            <p>{description}</p>
            <Stack direction="row" spacing={1}>
                {
                    technologies.map((technology) => {
                        const iconData = findIcon(technology.toLowerCase());
                        if (iconData) {
                            const { icon: IconComponent, backgroundColor, color } = iconData;
                            return (
                                <Chip
                                    className='chip'
                                    clickable
                                    key={technology}
                                    avatar={
                                        <Avatar style={{ backgroundColor, fontSize: 'larger' }}>
                                            <IconComponent style={{ color }} />
                                        </Avatar>
                                    }
                                    label={technology}
                                    variant="outlined"
                                />
                            );
                        }
                        return <Chip key={technology} label={technology} variant="outlined" />;
                    })
                }
            </Stack>
        </Stack>
    )
}

export default ProjectItem;

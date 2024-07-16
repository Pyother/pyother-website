// * React and Redux:
import React from 'react';

// * MUI & React Icons:
import { 
    Grid,
    Stack,
    Typography,
    Chip,
    Avatar,
    IconButton,
    Tooltip,
} from '@mui/material';
import { IoIosMore } from "react-icons/io";
import { IoHourglassOutline } from "react-icons/io5";
import { PiGitCommitDuotone } from "react-icons/pi";
import { MdDone } from "react-icons/md";

// * Own components:
import findIcon from '../../services/data_display/findIcon';

// * Other:
import moment from 'moment';

const ProjectItem = ({ name, description, photo, technologies, githubPage, isPublic, status, lastCommit }) => {

    const lastCommitFormatted = lastCommit ? moment(lastCommit).format('DD.MM.YYYY HH:mm:ss') : 'Brak danych';

    return (
        <Stack className="project-item">
            <div className="photo-container center">
                {photo && <img src={`data:image/jpeg;base64,${photo}`} alt={name} className="photo"/>}
            </div>
            <Grid container>
                <Grid item xs={11} md={11}>
                    <p style={{color: 'grey', margin: '0', fontSize: 'small'}}>
                        {isPublic ? 'Projekt służbowy' : 'Projekt prywatny'}
                    </p>
                </Grid>
                <Tooltip title={status ? 'Projekt zakończony' : 'Projekt w trakcie realizacji'} arrow>
                    <Grid item xs={1} md={1} style={{display: 'flex', justifyContent: 'right'}}>
                        {!status ? <IoHourglassOutline style={{color: 'orange'}} /> : <MdDone style={{color: 'green'}} />}
                    </Grid>
                </Tooltip>
            </Grid>
            <Typography variant="h6" className="project-title">{name}</Typography>
            <p>{description}</p>
            <Chip
                className="chip"
                avatar={
                    <Avatar className="avatar" style={{background: 'inherit'}}>
                        <PiGitCommitDuotone />
                    </Avatar>
                }
                label={lastCommitFormatted}
                variant="outlined"
                style={{marginBottom: '1em', width: 'fit-content'}}
            />
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
            <Tooltip title="Pokaż wiecej" arrow>
                <IconButton 
                    className="more-button icon-button" 
                    disableRipple
                    disableFocusRipple
                    onClick = {() => window.location.href = githubPage }
                >
                    <IoIosMore />
                </IconButton>
            </Tooltip>
        </Stack>
    )
}

export default ProjectItem;

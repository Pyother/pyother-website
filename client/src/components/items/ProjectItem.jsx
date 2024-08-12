// * React and Redux:
import React from 'react';
import { useSelector } from 'react-redux';

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

// * Translations: 
import { useTranslation } from 'react-i18next';

// * Other:
import moment from 'moment';

const ProjectItem = ({ id, name, description, photo, technologies, githubPage, isPublic, status, lastCommit, onTechnologyClick }) => {

    const { t } = useTranslation();
    const selectedTechnologies = useSelector(state => state.selectedTechnologies.value) || [];
    const lastCommitFormatted = lastCommit ? moment(lastCommit).format('DD.MM.YYYY HH:mm:ss') : 'Brak danych';

    return (
        <Stack className="project-item" id={id}>
            <div className="photo-container center">
                {photo && <img src={`data:image/jpeg;base64,${photo}`} alt={name} className="photo"/>}
            </div>
            <Grid container>
                <Grid item xs={11} md={11}>
                    <p style={{color: 'grey', margin: '0', fontSize: 'small'}}>
                        {   
                            isPublic ? 
                            t('content.project_item.public') : 
                            t('content.project_item.private')
                        }
                    </p>
                </Grid>
                <Tooltip 
                    title={
                        status ? 
                        t('content.project_item.tooltip_project_finished') : 
                        t('content.project_item.tooltip_project_in_progress')
                    } 
                    arrow
                >
                    <Grid item xs={1} md={1} style={{display: 'flex', justifyContent: 'right'}}>
                        {!status ? <IoHourglassOutline style={{color: 'orange'}} /> : <MdDone style={{color: 'green'}} />}
                    </Grid>
                </Tooltip>
            </Grid>
            <Typography variant="h6" className="project-title">{name}</Typography>
            <Typography variant="p" className="description" style={{marginBottom: '1em'}}>{description}</Typography>
            <p style={{margin: '0', fontSize: 'small'}}>
                {t('content.project_item.last_update')}:
            </p>
            <Stack direction="row" spacing={1} style={{marginTop: '0.5em', marginBottom: '1em'}}>
                <PiGitCommitDuotone />
                <p style={{fontSize: 'small', color: 'grey'}}>{lastCommitFormatted}</p>
            </Stack>
            <Stack direction="row" spacing={1} style={{flexWrap: 'wrap'}}>
                {
                    technologies.map((technology) => {
                        const iconData = findIcon(technology.toLowerCase());
                        if (iconData) {
                            const { icon: IconComponent, backgroundColor, color } = iconData;
                            return (
                                <Chip
                                    className={selectedTechnologies.includes(technology) ? 'chip selected' : 'chip'}
                                    clickable
                                    key={technology}
                                    avatar={
                                        <Avatar style={{ backgroundColor, fontSize: 'larger' }}>
                                            <IconComponent style={{ color }} />
                                        </Avatar>
                                    }
                                    label={technology}
                                    variant="outlined"
                                    onClick={() => {onTechnologyClick(technology)}}
                                    style={{marginBottom: '0.5em'}}
                                />
                            );
                        }
                        return <Chip 
                            key={technology} 
                            label={technology}
                            variant="outlined"
                        />;
                    })
                }
            </Stack>
            <Chip
                className="chip bg-secondary"
                clickable
                label={t('content.project_item.button_link')}
                onClick = {() => window.location.href = githubPage }
                style={{margin: '0.5em 0em', width: '100%'}}
            />
        </Stack>
    )
}

export default ProjectItem;

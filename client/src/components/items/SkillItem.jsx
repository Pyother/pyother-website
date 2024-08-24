// * React and Redux:
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pushTechnology } from '../../features/display/SelectedTechnologiesSlice';

// * MUI:
import {
    Accordion,
    AccordionSummary, 
    AccordionDetails,
    Stack,
    Chip,
    Typography,
    IconButton,
    Avatar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@mui/material/styles';
import colorsTheme from '../../assets/themes/colorsTheme';

// * Own components:
import countTechOccurrences from '../../services/data_display/countTechOccurrences';
import findIcon from '../../services/data_display/findIcon';
import IconPainter from '../../services/data_display/IconPainter';

// * i18next:
import { useTranslation } from 'react-i18next';

const SkillItem = ({ name, possibleNames, description }) => {

    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const projectsData = useSelector(state => state.projectsData.projects);
    const iconData = findIcon(possibleNames[0]);

    if (!iconData) {
        return null; 
    }

    const { icon: IconComponent, backgroundColor, color } = iconData;
    const occurrences = countTechOccurrences(possibleNames, projectsData).occurences;

    return (
        <ThemeProvider theme={colorsTheme}>
            <Accordion className='accordion'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{color: 'white'}} />}
                    style={{color: 'white'}}
                >
                    <Stack direction="row" spacing={2} style={{display: 'flex', alignItems: 'center'}}>
                        <Avatar className='bg-secondary' >
                            <IconComponent style={{color: backgroundColor}} />
                        </Avatar>
                        <Typography variant="h6">{name}</Typography>
                        <Chip
                            label={
                                `${occurrences} 
                                ${occurrences > 4 || occurrences === 0 
                                ? t('header.about.skills.related_projects_lowercase_multiple') 
                                : t('header.about.skills.related_projects_lowercase')}`
                            }
                            style={{color: 'grey', marginLeft: '1em'}}
                            variant="filled"
                            size="small" 
                        />
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={2}>
                        <Typography variant="p" style={{color: 'white'}}>{t('header.about.skills.related_projects')}</Typography>
                        <Stack spacing={1} direction="row" style={{flexWrap: 'wrap'}}>
                            {
                                countTechOccurrences(possibleNames, projectsData).projects.map(project => {

                                    console.log(project);

                                    return (
                                        <Chip 
                                            key={project.id}
                                            label={ i18n.language === 'pl' ? project.name_pl : project.name_en }
                                            className='chip'
                                            clickable
                                            onClick={() => {
                                                document.getElementById(project.id).scrollIntoView({behavior: 'smooth'});
                                            }}
                                            style={{width: 'fit-content', marginBottom: '1em'}}
                                        />
                                    )
                                })
                            }
                        </Stack>
                        <Typography variant="p" style={{color: 'white'}}>{t('header.about.skills.experience')}</Typography>
                        <Typography variant="p" className="description">{description}</Typography>
                    </Stack>
                </AccordionDetails>
            </Accordion>    
        </ThemeProvider>
    )
}

export default SkillItem;
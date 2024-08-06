// * React and Redux:
import React from 'react';
import { useSelector } from 'react-redux';

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

const SkillItem = ({ name, possibleNames }) => {

    const projectsData = useSelector(state => state.projectsData.projects);
    const iconData = findIcon(possibleNames[0]);

    if (!iconData) {
        return null; 
    }

    const { icon: IconComponent, backgroundColor, color } = iconData;

    return (
        <ThemeProvider theme={colorsTheme}>
            <Accordion className='accordion'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{color: 'white'}} />}
                    style={{color: 'white'}}
                >
                    <Stack direction="row" spacing={2} style={{display: 'flex', alignItems: 'center'}}>
                        <Avatar className='bg-secondary'>
                            <IconComponent style={{color: backgroundColor}} />
                        </Avatar>
                        <h3>{name}</h3>
                        <Chip
                            label={`${countTechOccurrences(possibleNames, projectsData).occurences} projekty`}
                            style={{color: 'white'}}
                            variant="outlined"
                        />
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={2}>
                        <Typography variant="p" style={{color: 'white', fontSize: 'small', fontWeight: 'bold'}}>Powiązane projekty</Typography>
                        <Stack spacing={1} direction="row" style={{flexWrap: 'wrap'}}>
                            {
                                countTechOccurrences(possibleNames, projectsData).projects.map(project => {
                                    return (
                                        <Chip 
                                            key={project.id}
                                            label={project.project_name}
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
                        <Typography variant="p" style={{color: 'white', fontSize: 'small', fontWeight: 'bold'}}>Doświadczenie</Typography>
                        
                    </Stack>
                </AccordionDetails>
            </Accordion>    
        </ThemeProvider>
    )
}

export default SkillItem;
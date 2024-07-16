// * React and Redux:
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    setSelectedTechnologies, 
    pushTechnology, 
    removeTechnology 
} from '../features/display/SelectedTechnologiesSlice';

// * MUI and React Icons:
import { 
    Grid,
    Stack,
    Typography,
    Chip,
    Avatar,
    Button,
    RadioGroup,
    Radio,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { VscSettings } from "react-icons/vsc";
import { BsSortDown } from "react-icons/bs";
import { BsSortUp } from "react-icons/bs";
import { PiRadioButtonThin } from "react-icons/pi";

// * Own components:
import colorsTheme from '../assets/themes/colorsTheme';
import ProjectItem from './items/ProjectItem';
import StyledDialog from './styled_components/StyledDialog';
import findIcon from '../services/data_display/findIcon';

export const Content = () => {

    const dispatch = useDispatch();
    const projectsData = useSelector(state => state.projectsData);
    const selectedTechnologies = useSelector(state => state.selectedTechnologies.value) || [];
    const [tempSelectedTechnologies, setTempSelectedTechnologies] = useState(selectedTechnologies);
    const [sortDialogOpen, setSortDialogOpen] = useState(false);
    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        if (projectsData.projects) {
            const allTechnologies = projectsData.projects
                .flatMap(project => project.technologies)
                .filter((value, index, self) => self.indexOf(value) === index);
            setTechnologies(allTechnologies);
        }
    }, [projectsData.projects]);

    const projectsFilteredByTechnology = selectedTechnologies.length === 0
        ? projectsData.projects
        : projectsData.projects.filter(project =>
            project.technologies.some(tech => selectedTechnologies.includes(tech))
    );

    return (
        <ThemeProvider theme={colorsTheme}>
            <StyledDialog
                open={sortDialogOpen}
                handleClose={() => setSortDialogOpen(false)}
                title="Sortowanie"
                buttonTitle="Zastosuj"
                children={
                    <Stack>
                        <Typography variant="p">Technologie</Typography>
                        <Stack direction="row" spacing={1} style={{padding: '1em 0em', flexWrap: 'wrap'}}>
                            {technologies.map((technology) => {
                                const iconData = findIcon(technology.toLowerCase());
                                if (iconData) {
                                    const { icon: IconComponent, backgroundColor, color } = iconData;
                                    return (
                                        <Chip
                                            className={
                                                tempSelectedTechnologies.includes(technology) ? 'chip selected' : 'chip'
                                            }
                                            clickable
                                            key={technology}
                                            avatar={
                                                <Avatar style={{ backgroundColor, fontSize: 'larger' }}>
                                                    <IconComponent style={{ color }} />
                                                </Avatar>
                                            }
                                            label={technology}
                                            variant="outlined"
                                            style={{ 
                                                marginBottom: '0.5em'
                                            }}
                                            onClick={() => {
                                                if (tempSelectedTechnologies.includes(technology)) {
                                                    setTempSelectedTechnologies(tempSelectedTechnologies.filter((tech) => tech !== technology));
                                                } else {
                                                    setTempSelectedTechnologies([...tempSelectedTechnologies, technology]);
                                                }
                                            }}
                                        />
                                    )
                                } else return <></>
                            })}
                        </Stack>
                        <Typography variant="p">Commity (tylko projekty prywatne)</Typography>
                        <RadioGroup style={{marginTop: '0.5em'}}>
                            <FormControlLabel 
                                value="down" 
                                control={<Checkbox color="primary"/>} 
                                label={
                                    <Stack direction="row" className="center" spacing={1}>
                                        <BsSortDown />
                                        <p>Od najnowszego</p>
                                    </Stack>
                                }
                            />
                            <FormControlLabel 
                                value="up" 
                                control={<Checkbox color="primary"/>} 
                                label={
                                    <Stack direction="row" className="center" spacing={1}>
                                        <BsSortUp />
                                        <p>Od najstarszego</p>
                                    </Stack>
                                } 
                            />
                        </RadioGroup>
                    </Stack>
                }
                handleButton={() => {
                    dispatch(setSelectedTechnologies(tempSelectedTechnologies));
                    setSortDialogOpen(false);
                }}
            />
            <Stack className="content">
                <Grid container style={{padding: '0em 1em'}}>
                    <Grid item xs={7} md={7}>
                        <Typography variant="h5" className="section-title">
                            Projekty
                        </Typography>
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <Chip
                            clickable
                            style={{width: 'fit-content', float: 'right'}}
                            avatar={
                                <Avatar className="avatar" style={{background: 'inherit !important'}}>
                                    <VscSettings />
                                </Avatar>
                            }
                            label="Sortowanie"
                            className="chip"
                            onClick={() => setSortDialogOpen(true)}
                        />
                    </Grid>
                </Grid>
                {
                    (projectsData.status === 'idle' || projectsData.status === 'error') ?
                    <>Ładowanie ...</> : 
                    <Grid container spacing={3}>
                        {projectsFilteredByTechnology.map((project) => (
                            <Grid item xs={12} sm={6} md={4} key={project._id}>
                                <ProjectItem
                                    name={project.name}
                                    description={project.description}
                                    photo={project.photo}
                                    technologies={project.technologies}
                                    githubPage={project.github}
                                    isPublic={project.public}
                                    status={project.status}
                                    lastCommit={project.last_commit}
                                />
                            </Grid>
                        ))}
                    </Grid>
                }
                <Typography variant="h5" className="section-title">
                    Fotografia
                </Typography>
            </Stack>
        </ThemeProvider>
    )
}

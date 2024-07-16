// * Imports:
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTechnologies } from '../features/display/SelectedTechnologiesSlice';

// * MUI and React Icons:
import { 
    Grid,
    Stack,
    Typography,
    Chip,
    Avatar,
    RadioGroup,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { VscSettings } from "react-icons/vsc";
import { BsSortDown } from "react-icons/bs";
import { BsSortUp } from "react-icons/bs";

// * Own components:
import colorsTheme from '../assets/themes/colorsTheme';
import ProjectItem from './items/ProjectItem';
import StyledDialog from './styled_components/StyledDialog';
import findIcon from '../services/data_display/findIcon';

export const Content = () => {

    const dispatch = useDispatch();
    const projectsData = useSelector(state => state.projectsData);
    const selectedTechnologies = useSelector(state => state.selectedTechnologies.value) || [];
    const [sortDialogOpen, setSortDialogOpen] = useState(false);
    const [technologies, setTechnologies] = useState([]);

    // Rzeczywiste wartości sortowania i filtrowania
    const [actualState, setActualState] = useState({
        technologies: selectedTechnologies,
        ascendingSort: false,
        descendingSort: false
    });

    // Tymczasowe wartości sortowania i filtrowania
    const [tempState, setTempState] = useState({
        technologies: selectedTechnologies,
        ascendingSort: false,
        descendingSort: false
    });

    useEffect(() => {
        if (projectsData.projects) {
            const allTechnologies = projectsData.projects
                .flatMap(project => project.technologies)
                .filter((value, index, self) => self.indexOf(value) === index);
            setTechnologies(allTechnologies);
        }
    }, [projectsData.projects]);

    const applyFilters = () => {
        setActualState(tempState);
        dispatch(setSelectedTechnologies(tempState.technologies));
        setSortDialogOpen(false);
    };

    const handleCheckboxChange = (sortType) => {
        setTempState((prevState) => ({
            ...prevState,
            ascendingSort: sortType === 'ascending' ? !prevState.ascendingSort : false,
            descendingSort: sortType === 'descending' ? !prevState.descendingSort : false,
        }));
    };

    const handleTechnologyClick = (technology) => {
        setTempState((prevState) => ({
            ...prevState,
            technologies: prevState.technologies.includes(technology)
                ? prevState.technologies.filter((tech) => tech !== technology)
                : [...prevState.technologies, technology],
        }));
    };

    const projectsFilteredByTechnology = actualState.technologies.length === 0
        ? projectsData.projects
        : projectsData.projects.filter(project =>
            project.technologies.some(tech => actualState.technologies.includes(tech))
    );

    const sortedProjects = actualState.ascendingSort || actualState.descendingSort
        ? projectsFilteredByTechnology.filter(project => !project.public)
            .sort((a, b) => actualState.ascendingSort
                ? new Date(a.last_commit) - new Date(b.last_commit)
                : new Date(b.last_commit) - new Date(a.last_commit))
        : projectsFilteredByTechnology;

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
                                                tempState.technologies.includes(technology) ? 'chip selected' : 'chip'
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
                                            onClick={() => handleTechnologyClick(technology)}
                                        />
                                    )
                                } else return <></>
                            })}
                        </Stack>
                        <Typography variant="p">Commity (tylko projekty prywatne)</Typography>
                        <RadioGroup style={{marginTop: '0.5em'}}>
                            <FormControlLabel 
                                value="down" 
                                control={
                                    <Checkbox 
                                        color="primary"
                                        checked={tempState.descendingSort}
                                        onChange={() => handleCheckboxChange('descending')}
                                    />} 
                                label={
                                    <Stack direction="row" className="center" spacing={1}>
                                        <BsSortDown />
                                        <p>Od najnowszego</p>
                                    </Stack>
                                }
                            />
                            <FormControlLabel 
                                value="up" 
                                control={
                                    <Checkbox 
                                        color="primary"
                                        checked={tempState.ascendingSort}
                                        onChange={() => handleCheckboxChange('ascending')}
                                    />} 
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
                handleButton={applyFilters}
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
                        {sortedProjects.map((project) => (
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

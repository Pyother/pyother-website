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
import ClearIcon from '@mui/icons-material/Clear';
import { ThemeProvider } from '@mui/material/styles';
import { VscSettings } from "react-icons/vsc";
import { BsSortDown } from "react-icons/bs";
import { BsSortUp } from "react-icons/bs";
import { TbClearAll } from "react-icons/tb";

// * Own components:
import colorsTheme from '../assets/themes/colorsTheme';
import ProjectItem from './items/ProjectItem';
import StyledDialog from './styled_components/StyledDialog';
import StyledSkeleton from './styled_components/StyledSkeleton';
import findIcon from '../services/data_display/findIcon';

// * i18next:
import { useTranslation } from 'react-i18next';

export const Content = () => {

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const projectsData = useSelector(state => state.projectsData);
    const selectedTechnologies = useSelector(state => state.selectedTechnologies.value) || [];
    const [sortDialogOpen, setSortDialogOpen] = useState(false);
    const [technologies, setTechnologies] = useState([]);
    const [actualState, setActualState] = useState({
        technologies: selectedTechnologies,
        ascendingSort: false,
        descendingSort: false
    });
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
                title={t('content.projects_sorting_dialog.title')}
                button={true}
                buttonTitle={t('content.sort_button_apply')}
                children={
                    <Stack>
                        <Typography variant="p">{t('content.projects_sorting_dialog.header_technologies')}</Typography>
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
                        <Typography variant="p">{t('content.projects_sorting_dialog.header_commits')}</Typography>
                        <RadioGroup style={{marginTop: '0.5em'}}>
                            <FormControlLabel 
                                value="down" 
                                control={
                                    <Checkbox 
                                        color="accentGreen"
                                        checked={tempState.descendingSort}
                                        onChange={() => handleCheckboxChange('descending')}
                                    />}
                                label={
                                    <Stack direction="row" className="center" spacing={1}>
                                        <BsSortDown />
                                        <p>{t('content.projects_sorting_dialog.sort_descending')}</p>
                                    </Stack>
                                }
                            />
                            <FormControlLabel 
                                value="up" 
                                control={
                                    <Checkbox 
                                        color="accentGreen"
                                        checked={tempState.ascendingSort}
                                        onChange={() => handleCheckboxChange('ascending')}
                                    />} 
                                label={
                                    <Stack direction="row" className="center" spacing={1}>
                                        <BsSortUp />
                                        <p>{t('content.projects_sorting_dialog.sort_ascending')}</p>
                                    </Stack>
                                }
                            />
                        </RadioGroup>
                    </Stack>
                }
                handleButton={applyFilters}
            />
            <Stack id="projects" className="content">
                <Grid container style={{padding: '1em 1em 0em 1em'}}>
                    <Grid item xs={7} md={7}>
                        <Typography variant="h5" className="section-title">
                            {t('content.header_projects')}
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
                            label={t('content.chip_sort')}
                            className="chip"
                            onClick={() => setSortDialogOpen(true)}
                        />
                    </Grid>
                </Grid>
                {
                    !actualState.ascendingSort && !actualState.descendingSort && selectedTechnologies.length === 0 ? 
                    <></> :
                    <>
                        <Stack 
                            direction="row" 
                            spacing={1} 
                            style={{padding: '0em 1em', marginBottom: '1em', display: 'flex', alignItems: 'center'}}
                        >
                            <Typography variant="p">Filtry</Typography>
                            <Chip
                                className="chip"
                                clickable
                                avatar={
                                    <Avatar className="avatar icon" style={{background: 'inherit !important'}}>
                                        <TbClearAll />
                                    </Avatar>
                                }
                                label="Wyczyść"
                                style={{background: 'inherit !important', color: 'grey'}}
                                onClick={() => {
                                    setActualState({
                                        technologies: [],
                                        ascendingSort: false,
                                        descendingSort: false
                                    });
                                    dispatch(setSelectedTechnologies([]));
                                    setTempState({
                                        technologies: [],
                                        ascendingSort: false,
                                        descendingSort: false
                                    });
                                }}
                            />
                        </Stack>
                        <Stack 
                            direction="row" 
                            spacing={1} 
                            style={{padding: '0em 1em', marginBottom: '1em', display: 'flex', alignItems: 'center'}}
                        >
                            {
                            actualState.technologies.map((technology) => {
                                const iconData = findIcon(technology.toLowerCase());
                                    if (iconData) {
                                        const { icon: IconComponent, backgroundColor, color } = iconData;
                                        return (
                                            <Chip
                                                className="chip"
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
                                                deleteIcon={<ClearIcon className="icon"/>}
                                                onDelete={() => {
                                                    setTempState((prevState) => ({
                                                        ...prevState,
                                                        technologies: prevState.technologies.filter((tech) => tech !== technology)
                                                    }));
                                                    setActualState((prevState) => ({
                                                        ...prevState,
                                                        technologies: prevState.technologies.filter((tech) => tech !== technology)
                                                    }));
                                                    dispatch(setSelectedTechnologies(selectedTechnologies.filter((tech) => tech !== technology)));
                                                }}
                                            />
                                        )
                                    } else return <></>
                                })
                            }
                        </Stack>
                    </>
                }
                {
                    (projectsData.status === 'idle' || projectsData.status === 'error') ?
                    <StyledSkeleton type='light' /> : 
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
                                    onTechnologyClick={(technology) => {
                                        if (!selectedTechnologies.includes(technology)) {
                                            setTempState((prevState) => ({
                                                ...prevState,
                                                technologies: [...prevState.technologies, technology]
                                            }));
                                            setActualState((prevState) => ({
                                                ...prevState,
                                                technologies: [...prevState.technologies, technology]
                                            }));
                                            dispatch(setSelectedTechnologies([...selectedTechnologies, technology]));
                                        }
                                        if(selectedTechnologies.includes(technology)) {
                                            setTempState((prevState) => ({
                                                ...prevState,
                                                technologies: prevState.technologies.filter((tech) => tech !== technology)
                                            }));
                                            setActualState((prevState) => ({
                                                ...prevState,
                                                technologies: prevState.technologies.filter((tech) => tech !== technology)
                                            }));
                                            dispatch(setSelectedTechnologies(selectedTechnologies.filter((tech) => tech !== technology)));
                                        }
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                }
            </Stack>
        </ThemeProvider>
    )
}

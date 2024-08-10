// * React and Redux:
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pushTechnology } from '../features/display/SelectedTechnologiesSlice';

// * MUI and React icons:
import { 
    Grid,
    Stack,
    IconButton,
    Typography,
    Button,
    Chip,
    Avatar,
    Divider,
    Tabs, 
    Tab,
    TabPanel,

} from '@mui/material';
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineExpandMore } from "react-icons/md";
import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { FaNodeJs } from "react-icons/fa";
import { ThemeProvider } from '@mui/material/styles';
import colorsTheme from '../assets/themes/colorsTheme';

// * i18next and flag icons:
import { useTranslation } from 'react-i18next';
import US from 'country-flag-icons/react/3x2/US';
import PL from 'country-flag-icons/react/3x2/PL';

// * Lotties:
import Lottie from 'react-lottie';
import * as animationData from  '../assets/lotties/rocket_lottie.json';

// * Own components:
import ServiceItem from './items/ServiceItem';
import SkillItem from './items/SkillItem';
import StyledSkeleton from './styled_components/StyledSkeleton';
import StyledDialog from './styled_components/StyledDialog';
import StyledTabs from './styled_components/StyledTabs';
import { SectionHeadline } from './layout_components/SectionHeadline';

// * Images:
import logo from '../assets/images/pyother_logo.png';
import signature from '../assets/images/signature.png';

export const Header = () => {

    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const servicesData = useSelector(state => state.servicesData);
    const deviceType = useSelector(state => state.deviceType.value);
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'pl');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);

    const menuItems = [
        {
            name: t('header.button_about'),
            icon: null,
            event: () => { 
                document.getElementById('about').scrollIntoView({
                    behavior: 'smooth'
                });
                setDialogOpen(false);
            },
        },
        {
            name: t('header.button_services'),
            icon: null,
            event: () => {
                document.getElementById('services').scrollIntoView({
                    behavior: 'smooth'
                });
                setDialogOpen(false);
            }
        },
        {
            name: t('header.button_projects'),
            icon: null,
            event: () => {
                document.getElementById('projects').scrollIntoView({
                    behavior: 'smooth'
                });
                setDialogOpen(false);
            }
        },
        {
            name: t('header.button_language'),
            icon: language === 'pl' ? <PL className="flag-icon"/> : <US className="flag-icon"/>,
            event: () => {
                if(language === 'pl') {
                    localStorage.setItem('language', 'en');
                    i18n.changeLanguage('en');
                    setLanguage('en');
                } else {
                    localStorage.setItem('language', 'pl');
                    i18n.changeLanguage('pl');
                    setLanguage('pl');
                }
            }
        }
    ];

    const techs = [
        {
            name: 'React',
            possibleNames: ['react']
        },
        {
            name: 'JavaScript',
            possibleNames: ['js', 'javascript']
        },
        {
            name: 'Nodejs',
            possibleNames: ['node', 'nodejs']
        }
    ]

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <ThemeProvider theme={colorsTheme}>
            <StyledDialog 
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
                title="Menu"
                button={false}
                children={
                    <Stack spacing={2} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        {
                            menuItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    <Chip 
                                        onClick={item.event}
                                        className="menu-item"
                                        clickable
                                        avatar={item.icon ? <Avatar className='avatar'>{item.icon}</Avatar> : null}
                                        label={item.name}
                                        variant="filled"
                                    />
                                    {index < menuItems.length - 1 && 
                                        <Divider orientation="horizontal" flexItem 
                                            style={{ 
                                                width: '100%', 
                                                backgroundColor: 'lightgrey'
                                            }}
                                        />
                                    }
                                </React.Fragment>
                            ))
                        }
                    </Stack>
                }
            />
            <Stack>
                <Grid 
                    container 
                    className="app-bar"
                    style={{display: 'flex', alignItems: 'center'}}
                >
                    <Grid item xs={8} sm={6} md={6}>
                        <Stack direction="row" spacing={2} style={{display: 'flex', alignItems: 'center'}}>
                            <img src={logo} alt="logo" className="logo"/>
                            <Typography variant="p" style={{color: 'white'}}>Piotr Sobol</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} sm={6} md={6} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        {
                            deviceType === 'mobile' ? 
                            <IconButton 
                                className="icon-button"
                                onClick={() => setDialogOpen(true)}
                            >
                                <AiOutlineMenu />
                            </IconButton> : 
                            <Stack direction="row" className="navigation-stack" spacing={2}>
                                {
                                    menuItems.map((item, index) => (
                                        <Chip
                                            key={index}
                                            label={item.name}
                                            clickable
                                            className="button-chip bg-tertiary"
                                            onClick={item.event}
                                            avatar={item.icon}
                                            variant="filled"
                                        />
                                    ))
                                }
                            </Stack>
                        }
                    </Grid>
                </Grid>
                <Grid container className="header-background" style={{paddingTop: deviceType === 'desktop' ? '1em' : '0em'}}>
                    <Grid 
                        item xs={12} sm={6} md={6} 
                        className="center"
                        style={{ width: '100%', height: '100%' }}
                    >
                        <Stack style={{ overflow: 'hidden', margin: '1em 0em 2em 0em' }} className="center">
                            <Stack direction="row" spacing={2} style={{display: 'flex', alignItems: 'center'}}>
                                <Chip 
                                    label="React"
                                    clickable
                                    className="bg-secondary"
                                    variant="filled"
                                    avatar={
                                        <Avatar
                                            style={{backgroundColor: 'inherit', color: 'white', fontSize: 'larger'}}
                                        >
                                            <FaReact />
                                        </Avatar>
                                    }
                                    onClick={() => {
                                        dispatch(pushTechnology('react'));
                                        document.getElementById("projects").scrollIntoView({
                                            behavior: 'smooth'
                                        });
                                    }}
                                />
                                <Chip
                                    label="JavaScript"
                                    clickable
                                    className="bg-secondary"
                                    variant="filled"
                                    avatar={
                                        <Avatar
                                            style={{backgroundColor: 'inherit', color: 'white', fontSize: 'larger'}}
                                        >
                                            <IoLogoJavascript />
                                        </Avatar>
                                    }
                                    onClick={() => {
                                        dispatch(pushTechnology('js'));
                                        document.getElementById("projects").scrollIntoView({
                                            behavior: 'smooth'
                                        });
                                    }}
                                />
                                <Chip
                                    label="Node.js"
                                    clickable
                                    className="bg-secondary"
                                    variant="filled"
                                    avatar={
                                        <Avatar
                                            style={{backgroundColor: 'inherit', color: 'white', fontSize: 'larger'}}
                                        >
                                            <FaNodeJs />
                                        </Avatar>
                                    }
                                    onClick={() => {
                                        dispatch(pushTechnology('nodejs'));
                                        document.getElementById("projects").scrollIntoView({
                                            behavior: 'smooth'
                                        });
                                    }}
                                />
                            </Stack>
                            <Divider 
                                style={{ 
                                    width: '100%', 
                                    backgroundColor: 'lightgrey',
                                    margin: '1em 0em'
                                }} 
                            />
                            <Typography 
                                variant="h4" 
                                align="center" 
                                className="title" 
                                style={{ fontSize: deviceType === 'mobile' ? '1.5em' : '2.125em' }}
                            >
                                {t('header.title')}
                            </Typography>
                            <Typography 
                                variant="body1" 
                                align="center" 
                                className="subtitle" 
                                style={{ fontSize: deviceType === 'mobile' ? 'small' : '1em' }}
                            >
                                {t('header.subtitle')}
                            </Typography>
                            <Chip 
                                label={t('header.button_expand')}
                                clickable
                                className="button-chip bg-green"
                                style={{marginTop: '1em', width: 'fit-content'}}
                                avatar={
                                    <Avatar
                                        style={{backgroundColor: 'inherit', color: 'white'}}
                                    >
                                        <MdOutlineExpandMore style={{fontSize: 'large'}}/>
                                    </Avatar>
                                }
                                variant='filled'
                                onClick={() => {
                                    document.getElementById('about').scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                }}
                            />
                        </Stack>
                    </Grid> 
                    <Grid 
                        className="center"
                        item xs={12} sm={6} md={4} 
                        style={{ width: '100%', height: '100%', display: 'flex', padding: deviceType === 'mobile' ? '1em' : '3em 5em 5em 0em' }}
                    >
                        <Lottie 
                            options={defaultOptions}
                            isStopped={false}
                            isPaused={false}
                            style={{width: deviceType === 'mobile' ? '70%' : '80%'}}
                        />
                    </Grid>
                </Grid>
                <Stack className="header">
                    <Stack className="center">
                        <SectionHeadline 
                            title={t('header.about.title')} 
                            subtitle={t('header.about.subtitle')} 
                            section_id="about" 
                            position="center"
                        />
                        <StyledTabs 
                            value={currentTab} 
                            onChange={() => {
                                currentTab === 0 ? setCurrentTab(1) : setCurrentTab(0);
                            }} 
                            indicatorColor=""
                        >
                            <Tab label={t('header.button_whoami')} className="tab" value={0}/>
                            <Tab label={t('header.button_skills')} className="tab" value={1}/>
                        </StyledTabs>
                        <Grid container className="center" style={{padding: '1em 0em', width: '100%'}}>
                        {
                            currentTab === 0 ? 
                            <>
                                <img src={signature} className="signature"/>
                            </> :
                            <Stack spacing={1} style={{width: deviceType === 'desktop' ? '50%' : '100%'}}>
                                {
                                    techs.map((tech, index) => (
                                        <SkillItem 
                                            key={index}
                                            name={tech.name} 
                                            possibleNames={tech.possibleNames}
                                            description={t(`header.about.skills.${tech.name.toLowerCase()}_description`)}
                                        />
                                    ))
                                }
                            </Stack>
                        }
                        </Grid>
                    </Stack>
                    <Stack className="center">
                        <SectionHeadline 
                            title={t('header.services.title')} 
                            subtitle={t('header.services.subtitle')} 
                            section_id="services" 
                            position="center"
                        />
                        <Grid 
                            className="services-container center"
                            container
                            spacing={3} 
                            style={{width: '100%'}}
                        >
                            {
                                servicesData.status === 'idle' ? 
                                <StyledSkeleton type="dark"/> : 
                                servicesData.status === 'success' ? 
                                servicesData.services.map((service, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={service._id}> 
                                        <ServiceItem 
                                            key={index} 
                                            name={service.name_pl} 
                                            description={service.description_pl} 
                                            photo={service.photo} 
                                        /> 
                                    </Grid>
                                ))
                                : <StyledSkeleton type='dark'/>
                            }
                        </Grid>
                    </Stack>
                </Stack>
            </Stack>
        </ThemeProvider>
    )   
}
// * React and Redux:
import React from 'react';
import { useSelector } from 'react-redux';

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
} from '@mui/material';
import { AiOutlineMenu } from "react-icons/ai";
import { FaArrowDownLong } from "react-icons/fa6";
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
import * as animationData from  '../assets/lotties/header_lottie.json';

// * Own components:
import ServiceItem from './items/ServiceItem';
import StyledSkeleton from './styled_components/StyledSkeleton';

// * Images:
import logo from '../assets/images/pyother_logo.png';
import portrait from '../assets/images/portrait.png';

export const Header = () => {

    const { t, i18n } = useTranslation();
    const servicesData = useSelector(state => state.servicesData);
    const deviceType = useSelector(state => state.deviceType.value);
    const [language, setLanguage] = React.useState(localStorage.getItem('language') || 'pl');

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
            <Stack>
                <Grid 
                    container 
                    className="app-bar"
                    style={{display: 'flex', alignItems: 'center'}}
                >
                    <Grid item xs={8} sm={6} md={4}>
                        <Stack direction="row" spacing={2} style={{display: 'flex', alignItems: 'center'}}>
                            <img src={logo} alt="logo" className="logo"/>
                            <Typography variant="p" style={{color: 'white'}}>Piotr Sobol</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} sm={6} md={8} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        {
                            deviceType === 'mobile' ? 
                            <IconButton className="icon-button">
                                <AiOutlineMenu />
                            </IconButton> : 
                            <Stack direction="row" className="navigation-stack" spacing={2}>
                                <Chip 
                                    className="button-chip bg-black"
                                    clickable
                                    label={t('header.button_about')}
                                    variant='filled'
                                />
                                <Chip
                                    className="button-chip bg-black"
                                    clickable
                                    label={t('header.button_services')}
                                    variant='filled'
                                />
                                <Chip
                                    className="button-chip bg-black"
                                    clickable
                                    label={t('header.button_projects')}
                                    variant='filled'
                                />
                                <Chip 
                                    label={t('header.button_language')}
                                    className="button-chip bg-black"
                                    variant='filled'
                                    clickable
                                    avatar={
                                        <Avatar
                                            style={{backgroundColor: 'inherit', fontSize: 'larger', paddingLeft: '0.5em'}}
                                        >
                                            {
                                                language === 'en' ? <US className="flag-icon"/> : <PL className="flag-icon"/> 
                                            }
                                        </Avatar>
                                    }
                                    onClick={() => {
                                        if(language === 'pl') {
                                            localStorage.setItem('language', 'en');
                                            i18n.changeLanguage('en');
                                            setLanguage('en');
                                        } else {
                                            localStorage.setItem('language', 'pl');
                                            i18n.changeLanguage('pl');
                                            setLanguage('pl');
                                        }
                                    }}
                                />
                            </Stack>
                        }
                    </Grid>
                </Grid>
                <Grid container className="header-background" style={{paddingTop: deviceType === 'desktop' ? '2em' : '0em'}}>
                    <Grid 
                        item xs={12} sm={6} md={6} 
                        className="center"
                        style={{ width: '100%', height: '100%' }}
                    >
                        <Stack style={{ overflow: 'hidden', margin: '3em 0em' }} className="center">
                            
                            <Stack direction="row" spacing={2} style={{display: 'flex', alignItems: 'center'}}>
                                <Chip 
                                    label="React"
                                    className="bg-secondary"
                                    variant="filled"
                                    avatar={
                                        <Avatar
                                            style={{backgroundColor: 'inherit', color: 'white', fontSize: 'larger'}}
                                        >
                                            <FaReact />
                                        </Avatar>
                                    }
                                />
                                <Chip
                                    label="JavaScript"
                                    className="bg-secondary"
                                    variant="filled"
                                    avatar={
                                        <Avatar
                                            style={{backgroundColor: 'inherit', color: 'white', fontSize: 'larger'}}
                                        >
                                            <IoLogoJavascript />
                                        </Avatar>
                                    }
                                />
                                <Chip
                                    label="Node.js"
                                    className="bg-secondary"
                                    variant="filled"
                                    avatar={
                                        <Avatar
                                            style={{backgroundColor: 'inherit', color: 'white', fontSize: 'larger'}}
                                        >
                                            <FaNodeJs />
                                        </Avatar>
                                    }
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
                                        <FaArrowDownLong />
                                    </Avatar>
                                }
                                variant='filled'
                                onClick={() => {
                                    window.scrollTo({
                                        top: window.innerHeight,
                                        behavior: 'smooth'
                                    });
                                }}
                            />
                        </Stack>
                    </Grid> 
                    <Grid 
                        item xs={12} sm={6} md={6} 
                        style={{ width: '100%', height: '100%', display: 'flex'}}
                    >
                        <img 
                            src={portrait}
                            alt="portrait"
                            className="portrait"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'cover',
                                userSelect: 'none'
                            }}
                        />
                    </Grid>
                </Grid>
                <Stack className="header">
                    <Stack className="center" style={{margin: "1em 0em 2em 0em"}}>
                        
                    </Stack>
                    <Stack className="center" style={{margin: "1em 0em 2em 0em"}}>
                        <Typography variant="h6" align="center">
                            {t('header.services.title')}
                        </Typography>
                        <Typography variant="p" align="center" style={{color: 'grey'}}> 
                            {t('header.services.subtitle')}
                        </Typography>
                        <Grid 
                            className="center"
                            container
                            spacing={3} 
                            style={{width: '100%', marginTop: '1em'}}
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
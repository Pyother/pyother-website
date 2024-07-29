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
} from '@mui/material';
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineExpandMore } from "react-icons/md";
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
import contour from '../assets/images/contour.png';

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
                        <Stack direction="row">
                            <img src={logo} alt="logo" className="logo"/>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} sm={6} md={8} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        {
                            deviceType === 'mobile' ? 
                            <IconButton className="icon-button">
                                <AiOutlineMenu />
                            </IconButton> : 
                            <Stack direction="row" className="navigation-stack" spacing={2}>
                                <Button className="icon-button">
                                    {t('header.button_about')}
                                </Button>
                                <Button className="icon-button">
                                    {t('header.button_services')}
                                </Button>
                                <Button className="icon-button">
                                    {t('header.button_projects')}
                                </Button>
                                <IconButton className="icon-button"
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
                                >
                                    {
                                        language === 'en' ? <US className="flag-icon"/> : <PL className="flag-icon"/> 
                                    }
                                </IconButton>
                            </Stack>
                        }
                    </Grid>
                </Grid>
                <Grid container 
                    className="background-photo"
                >
                    <Grid item xs={12} sm={12} md={12} className="center">
                        <Lottie 
                            options={defaultOptions}
                            height={300}
                            width={300}
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
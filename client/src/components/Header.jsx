// * React and Redux:
import React from 'react';
import { useSelector } from 'react-redux';

// * MUI:
import { 
    Grid,
    Stack,
    IconButton,
    Typography,
    Button,
    Tooltip,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

// * i18next and flag icons:
import { useTranslation } from 'react-i18next';
import US from 'country-flag-icons/react/3x2/US';
import PL from 'country-flag-icons/react/3x2/PL';

// * Own components:
import ServiceItem from './items/ServiceItem';
import StyledSkeleton from './styled_components/StyledSkeleton';

export const Header = () => {

    const { t, i18n } = useTranslation();
    const servicesData = useSelector(state => state.servicesData);
    const [language, setLanguage] = React.useState(localStorage.getItem('language') || 'pl');

    return (
        <Stack className="header">
            <Stack direction="row" spacing={2} className="media-stack">
                <Tooltip
                    title={t('header.tooltip_facebook')}
                    arrow
                >
                    <IconButton className="icon-button">
                        <FacebookIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip 
                    title={t('header.tooltip_instagram')}
                    arrow
                >
                    <IconButton className="icon-button">
                        <InstagramIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip 
                    title={t('header.tooltip_github')}
                    arrow
                >
                    <IconButton className="icon-button">
                        <GitHubIcon />
                    </IconButton>
                </Tooltip>
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
            <Typography variant="h4" align="center" className="title">
                Piotr Sobol 
            </Typography>
            <Typography variant="p" align="center" className="subtitle">
                Frontend Developer
            </Typography>
            <Stack className="center" style={{margin: "1em 0em 2em 0em"}}>
                <Typography variant="h6" align="center">
                    {t('header.about.title')}
                </Typography>
                <Typography variant="p" align="center" style={{color: 'grey'}}> 
                    {t('header.about.subtitle')}
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
            <Stack direction="row" spacing={2} className="navigation-stack">
                <Button className="icon-button">
                    {t('header.button_projects')}
                </Button>
                <Button className="icon-button">
                    {t('header.button_photography')}
                </Button>
            </Stack>
        </Stack>
    )   
}
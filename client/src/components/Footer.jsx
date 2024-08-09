import React from 'react';

// * MUI and React icons:
import { 
    Grid,
    Stack,
    Divider,
    
} from '@mui/material';
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaTiktok } from "react-icons/fa6";

// * i18next:
import { useTranslation } from 'react-i18next';

// * Own components:
import { SectionHeadline } from './layout_components/SectionHeadline';

export const Footer = () => {

    const { t } = useTranslation();

    // Social media's array:
    const socialMediaArray = [
        {
            name: t('header.tooltip_facebook'),
            icon: <CiFacebook />
        }, 
        {
            name: t('header.tooltip_instagram'),
            icon: <CiInstagram />
        },
        {
            name: t('header.tooltip_github'),
            icon: <FaGithub />
        },
        {
            name: t('header.tooltip_linkedin'),
            icon: <CiLinkedin />
        },
        {
            name: t('header.tooltip_tiktok'),
            icon: <FaTiktok />
        }
    ];

    return (
        <Stack className="footer center" spacing={2}>
            <SectionHeadline title={t('footer.title')} subtitle={t('footer.subtitle')} section_id="footer" />
            <Grid container className="center">
            
            </Grid>
        </Stack>
    )  
}
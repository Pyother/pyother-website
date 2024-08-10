import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setTopic, setMessage, eraseAll } from '../features/mail/EmailSlice';

// * MUI and React icons:
import { 
    Grid,
    Stack,
    Divider,
    TextField,
    Chip,
    Avatar,
    Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaTiktok } from "react-icons/fa6";
import { IoSendOutline } from "react-icons/io5";

import CheckIcon from '@mui/icons-material/Check';
import colorsTheme from '../assets/themes/colorsTheme';

// * i18next:
import { useTranslation } from 'react-i18next';

// * Own components:
import { SectionHeadline } from './layout_components/SectionHeadline';

export const Footer = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const emailFeature = useSelector((state) => state.email);
    const deviceType = useSelector((state) => state.deviceType.value);

    const [emailValue, setEmailValue] = useState("");
    const [topicValue, setTopicValue] = useState("");
    const [messageValue, setMessageValue] = useState("");
    const [messageSent, setMessageSent] = useState(false);

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
        <ThemeProvider theme={colorsTheme}>
            <Stack className="footer center" spacing={2}>
                <SectionHeadline 
                    title={t('footer.title')} 
                    subtitle={t('footer.subtitle')} 
                    section_id="footer" 
                    position="center"
                />
                <Grid container>
                    <Grid item xs={12} sm={6} md={6}>
                        <Stack spacing={2} className="textfields-container center">
                            <TextField
                                id="footer-email"
                                value={emailValue}
                                className="textfield"
                                label={t('footer.email_placeholder')}
                                variant="outlined"
                                color="accentGreen"
                                fullWidth
                                onChange={(e) => {
                                    setEmailValue(e.target.value);
                                    dispatch(setEmail(e.target.value));
                                }}
                            />
                            <TextField
                                id="footer-email"
                                value={topicValue}
                                className="textfield"
                                label={t('footer.topic_placeholder')}
                                variant="outlined"
                                color="accentGreen"
                                fullWidth
                                onChange={(e) => {
                                    setTopicValue(e.target.value);
                                    dispatch(setTopic(e.target.value));
                                }}
                            />
                            <TextField
                                id="footer-message"
                                value={messageValue}
                                className="textfield"
                                label={t('footer.message_placeholder')}
                                variant="outlined"
                                color="accentGreen"
                                fullWidth
                                multiline
                                rows={4}
                                onChange={(e) => {
                                    setMessageValue(e.target.value);
                                    dispatch(setMessage(e.target.value));
                                }}
                            />
                            <Grid container>
                                <Grid item xs={8} sm={6} md={6} className="chip-feedback-container">
                                    { messageSent ?
                                        <Chip
                                            className="chip-feedback"
                                            label={t('footer.feedback_success')}
                                            avatar={
                                                <Avatar className="avatar">
                                                    <CheckIcon color="accentGreen"/>
                                                </Avatar>
                                            }
                                        /> : null
                                    }
                                </Grid>
                                <Grid item xs={4} sm={6} md={6} className="chip-send-container">
                                    <Chip
                                        className={
                                            emailFeature.message !== "" && 
                                            emailFeature.email !== "" && 
                                            emailFeature.topic !== "" ? 
                                            "bg-green chip-send" : "bg-secondary chip-send"
                                        }
                                        label={t('footer.send')}
                                        avatar={
                                            <Avatar className="avatar">
                                                <IoSendOutline />
                                            </Avatar>
                                        }
                                        disabled={
                                            emailFeature.message && 
                                            emailFeature.email && 
                                            emailFeature.topic ? 
                                            false : true
                                        }
                                        clickable
                                        onClick={() => {
                                            if (
                                            emailFeature.message && 
                                            emailFeature.email && 
                                            emailFeature.topic ) {
                                                dispatch(eraseAll());
                                                setEmailValue("");
                                                setTopicValue("");
                                                setMessageValue("");
                                                setMessageSent(true);
                                                setTimeout(() => {
                                                    setMessageSent(false);
                                                }, 3000);
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                    <Grid item xs={0} sm={0.5} md={0.5}>
                        <Divider 
                            orientation="vertical" 
                            sx={{ 
                                borderColor: colorsTheme.palette.textSecondary.main, 
                                height: '80%' 
                            }} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={5.5} md={5.5}>
                        <Stack spacing={2} className="social-media-container">
                            {
                                deviceType !== 'mobile' ? 
                                <>
                                    <Typography variant="h6" className="social-media-title">
                                        {t('footer.social_media.title')}
                                    </Typography>
                                    <Typography variant="p" className="social-media-subtitle">
                                        {t('footer.social_media.subtitle')}
                                    </Typography>
                                </> :
                                <SectionHeadline 
                                    title={t('footer.social_media.title')} 
                                    subtitle={t('footer.social_media.subtitle')} 
                                    style={{ marginTop: '0 !important' }}
                                    section_id="social-media" 
                                    position="center"
                                /> 
                            }
                            <Stack direction="row" spacing={2} className="center">
                                {socialMediaArray.map((socialMedia, index) => (
                                    <Avatar key={index} className="avatar">
                                        {socialMedia.icon}
                                    </Avatar>
                                ))}
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </ThemeProvider>
    )  
}
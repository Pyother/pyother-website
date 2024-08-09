import React, { useState } from 'react';

// * MUI and React icons:
import { 
    Grid,
    Stack,
    Divider,
    TextField,
    Chip,
    Avatar,
} from '@mui/material';
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaTiktok } from "react-icons/fa6";
import { IoSendOutline } from "react-icons/io5";
import { ThemeProvider } from '@mui/material/styles';
import colorsTheme from '../assets/themes/colorsTheme';

// * i18next:
import { useTranslation } from 'react-i18next';

// * Own components:
import { SectionHeadline } from './layout_components/SectionHeadline';

export const Footer = () => {

    const { t } = useTranslation();
    const [email, setEmail] = useState(null);
    const [topic, setTopic] = useState(null);
    const [message, setMessage] = useState(null);

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
                <SectionHeadline title={t('footer.title')} subtitle={t('footer.subtitle')} section_id="footer" />
                <Stack spacing={2} className="textfields-container">
                    <TextField
                        id="footer-email"
                        className="textfield"
                        label={t('footer.email_placeholder')}
                        variant="outlined"
                        color="accentGreen"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="footer-email"
                        className="textfield"
                        label={t('footer.topic_placeholder')}
                        variant="outlined"
                        color="accentGreen"
                        fullWidth
                        onChange={(e) => setTopic(e.target.value)}
                    />
                    <TextField
                        id="footer-message"
                        className="textfield"
                        label={t('footer.message_placeholder')}
                        variant="outlined"
                        color="accentGreen"
                        fullWidth
                        multiline
                        rows={4}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="chip-send-container">
                        <Chip
                            className={
                                message !== "" && email !== "" && topic !== "" ? "bg-green chip-send" : "bg-secondary chip-send"
                            }
                            label={t('footer.send')}
                            avatar={
                                <Avatar className="avatar">
                                    <IoSendOutline />
                                </Avatar>
                            }
                            disabled={message && email && topic ? false : true}
                            clickable
                        />
                    </div>
                </Stack>
            </Stack>
        </ThemeProvider>
    )  
}
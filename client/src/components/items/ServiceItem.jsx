// * React and Redux:
import React from 'react';
import { useDispatch } from 'react-redux';
import { setTopic } from '../../features/mail/EmailSlice';

// * MUI:
import {
    Stack,
    Typography,
    Chip,
    Avatar,

} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { MdOutlineExpandMore } from "react-icons/md";
import colorsTheme from '../../assets/themes/colorsTheme';

// * i18next:
import { useTranslation } from 'react-i18next';

// * Own components:
import { SectionHeadline } from '../layout_components/SectionHeadline';

const ServiceItem = ({ name, description, photo, graphicSource }) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <ThemeProvider theme={colorsTheme}>
            <Stack className="service-item center">
                <Stack style={{padding: '1em'}}>
                    <div 
                        className="photo-container center"
                        style={{backgroundColor: 'inherit !important', marginBottom: '0'}}
                        onClick={() => window.location.href = graphicSource } 
                    >
                        {photo && <img src={`data:image/jpeg;base64,${photo}`} alt={name} className="photo"
                            style={{width: '5em', height: '5em'}}
                        />}
                    </div>
                    <SectionHeadline 
                        title={name}
                        subtitle={description}
                        section_id={name}
                        position="center"
                        fullMode={true}
                    />
                </Stack>
                <div className="project-item-button center"
                    onClick={() => {
                        document.getElementById('footer').scrollIntoView({behavior: 'smooth'});
                        dispatch(setTopic(name));
                    }}
                >
                    <p style={{fontSize: 'small'}}>
                        {t('header.button_expand')}
                    </p>
                </div>
            </Stack>
        </ThemeProvider>
    );
}

export default ServiceItem;
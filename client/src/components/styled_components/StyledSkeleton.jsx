import React from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

// * Lotties:
import Lottie from 'react-lottie';
import * as animationData from  '../../assets/lotties/hourglass_animation.json';

const StyledSkeleton = ({ type }) => {

    const { t } = useTranslation();

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Stack spacing={2} className="center">
            <Lottie 
                options={defaultOptions}
                isStopped={false}
                isPaused={false}
                style={{width: '10em'}}
            />
            <p style={{color: 'var(--text-secondary-color)', margin: '0', fontWeight: 'bold'}}>{t('loading')}...</p>
        </Stack>
    );
}

export default StyledSkeleton;

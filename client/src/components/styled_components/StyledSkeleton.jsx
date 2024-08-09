import React from 'react';
import { Stack, Skeleton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import colorsTheme from '../../assets/themes/colorsTheme';

const StyledSkeleton = ({ type }) => {
    return (
        <ThemeProvider theme={colorsTheme}>
            <Stack direction="row" spacing={4} sx={{ width: '100%' }}>
                {[1, 2, 3].map((columnIndex) => (
                    <Stack key={columnIndex} spacing={2} direction="column" sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Skeleton
                                className='skeleton'
                                sx={{ bgcolor: type === 'dark' ? 'tertiary.main' : 'light.main', width: 50, height: 50, borderRadius: '50%' }}
                                animation="wave"
                                variant='circular'
                            />
                            <Skeleton
                                className='skeleton'
                                sx={{ bgcolor: type === 'dark' ? 'tertiary.main' : 'light.main', flexGrow: 1, width: 'fit-content' }}
                                animation="wave"
                                variant='rounded'
                            />
                        </Stack>
                        {[1, 2, 3].map((item) => (
                            <Skeleton
                                key={item}
                                className='skeleton'
                                sx={{ bgcolor: type === 'dark' ? 'tertiary.main' : 'light.main',  }}
                                animation="wave"
                                variant='rounded'
                            />
                        ))}
                    </Stack>
                ))}
            </Stack>
        </ThemeProvider>
    );
}

export default StyledSkeleton;

import React from 'react';
import { Grid, Typography, BottomNavigation, BottomNavigationAction } from '@mui/material';

const Header = () => {
    return (
        <Grid container className='centered menu'>
            <Grid item xs={6} md={6} >
                <Typography variant='h5'>
                    Piotr Sobol
                </Typography>
            </Grid>
            <Grid item xs={6} md={6} className="right">
                <BottomNavigation 
                    className='bottom-navigation'
                    showLabels
                >
                    <BottomNavigationAction label="Projekty" style={{color: 'lightgrey'}}/>
                    <BottomNavigationAction label="Publikacje" style={{color: 'lightgrey'}}/>
                </BottomNavigation>
            </Grid>
        </Grid>
    );
}

export default Header;
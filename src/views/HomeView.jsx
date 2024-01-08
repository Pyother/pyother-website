import React from 'react';
import { Grid } from '@mui/material';
import { connect } from 'react-redux';
import { increment } from '../features/counter/counterSlice';
import store from '../store/store';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeView = ({ increment }) => {
    return (
        <Grid container className='centered'>
            <Header />
            <Footer />
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    counter: state.counter
});

export default connect(mapStateToProps, {increment})(HomeView);
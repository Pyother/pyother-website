import React from 'react';
import { Grid, Button } from '@mui/material';
import { connect } from 'react-redux';
import { increment } from '../features/counter/counterSlice';
import store from '../store/store';

const HomeView = ({ increment }) => {
    return (
        <Grid container>
            <Button
                onClick={() => {
                    increment();
                    console.log(store.getState());
                }}
            >
                Click
            </Button>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    counter: state.counter
});

export default connect(mapStateToProps, {increment})(HomeView);
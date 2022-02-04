import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    spinner: {
        display: "flex",
        justifyContent: "center",
        color: "black"
    }
});
const Spinner = () => {
    const classes = useStyles();

    return (
        <>
            <Box className={classes.spinner}>
                <CircularProgress color="inherit" />
            </Box>
        </>
    )
};

export default Spinner;

import React, { useEffect, useState } from 'react';
import { Avatar, Container, Grid, Paper, Tab, Tabs, Typography, Box } from "@mui/material";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { makeStyles } from '@mui/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Spinner from './Spinner';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles({
    userDiv: {
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#e0e0e0"

    },
    topdiv: {
        display: "flex",
        padding: "20px",
    },
    topLeftDiv: {
        display: "flex",
    },
    topRightDiv: {
        display: "flex",
        flexDirection: "column !important",
        justifyContent: "center",
        paddingLeft: "15px",
    },
    avatar: {
        width: "110px !important",
        height: "15vh !important",
        backgroundColor: "#ffbc00 !important",
        marginLeft: "40px",
        fontSize: "2rem !important"
    },
    flex: {
        display: "flex"
    },
    bold: {
        fontWeight: "bolder !important"
    }
});

const User = () => {
    const classes = useStyles();
    const { id } = useParams()
    const [user, setUser] = useState([]);
    console.log('user: ', user);

    var matches = user?.name?.match(/\b(\w)/g);
    var name = matches?.join('');


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getUser = async () => {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users")
        const Users = res.data;
        // const matchUser = Users.filter(value => value.id == id)
        const matchUser = Users.find((element) => element.id == id)
        setUser(matchUser)
    }

    useEffect(() => {
        getUser()
    }, []);

    return (
        <>
            <Box className={classes.userDiv}>
                <Container>
                    {Object.keys(user).length == 0 && <Spinner />}

                    {Object.keys(user).length > 0 &&
                        <Paper elevation={3} sx={{ minHeight: "450px" }}>
                            <Grid container className={classes.topdiv}>
                                <Grid className={classes.topLeftDiv} item md={3} sm={12} xs={12}>
                                    <Link to="/home"><ArrowBackIcon /></Link>
                                    <Avatar className={classes.avatar}>{name}</Avatar>
                                </Grid>
                                <Grid className={classes.topRightDiv} item md={9} sm={12} xs={12}>
                                    <Box className={classes.flex}>
                                        <Typography variant='h6'>Name:&nbsp;</Typography>
                                        <Typography className={classes.bold} variant='h6'>{user.name}</Typography>
                                    </Box>

                                    <Box className={classes.flex}>
                                        <Typography variant='h6'>Email:&nbsp;</Typography>
                                        <Typography className={classes.bold} variant='h6'>{user.email}</Typography>
                                    </Box>
                                </Grid>

                            </Grid>
                            <Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                <Tab label="Personal" {...a11yProps(0)} />
                                                <Tab label="company" {...a11yProps(1)} />
                                            </Tabs>
                                        </Box>
                                        <TabPanel value={value} index={0}>

                                            <Grid className={classes.flex}>
                                                <Grid item md={2}>
                                                    <Typography>Name:</Typography>
                                                    <Typography>Username:</Typography>
                                                    <Typography>Email:</Typography>
                                                    <Typography>Street:</Typography>
                                                    <Typography>City:</Typography>
                                                    <Typography>Phone:</Typography>
                                                    <Typography>Website:</Typography>

                                                </Grid>
                                                <Grid item md={6}>
                                                    <Typography className={classes.bold} variant='body1'>{user.name}</Typography>
                                                    <Typography className={classes.bold} variant='body1'>{user.username}</Typography>
                                                    <Typography className={classes.bold} variant='body1'>{user.email}</Typography>
                                                    <Typography className={classes.bold} variant='body1'>{user?.address?.street}</Typography>
                                                    <Typography className={classes.bold} variant='body1'>{user?.address?.city}</Typography>
                                                    <Typography className={classes.bold} variant='body1'>{user.phone}</Typography>
                                                    <Typography className={classes.bold} variant='body1'>{user.website}</Typography>

                                                </Grid>
                                            </Grid>

                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <Grid className={classes.flex}>
                                                <Grid item md={2}>
                                                    <Typography>Name:</Typography>
                                                    <Typography>CatchPhrase:</Typography>
                                                    <Typography>Bs:</Typography>
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Typography className={classes.bold} variant='body1'>{user.company?.name}</Typography>
                                                    <Typography className={classes.bold} variant='body1'>{user.company?.catchPhrase}</Typography>
                                                    <Typography className={classes.bold} variant='body1'>{user.company?.bs}</Typography>
                                                </Grid>
                                            </Grid>

                                        </TabPanel>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    }
                </Container>
            </Box>
        </>
    )
};

export default User;



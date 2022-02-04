import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Autocomplete, Box, Container, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Spinner from './Spinner';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const useStyles = makeStyles({
    homeDiv: {
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#e0e0e0"
    },
    head: {
        backgroundColor: "#282c34",
    },
    th: {
        color: "#fff !important"
    },
    link: {
        textDecoration: "none",
        backgroundColor: "#ffbc00",
        padding: "10px 15px",
        color: "#fff",
        borderRadius: "3px"
    },
    arrow: {
        color: "#bdbdbd",
        paddingLeft: "17px"
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        padding: "20px 0px"
    },
    header: {
        padding: "20px 10px",
    }
});

const TableBodyData = ({ data }) => {
    console.log('data: ', data);
    const classes = useStyles();

    return (
        <>
            <TableBody>
                {data.map((row, index) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.address.city}</TableCell>
                        <TableCell align="left">
                            <Link className={classes.link} to={`/user/${row.id}`}>View</Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>
    )
}



const Home = () => {
    const [users, setUsers] = useState([])
    console.log('users: ', users);
    const [sortData, setSortData] = useState([])
    const [order, setOrder] = React.useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    console.log('currentPage: ', currentPage);
    const [usersPerPage, setUsersPerPage] = useState(5);

    const classes = useStyles();

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
    const currentSortUsers = sortData.slice(indexOfFirstUser, indexOfLastUser)

    const totalList = users.length;

    const countPage = Math.ceil(totalList / usersPerPage);
    console.log('countPage: ', countPage);

    const getAllUser = async () => {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users")
        res.data.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        setSortData([])
        setOrder("asc")
        setUsers(res.data);
    }

    const Ascending = () => {
        getAllUser()
    }
    const Descending = () => {
        const descending = users.reverse()
        setOrder("dsc")
        setSortData(descending);
    }

    const paginate = (value) => {
        console.log('value: ', value);
        setCurrentPage(value)
    }

    useEffect(() => {
        getAllUser();
    }, []);

    return (
        <>
            <Box className={classes.homeDiv}>
                <Container>
                    <Box>
                        <Paper className={classes.header} elevation={3}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={users}
                                getOptionLabel={(users) => users.name}
                                sx={{ width: 300 }}
                                onChange={(event, newValue) => {
                                    if (
                                        event.type === 'keydown' &&
                                        event.key === 'Backspace'
                                    ) {
                                        return;
                                    }
                                    if (newValue) setSortData([newValue])
                                    else getAllUser()
                                }}
                                renderInput={
                                    (params) =>
                                        <TextField {...params} label="Name" />}
                            />
                        </Paper>
                    </Box>
                    {users.length == 0 && <Spinner />}
                    {users.length > 0 &&
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead className={classes.head}>
                                    <TableRow>
                                        <TableCell className={classes.th}>id</TableCell>
                                        <TableCell className={classes.th} align="left" sx={{ display: "flex", alignItems: "center" }}>
                                            Name
                                            {order == "asc" ?
                                                <ArrowUpwardIcon className={classes.arrow} onClick={Descending} />
                                                : <ArrowDownwardIcon className={classes.arrow} onClick={Ascending} />}

                                        </TableCell>
                                        <TableCell className={classes.th} align="left">Username</TableCell>
                                        <TableCell className={classes.th} align="left">Email</TableCell>
                                        <TableCell className={classes.th} align="left">City</TableCell>
                                        <TableCell className={classes.th} align="left">Action</TableCell>
                                    </TableRow>
                                </TableHead>

                                {sortData.length > 0 ? <TableBodyData data={currentSortUsers} /> : <TableBodyData data={currentUsers} />}

                            </Table>
                            <Stack spacing={2}>
                                <Pagination className={classes.pagination} page={currentPage} count={countPage} onChange={(_, value) => paginate(value)} variant="outlined" />
                            </Stack>
                        </TableContainer>
                    }
                </Container>
            </Box>
        </>
    )
};

export default Home

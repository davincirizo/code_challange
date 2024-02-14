import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from '../../general/appBar'
import { Pagination, Stack, Table, TableBody, TableHead, TableRow, Typography } from '@mui/material'
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { appoinmentsRequest } from '../../request/request';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { handleErrors } from '../../errors/handleErrors';
import storage from '../../storage/Storage';
import Button from '@mui/material/Button';
import DeleteAppoinment from './delete';
import { PulseLoader } from 'react-spinners';

const styleContainer = {
    position: 'absolute',
    top: '170px',
    left: '10%',
    width: '80%',
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#050505",
        color: theme.palette.common.white,

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,

    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,

    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,

    },
}));


function IndexAppoinment() {

    if (!storage.get('authUser')) {
        return <Navigate to="/" />
    }

    document.title = 'Appoinments'
    const [appoinments, setAppoinment] = useState([])
    const [appoinmentsFiltered, setAppoinmentfiltered] = useState([])

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [appoinmentXPage, setappoinmentXPage] = useState(10)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [firstPage,setFirstPage] = useState(0)
    const [lastPage,setLastPage] = useState(appoinmentXPage)

    const getAppoinment = async (value) => {
        const token = storage.get('authToken')
        setLoading(true)

        try {
            const response = await appoinmentsRequest.get('/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setAppoinment(response.data.appoinments)
            setAppoinmentfiltered(response.data.appoinments.slice(firstPage,lastPage))
            setTotalPages(Math.ceil(response.data.appoinments.length/appoinmentXPage))
            setLoading(false)
        }
        catch (e) {
            handleErrors(e, navigate)
        }
    }

    const update_appoinment_xpage = (e) => {
        if (e.target.value != 0) {
            setappoinmentXPage(e.target.value)
            setPage(1)
        }
    }

    const set_page = async (value) =>{
        setAppoinmentfiltered(appoinments.slice(firstPage,lastPage))
        setTotalPages(Math.ceil(appoinments.length/appoinmentXPage))
    }

    const onchange_page = (event, value) => {
        setPage(value)
    }
    const update_page = (value,user_x_page) => {
      
            if (value == 1){
                const first = 0
                const second = value * user_x_page
                setFirstPage(first)
                setLastPage(second)
                setAppoinmentfiltered(appoinments.slice(first, second))

            }
            else {
                const first = (value - 1) * user_x_page
                const second = value * user_x_page
                setFirstPage(first)
                setLastPage(second)
                setAppoinmentfiltered(appoinments.slice(first, second))
            }
            setTotalPages(Math.ceil(appoinments.length/user_x_page))
        }
    
    useEffect (() =>{
        update_page(page,appoinmentXPage)
    },[appoinmentXPage,page,appoinments])
    
    useEffect(() => {
        getAppoinment()
    }, [])

    return (
        <>
            <div className="full-screen-image">
                <img src='../public/fondo_pantalla.avif' alt="Fondo" />
                <ResponsiveAppBar />
                <h2 style={{ position: 'absolute', top: '90px', left: '50%', transform: 'translate(-50%, -50%)', color: 'black', fontFamily: 'Courier New' }}>
                    MY APPOINTMENT
                </h2>
                <div style={{ position: 'absolute', top: '90px', left: '80%' }}>
                    <Link to='/appoinments/create'>
                        <Button sx={{ position: 'absolute' }} variant="contained">Create</Button>
                    </Link>
                </div>
                <div>
                    {loading ? (
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translateX(-50%)'
                        }}>

                            <PulseLoader

                                size={40}
                                color="#1C0E74"
                            />
                        </div>
                    ) :
                        <>
                            {appoinmentsFiltered.length != 0 ? (
                                <Table sx={styleContainer}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left"> ID</StyledTableCell>
                                            <StyledTableCell align="left"> Date</StyledTableCell>
                                            <StyledTableCell align="left"> Customer Name</StyledTableCell>
                                            <StyledTableCell align="left"> Description</StyledTableCell>
                                            <StyledTableCell align="left"> </StyledTableCell>
                                            <StyledTableCell align="left"> </StyledTableCell>


                                        </TableRow>

                                    </TableHead>
                                    <TableBody>
                                        {appoinmentsFiltered.map((apappoinment) => (
                                            <StyledTableRow key={apappoinment.id}>
                                                <StyledTableCell component="th" scope="row">
                                                    {apappoinment.id}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    {apappoinment.appointment_day}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    {apappoinment.client}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    {apappoinment.notes}
                                                </StyledTableCell>
                                                <Link to={`/appoinments/${apappoinment.id}`}>
                                                    <StyledTableCell component="th" scope="row">
                                                        <Button variant="contained">Edit</Button>
                                                    </StyledTableCell>
                                                </Link>
                                                <StyledTableCell component="th" scope="row">
                                                    <DeleteAppoinment
                                                        id={apappoinment.id}
                                                        appoinments={appoinments}
                                                        setAppoinment={setAppoinment}

                                                    />
                                                </StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                    <Stack spacing={2}>
                                        <Typography>
                                            <div >
                                                <input style={{ width: '70px' }} className='input-group-text' type='number' value={appoinmentXPage} onChange={update_appoinment_xpage} />
                                            </div>
                                        </Typography>
                                        <Typography>Page: {page}</Typography>
                                        <Pagination variant="outlined" count={totalPages} page={page} onChange={onchange_page} />
                                    </Stack>
                                </Table>) :
                                <div>
                                    <h2 style={{ position: 'absolute', top: '150px', left: '50%', transform: 'translate(-50%, -50%)', color: 'black', fontFamily: 'Courier New' }}>
                                        DOES NOT HAVE APPOINTMENTS
                                    </h2>
                                    <p style={{ position: 'absolute', top: '300px', left: '50%', transform: 'translate(-50%, -50%)', color: 'black', fontFamily: 'Courier New' }}>
                                        MAKE AN APPOINTMENT TO GET STARTED
                                    </p>
                                </div>}
                        </>

                    }
                </div>


            </div>
        </>

    )
}

export default IndexAppoinment
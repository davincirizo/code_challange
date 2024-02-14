import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from '../../general/appBar'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Box, Button, InputLabel, TextField } from '@mui/material';
import storage from '../../storage/Storage';
import { appoinmentsRequest } from '../../request/request';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { handleErrors } from '../../errors/handleErrors';
import dayjs from 'dayjs';
import { show_alert_succes } from '../../alerts/ShowAlert';
import { PulseLoader } from 'react-spinners';


function EditAppoinment() {
    if (!storage.get('authUser')) {
        return <Navigate to="/" />
    }

    document.title = 'Appoinments'
    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        box-sizing: border-box;
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
    );


    const [date, setDate] = useState('')
    const [client, setClient] = useState('')
    const [notes, setNote] = useState('')
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const [messageError, setMessageError] = useState('')
    const { id } = useParams()
    const [loading, setLoading] = useState(false)



    const edit_appoinment = async (data) => {
        const token = storage.get('authToken')
        setErrors([])
        setMessageError('')
        setLoading(true)
        try {
            const response = await appoinmentsRequest.put(`/${id}`, {
                appointment_day: date,
                notes: notes,
                client: client
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            show_alert_succes(response.data.msg)
            navigate('/appoinments')
            setLoading(false)
        }
        catch (e) {
            setLoading(false)
            if (e.response.status == 400) {

                if (e.response.data.errors) {
                    setErrors(e.response.data.errors)
                    console.log('ty')
                }
                if (e.response.data.msg) {
                    setMessageError(e.response.data.msg)
                }

            }
            else {
                handleErrors(e, navigate, setErrors)
            }
        }

    }


    const load_appoinment = async () => {
        const token = storage.get('authToken')
        setLoading(true)
        try {
            const response = await appoinmentsRequest.get(`/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            setClient(response.data.appoinment.client)
            setNote(response.data.appoinment.notes)
            setDate(dayjs(response.data.appoinment.appointment_day))
            setLoading(false)
        }
        catch (e) {
            handleErrors(e, navigate)
            setLoading(false)
        }

    }

    useEffect(() => {
        load_appoinment()
    }, [])




    return (
        <div className="full-screen-image">
            <img src='../public/fondo_pantalla.avif' alt="Fondo" />
            <ResponsiveAppBar />
            <h2 style={{ position: 'absolute', top: '90px', left: '50%', transform: 'translate(-50%, -50%)', color: 'black', fontFamily: 'Courier New' }}>
                CREATE APPOINTMENT
            </h2>
            <>
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
                <div style={{ position: 'absolute', top: '220px', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <InputLabel htmlFor="standard-adornment-password" >Appointment date</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                                label="Basic date time picker"
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {errors && errors.appointment_day && (
                        <small style={{ color: 'red' }}>
                            {errors.appointment_day}
                        </small>
                    )}
                    <div style={{ position: 'absolute', top: '100px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '20px' }}>
                            <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                id="name-error"
                                label="Name Client"
                                variant="standard"
                                fullWidth
                                value={client}
                                onChange={(e) => setClient(e.target.value)}
                            />
                        </Box>
                        {errors && errors.client && (
                            <small style={{ color: 'red' }}>
                                {errors.client}
                            </small>
                        )}
                    </div>
                    <div style={{ position: 'absolute', top: '200px' }}>
                        <textarea
                            maxRows={10}
                            aria-label="maximum height"
                            placeholder="Insert appointment description"
                            value={notes}
                            onChange={(e) => setNote(e.target.value)}
                        />
                        {errors && errors.notes && (
                            <small style={{ color: 'red' }}>
                                {errors.notes}
                            </small>
                        )}

                        <div style={{ marginTop: '10px' }}>
                            <Button onClick={edit_appoinment} variant="contained">UPDATE</Button>
                        </div>
                        {messageError && (
                            <small style={{ color: 'red' }}>
                                {messageError}
                            </small>
                        )}

                    </div>

                </div>}
            </>

        </div>
    )
}

export default EditAppoinment
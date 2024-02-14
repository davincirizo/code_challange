import { Box, Button, Modal } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import storage from '../../storage/Storage';
import { appoinmentsRequest } from '../../request/request';
import { PulseLoader } from 'react-spinners';
import { show_alert_succes } from '../../alerts/ShowAlert';
import { handleErrors } from '../../errors/handleErrors';


const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 80,
    bgcolor: '#ead4b0',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
}

function DeleteAppoinment(props) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    }
    const {id,appoinments,setAppoinment} = props

    const delete_appoinment = async () => {
        const token = storage.get('authToken')
        try{
            setLoading(true)
            const res = await appoinmentsRequest.delete(`/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setLoading(false)
            setAppoinment(appoinments.filter(appoinments_filter => appoinments_filter.id != id))
            handleClose()
            show_alert_succes(res.data.msg)
    
        }
        catch(e){
            setLoading(false)
            handleErrors(e,navigate)
     
        }
    }
    
    return (
        <>

            <Box onClick={handleOpen} sx={{ '& > :not(style)': { m: 1 } }}>
                <Button variant="contained">Delete</Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}>

                <Box sx={style}>
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

                        <div>
                            <div>
                                Are you sure to delete the appointment?
                            </div>


                            <div>
                                <Button onClick={delete_appoinment}>
                                    YES
                                </Button>
                                <Button onClick={handleClose}>
                                    NO
                                </Button>
                            </div>
                        </div>}



                </Box>

            </Modal>


        </>
    )
}

export default DeleteAppoinment
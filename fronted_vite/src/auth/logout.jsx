import React from 'react'
import { useState } from 'react'
import { show_alert_succes } from '../alerts/ShowAlert';
import { useNavigate } from 'react-router-dom';
import storage from '../storage/Storage';
import { logoutRequest } from '../request/request';
import { Box, Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { PulseLoader } from 'react-spinners';

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
function Logout() {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    }
    const navigate = useNavigate()

    const logout = async () => {
        const token = storage.get('authToken')
        try{
            setLoading(true)
            const res = await logoutRequest.post('',{},{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            storage.remove('authToken');
            storage.remove('authUser');
            setLoading(false)
            handleClose()
            show_alert_succes(res.data.msg)
            navigate('/')
    
        }
        catch(e){
            setLoading(false)
            handleErrors(e,navigate)
     
        }
    }

  return (
    <>

    <Box onClick={handleOpen} sx={{ '& > :not(style)': { m: 1 } }}>
    {['Logout'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
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
                    Are you sure you log out?
                    </div>


                    <div>
                        <Button onClick={logout}>
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

export default Logout
import React, { useState } from 'react'
import './login.css';
import { Box, Button, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import FormControl from '@mui/material/FormControl';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {  registerRequest } from '../request/request';
import { PulseLoader } from 'react-spinners';
import { handleErrors } from '../errors/handleErrors';
import { notification_succes } from '../alerts/NotificationTostify';
import { show_alert_succes } from '../alerts/ShowAlert';
import storage from '../storage/Storage';



function Register() {

  if (storage.get('authUser')) {
    return <Navigate to="/home" />

  }

  document.title = 'Register';

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setconfirmPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const register_user = async (data) => {
    setErrors([])
    setLoading(true)
    try {
      const res = await registerRequest.post(``, {
        name:name,
        email: email,
        password: password,
        confirm_password:confirm_password
      })
      setLoading(false)
      console.log(res.data.msg)
      show_alert_succes(res.data.msg)
      navigate('/')
    }
    catch (e) {
      setLoading(false)
      handleErrors(e,navigate,setErrors)

    }
  }

  return (
    <div>  <div className="full-screen-image">
      <img src='../public/login.jpg' alt="Fondo" />


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
        <div className="login-box">

          <form onSubmit={register_user}>
            <div>
              <div style={{marginTop: '8px'}}>
                {errors && errors.name ? (
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                      id="name-error"
                      label="Name"
                      variant="standard"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error
                      helperText={errors.name}
                    />
                  </Box>) :
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                      id="name"
                      label="Name"
                      variant="standard"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}

                    />
                  </Box>}
              </div>
              <div style={{marginTop: '8px'}}>
                {errors && errors.email ? (
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <MailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                      id="input-with-sx"
                      label="Email"
                      variant="standard"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error
                      helperText={errors.email}
                    />
                  </Box>) :
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <MailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                      id="input-with-sx"
                      label="Email"
                      variant="standard"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}

                    />
                  </Box>}
              </div>
              <div style={{marginTop: '8px'}}>
                {errors && errors.password ? (
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password" >Password</InputLabel>
                      <Input
                        error
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password-error"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                  </Box>) :

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password" >Password</InputLabel>
                      <Input

                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>

                        }
                      />
                    </FormControl>

                  </Box>}
                {errors && errors.password && (
                  <small style={{ color: 'red' }}>
                    {errors.password}
                  </small>
                )}

              </div>
              <div style={{marginTop: '8px'}}>
                {errors && errors.confirm_password ? (
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password" >Confirm Password</InputLabel>
                      <Input
                        error
                        value={confirm_password}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        id="confirm-password=error"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                  </Box>) :

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password" >Confirm Password</InputLabel>
                      <Input

                        value={confirm_password}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        id="confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>

                        }
                      />
                    </FormControl>

                  </Box>}
                {errors && errors.confirm_password && (
                  <small style={{ color: 'red' }}>
                    {errors.confirm_password}
                  </small>
                )}

              </div>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '8px' }}>
                <Button type='submit' variant="contained">Register</Button>
                <Link style={{ marginLeft: '10px' }} to='/'>
                  Log In
                </Link>
              </Box>
            </div>

          </form>
        </div>}
    </div></div>
  )
}

export default Register
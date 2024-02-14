import React, { useState } from 'react'
import './login.css';
import { loginRequest } from '../request/request';
import storage from '../storage/Storage';
import { Navigate, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import MailIcon from '@mui/icons-material/Mail';
import { Box, Button, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { Link } from "react-router-dom";




function Login() {
  const navigate = useNavigate()

  if (storage.get('authUser')) {
    return <Navigate to="/home" />

  }

  document.title = 'Login';
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const urlBackend = import.meta.env.VITE_BACKEND_URL
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const csrf = async () => {
    await axios.get(`${urlBackend}/sanctum/csrf-cookie`);
  }

  const login_user = async (data) => {
    setErrors([])
    setMessage('')
    try {
      setLoading(true)
      await csrf();
      const res = await loginRequest.post(``, {
        email: email,
        password: password,
      }
      )
      if (res.data.token) {
        storage.set('authToken', res.data.token);
        storage.set('authUser', res.data.data);
      }
      setLoading(false)

      navigate('/home')


    }
    catch (e) {
      setLoading(false)
      if (e.response.status == 400) {
        setErrors(e.response.data.errors)

      }
      if (e.response.status == 401) {
        setErrors(e.response.data.errors)
        setMessage(e.response.data.msg)

      }
    

    }
  }


  return (
    <div className="full-screen-image">
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

          <form onSubmit={login_user}>
            <div>
              <div>
                {errors && errors.email ? (
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <MailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                      id="email-error"
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
                      id="email"
                      label="Email"
                      variant="standard"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}

                    />
                  </Box>}
              </div>
              <>
                {errors && errors.password ? (
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password" >Password</InputLabel>
                      <Input
                        error
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

                  </Box>) :

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password" >Password</InputLabel>
                      <Input

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

                  </Box>}
                {errors && errors.password && (
                  <small style={{ color: 'red' }}>
                    {errors.password}
                  </small>
                )}
                {message && (
                  <small style={{ color: 'red' }}>
                    {message}
                  </small>
                )}
              </>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '8px' }}>
                <Button type='submit' style={{ marginLeft: '8px' }} variant="contained">Log In</Button>
                <Link style={{ marginLeft: '10px' }} to='/register'>
                  Register
                </Link>

              </Box>
            </div>

          </form>
        </div>}
    </div>
  )
}

export default Login
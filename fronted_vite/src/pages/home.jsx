import React from 'react'

import { Navigate } from 'react-router-dom'
import storage from '../storage/Storage'
import '../auth/login.css';
import ResponsiveAppBar from '../general/appBar';

function Home() {
  document.title = 'Home'

  if(!storage.get('authUser')){
    return <Navigate to="/" />
  }
  return (
    <>
       <div className="full-screen-image">
            <img src='../public/fondo_pantalla.avif' alt="Fondo" />

      <ResponsiveAppBar/>
      </div>
    </>

  )
}

export default Home
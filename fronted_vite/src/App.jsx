import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './auth/login'
import PageErrorNetwork from './errors/PageErrorNetwork'
import Page401 from './errors/Page401Inhautorized'
import Page403 from './errors/Page403Fordibben'
import Page404 from './errors/Page404NotFound'
import Page500 from './errors/Page500'

import Register from './auth/register'
import Home from './pages/home'
import IndexAppoinment from './pages/appointment'
import CreateAppoinment from './pages/appointment/create'
import EditAppoinment from './pages/appointment/edit'


function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/error_network' element={<PageErrorNetwork />} />
          <Route path='/inhautorized_401' element={<Page401 />} />
          <Route path='/fordibben_403' element={<Page403 />} />
          <Route path='/not_found_404' element={<Page404 />} />
          <Route path='/internal_server_error_500' element={<Page500 />} />
          <Route path='/home' element={<Home/>} />
          <Route path='/*' element={<Page404/>}/>

          <Route path='/appoinments' element={<IndexAppoinment/>}/>
          <Route path='/appoinments/create' element={<CreateAppoinment/>}/>
          <Route path='/appoinments/:id' element={<EditAppoinment/>}/>





        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App

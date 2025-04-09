import React from 'react'
// import { Navbar } from '../../ui'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Articulos from '../pages/Articulos'
import Error from '../../auth/pages/Error'
import Navbar from '../components/navbars/Navbar'
import GestionSolicitudes from '../pages/GestionSolicitudes'
import Inventario from '../pages/Inventario'
import Entregas from '../pages/Entregas'

export const AppRoutes = () => {


  return (
    <>
         <Navbar/>
        <div style={{margin:'5rem 5rem 5rem 5rem'}}>
          <Routes>
              <Route path="app" element={<Home/>} />
              <Route path="articulos" element={<Articulos/>} />
              <Route path="solicitudes" element={<GestionSolicitudes/>} />
              <Route path="inventario" element={<Inventario/>} />
              <Route path="entregas" element={<Entregas/>} />
              <Route path="*" element={<Error/>} />
              
              <Route path="/" element={<Navigate to ="/app"/>} />
          </Routes>
        </div>


    </>
  )
}
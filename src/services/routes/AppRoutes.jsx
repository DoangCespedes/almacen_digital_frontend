import React from 'react'
// import { Navbar } from '../../ui'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Articulos from '../pages/Articulos'
import Error from '../../auth/pages/Error'
import Navbar from '../components/navbars/Navbar'
import GestionSolicitudes from '../pages/GestionSolicitudes'

export const AppRoutes = () => {


  return (
    <>
         <Navbar/>
        <div style={{margin:'5rem 5rem 5rem 5rem'}}>
          <Routes>
              <Route path="app" element={<Home/>} />
              <Route path="articulos" element={<Articulos/>} />
              <Route path="g-solicitudes" element={<GestionSolicitudes/>} />
              
              {/* <Route path="search" element={<SearchPage/>} />
              <Route path="hero/:id" element={<HeroPage/>} /> */}
              <Route path="*" element={<Error/>} />
              
              <Route path="/" element={<Navigate to ="/app"/>} />
          </Routes>
        </div>


    </>
  )
}
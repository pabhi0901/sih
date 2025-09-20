import React from 'react'
import { Route, Routes,Navigate } from 'react-router-dom'
import Login from "../pages/Login"
import Dashboard from '../pages/DashBoard';
import TouristComponent from "../components/TouristComponent"
import HandicraftComponent from "../components/HandicraftComponent"
import HomestaysComponent from "../components/HomestaysComponent"
import GuideComponent from "../components/GuideComponent"
import DestinationComponent from "../components/DestinationComponent"
import HandicraftLogin from '../pages/HandicraftLogin';
import HomeStaysLogin from '../pages/HomeStaysLogin';
import HomeStayAdminPage from '../pages/HomeStayAdminPage';
import HandiCraftAdminPage from '../pages/HandiCraftAdminPage';

import Me from "../pages/Me"

const MainRoutes = () => {
  return (
    <div>
      <Routes>

    <Route path ="/"  element={<Me />}/>
        <Route path='/admin' element={<Login />} />
        
        <Route path='/dashBoard' element= {<Dashboard/>} >
    <Route path="tourist" element={<TouristComponent />} />
    <Route path="destination" element={<DestinationComponent />} />
    <Route path="handicraft" element={<HandicraftComponent />} />
    <Route path="homestays" element={<HomestaysComponent />} />
    <Route path="guide" element={<GuideComponent />} />
    <Route index element={<Navigate to="tourist" replace />} />  
        </Route>

      <Route path="handicraftlogin" element={<HandicraftLogin />} />
      <Route path='homestaysLogin' element={<HomeStaysLogin />}/>
      <Route path="homestaysadmin" element={<HomeStayAdminPage />}/>
      <Route path='handicraftadmin' element ={<HandiCraftAdminPage />} />
      
      </Routes>
    </div>
  )
}

export default MainRoutes

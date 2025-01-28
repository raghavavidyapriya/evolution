import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from "./components/Footer/Footer"
import {Route, Routes} from "react-router-dom"
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Orders from "./pages/Orders/Orders"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPopup from './pages/LoginPopup/LoginPopup'
import "./index.css"



const App = () => {
  
  return (
    <>
      <ToastContainer/>
      <div className='app'>
        <Navbar/>
        <Sidebar/>
          <Routes>
            <Route path="/" element={<LoginPopup/>}/>
            <Route path="/add" element={<Add/>}/>
            <Route path="/list" element={<List/>}/>
            <Route path="/orders" element={<Orders/>}/>
          </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
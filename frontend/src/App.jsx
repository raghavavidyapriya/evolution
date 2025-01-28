import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  const [menu, setMenu] = useState("home");

  return (
    <>
      <ToastContainer/>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
        <div className='app'>
          <Navbar 
            menu={menu} 
            setMenu={setMenu} 
            setShowLogin={setShowLogin}
          />
          <Routes>
            <Route path='/' element={<Home setMenu={setMenu} />} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/order' element={<PlaceOrder/>} />
            <Route path='/verify' element={<Verify/>}/>
            <Route path='/myorders' element={<MyOrders/>}/>
          </Routes>
        </div>
        <Footer/>
    </>
  )
}

export default App
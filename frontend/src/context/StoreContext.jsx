import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://evolution-backend-w1pe.onrender.com"
    const [token, setToken] = useState("")
    const [cars_list, setCarsList] = useState([])

    const fetchCarsList = async() => {
        const response = await axios.get(`${url}/api/accessories/list`)
        setCarsList(response.data.data)
    }

    const addToCart = async(itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev)=>({...prev, [itemId]:1}))
        } else {
            setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        }
        if (token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    };

    const removeFromCart = async(itemId) => {
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
        if (token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const loadCartData = async(token) => {
        const response = await axios.post(url+"/api/cart/get", {}, {headers:{token}})
        setCartItems(response.data.cartData)
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems){
            if (cartItems[item]>0){
                let itemInfo = cars_list.find((product) => product._id === item);
                totalAmount += itemInfo.price*cartItems[item];
            }
        }            
        return totalAmount;
    }

    useEffect(()=>{
        async function loadData() {
            await fetchCarsList()
            if (localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
        }
        }
        loadData()
    },[])

    const contextValue = {
        cars_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider

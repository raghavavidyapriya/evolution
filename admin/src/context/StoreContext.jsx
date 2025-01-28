import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const backend_url = "https://evolution-backend-w1pe.onrender.com"
    const [token, setToken] = useState("")


    useEffect(()=>{
        async function loadData() {
            if (localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])

    const contextValue = {
        backend_url,
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

/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";



export let userToken = createContext(null);

export default function UserTokenProvider ({children}) {
    let [isLogin,setLogin] = useState(null)

if (localStorage.getItem('item') ) {
setLogin(localStorage.getItem('token'))
}






return <userToken.Provider value={{isLogin,setLogin}}> 
{children}
</userToken.Provider>

}
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";




export let counterContext = createContext(0);

export default function ConterContextProvider({children}) {

let [counter,setCounter] = useState()

function increase() {
    // setCounter(counter+1)
}

 return  <counterContext.Provider value={{counter,increase}}>

    {children}
 </counterContext.Provider>  

}
import { createContext, useState } from "react";


export const context=createContext();
export default function ContextProvider(props){
    const [bookdetails,setBookdetails]=useState([]);
    const [cbook, setCbook]=useState({})



    return(
        <>
        <context.Provider value={{bookdetails,setBookdetails,cbook,setCbook}}>
            {props.children}
        </context.Provider>
        </>
    )
}

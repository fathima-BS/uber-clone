import { createContext, useState } from "react";

export const CaptainDataContext=createContext();

export default function CaptainContext({children}){
    const [captain,setCaptain]=useState({
        fullName:{
            firstName:'',
            lastName:''
        },
        email:''
    })
    return (
        <div>
            <CaptainDataContext.Provider value={{captain,setCaptain}}>
                {children}
            </CaptainDataContext.Provider>

        </div>
    )
}

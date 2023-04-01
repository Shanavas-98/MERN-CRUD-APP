import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useUserContext = ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw Error("useAuthContext must be used inside an AuthContextProvider")
    }
    return context
}

export const useAdminContext = ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw Error("useAuthContext must be used inside an AuthContextProvider")
    }
    return context
}
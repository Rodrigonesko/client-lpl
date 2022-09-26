import React, {createContext, useState} from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

    const [authToken, setAuthToken] = useState(null)
    const [name, setName] = useState('')
    const [accessLevel, setAccessLevel] = useState()
    const [liminares, setLiminares] = useState()
    const [liminaresAj, setLiminaresAj] = useState()
    const [enfermeiro, setEnfermeiro] = useState()
    const [elegibilidade, setElegibilidade] = useState()

    return (
        <AuthContext.Provider value={{authToken, setAuthToken, accessLevel, setAccessLevel, name, setName, liminares, setLiminares, liminaresAj, setLiminaresAj, enfermeiro, setEnfermeiro, elegibilidade, setElegibilidade}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
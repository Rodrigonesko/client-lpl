import React, { createContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState(null)
    const [name, setName] = useState('')
    const [accessLevel, setAccessLevel] = useState()
    const [enfermeiro, setEnfermeiro] = useState()
    const [elegibilidade, setElegibilidade] = useState()
    const [acessos, setAcessos] = useState()

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, accessLevel, setAccessLevel, name, setName, enfermeiro, setEnfermeiro, elegibilidade, setElegibilidade, acessos, setAcessos }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
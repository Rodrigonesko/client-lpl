import React, {createContext, useState} from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

    const [authToken, setAuthToken] = useState(null)
    const [name, setName] = useState('')
    const [accessLevel, setAccessLevel] = useState()

    return (
        <AuthContext.Provider value={{authToken, setAuthToken, accessLevel, setAccessLevel, name, setName}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
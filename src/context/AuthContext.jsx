import React, {createContext, useState} from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

    const [authToken, setAuthToken] = useState(null)
    const [name, setName] = useState('')
    const [accessLevel, setAccessLevel] = useState()

    return (
        <AuthContext.Provider value={{authToken: null, setAuthToken, accessLevel: null, setAccessLevel}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
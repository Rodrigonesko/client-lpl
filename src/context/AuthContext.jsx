import React, {createContext, useState} from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

    const [authToken, setAuthToken] = useState(null)

    return (
        <AuthContext.Provider value={{authToken: null, setAuthToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
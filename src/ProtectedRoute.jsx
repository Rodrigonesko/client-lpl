import React, { useContext, useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import AuthContext from "./context/AuthContext";
import Axios from 'axios'

const ProtectedRoute = ({ children }) => {

    const { authToken, accessLevel, setAccessLevel, name, setName} = useContext(AuthContext)

    const navigate = useNavigate()

    const verifyToken = async () =>{
        try {
            const result = await Axios.get('http://10.0.121.55:3001/verifyToken', {withCredentials: true})

            setName(result.data.name)
            setAccessLevel(result.data.accessLevel)

            console.log(name, accessLevel);

        } catch (error) {
            navigate('/login')
        }
       
    }

    useEffect( () => {

        verifyToken()
 
    }, [name])


    return (
        children
    )
}

export default ProtectedRoute
import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import AuthContext from "./context/AuthContext";
import Axios from 'axios'

const ProtectedRoute = ({ children }) => {

    const { authToken, accessLevel, setAccessLevel, name, setName, setLiminares, setLiminaresAj, setEnfermeiro, setElegibilidade} = useContext(AuthContext)

    const navigate = useNavigate()

    const verifyToken = async () =>{
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/verifyToken`, {withCredentials: true})

            setName(result.data.name)
            setAccessLevel(result.data.accessLevel)

            const modules = await Axios.get(`${process.env.REACT_APP_API_KEY}/infoUser`, {withCredentials: true})
            setLiminares(modules.data.user.liminares)
            setLiminaresAj(modules.data.user.liminaresAj)
            setEnfermeiro(modules.data.user.enfermeiro)
            setElegibilidade(modules.data.user.elegibilidade)

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
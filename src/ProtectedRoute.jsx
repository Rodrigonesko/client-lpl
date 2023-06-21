import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import AuthContext from "./context/AuthContext";
import { verificarToken } from "./_services/auth.service";
import { getInfoUser } from "./_services/user.service";

const ProtectedRoute = ({ children }) => {

    const { setAccessLevel, name, setName, setEnfermeiro, setElegibilidade } = useContext(AuthContext)

    const navigate = useNavigate()

    const verifyToken = async () => {
        try {
            const result = await verificarToken()

            setName(result.name)
            setAccessLevel(result.accessLevel)

            const modules = await getInfoUser()
            setEnfermeiro(modules.user.enfermeiro)
            setElegibilidade(modules.user.elegibilidade)

        } catch (error) {
            console.log(error);
            navigate('/login')
        }

    }

    useEffect(() => {
        verifyToken()
    }, [name])


    return (
        children
    )
}

export default ProtectedRoute
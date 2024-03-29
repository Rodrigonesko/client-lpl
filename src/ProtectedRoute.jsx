import { useContext, useEffect } from "react";
import AuthContext from "./context/AuthContext";
import { verificarToken } from "./_services/auth.service";
import { getInfoUser } from "./_services/user.service";

const ProtectedRoute = ({ children }) => {

    const { setAccessLevel, name, setName, setEnfermeiro, setElegibilidade, setAcessos } = useContext(AuthContext)

    const verifyToken = async () => {
        try {
            const result = await verificarToken()
            setName(result.name)
            setAccessLevel(result.accessLevel)
            const modules = await getInfoUser(result.email)
            setEnfermeiro(modules.user.enfermeiro)
            setElegibilidade(modules.user.elegibilidade)
            setAcessos(modules.user?.acessos)

        } catch (error) {
            console.log(error);
            window.location.replace('/login')
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
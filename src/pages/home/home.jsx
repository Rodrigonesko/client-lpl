import React, { useEffect, useState, useContext } from "react";
import './style.css'
import SideBar from '../../components/Sidebar/Sidebar'
import AuthContext from "../../context/AuthContext";
import { Button, TextField, Box, Snackbar, Alert } from "@mui/material";
import { getInfoUser, updatePassword } from "../../_services/user.service";

const Home = () => {

    const [firstAccess, setFirstAccess] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const { name } = useContext(AuthContext)

    const handlerUpdatePassword = async () => {

        try {

            await updatePassword({
                password,
                confirmPassword
            })

            window.location.reload()

        } catch (error) {
            setMessage(error.response.data.message)
            setError(true)
        }

    }

    const fetchInfoUser = async () => {

        try {
            const result = await getInfoUser()

            if (result.user.firstAccess === 'Sim') {
                setFirstAccess(true)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchInfoUser()
    }, [])

    return (
        <>
            <SideBar />
            <section className="section">
                <div className="container">
                    <div className="title">
                        <h1>Bem vindo {name}!</h1>
                    </div>
                    {
                        firstAccess && (
                            <div className="first-access">
                                <div className="title">
                                    <h2>É sua primeira vez acessando o sistema</h2>
                                    <h3>Por favor defina uma senha por gentileza</h3>
                                </div>
                                <div className="inputs-container">
                                    <Box m={2}>
                                        <TextField type="password" name="password" id="password" label='Senha' onChange={e => setPassword(e.target.value)} />
                                    </Box>
                                    <Box m={2}>
                                        <TextField type="password" name="confirmPassword" id="confirmPassword" label='Confirmar senha' onChange={e => setConfirmPassword(e.target.value)} />
                                    </Box>



                                </div>
                                <div className="btn-container">
                                    <Button variant='contained' onClick={handlerUpdatePassword}>Enviar</Button>
                                </div>
                            </div>
                        )
                    }

                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={error}
                        onClose={() => setError(false)}
                    >
                        <Alert onClose={() => setError(false)} variant='filled' severity="error" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                </div>
            </section>
        </>

    )
}

export default Home
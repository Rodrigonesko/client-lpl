import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle, TextField, CircularProgress } from "@mui/material";
import AuthContext from "../../context/AuthContext";
import Axios from 'axios'
import logo from '../../imgs/logo.png'
import './style.css'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const { setAuthToken } = useContext(AuthContext)

    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        console.log(email, password);
        setLoading(true)

        try {
            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/login`, {
                email,
                password
            }, { withCredentials: true })
            console.log(result);
            if (result.status === 200) {
                const authToken = result.data.token
                console.log(authToken);
                setAuthToken(authToken)
                navigate('/')

            }
        } catch (error) {
            console.log(error);
            setError(true)
            setLoading(false)
        }

    }

    return (
        <section className="section-container-login">
            <div className="container-login">
                <form action="#" method="POST">
                    <div className="logo">
                        <img src={logo} width={300} alt="logo lpl" srcset="logo lpl" />
                    </div>
                    <div>
                        {
                            error ? (
                                <Alert severity="error">
                                    <AlertTitle>Erro ao entrar</AlertTitle>
                                    Senha ou Email incorretos!
                                </Alert>
                            ) : null
                        }
                    </div>
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', left: '49%' }} />
                        ) : null
                    }
                    <div className="title">
                        <h3>Login</h3>
                    </div>
                    <div className="">
                        <TextField type="text" label='Email' id="email" name="email" onChange={e => setEmail(e.target.value)} variant="standard" />
                    </div>
                    <div className="" style={{ marginTop: '5px' }}>
                        <TextField type="password" label='Senha' id="password" name="password" onChange={e => setPassword(e.target.value)} variant="standard" />
                    </div>
                    <div className="input-box">
                        <button variant="contained" color="primary" onClick={login}>Entrar</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login
import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import AuthContext from "../../context/AuthContext";
import Axios from 'axios'
import logo from '../../imgs/logo.png'
import './style.css'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAuthToken } = useContext(AuthContext)

    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        console.log(email, password);

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
        }


    }

    return (
        <section className="section-container-login">
            <div className="container-login">
                <form action="#" method="POST">
                    <div className="logo">
                        <img src={logo} width={300} alt="logo lpl" srcset="logo lpl" />
                    </div>
                    <div className="title">
                        <h3>Login</h3>
                    </div>
                    <div className="input-box">
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder="Email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" id="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <button onClick={login}>Entrar</button>

                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login
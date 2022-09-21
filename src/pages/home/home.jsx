import React, { useEffect, useState, useContext } from "react";
import './style.css'
import SideBar from '../../components/Sidebar/Sidebar'
import Axios from 'axios'
import AuthContext from "../../context/AuthContext";

const Home = () => {

    const [firstAccess, setFirstAccess] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [msg, setMsg] = useState('')

    const {name} = useContext(AuthContext)

    const updatePassword = async () => {

        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/users/updatePassword`, {password, confirmPassword}, {withCredentials: true})

            console.log(result);

            setMsg('Senha atualizada com sucesso! Atualize a página por gentileza')

        } catch (error) {
            console.log(error);
        }

    }

    const getInfoUser = async () => {

        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/infoUser`, { withCredentials: true })

            setUsername(result.data.user.name)

            if (result.data.user.firstAccess === 'Sim') {
                setFirstAccess(true)
                
            }

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getInfoUser()
    }, [])

    return (
        <>
            <SideBar/>
            <section className="section">
                <div className="container">
                    <div className="title">
                        <h1>Bem vindo {name}!</h1>
                    </div>

                    {msg && (
                        <div className="container-msg">
                            <span>{msg}</span>
                        </div>
                    )}


                    {
                        firstAccess && (
                            <div className="first-access">
                                <div className="title">
                                    <h2>É sua primeira vez acessando o sistema</h2>
                                    <h3>Por favor defina uma senha por gentileza</h3>
                                </div>
                                <div className="inputs-container">
                                    <div className="input-box">
                                        <label htmlFor="password">Senha: </label>
                                        <input type="password" name="password" id="password" placeholder="Senha" onChange={e=>setPassword(e.target.value)}/>
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="confirmPassword">Confirmar Senha: </label>
                                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirmar Senha" onChange={e=>setConfirmPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="btn-container">
                                    <button onClick={updatePassword}>Enviar</button>
                                </div>
                            </div>
                        )
                    }


                </div>
            </section>
        </>

    )
}

export default Home
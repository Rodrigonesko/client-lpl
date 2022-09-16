import React, {useState} from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import './Create.css'
const Create = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [admin, setAdmin] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')


    const toggleAdmin = ()=>{
        setAdmin(!admin)
    }

    const cadastrar = async e=>{
        e.preventDefault()

        try {
            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/users`, {email, name, password, confirmPassword, accessLevel: admin}, {withCredentials: true})

            if(result.status === 201){
                setResponseMessage('Usuario Criado com Sucesso!')
            }

        } catch (error) {
            setResponseMessage(error.response.data.message)
            
        }

    }

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-create-container">

                {responseMessage && (
                    <div className="warning">
                        {responseMessage}
                    </div>
                )}


                <div className="create-container">
                    <div className="title">
                        <h3>Criar usuario</h3>
                    </div>
                    <form action="" method="post" className="form-create">
                        <div className="input-box">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="email" onChange={e=>setEmail(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <label htmlFor="name">Nome</label>
                            <input type="text" name="name" id="name" placeholder="Nome" onChange={e=>setName(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <label htmlFor="password">Senha</label>
                            <input type="password" name="password" id="password" placeholder="Senha" onChange={e=>setPassword(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <label htmlFor="confirmPassword">Confirmar Senha</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Senha" onChange={e=>setConfirmPassword(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <label htmlFor="admin">Administrador?</label>
                            <input type="checkbox" name="admin" id="admin" onClick={toggleAdmin} />
                        </div>
                        <div className="btn-box">
                            <button onClick={cadastrar}>Cadastrar</button>
                        </div>

                    </form>
                </div>
            </section>
        </>
    )

}

export default Create
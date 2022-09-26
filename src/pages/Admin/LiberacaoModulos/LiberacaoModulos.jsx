import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";


const LiberacaoModulos = () => {

    const [email, setEmail] = useState('')
    const [liminares, setLiminares] = useState(false)
    const [liminaresAj, setLiminaresAj] = useState(false)
    const [enfermeiro, setEnfermeiro] = useState(false)
    const [elegibilidade, setElegibilidade] = useState(false)
    const [busca, setBusca] = useState(false)
    const [msg, setMsg] = useState('')

    const buscarEmail = async e => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/infoUser/${email}`, { withCredentials: true })

            if (result.data.user !== null) {
                setBusca(true)
                console.log(result);
                setMsg('')
                if (result.data.user.liminares == null || result.data.user.liminares == 'false') {
                    setLiminares(false)
                } else {
                    setLiminares(true)
                }
                if (result.data.user.liminaresAj == null || result.data.user.liminaresAj == 'false') {
                    setLiminaresAj(false)
                } else {
                    setLiminaresAj(true)
                }

                if (result.data.user.enfermeiro == null || result.data.user.enfermeiro == 'false') {
                    setEnfermeiro(false)
                } else {
                    setEnfermeiro(true)
                }

                if (result.data.user.elegibilidade == null || result.data.user.elegibilidade == 'false') {
                    setElegibilidade(false)
                } else {
                    setElegibilidade(true)
                }


            } else {
                setBusca(false)
                setMsg('Não foi encontrado um usuário com este e-mail!')

            }

        } catch (error) {
            console.log(error);
            setBusca(false)
        }
    }

    const liberar = async e => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/users/modules`, {email, liminares, liminaresAj, enfermeiro, elegibilidade}, {withCredentials: true})

            if(result.status == 200){
                setMsg('Modulos atualizados com sucesso!')
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar />
            <section>
                <div>
                    <div className="title">
                        Liberação de Módulos
                    </div>
                    <div className="email-container">
                        <label htmlFor="email">Email Usuario</label>
                        <input type="text" name="email" id="email" placeholder="Email" onKeyUp={e => setEmail(e.target.value)} />
                        <button onClick={buscarEmail}>Buscar</button>
                    </div>
                    <div>
                        {
                            msg
                        }
                    </div>
                    {
                        busca && (
                            <div className="modulos">
                                <h3>Módulos a serem liberados para o email: {email}</h3>
                                <div className="input-box">
                                    <label htmlFor="liminares">Liminares</label>
                                    <input type="checkbox" name="liminares" id="liminares" defaultChecked={liminares} onChange={e => setLiminares(!liminares)} />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="liminares-aj">Liminares Aj</label>
                                    <input type="checkbox" name="liminares-aj" id="liminares-aj" defaultChecked={liminaresAj} onChange={e => setLiminaresAj(!liminaresAj)} />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="enfermeiro">Enfermeiro</label>
                                    <input type="checkbox" name="enfermeiro" id="enfermeiro" defaultChecked={enfermeiro} onChange={e => setEnfermeiro(!enfermeiro)} />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="elegibilidade">Elegiblidade</label>
                                    <input type="checkbox" name="elegibilidade" id="elegibilidade" defaultChecked={elegibilidade} onChange={e => setElegibilidade(!elegibilidade)} />
                                </div>
                                <div className="btn-container">
                                    <button onClick={liberar}>Liberar</button>
                                </div>
                            </div>
                        )
                    }

                </div>
            </section>
        </>
    )
}

export default LiberacaoModulos
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../../components/Sidebar/Sidebar";

const CriarOperadoraBeneficiario = () => {

    const navigate = useNavigate()

    const [descricao, setDescricao] = useState('')
    const [sla, setSla] = useState('')

    const cadastrar = async () => {
        try {

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/rsd/operadoras/criar`, {
                descricao,
                sla
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                navigate('/rsd/OperadoraBeneficiario')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar></Sidebar>
            <section>
                <div>
                    <div className="title">
                        <h3>Nova Operadora Beneficiário</h3>
                    </div>
                    <div className="input-box">
                        <label htmlFor="descricao">Descrição</label>
                        <input type="text" id="descricao" placeholder="Descrição" onChange={e => {
                            setDescricao(e.target.value)
                        }} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="sla">SLA</label>
                        <input type="number" id="sla" placeholder="SLA em dias" onChange={e => {
                            setSla(e.target.value)
                        }} />
                    </div>
                    <div>
                        <button onClick={cadastrar} className="cadastrar-operadora">Cadastrar</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CriarOperadoraBeneficiario
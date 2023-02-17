import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from 'axios'
import Sidebar from "../../../../components/Sidebar/Sidebar";

const EditarOperadoraBeneficiario = () => {

    const navigate = useNavigate()

    const { id } = useParams()

    const [descricao, setDescricao] = useState('')
    const [sla, setSla] = useState('')

    const editar = async () => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/operadoras/editar`, {
                descricao,
                sla,
                id
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


    useEffect(() => {

        const buscarOperadora = async () => {
            try {

                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/operadora/${id}`, { withCredentials: true })

                setDescricao(result.data.operadora.descricao)
                setSla(result.data.operadora.sla)

            } catch (error) {
                console.log(error);
            }
        }


        buscarOperadora()
    }, [id])

    return (
        <>
            <Sidebar></Sidebar>
            <section>
                <div>
                    <div className="title">
                        <h3>Editar Operadora Beneficiário</h3>
                    </div>
                    <div className="input-box">
                        <label htmlFor="descricao">Descrição</label>
                        <input type="text" id="descricao" placeholder="Descrição" defaultValue={descricao} onChange={e => {
                            setDescricao(e.target.value)
                        }} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="sla">SLA</label>
                        <input type="number" id="sla" placeholder="SLA em dias" defaultValue={sla} onChange={e => {
                            setSla(e.target.value)
                        }} />
                    </div>
                    <div>
                        <button onClick={editar} className="cadastrar-operadora">Editar</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditarOperadoraBeneficiario
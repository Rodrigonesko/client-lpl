import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'

const UrgenciaEmergenciaAnexar = () => {

    const [propostas, setPropostas] = useState([])
    const [total, setTotal] = useState('')

    const buscarPropostas = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/anexar`, { withCredentials: true })

            setPropostas(result.data.propostas)
            setTotal(result.data.propostas.length)

        } catch (error) {
            console.log(error);
        }
    }

    const concluir = async (id) => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/concluirAnexo`, {
                id
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarPropostas()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-padrao-tabela">
                <div className="container-padrao-tabela">
                    <div className="title">
                        <h3>Urgência & Emergência</h3>
                    </div>
                    <div>
                        <h3>Em andamento: {total}</h3>
                    </div>
                    <div>
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Nome Associado</th>
                                    <th>Mo</th>
                                    <th>Proposta</th>
                                    <th>Retificou?</th>
                                    <th>Observações</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {propostas.map(e => {
                                    return (
                                        <tr>
                                            <td>{e.nomeAssociado}</td>
                                            <td>{e.numAssociado}</td>
                                            <td>{e.proposta}</td>
                                            <td>{e.retorno}</td>
                                            <td>{e.observacoes}</td>
                                            <td><button className="btn-padrao-verde" onClick={()=>concluir(e._id)} >Concluir</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UrgenciaEmergenciaAnexar
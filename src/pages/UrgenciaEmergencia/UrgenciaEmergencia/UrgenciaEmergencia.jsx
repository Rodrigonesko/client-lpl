import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { Link } from "react-router-dom";

const UrgenciaEmergencia = () => {

    const [propostas, setPropostas] = useState([])
    const [total, setTotal] = useState('')

    const buscarPropostas = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/andamento`, {withCredentials: true})

            setPropostas(result.data.propostas)
            setTotal(result.data.propostas.length)

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
                                    <th>Idade</th>
                                    <th>Telefone</th>
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
                                            <td>{e.idade}</td>
                                            <td>{e.telefone}</td>
                                            <td><Link to={`/urgenciaEmergencia/detalhes/${e._id}`}>Detalhes</Link></td>
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

export default UrgenciaEmergencia
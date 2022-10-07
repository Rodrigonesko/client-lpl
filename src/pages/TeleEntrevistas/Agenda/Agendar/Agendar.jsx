import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Sidebar from "../../../../components/Sidebar/Sidebar";
import './Agendar.css'

const Agendar = () => {

    const [propostas, setPropostas] = useState([])
    const [enfermeiros, setEnfermeiros] = useState([])

    const searchPropostas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas`, { withCredentials: true })

            setPropostas(result.data.propostas)

        } catch (error) {
            console.log(error);
        }
    }

    const searchEnfermeiros = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users/enfermeiros`, {withCredentials: true})

            setEnfermeiros(result.data.enfermeiros)

            console.log(enfermeiros); 

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        searchPropostas()
        searchEnfermeiros()
    }, [])

    return (
        <>
            <Sidebar />
            <section className="section-agendamento-container">
                <div className="agendamento-container">
                    <div className="title">
                        <h3>Agendamento de Horários</h3>
                    </div>
                    <div className="gerar-horarios">
                        <label htmlFor="">Selecionar dia para entrevistas</label>
                        <input type="date" name="" id="" />
                        <button className="btn-gerar-horarios">Gerar</button>
                    </div>
                    <div className="agendar">
                        <select name="nome" id="nome">
                            <option value=""></option>
                            {
                                propostas.map(e => {

                                    if (e.status != 'Concluido') {
                                        return (
                                            <option key={e._id} value={e.nome}>{e.nome}</option>
                                        )
                                    }

                                })
                            }
                        </select>
                        <select name="enfermeira" id="enfermeira">
                            <option value=""></option>
                            {
                                enfermeiros.map( e => {
                                    return (
                                        <option key={e._id} value={e.name}>{e.name}</option>
                                    )
                                })
                            }
                        </select>
                        <select name="data" id="data">
                            <option value=""></option>
                            <option value="05/10/2022">05/10/2022</option>
                        </select>
                        <select name="horario" id="horario">
                            <option value=""></option>
                            <option value="09:00">09:00</option>
                        </select>
                        <button className="btn-agendar">Agendar</button>
                    </div>
                    <div className="nao-agendados">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Data Vigencia</th>
                                    <th>Proposta</th>
                                    <th>Nome</th>
                                    <th>Data Nascimento</th>
                                    <th>Sexo</th>
                                    <th>Telefone</th>
                                    <th>Cancelar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    propostas.map(e => {
                                        if (e.status != 'Concluido') {
                                            return (
                                                <tr key={e._id}>
                                                    <td>{e.vigencia}</td>
                                                    <td>{e.proposta}</td>
                                                    <td>{e.nome}</td>
                                                    <td>{e.dataNascimento}</td>
                                                    <td>{e.sexo}</td>
                                                    <td>{e.telefone}</td>
                                                    <td><button className="btn-cancelar">Cancelar</button></td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Agendar
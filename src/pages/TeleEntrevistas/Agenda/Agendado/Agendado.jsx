import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import Axios from 'axios'
import moment from "moment";
import './Agendado.css'


const Agendado = () => {

    const [propostas, setPropostas] = useState([])
    const [enfermeiros, setEnfermeiros] = useState([])
    const [qtdAgendado, setQtdAgendado] = useState(0)

    const searchEnfermeiro = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users/enfermeiros`, { withCredentials: true })

            setEnfermeiros(result.data.enfermeiros)

            console.log(enfermeiros);

        } catch (error) {
            console.log(error);
        }
    }

    const searchPropostas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/agendadas`, { withCredentials: true })

            setPropostas(result.data.propostas)
            setQtdAgendado(result.data.propostas.length)

        } catch (error) {
            console.log(error);
        }
    }

    const filtroEnfermeiro = async enfermeiro => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas`, { withCredentials: true })

        setPropostas([])

        if (enfermeiro === 'Todos') {
            searchPropostas()
        }

        Object.values(result.data.propostas).forEach(e => {
            if (e.enfermeiro === enfermeiro) {
                setPropostas(propostas => [...propostas, e])
            }
        })

    }

    const alterarTelefone = async (telefone, id) => {
        try {
            
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/alterarTelefone`, {id, telefone}, {withCredentials: true})

            console.log(result);
            
        } catch (error) {
            console.log(error);
        }
    }

    const reagendar = async (id) => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/reagendar`, { id }, { withCredentials: true })
            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        searchPropostas()
        searchEnfermeiro()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-agendados-container">
                <div className="agendados-container">
                    <div className="title">
                        <h3>Agendados: </h3>
                    </div>
                    <div className="filtros-agendados">
                        <select name="enfermeiros" id="enfermeiros" onChange={e => {
                            filtroEnfermeiro(e.target.value)
                        }}>
                            <option value="Todos">Todos</option>
                            {
                                enfermeiros.map(e => {
                                    return (
                                        <option key={e._id} value={e.name}>{e.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="qtd-agendados">
                        <h3>Agendado: {qtdAgendado}</h3>
                    </div>
                    <div className="agendados">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Data Entrevista</th>
                                    <th>Horário</th>
                                    <th>Proposta</th>
                                    <th>Telefone</th>
                                    <th>Nome</th>
                                    <th>Idade</th>
                                    <th>Sexo</th>
                                    <th>Enfermeiro</th>
                                    <th>Botoes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    propostas.map(e => {

                                        if(e.status != 'Concluído' && e.agendado == 'agendado' && e.status != 'Cancelado'){
                                            return (
                                            
                                                <tr key={e._id}>
                                                    <td>{moment(e.dataEntrevista).format('DD/MM/YYYY')}</td>
                                                    <td>{moment(e.dataEntrevista).format('HH:mm:ss')}</td>
                                                    <td>{e.proposta}</td>
                                                    <td> <input type="text" defaultValue={e.telefone} onKeyUp={element => alterarTelefone(element.target.value, e._id)} /></td>
                                                    <td>{e.nome}</td>
                                                    <td>{e.idade}</td>
                                                    <td>{e.sexo}</td>
                                                    <td>{e.enfermeiro}</td>
                                                    <td>
                                                        <Link to={`/entrevistas/formulario/${e._id}`} className='link-formulario'>Formulario</Link>
                                                        <button className="botao-reagendar" onClick={() => {
                                                            reagendar(e._id)
                                                        }} >Reagendar</button>
                                                    </td>
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

export default Agendado
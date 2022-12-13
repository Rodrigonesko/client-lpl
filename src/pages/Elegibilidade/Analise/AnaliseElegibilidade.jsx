import React, { useEffect, useState, useContext } from "react";
import moment from "moment/moment";
import Axios from 'axios'
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Sidebar from "../../../components/Sidebar/Sidebar";

const AnaliseElegibilidade = () => {

    const { name } = useContext(AuthContext)

    const [propostas, setPropostas] = useState([])
    const [total, setTotal] = useState(0)
    const [analistas, setAnalistas] = useState([])

    const buscarPropostas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/propostas/analise/Todos`, { withCredentials: true })

            setPropostas(result.data.propostas)
            setTotal(result.data.total)

            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const buscarAnalistas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users/elegibilidade`, { withCredentials: true })

            setAnalistas(result.data.analistas)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarAnalistas()
        buscarPropostas()
    }, [name])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-padrao-elegi">
                <div className="div-padrao-elegi">
                    <div className="title">
                        <h3>Análise De Propostas</h3>
                    </div>
                    <div className="filtros-padrao-elegi">
                        <label htmlFor="proposta-analise-doc">Proposta: </label>
                        <input type="text" id="proposta-analise-doc" />
                        <span>Total: <strong>{total}</strong> </span>
                        <label htmlFor="">Filtrar por analista:</label>
                        <select name="" id="" onChange={e => {

                        }}>
                            <option value=""></option>
                            <option value="Todos">Todos</option>
                            {
                                analistas.map(analista => {
                                    return (
                                        <option value={analista.name} >{analista.name}</option>
                                    )
                                })
                            }
                        </select>
                        <label htmlFor="entidade">Entidade: </label>
                        <select name="entidade" id="entidade">
                            <option value=""></option>
                        </select>
                        <label htmlFor="status-proposta">Status da Proposta: </label>
                        <select name="status-proposta" id="status-proposta">
                            <option value="Todos">Todos</option>
                            <option value="A iniciar">A iniciar</option>
                            <option value="Em andamento">Em andamento</option>
                        </select>
                    </div>
                    <div className="analise-documentos">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Proposta</th>
                                    <th>Data Importação</th>
                                    <th>Inicio Vigencia</th>
                                    <th>Nome Titular</th>
                                    <th>Pre Processamento</th>
                                    <th>Entidade</th>
                                    <th>Analista</th>
                                    <th>Status Proposta</th>
                                    <th>Detalhes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    propostas.map(e => {
                                        return (
                                            <tr>
                                                <td>{e.proposta}</td>
                                                <td>{moment(e.dataImportacao).format('DD/MM/YYYY')}</td>
                                                <td>{moment(e.vigencia).format('DD/MM/YYYY')}</td>
                                                <td>{e.nome}</td>
                                                {
                                                    e.faltaDoc === 'Não' ? (
                                                        <td>Documentos OK</td>
                                                    ) : (
                                                        <td>Falta Doc</td>
                                                    )
                                                }
                                                <td>{e.entidade}</td>
                                                <td><select name="" id="">
                                                    <option value="A definir">A definir</option>
                                                    {
                                                        analistas.map(analista => {
                                                            return (
                                                                <option value={analista.name} selected={e.analista === analista.name ? (true) : (false)} >{analista.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select></td>
                                                <td>{e.status}</td>
                                                <td>Detalhes</td>
                                            </tr>
                                        )
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

export default AnaliseElegibilidade
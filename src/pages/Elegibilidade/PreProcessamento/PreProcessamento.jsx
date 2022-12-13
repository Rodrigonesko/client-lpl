import React, { useEffect, useState, useContext } from "react";
import moment from "moment/moment";
import Axios from 'axios'
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Sidebar from "../../../components/Sidebar/Sidebar";

const PreProcessamento = () => {

    const { name } = useContext(AuthContext)

    const [propostas, setPropostas] = useState([''])
    const [total, setTotal] = useState(0)
    const [analistas, setAnalistas] = useState([])

    const buscarPropostas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/propostas/preProcessamento/${name}`, { withCredentials: true })

            setPropostas(result.data.propostas)
            setTotal(result.data.total)

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

    const atribuirAnalista = async (analista, id) => {
        try {

            if (analista === '') {
                return
            }

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/atribuir/preProcessamento`, {
                analista,
                id
            }, {
                withCredentials: true
            })

        } catch (error) {
            console.log(error);
        }
    }

    const buscarPropostasAnalista = async (analista) => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/propostas/preProcessamento/${analista}`, { withCredentials: true })

        setPropostas(result.data.propostas)
        setTotal(result.data.total)

    }

    const buscarPropostaFiltrada = async (proposta) => {
        try {
            
            if(proposta === ''){
                buscarPropostas()
                return
            }

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/propostas/preProcessamento/proposta/${proposta}`, {withCredentials: true})

            setPropostas(result.data.proposta)

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        buscarPropostas()
        buscarAnalistas()
    }, [name])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-padrao-elegi">
                <div className="div-padrao-elegi">
                    <div className="title">
                        <h3>Análise de Documentos (Atrbuição Pré Processamento)</h3>
                    </div>
                    <div className="filtros-padrao-elegi">
                        <label htmlFor="proposta-analise-doc">Proposta: </label>
                        <input type="text" id="proposta-analise-doc" onKeyUp={e => (
                            buscarPropostaFiltrada(e.target.value)
                        )} />
                        <span>Total: <strong>{total}</strong> </span>
                        <label htmlFor="">Filtrar por analista:</label>
                        <select name="" id="" onChange={e => {
                            buscarPropostasAnalista(e.target.value)
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
                    </div>
                    <div className="analise-documentos">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Proposta</th>
                                    <th>Data Importação</th>
                                    <th>Início Vigência</th>
                                    <th>Nome Titular</th>
                                    <th>Sem Documentos</th>
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
                                                <td>{e.vigencia}</td>
                                                <td>{e.nome}</td>
                                                <td>{e.faltaDoc}</td>
                                                <td>
                                                    <select name="analistas" id="analistas" onChange={(item) => {
                                                        atribuirAnalista(item.target.value, e._id)
                                                    }}>
                                                        {
                                                            analistas.map(analista => {
                                                                return (
                                                                    <option value={analista.name} selected={e.analistaPreProcessamento === analista.name ? (true) : (false)} >{analista.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                                <td>{e.status}</td>
                                                <td><Link to={`/elegibilidade/preProcessamento/detalhes/${e._id}`} >Detalhes</Link></td>
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

export default PreProcessamento
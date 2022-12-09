import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import './AnaliseDocumentos.css'

const AnaliseDocumentos = () => {

    const [propostas, setPropostas] = useState([''])
    const [total, setTotal] = useState(0)
    const [analistas, setAnalistas] = useState([])

    const buscarPropostas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/propostas/analiseDoc`, { withCredentials: true })

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

            if(analista === ''){
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

    useEffect(() => {
        buscarPropostas()
        buscarAnalistas()
    }, [])

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
                        <input type="text" id="proposta-analise-doc" />
                        <span>Total: <strong>{total}</strong> </span>
                    </div>
                    <div className="analise-documentos">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Proposta</th>
                                    <th>Data Importação</th>
                                    <th>Início Vigência</th>
                                    <th>Nome Titular</th>
                                    <th>Analista</th>
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
                                                <td>
                                                    <select name="analistas" id="analistas" onChange={(item)=>{
                                                        atribuirAnalista(item.target.value, e._id)
                                                    }}>
                                                        <option value=""></option>
                                                        {
                                                            analistas.map(analista => {
                                                                return (
                                                                    <option value={analista.name}>{analista.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </td>
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

export default AnaliseDocumentos
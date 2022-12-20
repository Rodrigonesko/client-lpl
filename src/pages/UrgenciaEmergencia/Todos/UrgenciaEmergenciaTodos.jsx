import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { Link } from "react-router-dom";
import moment from "moment";

const UrgenciaEmergenciaTodos = () => {

    const [propostas, setPropostas] = useState([])
    const [total, setTotal] = useState('')

    const buscarPropostas = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/concluidas`, { withCredentials: true })

            setPropostas(result.data.propostas)
            setTotal(result.data.propostas.length)

        } catch (error) {
            console.log(error);
        }
    }

    const reportConcluidas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/concluidas`, { withCredentials: true })

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>DATA</th>"
            xls += "<th>NUM_ASSOCIADO</th>"
            xls += "<th>PROPOSTA</th>"
            xls += "<th>DATA_INCLUSAO</th>"
            xls += "<th>NOME_ASSOC</th>"
            xls += "<th>DATA_NASC</th>"
            xls += "<th>IDADE</th>"
            xls += "<th>RESPONSÁVEL</th>"
            xls += "<th>TEL CTTO</th>"
            xls += "<th>EMAIL</th>"
            xls += "<th>DATA_SOLICITACAO</th>"
            xls += "<th>NOME_PRESTADOR</th>"
            xls += "<th>CID</th>"
            xls += "<th>NOM_CID_PRIN_AUTORIZ</th>"
            xls += "<th>SIT_AUTORIZ</th>"
            xls += "<th>INF RELATÓRIO MÉDICO</th>"
            xls += "<th>OBS UNDER</th>"
            xls += "<th>1º CTTO</th>"
            xls += "<th>2º CTTO</th>"
            xls += "<th>3º CTTO</th>"
            xls += "<th>RETORNO LPL</th>"
            xls += "<th>OBSERVAÇÕES DO CONTATO</th>"
            xls += "</tr></thead><tbody>"

            result.data.propostas.forEach(e => {
                xls += "<tr>"
                xls += `<td>${moment(e.dataRecebimento).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.numAssociado}</td>`
                xls += `<td>${e.proposta}</td>`
                xls += `<td>${moment(e.dataInclusao).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.nomeAssociado}</td>`
                xls += `<td>${moment(e.dataNascimento).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.idade}</td>`
                xls += `<td>${e.responsavel}</td>`
                xls += `<td>${e.telefone}</td>`
                xls += `<td>${e.email}</td>`
                xls += `<td>${moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.nomePrestador}</td>`
                xls += `<td>${e.cid}</td>`
                xls += `<td>${e.descricaoCid}</td>`
                xls += `<td>${e.sitAutoriz}</td>`
                xls += `<td>${e.relatorioMedico}</td>`
                xls += `<td>${e.obsUnder}</td>`
                if (e.contato1 === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${e.contato1}</td>`
                }
                if (e.contato2 === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${e.contato2}</td>`
                }
                if (e.contato3 === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${e.contato3}</td>`
                }
                if (e.retorno === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${e.retorno}</td>`
                }
                if (e.observacoes === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${e.observacoes}</td>`
                }

                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatorio Urgencia Emergencia.xls'
            a.click()
        } catch (error) {
            console.log(error);
        }
    }
    const reportTodas = async () => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/todas`, { withCredentials: true })

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>DATA</th>"
        xls += "<th>NUM_ASSOCIADO</th>"
        xls += "<th>PROPOSTA</th>"
        xls += "<th>DATA_INCLUSAO</th>"
        xls += "<th>NOME_ASSOC</th>"
        xls += "<th>DATA_NASC</th>"
        xls += "<th>IDADE</th>"
        xls += "<th>RESPONSÁVEL</th>"
        xls += "<th>TEL CTTO</th>"
        xls += "<th>EMAIL</th>"
        xls += "<th>DATA_SOLICITACAO</th>"
        xls += "<th>NOME_PRESTADOR</th>"
        xls += "<th>CID</th>"
        xls += "<th>NOM_CID_PRIN_AUTORIZ</th>"
        xls += "<th>SIT_AUTORIZ</th>"
        xls += "<th>INF RELATÓRIO MÉDICO</th>"
        xls += "<th>OBS UNDER</th>"
        xls += "<th>1º CTTO</th>"
        xls += "<th>2º CTTO</th>"
        xls += "<th>3º CTTO</th>"
        xls += "<th>RETORNO LPL</th>"
        xls += "<th>OBSERVAÇÕES DO CONTATO</th>"
        xls += "</tr></thead><tbody>"

        result.data.propostas.forEach(e => {
            xls += "<tr>"
            xls += `<td>${moment(e.dataRecebimento).format('DD/MM/YYYY')}</td>`
            xls += `<td>${e.numAssociado}</td>`
            xls += `<td>${e.proposta}</td>`
            xls += `<td>${moment(e.dataInclusao).format('DD/MM/YYYY')}</td>`
            xls += `<td>${e.nomeAssociado}</td>`
            xls += `<td>${moment(e.dataNascimento).format('DD/MM/YYYY')}</td>`
            xls += `<td>${e.idade}</td>`
            xls += `<td>${e.responsavel}</td>`
            xls += `<td>${e.telefone}</td>`
            xls += `<td>${e.email}</td>`
            xls += `<td>${moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>`
            xls += `<td>${e.nomePrestador}</td>`
            xls += `<td>${e.cid}</td>`
            xls += `<td>${e.descricaoCid}</td>`
            xls += `<td>${e.sitAutoriz}</td>`
            xls += `<td>${e.relatorioMedico}</td>`
            xls += `<td>${e.obsUnder}</td>`
            if (e.contato1 === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${e.contato1}</td>`
            }
            if (e.contato2 === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${e.contato2}</td>`
            }
            if (e.contato3 === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${e.contato3}</td>`
            }
            if (e.retorno === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${e.retorno}</td>`
            }
            if (e.observacoes === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${e.observacoes}</td>`
            }

            xls += `</tr>`
        })

        xls += "</tbody></table>"

        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = 'Relatorio Urgencia Emergencia.xls'
        a.click()
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
                        <h3>Concluídas: {total}</h3>
                        <button onClick={reportTodas} >Report Todas</button>
                        <button onClick={reportConcluidas} >Report Concluídas</button>
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

export default UrgenciaEmergenciaTodos
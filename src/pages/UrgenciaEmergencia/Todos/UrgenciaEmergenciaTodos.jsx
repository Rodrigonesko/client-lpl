import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import moment from "moment";
import { Button, Table, TableHead, TableBody, TableRow, TableCell, Container, TableContainer } from "@mui/material";

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
            xls += "<th>MÊS</th>"
            xls += "<th>DATA</th>"
            xls += "<th>NUM_ASSOCIADO</th>"
            xls += "<th>NOME_ASSOCIADO</th>"
            xls += "<th>DATA_NASCIMENTO</th>"
            xls += "<th>IDADE</th>"
            xls += "<th>DATA_ADESAO</th>"
            xls += "<th>DATA_INCLUSAO</th>"
            xls += "<th>DATA_EXCLUSAO</th>"
            xls += "<th>NOME_PLANO</th>"
            xls += "<th>TIPO_CONTRATO</th>"
            xls += "<th>NUM_DDD</th>"
            xls += "<th>NUM_TELEFONE</th>"
            xls += "<th>EMAIL</th>"
            xls += "<th>COD_PRC</th>"
            xls += "<th>IND_RESP_1</th>"
            xls += "<th>IND_RESP_2</th>"
            xls += "<th>IND_RESP_3</th>"
            xls += "<th>IND_RESP_4</th>"
            xls += "<th>IND_RESP_5</th>"
            xls += "<th>IND_RESP_6</th>"
            xls += "<th>IND_RESP_7</th>"
            xls += "<th>IND_RESP_8</th>"
            xls += "<th>IND_RESP_9</th>"
            xls += "<th>NUM_PEDIDO</th>"
            xls += "<th>DATA_SOLICITACAO</th>"
            xls += "<th>IDADE_NA_SOLIC</th>"
            xls += "<th>DATA_AUTORIZACAO</th>"
            xls += "<th>IND_CARATER_AUTORIZ</th>"
            xls += "<th>NOME_PRESTADOR_AUTORIZ</th>"
            xls += "<th>CID_PRIN_AUTORIZ</th>"
            xls += "<th>NOM_CID_PRIN_AUTORIZ</th>"
            xls += "<th>CID_SECUND_AUTORIZ</th>"
            xls += "<th>NOM_CID_SECUND_AUTORIZ</th>"
            xls += "<th>SIT_AUTORIZ</th>"
            xls += "<th>NOME_TRATAMENTO_AUTORIZ</th>"
            xls += "<th> INF RELATORIO MÉDICO </th>"
            xls += "<th>CPT IMPUTADA (SIM/NÃO)</th>"
            xls += "<th>1º CTTO</th>"
            xls += "<th>2º CTTO</th>"
            xls += "<th>3º CTTO</th>"
            xls += "<th>OBSERVAÇÕES DO CONTATO</th>"
            xls += "</tr></thead><tbody>"

            result.data.propostas.forEach(e => {
                xls += "<tr>"
                xls += `<td>${e.mes}</td>`
                xls += `<td>${moment(e.data).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.numAssociado}</td>`
                xls += `<td>${e.nomeAssociado}</td>`
                xls += `<td>${moment(e.dataNascimento).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.idade}</td>`
                xls += `<td>${moment(e.dataAdesao).format('DD/MM/YYYY')}</td>`
                xls += `<td>${moment(e.dataInclusao).format('DD/MM/YYYY')}</td>`
                xls += `<td></td>`
                xls += `<td>${e.nomePlano}</td>`
                xls += `<td>${e.tipoContrato}</td>`
                xls += `<td>${e.ddd}</td>`
                xls += `<td>${e.telefone}</td>`
                let email = e.email.replaceAll('#', ' ');
                xls += `<td>${email}</td>`
                xls += `<td>${e.prc}</td>`
                xls += `<td>${e.indResp1}</td>`
                xls += `<td>${e.indResp2}</td>`
                xls += `<td>${e.indResp3}</td>`
                xls += `<td>${e.indResp4}</td>`
                xls += `<td>${e.indResp5}</td>`
                xls += `<td>${e.indResp6}</td>`
                xls += `<td>${e.indResp7}</td>`
                xls += `<td>${e.indResp8}</td>`
                xls += `<td>${e.indResp9}</td>`
                xls += `<td>${e.pedido}</td>`
                xls += `<td>${moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.idadeSolic}</td>`
                xls += `<td>${moment(e.dataAutorizacao).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.indCarater}</td>`
                xls += `<td>${e.nomePrestador}</td>`
                xls += `<td>${e.cidPrin}</td>`
                xls += `<td>${e.nomeCidPrin}</td>`
                xls += `<td>${e.cidSec}</td>`
                xls += `<td>${e.nomeCidSec}</td>`
                xls += `<td>${e.sitAutoriz}</td>`
                xls += `<td>${e.nomeTratamento}</td>`
                xls += `<td>${e.relatorioMedico}</td>`
                if (e.retorno === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${e.retorno}</td>`
                }
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
        xls += "<th>MÊS</th>"
        xls += "<th>DATA</th>"
        xls += "<th>NUM_ASSOCIADO</th>"
        xls += "<th>NOME_ASSOCIADO</th>"
        xls += "<th>DATA_NASCIMENTO</th>"
        xls += "<th>IDADE</th>"
        xls += "<th>DATA_ADESAO</th>"
        xls += "<th>DATA_INCLUSAO</th>"
        xls += "<th>DATA_EXCLUSAO</th>"
        xls += "<th>NOME_PLANO</th>"
        xls += "<th>TIPO_CONTRATO</th>"
        xls += "<th>NUM_DDD</th>"
        xls += "<th>NUM_TELEFONE</th>"
        xls += "<th>EMAIL</th>"
        xls += "<th>COD_PRC</th>"
        xls += "<th>IND_RESP_1</th>"
        xls += "<th>IND_RESP_2</th>"
        xls += "<th>IND_RESP_3</th>"
        xls += "<th>IND_RESP_4</th>"
        xls += "<th>IND_RESP_5</th>"
        xls += "<th>IND_RESP_6</th>"
        xls += "<th>IND_RESP_7</th>"
        xls += "<th>IND_RESP_8</th>"
        xls += "<th>IND_RESP_9</th>"
        xls += "<th>NUM_PEDIDO</th>"
        xls += "<th>DATA_SOLICITACAO</th>"
        xls += "<th>IDADE_NA_SOLIC</th>"
        xls += "<th>DATA_AUTORIZACAO</th>"
        xls += "<th>IND_CARATER_AUTORIZ</th>"
        xls += "<th>NOME_PRESTADOR_AUTORIZ</th>"
        xls += "<th>CID_PRIN_AUTORIZ</th>"
        xls += "<th>NOM_CID_PRIN_AUTORIZ</th>"
        xls += "<th>CID_SECUND_AUTORIZ</th>"
        xls += "<th>NOM_CID_SECUND_AUTORIZ</th>"
        xls += "<th>SIT_AUTORIZ</th>"
        xls += "<th>NOME_TRATAMENTO_AUTORIZ</th>"
        xls += "<th> INF RELATORIO MÉDICO </th>"
        xls += "<th>CPT IMPUTADA (SIM/NÃO)</th>"
        xls += "<th>1º CTTO</th>"
        xls += "<th>2º CTTO</th>"
        xls += "<th>3º CTTO</th>"
        xls += "<th>OBSERVAÇÕES DO CONTATO</th>"
        xls += "<th>Data Recebimento</th>"
        xls += "<th>Data Conclusão</th>"
        xls += "</tr></thead><tbody>"

        result.data.propostas.forEach(e => {
            xls += "<tr>"
            xls += `<td>${e.mes}</td>`
            xls += `<td>${moment(e.data).format('DD/MM/YYYY')}</td>`
            xls += `<td>${e.numAssociado}</td>`
            xls += `<td>${e.nomeAssociado}</td>`
            xls += `<td>${moment(e.dataNascimento).format('DD/MM/YYYY')}</td>`
            xls += `<td>${e.idade}</td>`
            xls += `<td>${moment(e.dataAdesao).format('DD/MM/YYYY')}</td>`
            xls += `<td>${moment(e.dataInclusao).format('DD/MM/YYYY')}</td>`
            xls += `<td></td>`
            xls += `<td>${e.nomePlano}</td>`
            xls += `<td>${e.tipoContrato}</td>`
            xls += `<td>${e.ddd}</td>`
            xls += `<td>${e.telefone}</td>`
            let email = e.email.replaceAll('#', ' ');
            xls += `<td>${email}</td>`
            xls += `<td>${e.prc}</td>`
            xls += `<td>${e.indResp1}</td>`
            xls += `<td>${e.indResp2}</td>`
            xls += `<td>${e.indResp3}</td>`
            xls += `<td>${e.indResp4}</td>`
            xls += `<td>${e.indResp5}</td>`
            xls += `<td>${e.indResp6}</td>`
            xls += `<td>${e.indResp7}</td>`
            xls += `<td>${e.indResp8}</td>`
            xls += `<td>${e.indResp9}</td>`
            xls += `<td>${e.pedido}</td>`
            xls += `<td>${moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>`
            xls += `<td>${e.idadeSolic}</td>`
            xls += `<td>${moment(e.dataAutorizacao).format('DD/MM/YYYY')}</td>`
            xls += `<td>${e.indCarater}</td>`
            xls += `<td>${e.nomePrestador}</td>`
            xls += `<td>${e.cidPrin}</td>`
            xls += `<td>${e.nomeCidPrin}</td>`
            xls += `<td>${e.cidSec}</td>`
            xls += `<td>${e.nomeCidSec}</td>`
            xls += `<td>${e.sitAutoriz}</td>`
            xls += `<td>${e.nomeTratamento}</td>`
            xls += `<td>${e.relatorioMedico}</td>`
            if (e.retorno === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${e.retorno}</td>`
            }
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

            if (e.observacoes === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${e.observacoes}</td>`
            }
            xls += `<td>${moment(e.createdAt).format('DD/MM/YYYY')}</td>`
            xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
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
                <Container>
                    <div className="title">
                        <h3>Urgência & Emergência</h3>
                    </div>
                    <div>
                        <h3>Concluídas: {total}</h3>
                        <Button variant='contained' style={{ position: 'absolute', top: '20px', right: '50px' }} onClick={reportTodas} >Report Todas</Button>
                        <Button variant='outlined' style={{ position: 'absolute', top: '20px', right: '200px' }} onClick={reportConcluidas} >Report Concluídas</Button>
                    </div>
                    <TableContainer>
                        <Table className="table">
                            <TableHead className="table-header">
                                <TableRow>
                                    <TableCell>Nome Associado</TableCell>
                                    <TableCell>Mo</TableCell>
                                    <TableCell>Proposta</TableCell>
                                    <TableCell>Idade</TableCell>
                                    <TableCell>Telefone</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {propostas.map(e => {
                                    return (
                                        <TableRow key={e._id}>
                                            <TableCell>{e.nomeAssociado}</TableCell>
                                            <TableCell>{e.numAssociado}</TableCell>
                                            <TableCell>{e.proposta}</TableCell>
                                            <TableCell>{e.idade}</TableCell>
                                            <TableCell>{e.telefone}</TableCell>
                                            <TableCell><Button size="small" variant='contained' href={`/urgenciaEmergencia/detalhes/${e._id}`}>Detalhes</Button></TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </section>
        </>
    )
}

export default UrgenciaEmergenciaTodos
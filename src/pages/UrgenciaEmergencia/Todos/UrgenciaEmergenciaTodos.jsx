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
        xls += "<th>NUM_TELEFONE</th>"
        xls += "<th>EMAIL</th>"
        xls += "<th>COD_PRC</th>"
        xls += "<th>NUM_PEDIDO</th>"
        xls += "<th>NOME_PRESTADOR_AUTORIZ</th>"
        xls += "<th> INF RELATORIO MÉDICO </th>"
        xls += "<th>CPT IMPUTADA (SIM/NÃO)</th>"
        xls += "<th>1º CTTO</th>"
        xls += "<th>2º CTTO</th>"
        xls += "<th>3º CTTO</th>"
        xls += "<th>OBSERVAÇÕES DO CONTATO</th>"
        xls += "<th>Data Recebimento</th>"
        xls += "<th>Data Conclusão</th>"
        xls += "<th>Status</th>"
        xls += "<th>Analista</th>"
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
            xls += `<td>${e.telefone}</td>`
            xls += `<td>${e.email.replaceAll('#', ' ')}</td>`
            xls += `<td>${e.prc}</td>`
            xls += `<td>${e.pedido}</td>`
            xls += `<td>${e.nomePrestador}</td>`
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
            if (e.dataConclusao === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
            }
            if (e.status === 'Anexar' || e.status === 'Concluído') {
                xls += `<td>Concluído</td>`
            } else {
                xls += `<td>Andamento</td>`
            }

            xls += `<td>${e.analista}</td>`

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
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { Button, Box, TextField, TableContainer, Table, TableHead, Table, TableRow, TableCell, Alert, Snackbar } from "@mui/material";
import * as XLSX from "xlsx";
import moment from "moment";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './Todas.css'
import { filterRn } from "../../../_services/teleEntrevista.service";
import { Container } from "@mui/material";

const Todas = () => {

    const [rns, setRns] = useState([])
    const [pesquisa, setPesquisa] = useState('')
    const [alerta, setAlerta] = useState(false)

    let rnsForExcel

    const handleClose = () => {
        setAlerta(false)
    }
    const handleChange = (elemento) => {

        setPesquisa(elemento.target.value)
    }
    const handleFilter = async (event) => {

        event.preventDefault()

        if (pesquisa.length <= 2) {
            setAlerta(true)
            return
        }

        const resultado = await filterRn(pesquisa)
        setRns(resultado)
    }

    const transformData = () => {
        try {

            rnsForExcel = rns.map(e => {

                let contato1, contato2, contato3

                if (e.dataContato1 !== undefined) {
                    contato1 = moment(e.dataContato1).format('DD/MM/YYYY') + ' ' + e.horarioContato1
                }

                if (e.dataContato2 !== undefined) {
                    contato2 = moment(e.dataContato2).format('DD/MM/YYYY') + ' ' + e.horarioContato2
                }

                if (e.dataContato3 !== undefined) {
                    contato3 = moment(e.dataContato3).format('DD/MM/YYYY') + ' ' + e.horarioContato3
                }

                return (
                    {
                        DATA: e.data,
                        'BENEFICIÁRIO': e.beneficiario,
                        MO: e.mo,
                        PROPOSTA: e.proposta,
                        VIGENCIA: e.vigencia,
                        'PEDIDO/PROPOSTA': e.pedido,
                        TIPO: e.tipo,
                        FILIAL: e.filial,
                        IDADE: e.idade,
                        'DATA RECEBIMENTO DO PEDIDO': e.dataRecebimento,
                        PROCEDIMENTO: e.procedimento,
                        'DOENÇA': e.doenca,
                        CID: e.cid,
                        'PERÍODO DA DOENÇA': e.periodo,
                        PRC: e.prc,
                        'TELEFONES BENEFICIARIO': e.telefones,
                        'EMAIL BENEFICIARIO': e.email,
                        '1º CTTO': contato1,
                        '2º CTTO': contato2,
                        '3º CTTO': contato3,
                        'OBSERVAÇÕES DO CONTATO': e.observacoes,
                        'Analista': e.analistaAmil || ''
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }

    const report = async () => {

        transformData()

        try {
            const ws = XLSX.utils.json_to_sheet(rnsForExcel)
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
            XLSX.writeFile(wb, 'reportRn.xlsx')

            console.log(ws);

        } catch (error) {
            console.log(error);
        }

    }

    const reportGerencial = async () => {
        try {

            let xls = '\ufeff'

            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Data Conclusão</th>"
            xls += "<th>Beneficiário</th>"
            xls += "<th>MO</th>"
            xls += "<th>Proposta</th>"
            xls += "<th>Vigência</th>"
            xls += "<th>Pedido</th>"
            xls += "<th>Tipo</th>"
            xls += "<th>Filial</th>"
            xls += "<th>Idade</th>"
            xls += "<th>Data Recebimento</th>"
            xls += "<th>Procedimento</th>"
            xls += "<th>Doença</th>"
            xls += "<th>Cid</th>"
            xls += "<th>Período</th>"
            xls += "<th>Prc</th>"
            xls += "<th>Telefones Beneficiário</th>"
            xls += "<th>Email</th>"
            xls += "<th>1° Contato</th>"
            xls += "<th>2° Contato</th>"
            xls += "<th>3° Contato</th>"
            xls += "<th>Observações</th>"
            xls += "<th>Responsável</th>"
            xls += "<th>Cancelado</th>"
            xls += "<th>Data Inclusão</th>"
            xls += "</tr></thead><tbody>"

            rns.forEach(e => {

                xls += "<tr>"
                if (e.dataConclusao === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
                }
                xls += `<td>${e.beneficiario}</td>`
                xls += `<td>${e.mo}</td>`
                xls += `<td>${e.proposta}</td>`
                xls += `<td>${e.vigencia}</td>`
                xls += `<td>${e.pedido}</td>`
                xls += `<td>${e.tipo}</td>`
                xls += `<td>${e.filial}</td>`
                xls += `<td>${e.idade}</td>`
                xls += `<td>${e.dataRecebimento}</td>`
                xls += `<td>${e.procedimento}</td>`
                xls += `<td>${e.doenca}</td>`
                xls += `<td>${e.cid}</td>`
                xls += `<td>${e.periodo}</td>`
                xls += `<td>${e.prc}</td>`
                xls += `<td>${e.telefones}</td>`
                xls += `<td>${e.email}</td>`
                xls += `<td>${e.contato1}</td>`
                xls += `<td>${e.contato2}</td>`
                xls += `<td>${e.contato3}</td>`
                xls += `<td>${e.observacoes}</td>`
                xls += `<td>${e.responsavel}</td>`
                if (e.cancelado) {
                    xls += `<td>${e.cancelado}</td>`
                } else {
                    xls += `<td></td>`
                }
                xls += `<td>${moment(e.createdAt).format('DD/MM/YYYY')}</td>`
                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatorio Propostas.xls'
            a.click()

        } catch (error) {

        }
    }

    return (
        <>
            <Sidebar />
            <Container>
                <div className="rn-container">

                    <div className="title">
                        <h2>Rns</h2>
                    </div>

                    <Box
                        display={"flex"}
                        paddingTop={"15px"}
                        paddingBottom={"15px"}
                    >
                        <form action="" >
                            <TextField onChange={handleChange} size='small' label='Nome, MO, Pedido e Proposta' sx={{ marginRight: '10px' }}
                            />
                            <Button type="submit" onClick={handleFilter} variant='contained' >Pesquisar</Button>
                        </form>
                        <Box position={'absolute'} right='20px'>
                            <Button variant="outlined" onClick={report} sx={{ marginRight: '10px' }}>Report</Button>
                            <Button variant="contained" onClick={reportGerencial} >Report Gerencial</Button>
                        </Box>
                    </Box>
                    <Snackbar open={alerta} autoHideDuration={6000} onClose={handleClose}>
                        <Alert variant="filled" onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                            Digite no minimo 3 caracteres!
                        </Alert>
                    </Snackbar>

                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow className="table-header">
                                        <TableCell>BENEFICIARIO</TableCell>
                                        <TableCell>MO</TableCell>
                                        <TableCell>IDADE</TableCell>
                                        <TableCell>TELEFONE</TableCell>
                                        <TableCell>CONFIRMADO?</TableCell>
                                        <TableCell>DETALHES</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rns.map(e => {
                                        console.log();
                                        return (
                                            <TableRow key={e.proposta}>
                                                <TableCell>{e.beneficiario}</TableCell>
                                                <TableCell>{e.mo}</TableCell>
                                                <TableCell>{e.idade}</TableCell>
                                                <TableCell>{e.telefones}</TableCell>
                                                <TableCell>{e.respostaBeneficiario}</TableCell>
                                                <TableCell><Link to={'../rn/rns/' + e._id} className="link">Detalhes</Link></TableCell>
                                            </TableRow>
                                        )
                                    })}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
            </Container>
        </>
    )
}


export default Todas
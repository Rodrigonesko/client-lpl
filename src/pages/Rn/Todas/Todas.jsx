import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { Button, Box, TextField, TableContainer, TableBody, TableHead, Table, TableRow, TableCell, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material";
import * as XLSX from "xlsx";
import moment from "moment";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './Todas.css'
import { filterRn, getRns } from "../../../_services/teleEntrevista.service";
import { Container } from "@mui/material";


const Todas = () => {

    const [rns, setRns] = useState([])
    const [pesquisa, setPesquisa] = useState('')
    const [alerta, setAlerta] = useState(false)

    const [openReport, setOpenReport] = useState(false)
    const [dataInicioReport, setDataInicioReport] = useState('')
    const [dataFimReport, setDataFimReport] = useState('')
    const [dataInicioReportGerencial, setDataInicioReportGerencial] = useState('')
    const [dataFimReportGerencial, setDataFimReportGerencial] = useState('')
    const [snackMsg, setSnackMsg] = useState('')
    const [severity, setSeverity] = useState('')

    const [openReportGerencial, setOpenReportGerencial] = useState(false)
    //   const [loading, setLoading] = useState(false)

    let rnsForExcel

    const handleClose = () => {
        setAlerta(false)
        setOpenReport(false)
        setOpenReportGerencial(false)
    }

    const handleOpenReport = () => {
        setOpenReport(true)
    }

    const handleOpenReportGerencial = () => {
        setOpenReportGerencial(true)
    }

    const handleChange = (elemento) => {
        setPesquisa(elemento.target.value)
    }

    const handleFilter = async (event) => {

        event.preventDefault()

        if (pesquisa.length <= 2) {
            setAlerta(true)
            setSnackMsg('Digite no minimo 3 caracteres!')
            setSeverity('warning')
            return
        }

        const resultado = await filterRn(pesquisa)
        setRns(resultado)
    }

    /*    const handleLoading = async (event) => {
    
            event.preventDefault()
    
            if (pesquisa === 'true') {
                setLoading(true)
                return
            }
    
            const resultado = await filterRn(pesquisa)
            setRns(resultado)
            setLoading(false)
        }
    */
    const transformData = async () => {
        try {

            const result = await getRns()

            rnsForExcel = result.map(e => {

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

        await transformData()

        try {
            if ((dataInicioReport === '') && (dataFimReport === '')) {
                setAlerta(true)
                setSnackMsg('Insira as datas!')
                setSeverity('warning')
                return
            }
            const ws = XLSX.utils.json_to_sheet(rnsForExcel)
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
            XLSX.writeFile(wb, 'reportRn.xlsx')
            setAlerta(true)
            setSnackMsg('Report gerado com sucesso!')
            setSeverity('success')
            setDataFimReport('')
            setDataInicioReport('')
            setOpenReport(false)

            console.log(ws);

        } catch (error) {
            console.log(error);
        }

    }

    const reportGerencial = async () => {
        try {
            let xls = '\ufeff'

            const result = await getRns()

            if ((dataInicioReportGerencial === '') && (dataFimReportGerencial === '')) {
                setAlerta(true)
                setSnackMsg('Insira as datas!')
                setSeverity('warning')
                return
            }
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
            xls += "<th>Analista Amil</th>"
            xls += "</tr></thead><tbody>"

            result.forEach(e => {

                xls += "<tr>"
                if (e.dataConclusao === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
                }
                xls += `<td>${e.beneficiario || ''}</td>`
                xls += `<td>${e.mo || ''}</td>`
                xls += `<td>${e.proposta || ''}</td>`
                xls += `<td>${e.vigencia || ''}</td>`
                xls += `<td>${e.pedido || ''}</td>`
                xls += `<td>${e.tipo || ''}</td>`
                xls += `<td>${e.filial || ''}</td>`
                xls += `<td>${e.idade || ''}</td>`
                xls += `<td>${e.dataRecebimento || ''}</td>`
                xls += `<td>${e.procedimento || ''}</td>`
                xls += `<td>${e.doenca || ''}</td>`
                xls += `<td>${e.cid || ''}</td>`
                xls += `<td>${e.periodo || ''}</td>`
                xls += `<td>${e.prc || ''}</td>`
                xls += `<td>${e.telefones || ''}</td>`
                xls += `<td>${e.email || ''}</td>`
                xls += `<td>${e.contato1 || ''}</td>`
                xls += `<td>${e.contato2 || ''}</td>`
                xls += `<td>${e.contato3 || ''}</td>`
                xls += `<td>${e.observacoes || ''}</td>`
                xls += `<td>${e.responsavel || ''}</td>`
                if (e.cancelado) {
                    xls += `<td>${e.cancelado || ''}</td>`
                } else {
                    xls += `<td></td>`
                }
                xls += `<td>${moment(e.createdAt).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.analistaAmil || ''}</td>`
                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatorio Propostas.xls'
            a.click()
            setAlerta(true)
            setSnackMsg('Report Gerencial gerado com sucesso!')
            setSeverity('success')
            setDataFimReportGerencial('')
            setDataInicioReportGerencial('')
            setOpenReportGerencial(false)

        } catch (error) {

        }
    }

    return (
        <>
            <Sidebar>
                <Container>

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
                            <Button variant="outlined" onClick={handleOpenReport} sx={{ marginRight: '10px' }}>Report</Button>
                            <Button variant="contained" onClick={handleOpenReportGerencial} >Report Gerencial</Button>
                        </Box>
                        <Dialog
                            open={openReport}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Insira as Datas do Relatório!"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <TextField
                                        type='date'
                                        margin='normal'
                                        fullWidth
                                        label='Data de Início'
                                        focused
                                        value={dataInicioReport}
                                        onChange={(e) => { setDataInicioReport(e.target.value) }}
                                        InputProps={{
                                            style: {
                                                borderRadius: '10px'
                                            }
                                        }}
                                    ></TextField>
                                    <TextField
                                        type='date'
                                        margin='normal'
                                        fullWidth
                                        label='Data Final'
                                        focused
                                        value={dataFimReport}
                                        onChange={(e) => { setDataFimReport(e.target.value) }}
                                        InputProps={{
                                            style: {
                                                borderRadius: '10px'
                                            }
                                        }}
                                    ></TextField>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color='error' >Fechar</Button>
                                <Button onClick={report} color='success' autoFocus >Report</Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            open={openReportGerencial}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Insira as Datas do Relatório Gerencial!"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <TextField
                                        type='date'
                                        margin='normal'
                                        fullWidth
                                        label='Data de Início'
                                        focused
                                        value={dataInicioReportGerencial}
                                        onChange={(e) => { setDataInicioReportGerencial(e.target.value) }}
                                        InputProps={{
                                            style: {
                                                borderRadius: '10px'
                                            }
                                        }}
                                    ></TextField>
                                    <TextField
                                        type='date'
                                        margin='normal'
                                        fullWidth
                                        label='Data Final'
                                        focused
                                        value={dataFimReportGerencial}
                                        onChange={(e) => { setDataFimReportGerencial(e.target.value) }}
                                        InputProps={{
                                            style: {
                                                borderRadius: '10px'
                                            }
                                        }}
                                    ></TextField>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color='error' >Fechar</Button>
                                <Button onClick={reportGerencial} color='success' autoFocus >Report</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                    <Snackbar open={alerta} autoHideDuration={6000} onClose={handleClose}>
                        <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                            {snackMsg}
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
                </Container>
            </Sidebar>
        </>
    )
}


export default Todas
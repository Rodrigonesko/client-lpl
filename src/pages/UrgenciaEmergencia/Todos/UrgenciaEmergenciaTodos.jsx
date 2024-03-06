import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import moment from "moment";
import { Button, Table, TableHead, TableBody, TableRow, TableCell, Container, TableContainer, Box, Paper, TextField, Snackbar, Alert, Pagination, CircularProgress } from "@mui/material";
import { blue } from "@mui/material/colors";
import axios from "axios";

const UrgenciaEmergenciaTodos = () => {

    const [propostas, setPropostas] = useState([])
    const [total, setTotal] = useState('')
    const [pesquisa, setPesquisa] = useState('')
    const [alerta, setAlerta] = useState(false)
    const [flushHook, setFlushHook] = useState(false)

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const buscarPropostas = async (valor) => {
        try {

            setLoading(true);
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/concluidas?page=${valor}&limit=25`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setLoading(false);
            setPropostas(result.data.propostas)
            setTotal(result.data.total)
            setTotalPages(result.data.total)

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleChange = (elemento) => {
        setPesquisa(elemento.target.value)
    }

    const handleFilter = async (event, page) => {
        event?.preventDefault()

        if (pesquisa.length <= 2) {
            setAlerta(true)
            return
        }
        setLoading(true);

        const result = await axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/filter?pesquisa=${pesquisa}&page=${page}&limit=25`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setPropostas(result.data.result)
        setTotalPages(result.data.total)
        setLoading(false)
        console.log(result);
    }

    const handleClose = () => {
        setAlerta(false)
    }

    const handlePageChange = (event, value) => {
        setPage(value);
        if ((pesquisa.length > 2)) {
            handleFilter(event, value);
        } else {
            buscarPropostas(value)
        }
    }

    const reportTodas = async () => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/todas`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

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
                xls += `<td>${e.observacoes.replaceAll("#", " ")}</td>`
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
        buscarPropostas(page)
        setFlushHook(false)
    }, [flushHook])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <div className="title">
                        <h2>Urgência & Emergência</h2>
                    </div>
                    < br />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>Concluídas: {total}</h3>
                        <Button variant='contained' onClick={reportTodas} >Report Todas</Button>
                    </Box>
                    < br />
                    <form action="">
                        <TextField type='text' size='small' label='Nome, MO e Proposta' onChange={handleChange} sx={{ marginRight: '10px' }} />
                        <Button type='submit' variant='contained' onClick={(e) => handleFilter(e, 1)}>BUSCAR</Button>
                    </form>
                    <Snackbar open={alerta} autoHideDuration={6000} onClose={handleClose}>
                        <Alert variant="filled" onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                            Digite no minimo 3 caracteres!
                        </Alert>
                    </Snackbar>
                    < br />
                    <TableContainer component={Paper}>
                        <Box display={'flex'} justifyContent={'flex-end'}>
                            <Pagination count={Math.ceil(totalPages / 25)} page={page} onChange={handlePageChange} />
                        </Box>
                        {
                            !loading ? (
                                <Table className="table">
                                    <TableHead className="table-header">
                                        <TableRow sx={{ bgcolor: blue[600] }}>
                                            <TableCell sx={{ color: "white" }}>NOME ASSOCIADO</TableCell>
                                            <TableCell sx={{ color: "white" }}>MO</TableCell>
                                            <TableCell sx={{ color: "white" }}>PROPOSTA</TableCell>
                                            <TableCell sx={{ color: "white" }}>IDADE</TableCell>
                                            <TableCell sx={{ color: "white" }}>TELEFONE</TableCell>
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
                            ) : (
                                <Box width={'100%'} display={'flex'} justifyContent={"center"}>
                                    <CircularProgress />
                                </Box>
                            )}
                    </TableContainer>
                </Container>
            </Sidebar>
        </>
    )
}

export default UrgenciaEmergenciaTodos
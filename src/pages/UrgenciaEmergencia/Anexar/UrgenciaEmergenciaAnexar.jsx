import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Box } from "@mui/material";
import Axios from 'axios'

const UrgenciaEmergenciaAnexar = () => {

    const [propostas, setPropostas] = useState([])
    const [total, setTotal] = useState('')

    const buscarPropostas = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/anexar`, { withCredentials: true })

            setPropostas(result.data.propostas)
            setTotal(result.data.propostas.length)

        } catch (error) {
            console.log(error);
        }
    }

    const concluir = async (id) => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/concluirAnexo`, {
                id
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarPropostas()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-padrao-tabela">
                <Container >
                    <Box m={2} className="title">
                        <h3>Urgência & Emergência</h3>
                    </Box>
                    <Box m={2}>
                        <h3>Em andamento: {total}</h3>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table className="table">
                            <TableHead className="table-header">
                                <TableRow>
                                    <TableCell>Nome Associado</TableCell>
                                    <TableCell>Mo</TableCell>
                                    <TableCell>Pedido</TableCell>
                                    <TableCell>Retificou?</TableCell>
                                    <TableCell>Observações</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {propostas.map(e => {
                                    return (
                                        <TableRow>
                                            <TableCell>{e.nomeAssociado}</TableCell>
                                            <TableCell>{e.numAssociado}</TableCell>
                                            <TableCell>{e.pedido}</TableCell>
                                            <TableCell>{e.retorno}</TableCell>
                                            <TableCell>{e.observacoes}</TableCell>
                                            <TableCell><Button variant="contained" color="success" size="small" className="btn-padrao-verde" onClick={() => concluir(e._id)} >Concluir</Button></TableCell>
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

export default UrgenciaEmergenciaAnexar
import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Box } from "@mui/material";
import Axios from 'axios'
import { blue } from "@mui/material/colors";

const UrgenciaEmergenciaAnexar = () => {

    const [propostas, setPropostas] = useState([])
    const [total, setTotal] = useState('')

    const buscarPropostas = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/anexar`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

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
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
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
            <Sidebar>
                <Container maxWidth>
                    <Box className="title">
                        <h2>Urgência & Emergência</h2>
                    </Box>
                    < br />
                    <Box>
                        <h3>Em andamento: {total}</h3>
                    </Box>
                    < br />
                    <TableContainer component={Paper}>
                        <Table className="table">
                            <TableHead className="table-header">
                                <TableRow sx={{ bgcolor: blue[600] }}>
                                    <TableCell sx={{ color: "white" }}>NOME ASSOCIADO</TableCell>
                                    <TableCell sx={{ color: "white" }}>MO</TableCell>
                                    <TableCell sx={{ color: "white" }}>PEDIDO</TableCell>
                                    <TableCell sx={{ color: "white" }}>RETIFICOU?</TableCell>
                                    <TableCell sx={{ color: "white" }}>OBSERVAÇÕES</TableCell>
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
            </Sidebar>

        </>
    )
}

export default UrgenciaEmergenciaAnexar
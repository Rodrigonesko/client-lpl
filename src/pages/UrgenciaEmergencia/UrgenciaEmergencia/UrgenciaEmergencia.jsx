import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Box } from "@mui/material";


const UrgenciaEmergencia = () => {

    const [propostas, setPropostas] = useState([])
    const [total, setTotal] = useState('')
    const [loading, setLoading] = useState(false)

    const buscarPropostas = async () => {
        try {

            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/andamento`, { withCredentials: true })

            setPropostas(result.data.propostas)
            setTotal(result.data.propostas.length)

            setLoading(false)

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
                <section className="section-padrao-tabela">
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', }} />
                        ) : null
                    }
                    <Container>
                        <Box m={2}>
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
                                        <TableCell>Idade</TableCell>
                                        <TableCell>Telefone</TableCell>
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
            </Sidebar>
        </>
    )
}

export default UrgenciaEmergencia
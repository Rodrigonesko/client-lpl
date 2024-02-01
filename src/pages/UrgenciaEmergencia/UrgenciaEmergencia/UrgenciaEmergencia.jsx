import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Box } from "@mui/material";
import { blue } from "@mui/material/colors";


const UrgenciaEmergencia = () => {

    const [propostas, setPropostas] = useState([])
    const [total, setTotal] = useState('')
    const [loading, setLoading] = useState(false)

    const buscarPropostas = async () => {
        try {

            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/andamento`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

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
                    <Container maxWidth>
                        <Box>
                            <h2>Urgência & Emergência</h2>
                        </Box>
                        <br />
                        <Box>
                            <h3>Em andamento: {total}</h3>
                        </Box>
                        <br />
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
                </section >
            </Sidebar >
        </>
    )
}

export default UrgenciaEmergencia
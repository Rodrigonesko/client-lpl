import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Container, Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Button } from "@mui/material";
import Axios from 'axios'
import config from "../../../../config/axiosHeader";

const AtendimentoHumanizado = () => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const buscarPropostas = async () => {
            try {

                setLoading(true)

                const result = await Axios.get(`http://10.0.121.55:3002/atendimentoHumanizado`, {
                    withCredentials: true,
                    headers: config.headers
                })

                setPropostas(result.data)

                setLoading(false)

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        buscarPropostas()

    }, [])

    return (
        <>
            <Sidebar />
            <Container>
                <Box m={2}>
                    <Typography variant="h5">
                        Atendimento Humanizado: {propostas.length}
                    </Typography>
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', right: '50%' }}></CircularProgress>
                        ) : null
                    }
                    <Box>
                        <TableContainer>
                            <Table className="table">
                                <TableHead className="table-header">
                                    <TableRow>
                                        <TableCell>Proposta</TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Cpf</TableCell>
                                        <TableCell>Cpf Titular</TableCell>
                                        <TableCell>Tipo Associado</TableCell>
                                        <TableCell>DDD</TableCell>
                                        <TableCell>Celular</TableCell>
                                        <TableCell>Conversa</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        propostas.map(e => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{e.proposta}</TableCell>
                                                    <TableCell>{e.nome}</TableCell>
                                                    <TableCell>{e.cpf}</TableCell>
                                                    <TableCell>{e.cpfTitular}</TableCell>
                                                    <TableCell>{e.tipoAssociado}</TableCell>
                                                    <TableCell>{e.ddd}</TableCell>
                                                    <TableCell>{e.celular}</TableCell>
                                                    <TableCell><Button variant="contained" href={`/entrevistas/chat/${e.whatsapp}`}>Ver Conversa</Button></TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default AtendimentoHumanizado
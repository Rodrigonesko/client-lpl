import React, { useState } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Container, Box, Typography, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Button, TextField } from "@mui/material";
import Axios from 'axios'
import { getCookie } from "react-use-cookie";

const Conversas = () => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)
    const [pesquisa, setPesquisa] = useState('')

    const pesquisar = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/conversas/${pesquisa}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem('token') || getCookie('token')}` }
            })
            setPropostas(result.data)

            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <>
            <Sidebar>
                <Container>
                    <Box m={2}>
                        <Typography variant="h5">
                            Conversas
                        </Typography>
                        {
                            loading ? (
                                <CircularProgress style={{ position: 'absolute', top: '50%', right: '50%' }}></CircularProgress>
                            ) : null
                        }
                        <Box component={Paper} p={2}>
                            <form action="" method="post" onSubmit={pesquisar}>
                                <TextField type='search' style={{ minWidth: '300px' }} label='Proposta, nome ou número' size="small" onChange={e => setPesquisa(e.target.value)} />
                                <Button type="submit" variant="contained">Pesquisar</Button>
                            </form>
                        </Box>
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
            </Sidebar>
        </>
    )
}

export default Conversas
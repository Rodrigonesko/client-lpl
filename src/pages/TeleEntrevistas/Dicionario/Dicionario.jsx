import React, { useState, useEffect } from "react";
import { Container, Box, TextField, Button, Paper, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Alert, Snackbar, CircularProgress } from "@mui/material";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'

const Dicionario = () => {

    const [palavra, setPalavra] = useState('')
    const [palavras, setPalavras] = useState([])
    const [openSnack, setOpenSnack] = useState(false)
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')

    const adicionarPalavra = async () => {
        try {

            setLoading(true)

            await Axios.post(`${process.env.REACT_APP_API_KEY}/dicionario`, {
                palavra
            }, {
                withCredentials: true
            })
            setMsg('Palavra Adicionada com sucesso')
            setOpenSnack(true)
            setPalavra('')
            buscarPalavras()

        } catch (error) {
            console.log(error);
        }
    }

    const buscarPalavras = async () => {
        try {

            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/dicionario`, {
                withCredentials: true
            })

            setPalavras(result.data)
            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    const excluir = async (element) => {
        try {

            await Axios.delete(`${process.env.REACT_APP_API_KEY}/dicionario/${element}`, {
                withCredentials: true
            })

            setMsg('Palavra excluida com sucesso!')

            setOpenSnack(true)
            setPalavra('')
            buscarPalavras()

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        buscarPalavras()

    }, [])

    return (

        <Sidebar>
            <Container>
                {
                    loading ? (
                        <CircularProgress className="loading" />
                    ) : null
                }
                <Typography m={2} variant="h5">
                    Dicionário
                </Typography>
                <Box component={Paper} display='flex' p={2} m={1}>
                    <TextField size="small" label='Palavra' value={palavra} onChange={e => setPalavra(e.target.value)} style={{ marginRight: '20px' }} />
                    <Button variant="contained" onClick={adicionarPalavra} size="small" disabled={loading}>Adicionar</Button>
                </Box>
                <Box>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Palavra</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    palavras.map(e => {
                                        return (
                                            <TableRow key={e.palavra}>
                                                <TableCell>{e.palavra}</TableCell>
                                                <TableCell><Button color="error" onClick={() => {
                                                    excluir(e.palavra)
                                                }}>Excluir</Button></TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => { setOpenSnack(false) }}>
                    <Alert onClose={() => { setOpenSnack(false) }} severity="success" sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            </Container>
        </Sidebar>

    )
}

export default Dicionario
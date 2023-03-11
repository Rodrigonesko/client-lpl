import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Container, Typography, Box, Button, TextField, Checkbox, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress } from "@mui/material";
import Axios from 'axios'
import config from "../../../../config/axiosHeader";

const Ajustar = () => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)
    const [ajustados, setAjustados] = useState([])

    const ajustar = async () => {
        try {
            setLoading(true)

            const result = await Axios.put(`${process.env.REACT_APP_API_TELE_KEY}/ajustar`, {
                propostas: ajustados
            }, {
                withCredentials: true,
                headers: config.headers
            })

            if (result.status === 200) {
                buscarPropostas()
            }

            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const buscarPropostas = async () => {
        try {
            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/ajustar`, {
                withCredentials: true,
                headers: config.headers
            })
            setPropostas(result.data)

            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {

        buscarPropostas()

    }, [])

    return (
        <>
            <Sidebar />
            <Container>
                <Box m={2}>
                    <Typography variant="h5">
                        Contatos a serem ajustados: {propostas.length}
                    </Typography>
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', right: '50%' }}></CircularProgress>
                        ) : null
                    }
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
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    propostas.map(e => {
                                        return (
                                            <TableRow key={e._id}>
                                                <TableCell>{e.proposta}</TableCell>
                                                <TableCell>{e.nome}</TableCell>
                                                <TableCell>{e.cpf}</TableCell>
                                                <TableCell><TextField size="small" label='CPF titular' defaultValue={e.cpfTitular} onChange={elem => {
                                                    e.cpfTitular = elem.target.value
                                                }} /></TableCell>
                                                <TableCell>{e.tipoAssociado}</TableCell>
                                                <TableCell>{e.ddd}</TableCell>
                                                <TableCell>{e.celular}</TableCell>
                                                <TableCell><Checkbox className="check" onChange={elem => {
                                                    if (elem.target.checked) {
                                                        setAjustados(ajustados.concat({ id: e._id, cpfTitular: e.cpfTitular }))
                                                    } else {
                                                        setAjustados(ajustados.filter(item => item.id !== e._id))
                                                    }

                                                }} /></TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell><Button variant="contained" size="small" onClick={ajustar}>Ajustar</Button></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </>
    )
}

export default Ajustar
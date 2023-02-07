import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Box, Typography } from "@mui/material";
import moment from "moment";
import Axios from 'axios'

const RnsAgendadas = ({ propostas }) => {

    const reagendar = async (id) => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rn/reagendar`, { id }, { withCredentials: true })
            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box>
            <Typography variant="h5">
                Rns: {propostas.length}
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Horário</TableCell>
                            <TableCell>Proposta</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Idade</TableCell>
                            <TableCell>Analista</TableCell>
                            <TableCell>Formulario</TableCell>
                            <TableCell>Reagendar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            propostas.map(e => {
                                return (
                                    <TableRow>
                                        <TableCell>{moment(e.dataEntrevista).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{moment(e.dataEntrevista).format('HH:mm:ss')}</TableCell>
                                        <TableCell>{e.proposta}</TableCell>
                                        <TableCell>
                                            <TextField size="small" variant='standard' defaultValue={e.telefones} />
                                        </TableCell>
                                        <TableCell>{e.beneficiario}</TableCell>
                                        <TableCell>{e.idade}</TableCell>
                                        <TableCell>{e.responsavel}</TableCell>
                                        <TableCell><Button variant='contained' href={`/rn/rns/${e._id}`}>Formulario</Button></TableCell>
                                        <TableCell><Button color='warning' onClick={() => reagendar(e._id)} variant='contained'>Reagendar</Button></TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default RnsAgendadas
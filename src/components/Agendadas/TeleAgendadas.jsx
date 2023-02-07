import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Box, Typography } from "@mui/material";
import moment from "moment";
import Axios from 'axios'

const TeleAgendadas = ({ propostas }) => {

    const reagendar = async (id) => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/reagendar`, { id }, { withCredentials: true })
            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const alterarTelefone = async (telefone, id) => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/alterarTelefone`, { id, telefone }, { withCredentials: true })

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    const alterarSexo = async (id, sexo) => {
        try {
            await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/proposta/alterarSexo`, {
                id,
                sexo
            }, {
                withCredentials: true
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box>
            <Typography variant="h5">
                Tele: {propostas.length}
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
                            <TableCell>Sexo</TableCell>
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
                                            <TextField size="small" variant='standard' defaultValue={e.telefone} onKeyUp={element => alterarTelefone(element.target.value, e._id)} />
                                        </TableCell>
                                        <TableCell>{e.nome}</TableCell>
                                        <TableCell>{e.idade}</TableCell>
                                        <TableCell>
                                            <select onChange={item => alterarSexo(e._id, item.target.value)} >
                                                <option value="M" selected={e.sexo === 'M'}>M</option>
                                                <option value="F" selected={e.sexo === 'F'} >F</option>
                                            </select>
                                        </TableCell>
                                        <TableCell>{e.enfermeiro}</TableCell>
                                        <TableCell><Button variant='contained' href={`/entrevistas/formulario/${e._id}`}>Formulario</Button></TableCell>
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

export default TeleAgendadas
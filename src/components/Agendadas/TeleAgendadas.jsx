import React, { useState } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Typography, CircularProgress } from "@mui/material";
import moment from "moment";
import Axios from 'axios'

const TeleAgendadas = ({ propostas, atualizarPropostas, analista }) => {

    const [loading, setLoading] = useState(false)

    const tentativaContato = async (tentativa, id) => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/tentativaContato`, {
                tentativa,
                id
            }, {
                withCredentials: true
            })

            atualizarPropostas(analista)

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    const reagendar = async (id) => {
        try {

            setLoading(true)

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/reagendar`, { id }, { withCredentials: true })
            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const reagendarRn = async (id) => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rn/reagendar`, { id }, { withCredentials: true })
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

    const alterarTelefoneRn = async (id, telefone) => {
        try {
            await Axios.put(`${process.env.REACT_APP_API_KEY}/rn/alterarTelefone`, {
                id,
                telefone
            }, {
                withCredentials: true
            })

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
        <Box maxWidth='1300px' component={Paper} p={1} elevation={3}>
            {
                loading ? (
                    <CircularProgress style={{ position: 'absolute', top: '50%' }} />
                ) : null
            }
            <Typography variant="h5" m={2} width='100%'>
                Tele e Rn: {propostas.length}
            </Typography>
            <TableContainer>
                <Table style={{ display: 'block', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                    <TableHead className='table-header'>
                        <TableRow>
                            <TableCell>Tipo</TableCell>
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
                            <TableCell>1° Contato</TableCell>
                            <TableCell>2° Contato</TableCell>
                            <TableCell>3° Contato</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            propostas.map(e => {

                                if (e.tipo === 'Tele') {
                                    return (
                                        <TableRow>
                                            <TableCell>{e.tipo}</TableCell>
                                            <TableCell>{moment(e.dataEntrevista).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{moment(e.dataEntrevista).format('HH:mm:ss')}</TableCell>
                                            <TableCell>{e.proposta}</TableCell>
                                            <TableCell>
                                                <TextField style={{ minWidth: '150px' }} size="small" variant='standard' defaultValue={e.telefone} onKeyUp={element => alterarTelefone(element.target.value, e._id)} />
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
                                            <TableCell><Button size="small" variant='contained' href={`/entrevistas/formulario/${e._id}`}>Formulario</Button></TableCell>
                                            <TableCell><Button size="small" color='warning' onClick={() => reagendar(e._id)} variant='contained'>Reagendar</Button></TableCell>
                                            <TableCell>
                                                {
                                                    e.contato1 ? (
                                                        <span>{e.contato1}</span>
                                                    ) : (
                                                        <Button variant='contained' size="small" onClick={() => {
                                                            tentativaContato('tentativa 1', e._id)
                                                        }} style={{ background: 'blue' }}>1° Contato</Button>
                                                    )
                                                }

                                            </TableCell>
                                            <TableCell>
                                                {
                                                    e.contato2 === undefined && e.contato1 !== undefined ? (
                                                        <Button variant='contained' size="small" onClick={() => { tentativaContato('tentativa 2', e._id) }} style={{ background: 'blue' }}>2° Contato</Button>
                                                    ) : (
                                                        <span>{e.contato2}</span>
                                                    )
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    e.contato3 === undefined & e.contato2 !== undefined ? (
                                                        <Button variant='contained' size="small" onClick={() => { tentativaContato('tentativa 3', e._id) }} style={{ background: 'blue' }}>3° Contato</Button>
                                                    ) : (
                                                        <span>{e.contato3}</span>
                                                    )
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                                if (e.tipo === 'Rn') {
                                    return (
                                        <TableRow>
                                            <TableCell>{e.tipo}</TableCell>
                                            <TableCell>{moment(e.dataEntrevista).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{moment(e.dataEntrevista).format('HH:mm:ss')}</TableCell>
                                            <TableCell>{e.proposta}</TableCell>
                                            <TableCell>
                                                <TextField style={{ minWidth: '150px' }} size="small" variant='standard' defaultValue={e.telefone} onChange={item => {
                                                    alterarTelefoneRn(e._id, item.target.value)
                                                }} />
                                            </TableCell>
                                            <TableCell>{e.nome}</TableCell>
                                            <TableCell>{e.idade}</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>{e.enfermeiro}</TableCell>
                                            <TableCell><Button size="small" variant='contained' href={`/rn/rns/${e._id}`}>Formulario</Button></TableCell>
                                            <TableCell><Button size="small" color='warning' onClick={() => reagendarRn(e._id)} variant='contained'>Reagendar</Button></TableCell>
                                        </TableRow>
                                    )
                                }

                                return null
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default TeleAgendadas
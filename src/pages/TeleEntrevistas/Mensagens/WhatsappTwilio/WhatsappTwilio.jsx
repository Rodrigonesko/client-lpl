import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Box, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Typography, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Axios from 'axios'
import { getCookie } from "react-use-cookie";

const WhatsappTwilio = () => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)
    const [situacao, setSituacao] = useState('Todas')

    const buscarPropostas = async () => {
        try {

            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/naoRealizadas`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${getCookie('token')}` }
            })

            const arrAux = result.data.propostas.filter(e => {
                return e.enviadoTwilio
            })

            setPropostas(arrAux)
            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    const filtrarPropostas = async () => {
        try {

            setLoading(true)

            let arrAux = []

            const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/naoRealizadas`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${getCookie('token')}` }
            })

            if (situacao === 'Todas') {

                arrAux = result.data.propostas.filter(e => {
                    return e.enviadoTwilio
                })

            }

            if (situacao === 'Agendadas') {

                arrAux = result.data.propostas.filter(e => {
                    return e.enviadoTwilio && e.agendado === 'agendado'
                })

            }

            if (situacao === 'Não agendadas') {
                arrAux = result.data.propostas.filter(e => {
                    return e.enviadoTwilio && e.agendado !== 'agendado'
                })
            }

            console.log(arrAux);

            setPropostas(arrAux)
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
            <Sidebar />
            {
                loading ? (
                    <CircularProgress className="loading" />
                ) : null
            }

            <Box>
                <Box>
                    <Typography variant="h6" m={2}>
                        Whatsapp Twilio {propostas.length}
                    </Typography>
                </Box>
                <Box display='flex'>
                    <FormControl size="small" style={{ width: '20%' }}>
                        <InputLabel>Situação</InputLabel>
                        <Select
                            label='Situação'
                            value={situacao}
                            onChange={e => {
                                setSituacao(e.target.value)
                            }}
                        >
                            <MenuItem>
                                <em>Situação</em>
                            </MenuItem>
                            <MenuItem value='Agendadas'>Agendada</MenuItem>
                            <MenuItem value='Não agendadas'>Não agendada</MenuItem>
                            <MenuItem value='Todas' >Todas</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={filtrarPropostas} variant="contained" >Filtrar</Button>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Proposta</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>CPF</TableCell>
                                <TableCell>CPF titular</TableCell>
                                <TableCell>Tipo associado</TableCell>
                                <TableCell>Data Nascimento</TableCell>
                                <TableCell>DDD</TableCell>
                                <TableCell>Celular</TableCell>
                                <TableCell>Conversa</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                propostas.map(e => {
                                    return (
                                        <TableRow key={e._id} style={{ background: e.visualizado ? 'wheat' : '' }}>
                                            <TableCell>{e.proposta}</TableCell>
                                            <TableCell>{e.nome}</TableCell>
                                            <TableCell>{e.cpf}</TableCell>
                                            <TableCell>{e.cpfTitular}</TableCell>
                                            <TableCell>{e.tipoAssociado}</TableCell>
                                            <TableCell>{e.dataNascimento}</TableCell>
                                            <TableCell>{e.ddd}</TableCell>
                                            <TableCell>{e.celular}</TableCell>
                                            <TableCell><Button variant="contained" size="small" href={`/entrevistas/chatTwilio/${e.whatsapp}`} >Ver conversa</Button></TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default WhatsappTwilio
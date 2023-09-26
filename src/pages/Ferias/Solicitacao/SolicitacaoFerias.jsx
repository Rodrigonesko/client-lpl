import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Alert, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import moment from "moment";
import ModalFeriasElegiveis from "./Modais/ModalFeriasElegiveis";
import { getUsers } from "../../../_services/user.service";
import ModalSolicitar from "./Modais/ModalSolicitar";

const SolicitacaoFerias = () => {

    const [pesquisa, setPesquisa] = useState('')
    const [snackSelect, setSnackSelect] = useState(false)
    const [alerta, setAlerta] = useState(false)
    const [solicitacoes, setSolicitacoes] = useState([])
    const [flushHook, setFlushHook] = useState(false)
    const [colaboradores, setColaboradores] = useState([])

    const handleChange = (elemento) => {
        setPesquisa(elemento.target.value)
        console.log(pesquisa)
    }

    const handleChangeSelect = async (id, status) => {
        const resultado = await axios.put(`${process.env.REACT_APP_API_KEY}/vacation/status`, {
            statusRh: status, _id: id
        })
        setSnackSelect(true)
        console.log(resultado)
        console.log(id, status)
    }

    const handleFilter = async (event) => {
        event.preventDefault()

        if (pesquisa.length <= 2) {
            setAlerta(true)
            return
        }

        const result = await axios.get(`${process.env.REACT_APP_API_KEY}/vacation/filter?colaborador=rodrigo&mes=2023-09&vencimento=2023`, {
            withCredentials: true
        })

        console.log(result);
    }

    const handleCloseInput = () => {
        setAlerta(false)
    }

    const handleCloseSelect = () => {
        setSnackSelect(false)
    }

    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/vacation/findAll`, { withCredentials: true })
        const resultColaboradores = await getUsers()
        setColaboradores(resultColaboradores)
        setSolicitacoes(resultado.data.encontrarTodos)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook])

    return (
        <>
            <Sidebar />
            <Container>
                <div className="title">
                    <h2>Solicitação de Férias</h2>
                </div>
                <Box display={"flex"} paddingTop={"15px"} paddingBottom={"15px"}>
                    <Box>
                        <ModalSolicitar colaboradores={colaboradores} setFlushHook={setFlushHook} />
                        <ModalFeriasElegiveis />
                    </Box>
                </Box>
                <form action="" >
                    <TextField type='text' onChange={handleChange} size='small' label='Colaborador' sx={{ marginRight: '10px', width: '170px' }} />
                    <TextField type='month' onChange={handleChange} size='small' focused label='Mês' sx={{ marginRight: '10px', width: '170px' }} />
                    <TextField type='date' onChange={handleChange} size='small' focused label='Vencimento' sx={{ marginRight: '10px', width: '170px' }} />
                    <Button type="submit" onClick={handleFilter} variant='contained' >Pesquisar</Button>
                </form>
                <br />
                <Snackbar open={alerta} autoHideDuration={6000} onClose={handleCloseInput}>
                    <Alert variant="filled" onClose={handleCloseInput} severity="warning" sx={{ width: '100%' }}>
                        Digite no minimo 3 caracteres!
                    </Alert>
                </Snackbar>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className="table-header">
                                    <TableCell>MÊS</TableCell>
                                    <TableCell>VENCIMENTO</TableCell>
                                    <TableCell>COLABORADOR</TableCell>
                                    <TableCell>DATA DE INICIO</TableCell>
                                    <TableCell>DATA DE RETORNO</TableCell>
                                    <TableCell>TOTAL DIAS</TableCell>
                                    <TableCell>STATUS RH</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {solicitacoes.map((item) => {
                                    return (
                                        <TableRow key={item._id}>
                                            <TableCell>{moment(item.dataInicio).format('MM/YYYY')}</TableCell>
                                            <TableCell>{moment(item.vencimento).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{item.colaborador}</TableCell>
                                            <TableCell>{moment(item.dataInicio).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{item.dataRetorno}</TableCell>
                                            <TableCell>{item.totalDias}</TableCell>
                                            <TableCell>
                                                <FormControl sx={{ minWidth: 135 }}>
                                                    <InputLabel id='StatusRh'>Status do RH</InputLabel>
                                                    <Select defaultValue={item.statusRh} labelId="StatusRh" id='StatusRh' label='Status do RH' onChange={(elemento) => handleChangeSelect(item._id, elemento.target.value)}>
                                                        <MenuItem value={'solicitado'}>SOLICITADO</MenuItem>
                                                        <MenuItem value={'assinado'}>ASSINADO</MenuItem>
                                                        <MenuItem value={'retirada'}>RETIRADA</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>)
                                })}
                                <Snackbar open={snackSelect} autoHideDuration={6000} onClose={handleCloseSelect} >
                                    <Alert variant="filled" onClose={handleCloseSelect} severity="success" sx={{ width: '100%' }}>
                                        Status alterado com sucesso!
                                    </Alert>
                                </Snackbar>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container >
        </>
    )
}

export default SolicitacaoFerias
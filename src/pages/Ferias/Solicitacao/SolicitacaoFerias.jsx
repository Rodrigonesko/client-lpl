import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Alert, Autocomplete, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import moment from "moment";
import ModalFeriasElegiveis from "./Modais/ModalFeriasElegiveis";
import { getUsers } from "../../../_services/user.service";

const SolicitacaoFerias = () => {

    const [solicitacaoChecked, setSolicitacaoChecked] = useState('30 dias')
    const [open, setOpen] = useState(false)
    const [pesquisa, setPesquisa] = useState('')
    const [dados, setDados] = useState({
        nomeColaborador: '',
        tipoSolicitacao: '30 dias',
        data: '',
        data2: '',
        statusRh: ''
    })
    const [openSnack, setOpenSnack] = useState(false)
    const [snackSelect, setSnackSelect] = useState(false)
    const [alerta, setAlerta] = useState(false)
    const [textoSnack, setTextoSnack] = useState('Insira o nome do Colaborador!')
    const [severitySnack, setSeveritySnack] = useState('')
    const [solicitacoes, setSolicitacoes] = useState([])
    const [flushHook, setFlushHook] = useState(false)
    const [colaboradores, setColaboradores] = useState([])

    const handleCheckedSolicitacao = (e) => {
        setSolicitacaoChecked(e.target.value)
        const objAux = dados
        objAux.tipoSolicitacao = e.target.value
        objAux.data = ''
        objAux.data2 = ''
        setDados(objAux)

    }

    const handleChange = (elemento) => {
        setPesquisa(elemento.target.value)
        console.log(pesquisa)
    }

    const handleChangeSelect = async (id, status) => {
        const resultado = await axios.put('http://localhost:3001/vacation/status', {
            statusRh: status, _id: id
        })
        setSnackSelect(true)
        console.log(resultado)
        console.log(id, status)
    }

    const handleChangeDados = (elemento) => {
        const name = elemento.target.name

        console.log(name, elemento.target.value);

        const objAux = dados

        if (name === 'data') {
            objAux.data = elemento.target.value
            console.log('entrou');
        } else {
            objAux.data2 = elemento.target.value
        }

        setDados(objAux)
    }

    const handleFilter = async (event) => {
        event.preventDefault()

        if (pesquisa.length <= 2) {
            setAlerta(true)
            return
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSolicitacaoChecked('30 dias')
        const objAux = dados
        objAux.tipoSolicitacao = '30 dias'
        objAux.data = ''
        objAux.data2 = ''
        setDados(objAux)
    };

    const handleCloseSnack = () => {
        setOpenSnack(false);

    };

    const handleCloseInput = () => {
        setAlerta(false)
    }

    const handleCloseSelect = () => {
        setSnackSelect(false)
    }

    const handleSave = async () => {
        if (dados.nomeColaborador.length <= 0) {
            setOpenSnack(true)
            setSeveritySnack('warning')
            setTextoSnack('Insira o nome do Colaborador!')
            return
        }

        if ((dados.data.length <= 0) || ((dados.data2.length <= 0) && solicitacaoChecked !== '30 dias')) {
            setOpenSnack(true)
            setSeveritySnack('warning')
            setTextoSnack('Insira uma data!')
            return
        }
        const resultado = await axios.post('http://localhost:3001/vacation/request', {
            colaborador: dados.nomeColaborador,
            dataInicio: dados.data,
            dataInicio2: dados.data2,
            totalDias: dados.tipoSolicitacao,
            statusRh: dados.statusRh
        })
        console.log(resultado)
        setOpenSnack(true)
        setSeveritySnack('success')
        setTextoSnack('Dados inserido com sucesso!')
        console.log(dados)
        setFlushHook(true)
        setOpen(false)
        setSolicitacaoChecked('30 dias')
        setDados({
            nomeColaborador: '',
            tipoSolicitacao: '30 dias',
            data: '',
            data2: ''
        })
        return
    }

    const fetchData = async () => {
        const resultado = await axios.get(`http://localhost:3001/vacation/findAll`, { withCredentials: true })
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
                        <Button type="submit" onClick={handleClickOpen} variant='contained' sx={{ marginRight: '10px' }}>Solicitar Férias</Button>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">{"Insira a escala desejada de Férias"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <FormGroup>
                                        <br />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            onChange={(event, valor) => {
                                                console.log(valor.nomeCompleto);
                                                const objAux = dados
                                                objAux.nomeColaborador = valor.nomeCompleto
                                                setDados(objAux)
                                            }}
                                            options={colaboradores}
                                            getOptionLabel={colaboradores => colaboradores?.nomeCompleto}
                                            renderInput={(params) => <TextField {...params} label='Insira o nome do Colaborador' />}
                                        />
                                        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="30 dias" name="radio-buttons-group">
                                            <FormControlLabel value="30 dias" control={<Radio onClick={handleCheckedSolicitacao} />} label="30 Dias" />
                                            <FormControlLabel value="20/10 dias" control={<Radio onClick={handleCheckedSolicitacao} />} label="20/10 Dias" />
                                            <FormControlLabel value="15/15 dias" control={<Radio onClick={handleCheckedSolicitacao} />} label="15/15 Dias" />

                                            {
                                                solicitacaoChecked === '30 dias' ? (
                                                    <TextField type='date' onChange={handleChangeDados} name="data" focused size='small' label='Qual data deseja iniciar suas Férias?' />
                                                ) : (
                                                    <>
                                                        <TextField type='date' margin='normal' name="data" onChange={handleChangeDados} focused size='small' label={(solicitacaoChecked === '20/10 dias') ? ('Qual data deseja iniciar suas Férias de 20 dias?') : ('Qual data deseja iniciar suas Férias de 15 dias?')} />
                                                        <br />
                                                        <TextField type='date' margin='normal' name="data2" onChange={handleChangeDados} focused size='small' label={(solicitacaoChecked === '20/10 dias') ? ('Qual data deseja iniciar suas Férias de 10 dias?') : ('Qual data deseja iniciar suas Férias de 15 dias?')} />
                                                    </>
                                                )
                                            }

                                        </RadioGroup>
                                    </FormGroup>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Fechar</Button>
                                <Button onClick={handleSave} autoFocus>Salvar</Button>
                            </DialogActions>
                        </Dialog>
                        <ModalFeriasElegiveis />
                    </Box>
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                        <Alert variant="filled" onClose={handleCloseSnack} severity={severitySnack} sx={{ width: '100%' }}>
                            {textoSnack}
                        </Alert>
                    </Snackbar>
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
                                        <TableRow>
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

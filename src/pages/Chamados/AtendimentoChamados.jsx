import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormGroup, InputLabel, MenuItem, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react";
import axios from "axios";
import { getUsers } from "../../_services/user.service";
import moment from "moment/moment";

const AtendimentoChamados = () => {

    const [chamados, setChamados] = useState([])
    const [snackSelect, setSnackSelect] = useState(false)
    const [flushHook, setFlushHook] = useState(false)
    const [alerta, setAlerta] = useState(false)
    const [colaborador, setColaborador] = useState('')
    const [colaboradores, setColaboradores] = useState([])

    const [openSnack, setOpenSnack] = useState(false)
    const [textoSnack, setTextoSnack] = useState('Insira o nome do Colaborador!')
    const [severitySnack, setSeveritySnack] = useState('')
    const [open, setOpen] = useState(false)
    const [dados, setDados] = useState({
        retorno: ''
    })

    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/tasks/findAll`, { withCredentials: true })
        setChamados(resultado.data.encontrarTodos)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook])

    const handleCloseSelect = () => {
        setSnackSelect(false)
    }

    const handleClose = () => {
        setOpen(false)
        const objAux = dados
        objAux.retorno = ''
        setDados(objAux)
    }

    const handleChangeRetorno = async (elemento) => {
        const name = elemento.target.name
        const objAux = dados

        if (name === 'retorno') {
            objAux.retorno = elemento.target.value
        }
        setDados(objAux)
    }

    const handleSave = async (id) => {

        if ((dados.retorno.length <= 2)) {
            setOpenSnack(true)
            setSeveritySnack('warning')
            setTextoSnack('Não é possivel salvar sem um Retorno!')
            return
        }
        const resultado = await axios.post(process.env.REACT_APP_API_KEY + '/tasks/retorno', {
            retorno: dados.retorno, _id: id
        })
        console.log(resultado)
        setOpenSnack(true)
        setSeveritySnack('success')
        setTextoSnack('Retorno enviado com sucesso!')
        console.log(dados)
        setFlushHook(true)
        setOpen(false)
        setDados({
            retorno: ''
        })
        return
    }

    const handleCloseInput = () => {
        setAlerta(false)
    }

    const handleFilter = async (event) => {
        event.preventDefault()

        if (colaborador.length > 2) {
            const result = await axios.get(`${process.env.REACT_APP_API_KEY}/tasks/filter?colaborador=${colaborador}`, {
                withCredentials: true
            })
            console.log(result)
            setChamados(result.data)
        } else {
            setAlerta(true)
            return
        }
    }


    const handleChangeAnalist = async (id, analista) => {
        const result = await axios.put(`${process.env.REACT_APP_API_KEY}/tasks/analist`, {
            analista: analista, _id: id
        })
        setSnackSelect(true)
        console.log(result)
        console.log(id, analista)
    }

    const handleChangeSelect = async (id, status) => {
        const resultado = await axios.put(`${process.env.REACT_APP_API_KEY}/tasks/status`, {
            status: status, _id: id
        })
        setSnackSelect(true)
        console.log(resultado)
        console.log(id, status)
    }

    const handleClickOpen = async () => {
        setOpen(true);
        const resultColaboradores = await getUsers()
        setColaboradores(resultColaboradores)
    }

    return (
        <>
            <Sidebar />
            <Container>
                <div className="title">
                    <h2>Atendimento de Chamados</h2>
                </div>
                <br />
                <form action="" >
                    <TextField type='text' onChange={(e) => { setColaborador(e.target.value) }} size='small' label='Colaborador' sx={{ marginRight: '10px', width: '170px' }} />
                    <Button type="submit" onClick={handleFilter} variant='contained' >Pesquisar</Button>
                    <Button onClick={() => setFlushHook(true)} variant='contained' sx={{ marginLeft: '10px' }}>Limpar Pesquisa</Button>
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
                                    <TableCell>DATA ABERTURA</TableCell>
                                    <TableCell>NOME</TableCell>
                                    <TableCell>SETOR</TableCell>
                                    <TableCell>ASSUNTO</TableCell>
                                    <TableCell>DESCRIÇÃO</TableCell>
                                    <TableCell>DATA FINALIZAÇÃO</TableCell>
                                    <TableCell>ANALISTA</TableCell>
                                    <TableCell>STATUS</TableCell>
                                    <TableCell>RETORNO ANALISTA</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {chamados.map((item) => {
                                    return (
                                        <TableRow key={item._id}>
                                            <TableCell>{moment(item.dataInicio).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{item.colaborador}</TableCell>
                                            <TableCell>{item.setor}</TableCell>
                                            <TableCell>{item.assunto}</TableCell>
                                            <TableCell>{item.descricao}</TableCell>
                                            <TableCell>{item.dataFinalizado ? moment(item.dataFinalizado).format('DD/MM/YYYY'):('')}</TableCell>
                                            <TableCell>
                                                <FormControl sx={{ minWidth: 135 }}>
                                                    <InputLabel id='Analista'>Analista</InputLabel>
                                                    <Select defaultValue={item.analista} labelId="Analista" id='analista' label='analista' onChange={(elemento) => handleChangeAnalist(item._id, elemento.target.value)}>
                                                        <MenuItem value={'leonardo'}>LEONARDO</MenuItem>
                                                        <MenuItem value={'rodrigo'}>RODRIGO</MenuItem>
                                                        <MenuItem value={'gerson'}>GERSON</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell>
                                                <FormControl sx={{ minWidth: 135 }}>
                                                    <InputLabel id='Status'>Status</InputLabel>
                                                    <Select defaultValue={item.status} labelId="Status" id='status' label='status' onChange={(elemento) => handleChangeSelect(item._id, elemento.target.value)}>
                                                        <MenuItem value={'verificado'}>VERIFICADO</MenuItem>
                                                        <MenuItem value={'tratando'}>TRATANDO</MenuItem>
                                                        <MenuItem value={'finalizado'}>FINALIZADO</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={handleClickOpen} variant='contained' color="secondary">Retorno</Button>
                                                <Dialog open={open} onClose={handleClose} fullWidth='fullWidth' >
                                                    <DialogTitle id="alert-dialog-title">{"Atualização sobre o Chamado"}</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            {"Insira um retorno referente ao Chamado!"}
                                                            <FormGroup >
                                                                <br />
                                                                <TextField defaultValue={item.retorno} type='text' onChange={handleChangeRetorno} placeholder="Placeholder" multiline name="retorno" label='Retorno' />
                                                            </FormGroup>
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Fechar</Button>
                                                        <Button onClick={() => {handleSave(item._id)}} autoFocus>Salvar</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>)
                                })}
                                <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSelect}>
                                    <Alert variant="filled" onClose={handleCloseSelect} severity={severitySnack} sx={{ width: '100%' }}>
                                        {textoSnack}
                                    </Alert>
                                </Snackbar>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </>

    )

}

export default AtendimentoChamados;
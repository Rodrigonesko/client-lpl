import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUsers } from "../../_services/user.service";
import moment from "moment"

const SolicitarChamados = () => {

    const [open, setOpen] = useState(false)
    const [colaboradores, setColaboradores] = useState([])
    const [chamados, setChamados] = useState([])
    const [dados, setDados] = useState({
        colaborador: '',
        setor: '',
        assunto: '',
        descricao: '',
        retorno: ''
    })
    const [snackSelect, setSnackSelect] = useState(false)
    const [flushHook, setFlushHook] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [textoSnack, setTextoSnack] = useState('Insira o nome do Colaborador!')
    const [severitySnack, setSeveritySnack] = useState('')
    const [alerta, setAlerta] = useState(false)
    const [colaborador, setColaborador] = useState('')

    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/tasks/findAll`, { withCredentials: true })
        setChamados(resultado.data.encontrarTodos)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook])

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

    const handleCloseInput = () => {
        setAlerta(false)
    }

    const handleSave = async () => {

        if ((dados.assunto.length <= 0) || ((dados.descricao.length <= 0))) {
            setOpenSnack(true)
            setSeveritySnack('warning')
            setTextoSnack('Faltam dados! Favor preencher todas as informações!')
            return
        }
        const resultado = await axios.post(process.env.REACT_APP_API_KEY + '/tasks/request', {
            colaborador: dados.colaborador,
            setor: dados.setor,
            assunto: dados.assunto,
            descricao: dados.descricao
        }, {
            withCredentials: true
        })
        console.log(resultado)
        setOpenSnack(true)
        setSeveritySnack('success')
        setTextoSnack('Dados inserido com sucesso!')
        console.log(dados)
        setFlushHook(true)
        setOpen(false)
        setDados({
            colaborador: '',
            setor: '',
            assunto: '',
            descricao: ''
        })
        return
    }

    const handleCloseSnack = () => {
        setOpenSnack(false);

    };

    const handleClose = () => {
        setOpen(false)
        const objAux = dados
        objAux.colaborador = ''
        objAux.setor = ''
        objAux.assunto = ''
        objAux.descricao = ''
        setDados(objAux)
    }

    const handleChangeDados = (elemento) => {
        const name = elemento.target.name
        const objAux = dados

        if (name === 'assunto') {
            objAux.assunto = elemento.target.value
        } else {
            objAux.descricao = elemento.target.value
        }

        setDados(objAux)
    }

    const handleClickOpen = async () => {
        setOpen(true);
        const resultColaboradores = await getUsers()
        setColaboradores(resultColaboradores)
    }

    const handleCloseSelect = () => {
        setSnackSelect(false)
    }

    return (
        <>
            <Sidebar />
            <Container>
                <div className="title">
                    <h2>Solicitação de Chamados</h2>
                </div>
                <Box display={"flex"} paddingTop={"15px"} paddingBottom={"15px"}>
                    <Button onClick={handleClickOpen} variant='contained' sx={{ marginRight: '10px' }}>Abrir Chamado</Button>
                    <Dialog open={open} onClose={handleClose} fullWidth='fullWidth' >
                        <DialogTitle id="alert-dialog-title">{"Novo Chamado"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {"Escreva o assunto e descreva o que está ocorrendo para que possamos auxiliar da melhor forma!"}
                                <FormGroup >
                                    <br />
                                    <TextField type='text' onChange={handleChangeDados} name="assunto" label='Assunto' />
                                    <br />
                                    <TextField type='text' onChange={handleChangeDados} placeholder="Placeholder" multiline name="descricao" label='Descrição' />
                                </FormGroup>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Fechar</Button>
                            <Button onClick={handleSave} autoFocus>Salvar</Button>
                        </DialogActions>
                    </Dialog>
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                        <Alert variant="filled" onClose={handleCloseSnack} severity={severitySnack} sx={{ width: '100%' }}>
                            {textoSnack}
                        </Alert>
                    </Snackbar>
                </Box>
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
                                            <TableCell>{item.dataFinalizado}</TableCell>
                                            <TableCell>{item.analista?.toUpperCase()}</TableCell>
                                            <TableCell>{item.status?.toUpperCase()}</TableCell>
                                            <TableCell>{item.retorno}</TableCell>
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

export default SolicitarChamados;
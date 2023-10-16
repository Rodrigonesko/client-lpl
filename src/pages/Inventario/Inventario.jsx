import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormGroup, InputLabel, MenuItem, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";

const Inventario = () => {

    const [solicitacoes, setSolicitacoes] = useState([])
    const [nomeItem, setNomeItem] = useState('')
    const [ondeEsta, setOndeEsta] = useState('')
    const [open, setOpen] = useState(false)
    const [dados, setDados] = useState({
        nomeItem: '',
        status: '',
        etiqueta: '',
        ondeEsta: '',
        descricao: ''
    })

    const [snackSelect, setSnackSelect] = useState(false)
    const [flushHook, setFlushHook] = useState(false)
    const [alerta, setAlerta] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [textoSnack, setTextoSnack] = useState('')
    const [severitySnack, setSeveritySnack] = useState('')

    const handleChangeSelect = async (id, status) => {
        const resultado = await axios.put(`${process.env.REACT_APP_API_KEY}/inventario/status`, {
            status: status, _id: id
        })
        setFlushHook(true)
        setSnackSelect(true)
        console.log(resultado)
        console.log(id, status)
    }

    const handleCloseSnack = () => {
        setOpenSnack(false);

    };

    const handleClose = () => {
        setOpen(false)
        const objAux = dados
        objAux.nomeItem = ''
        objAux.status = ''
        objAux.etiqueta = ''
        objAux.ondeEsta = ''
        objAux.descricao = ''
        setDados(objAux)
    }

    const handleChangeDados = (elemento) => {
        const name = elemento.target.name
        const objAux = dados

        if (name === 'nomeItem') {
            objAux.nomeItem = elemento.target.value
        }
        if (name === 'status') {
            objAux.status = elemento.target.value
        }
        if (name === 'etiqueta') {
            objAux.etiqueta = elemento.target.value
        }
        if (name === 'ondeItem') {
            objAux.ondeEsta = elemento.target.value
        }
        if (name === 'descricao') {
            objAux.descricao = elemento.target.value
        }
        setDados(objAux)
    }

    const handleCloseSelect = () => {
        setSnackSelect(false)
    }

    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/inventario/findAll`, { withCredentials: true })
        setSolicitacoes(resultado.data.encontrarTodos)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook, setFlushHook])

    const handleSave = async () => {
        try {
            if ((dados.nomeItem.length <= 0) || (dados.etiqueta.length <= 0) || (dados.ondeEsta.length <= 0)) {
                setOpenSnack(true)
                setSeveritySnack('warning')
                setTextoSnack('Faltam dados! Favor preencher todos os dados!')
                return
            }

            const resultado = await axios.post(process.env.REACT_APP_API_KEY + '/inventario/request', {
                nome: dados.nomeItem,
                status: dados.status,
                etiqueta: dados.etiqueta,
                ondeEsta: dados.ondeEsta,
                descricao: dados.descricao
            })
            console.log(resultado)
            setOpenSnack(true)
            setSeveritySnack('success')
            setTextoSnack('Dados inserido com sucesso!')
            console.log(dados)
            setFlushHook(true)
            setOpen(false)
            setDados({
                nomeItem: '',
                status: '',
                etiqueta: '',
                ondeEsta: '',
                descricao: ''
            })
            return
        } catch (error) {
            console.log(error.response.data.msg);
            setTextoSnack('Erro ao inserir item.' + error.response.data.msg)
            setSeveritySnack('error')
            setOpenSnack(true)
        }
    }

    const handleFilter = async (event) => {
        event.preventDefault()

        if (nomeItem.length > 2 || ondeEsta.length > 2) {
            const result = await axios.get(`${process.env.REACT_APP_API_KEY}/inventario/filter?nomeItem=${nomeItem}&ondeEsta=${ondeEsta}`, {
                withCredentials: true
            })
            console.log(result)
            setSolicitacoes(result.data)
        } else {
            setAlerta(true)
            return
        }
    }

    const handleClickOpen = async () => {
        setOpen(true);
    };

    const handleCloseInput = () => {
        setAlerta(false)
    }

    return (
        <>
            <Sidebar />
            <Container>
                <Box display={"flex"} paddingTop={"15px"} paddingBottom={"15px"}>
                    <Box>
                        <div className="title">
                            <h2>Inventário LPL</h2>
                        </div>
                        <br />
                        <Button onClick={handleClickOpen} variant='contained' sx={{ marginRight: '10px' }}>Inserir novo item</Button>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" fullWidth aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">{'Insira o item no Inventário'}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <FormGroup>
                                        <br />
                                        <TextField type='text' onChange={handleChangeDados} name='nomeItem' size='small' label='Qual o nome do item?' />
                                        <br />
                                        <TextField type='text' onChange={handleChangeDados} name='etiqueta' size='small' label='Qual o número serial do item?' />
                                        <br />
                                        <TextField type='text' onChange={handleChangeDados} name='ondeItem' size='small' label='Onde está o item?' />
                                        <br />
                                        <TextField type='text' onChange={handleChangeDados} name='descricao' placeholder='Placeholder' multiline size='small' label='Descreva o que o item possui?' />
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
                        <br />
                        <br />
                        <form action="" >
                            <TextField type='text' onChange={(e) => { setNomeItem(e.target.value) }} size='small' label='Nome do Item' sx={{ marginRight: '10px', width: '170px' }} />
                            <TextField type='text' onChange={(e) => { setOndeEsta(e.target.value) }} size='small' label='Onde está?' sx={{ marginRight: '10px', width: '170px' }} />
                            <Button type="submit" onClick={handleFilter} variant='contained' >Pesquisar</Button>
                        </form>
                        <Snackbar open={alerta} autoHideDuration={6000} onClose={handleCloseInput}>
                            <Alert variant="filled" onClose={handleCloseInput} severity="warning" sx={{ width: '100%' }}>
                                Digite no minimo 3 caracteres!
                            </Alert>
                        </Snackbar>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className="table-header">
                                    <TableCell>NOME ITEM</TableCell>
                                    <TableCell>ETIQUETA</TableCell>
                                    <TableCell>ONDE ESTÁ</TableCell>
                                    <TableCell>DESCRIÇÃO</TableCell>
                                    <TableCell>STATUS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {solicitacoes.map((item) => {
                                    return (
                                        <TableRow key={item._id}>
                                            <TableCell>{item.nome}</TableCell>
                                            <TableCell>{item.etiqueta}</TableCell>
                                            <TableCell>{item.ondeEsta}</TableCell>
                                            <TableCell>{item.descricao}</TableCell>
                                            <TableCell>
                                                <FormControl sx={{ minWidth: 135 }}>
                                                    <InputLabel id='StatusRh'>Status do RH</InputLabel>
                                                    <Select defaultValue={item.status} labelId="Status" id='Status' label='Status' onChange={(elemento) => handleChangeSelect(item._id, elemento.target.value)} >
                                                        <MenuItem value={'emEstoque'}>EM ESTOQUE</MenuItem>
                                                        <MenuItem value={'emUso'}>EM USO</MenuItem>
                                                        <MenuItem value={'descontinuado'}>DESCONTINUADO</MenuItem>
                                                    </Select>
                                                </FormControl></TableCell>
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

export default Inventario;
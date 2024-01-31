import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Snackbar, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { getUsers } from "../../../_services/user.service"

const ModalSolicitarChamados = () => {

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
    const [flushHook, setFlushHook] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [textoSnack, setTextoSnack] = useState('Insira o nome do Colaborador!')
    const [severitySnack, setSeveritySnack] = useState('')

    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/tasks/findAll`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setChamados(resultado.data.encontrarTodos)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook])

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
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
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

    return (
        <>
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
        </>
    )
}

export default ModalSolicitarChamados;

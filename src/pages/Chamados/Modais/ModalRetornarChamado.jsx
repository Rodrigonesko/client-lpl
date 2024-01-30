import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Snackbar, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { getUsers } from "../../../_services/user.service"

const ModalRetornarChamados = ({ item }) => {

    const [open, setOpen] = useState(false)
    const [colaboradores, setColaboradores] = useState([])
    const [chamados, setChamados] = useState([])
    const [dados, setDados] = useState({
        retorno: ''
    })
    const [flushHook, setFlushHook] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [textoSnack, setTextoSnack] = useState('Insira o nome do Colaborador!')
    const [severitySnack, setSeveritySnack] = useState('')
    const [snackSelect, setSnackSelect] = useState(false)


    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/tasks/findAll`, { withCredentials: true })
        setChamados(resultado.data.encontrarTodos)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook])

    const handleSave = async () => {

        if ((dados.retorno.length <= 0)) {
            setOpenSnack(true)
            setSeveritySnack('warning')
            setTextoSnack('Faltam dados! Favor preencher todas as informações!')
            return
        }
        const resultado = await axios.post(process.env.REACT_APP_API_KEY + '/tasks/retorno', {
            retorno: dados.retorno, _id: item._id
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
            retorno: ''
        })
        return
    }

    const handleClose = () => {
        setOpen(false)
        const objAux = dados
        objAux.retorno = ''
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

    const handleChangeRetorno = async (elemento) => {
        const name = elemento.target.name
        const objAux = dados

        if (name === 'retorno') {
            objAux.retorno = elemento.target.value
        }
        setDados(objAux)
    }

    return (
        <>
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
                    <Button onClick={() => { handleSave(item._id) }} autoFocus>Salvar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSelect}>
                <Alert variant="filled" onClose={handleCloseSelect} severity={severitySnack} sx={{ width: '100%' }}>
                    {textoSnack}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalRetornarChamados;

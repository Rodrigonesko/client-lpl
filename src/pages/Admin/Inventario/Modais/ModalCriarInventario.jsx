import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Snackbar, TextField } from "@mui/material"
import axios from "axios";
import { useState } from "react";

const ModalCriarInventario = ({ setFlushHook }) => {

    const [openSnack, setOpenSnack] = useState(false)
    const [textoSnack, setTextoSnack] = useState('')
    const [severitySnack, setSeveritySnack] = useState('')
    const [dados, setDados] = useState({
        nomeItem: '',
        status: '',
        etiqueta: '',
        ondeEsta: '',
        descricao: ''
    })
    const [open, setOpen] = useState(false);

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const handleClickOpen = async () => {
        setOpen(true);
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

    const handleSave = async () => {
        try {
            if ((dados.nomeItem.length <= 0) || (dados.etiqueta.length <= 0) || (dados.ondeEsta.length <= 0)) {
                setOpenSnack(true)
                setSeveritySnack('warning')
                setTextoSnack('Faltam dados! Favor preencher todos os dados!')
                return
            }
            if (dados.etiqueta.length > 5) {
                setOpenSnack(true)
                setSeveritySnack('warning')
                setTextoSnack('Etiqueta incorreta! Sua etiqueta está maior de 5 digitos, favor reescrever para 5 digitos!')
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

    return (
        <>
            <Button onClick={handleClickOpen} variant='contained' sx={{ marginRight: '10px' }}>Inserir novo item</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" fullWidth aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{'Insira o item no Inventário'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormGroup>
                            <br />
                            <TextField type='text' onChange={handleChangeDados} name='nomeItem' size='small' label='Qual o nome do item?' />
                            <br />
                            <TextField type='text' onChange={handleChangeDados} name='etiqueta' size='small' label='Qual a etiqueta do item?' />
                            <br />
                            <TextField type='text' onChange={handleChangeDados} name='ondeItem' size='small' label='Com quem/onde está o item?' />
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
        </>
    )
}

export default ModalCriarInventario
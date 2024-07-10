import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Snackbar, TextField } from "@mui/material"
import axios from "axios";
import { useState } from "react";
import { createInventario } from "../../../../_services/inventario.service";

const ModalCriarInventario = ({ setFlushHook }) => {

    const [openSnack, setOpenSnack] = useState(false)
    const [textoSnack, setTextoSnack] = useState('')
    const [severitySnack, setSeveritySnack] = useState('')
    const [dados, setDados] = useState({
        nomeItem: '',
        status: 'emEstoque',
        etiqueta: '',
        ondeEsta: '',
        descricao: '',
        serial: '',
        dataDeCompra: '',
        dataGarantia: '',
        tempoGarantia: '',
        nf: '',
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
        objAux.dataDeCompra = ''
        objAux.tempoGarantia = ''
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
        if (name === 'dataDeCompra') {
            objAux.dataDeCompra = elemento.target.value
        }
        if (name === 'tempoGarantia') {
            objAux.tempoGarantia = elemento.target.value
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

            const resultado = await createInventario({
                nome: dados.nomeItem,
                status: dados.status,
                etiqueta: dados.etiqueta,
                ondeEsta: dados.ondeEsta,
                descricao: dados.descricao,
                dataDeCompra: dados.dataDeCompra,
                tempoGarantia: dados.tempoGarantia
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
                status: 'emEstoque',
                etiqueta: '',
                ondeEsta: '',
                descricao: '',
                dataDeCompra: '',
                tempoGarantia: '',
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
            <Button onClick={handleClickOpen} variant='contained' sx={{ marginRight: '10px', borderRadius: '10px' }}>Inserir novo item</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" fullWidth aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{'Insira o item no Inventário'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormGroup>
                            <TextField type='text' onChange={handleChangeDados} name='nomeItem' margin='dense' size='small' label='Nome do item' InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }} />
                            <TextField type='text' onChange={handleChangeDados} name='etiqueta' margin='dense' size='small' label='Etiqueta do item' InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }} />
                            <TextField type='text' onChange={handleChangeDados} name='ondeItem' margin='dense' size='small' label='Com quem/onde está o item?' InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }} />
                            <TextField type='text' onChange={handleChangeDados} name='descricao' margin='dense' placeholder='Placeholder' multiline size='small' label='Descreva o que o item possui?' InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }} />
                            <TextField type='date' onChange={handleChangeDados} name='dataDeCompra' margin='dense' size='small' label='Data de Compra' InputLabelProps={{
                                shrink: true,
                            }} InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }} />
                            <TextField type='number' onChange={handleChangeDados} name='tempoGarantia' margin='dense' size='small' label='Garantia em Meses' InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }} />
                        </FormGroup>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Fechar</Button>
                    <Button onClick={handleSave} color='success' autoFocus>Salvar</Button>
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
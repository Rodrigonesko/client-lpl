import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, IconButton, Snackbar, TextField, Tooltip } from "@mui/material"
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { UpdateInventario } from "../../../../_services/inventario.service";

const ModalEditarInventario = ({ setFlushHook, trocaNome, trocaEtiqueta, trocaOndeEsta, trocaDescricao, id, trocaDataCompra, trocaDataGarantia }) => {

    const [openSnack, setOpenSnack] = useState(false)
    const [textoSnack, setTextoSnack] = useState('')
    const [severitySnack, setSeveritySnack] = useState('')

    const [nome, setNome] = useState(trocaNome)
    const [etiqueta, setEtiqueta] = useState(trocaEtiqueta)
    const [ondeEsta, setOndeEsta] = useState(trocaOndeEsta)
    const [descricao, setDescricao] = useState(trocaDescricao)
    const [dataCompra, setDataCompra] = useState(trocaDataCompra)
    const [dataGarantia, setDataGarantia] = useState(trocaDataGarantia)

    const [open, setOpen] = useState(false)

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const handleClickOpen = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = async () => {
        try {
            const result = await UpdateInventario({
                _id: id,
                nome,
                etiqueta,
                ondeEsta,
                descricao,
                dataCompra,
                dataGarantia,
            })
            console.log(result)
            setFlushHook(true)
            setOpenSnack(true)
            setSeveritySnack('success')
            setTextoSnack('Dados atualizados com sucesso!')
            setOpen(false)
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
            <Tooltip title='Editar' >
                <IconButton onClick={handleClickOpen} color='primary' ><FaEdit /></IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" fullWidth aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{'Insira o item no Inventário'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormGroup>
                            <TextField type='text' focused value={nome} onChange={e => setNome(e.target.value)} name='nomeItem' margin='dense' size='small' label='Qual o nome do item?' InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }} />
                            <TextField type='text' focused value={etiqueta} onChange={e => setEtiqueta(e.target.value)} name='etiqueta' margin='dense' size='small' label='Qual a etiqueta do item?' InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }} />
                            <TextField type='text' focused value={ondeEsta} onChange={e => setOndeEsta(e.target.value)} name='ondeItem' margin='dense' size='small' label='Com quem/onde está o item?' InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }} />
                            <TextField type='text' focused value={descricao} onChange={e => setDescricao(e.target.value)} name='descricao' margin='dense' placeholder='Placeholder' multiline size='small' label='Descreva o que o item possui?' InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }} />
                            <TextField type='text' focused value={''} onChange={e => setOndeEsta(e.target.value)} name='ondeItem' margin='dense' size='small' label='Serial' InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }} />
                            <TextField type='date' focused value={dataCompra} onChange={e => setDataCompra(e.target.value)} name='ondeItem' margin='dense' size='small' label='Data de Compra' InputLabelProps={{
                                shrink: true,
                            }} InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }} />
                            <TextField type='date' focused value={dataGarantia} onChange={e => setDataGarantia(e.target.value)} name='ondeItem' margin='dense' size='small' label='Data de Garantia' InputLabelProps={{
                                shrink: true,
                            }} InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }} />
                            <TextField type='text' focused value={''} onChange={e => setOndeEsta(e.target.value)} name='ondeItem' margin='dense' size='small' label='NF' InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }} />
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

export default ModalEditarInventario
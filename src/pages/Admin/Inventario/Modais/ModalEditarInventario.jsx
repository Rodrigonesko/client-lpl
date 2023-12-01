import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Snackbar, TextField } from "@mui/material"
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { UpdateInventario } from "../../../../_services/inventario.service";

const ModalEditarInventario = ({ setFlushHook, trocaNome, trocaEtiqueta, trocaOndeEsta, trocaDescricao, id }) => {

    const [openSnack, setOpenSnack] = useState(false)
    const [textoSnack, setTextoSnack] = useState('')
    const [severitySnack, setSeveritySnack] = useState('')

    const [nome, setNome] = useState(trocaNome)
    const [etiqueta, setEtiqueta] = useState(trocaEtiqueta)
    const [ondeEsta, setOndeEsta] = useState(trocaOndeEsta)
    const [descricao, setDescricao] = useState(trocaDescricao)

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
                descricao
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
            <Button onClick={handleClickOpen} ><FaEdit size='30px' /></Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" fullWidth aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{'Insira o item no Inventário'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormGroup>
                            <br />
                            <TextField type='text' focused value={nome} onChange={e => setNome(e.target.value)} name='nomeItem' size='small' label='Qual o nome do item?' />
                            <br />
                            <TextField type='text' focused value={etiqueta} onChange={e => setEtiqueta(e.target.value)} name='etiqueta' size='small' label='Qual a etiqueta do item?' />
                            <br />
                            <TextField type='text' focused value={ondeEsta} onChange={e => setOndeEsta(e.target.value)} name='ondeItem' size='small' label='Com quem/onde está o item?' />
                            <br />
                            <TextField type='text' focused value={descricao} onChange={e => setDescricao(e.target.value)} name='descricao' placeholder='Placeholder' multiline size='small' label='Descreva o que o item possui?' />
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
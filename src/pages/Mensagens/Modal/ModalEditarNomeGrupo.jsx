import { useState, useEffect } from 'react';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, IconButton, Tooltip, TextField, Alert, Snackbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { updateNameGroup } from '../../../_services/chat.service';

const ModalEditarNomeGrupo = ({ chatId, nomeGrupo, setFlushHook, flushHook }) => {

    const [openSnack, setOpenSnack] = useState(false)
    const [colorSnack, setColorSnack] = useState('success')
    const [msgSnack, setMsgSnack] = useState('Treinamento criado com sucesso!')
    const [open, setOpen] = useState(false);

    const [nome, setNome] = useState(nomeGrupo)

    const handleClose = () => {
        setOpen(false);
        setNome(nomeGrupo)
    }

    const handleOpen = () => {
        setOpen(true);
        setNome(nomeGrupo)
    }

    const handleSave = async () => {
        if (nome === '') {
            setOpenSnack(true)
            setColorSnack('warning')
            setMsgSnack('Não deixe o nome do grupo em branco, favor preencher!')
            return
        }
        try {
            await updateNameGroup({
                chatId,
                nome
            })
            setColorSnack('success')
            setMsgSnack('Nome alterado com sucesso!')
            setOpen(false)
            setOpenSnack(true)
            setFlushHook(true)
        } catch (error) {
            console.error()
        }
    }

    useEffect(() => {
        setFlushHook(false)
    }, [flushHook])

    return (
        <>
            <Tooltip title='Editar'>
                <IconButton onClick={handleOpen} color="success">
                    <EditIcon />
                </IconButton>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}

            >
                <DialogTitle id="alert-dialog-title">
                    {"Qual o Nome Novo do Grupo"}
                </DialogTitle>
                <DialogContent>
                    <TextField value={nome} type='text' size='small' margin='normal' fullWidth onChange={e => { setNome(e.target.value) }} label='Nome do Grupo' />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={handleSave}>Editar</Button>
                </DialogActions>
            </Dialog >
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity={colorSnack} sx={{ width: '100%' }}>
                    {msgSnack}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalEditarNomeGrupo
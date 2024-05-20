import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, TextField, Snackbar, Alert, Tooltip, IconButton } from "@mui/material"
import { updateTreinamento } from "../../../../_services/treinamento.service";
import EditIcon from '@mui/icons-material/Edit';

const ModalEditarTreinamento = ({ setFlushHook, id, nomeDoCurso, nomePlataforma, nomeLink, nomePrazo, nomeObservacoes }) => {
    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState(false)
    const [colorSnack, setColorSnack] = useState('success')
    const [msgSnack, setMsgSnack] = useState('Treinamento criado com sucesso!')

    const [nome, setNome] = useState(nomeDoCurso)
    const [plataforma, setPlataforma] = useState(nomePlataforma)
    const [link, setLink] = useState(nomeLink)
    const [prazo, setPrazo] = useState(nomePrazo)
    const [observacoes, setObservacoes] = useState(nomeObservacoes)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {

        if (nome === '' || plataforma === '' || prazo === '') {
            setOpenSnack(true)
            setColorSnack('warning')
            setMsgSnack('Algum campo está em branco')
            return
        }

        setColorSnack('success')
        setMsgSnack('Treinamento criado com sucesso!')

        await updateTreinamento({
            id,
            nome,
            plataforma,
            link,
            prazo,
            observacoes
        })

        setFlushHook(true)
        setOpenSnack(true)
        setOpen(false)
    }

    return (
        <>
            <Tooltip title={`Editar Treinamento`}>
                <IconButton sx={{ m: 1 }} variant="contained" color="success" size='small' onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Editar Treinamento Existente"}
                </DialogTitle>
                <DialogContent sx={{ width: '500px' }}>
                    <Box display='flex' flexDirection='column' minHeight='300px' justifyContent='space-around'>
                        <TextField label='Nome do Curso' size="small" value={nome} onChange={e => setNome(e.target.value)} />
                        <TextField label='Plataforma' size="small" value={plataforma} onChange={e => setPlataforma(e.target.value)} />
                        <TextField label='Link' size="small" value={link} onChange={e => setLink(e.target.value)} />
                        <TextField label='Prazo' type='date' focused size="small" value={prazo} onChange={e => setPrazo(e.target.value)} />
                        <TextField label='Observações' multiline rows={3} size="small" value={observacoes} onChange={e => setObservacoes(e.target.value)} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={handleSave} variant="contained" color="success">
                        Atualizar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity={colorSnack} sx={{ width: '100%' }}>
                    {msgSnack}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalEditarTreinamento;
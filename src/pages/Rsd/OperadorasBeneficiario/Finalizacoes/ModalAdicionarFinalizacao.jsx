import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Alert, Snackbar } from "@mui/material";
import { FiPlus } from 'react-icons/fi'
import { adicionarFinalizacao } from "../../../../_services/rsd.service";

const ModalAdicionarFinalizacao = ({ flushHook }) => {

    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [finalizacao, setFinalizacao] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = e => {
        setFinalizacao(e.target.value)
    }

    const handleAdicionarFinalizacao = async () => {
        await adicionarFinalizacao({
            finalizacao
        })
        setFinalizacao('')
        flushHook(true)
        setOpenSnack(true)
        handleClose()
    }

    return (
        <>
            <Button variant='outlined' color='success' onClick={handleClickOpen} ><FiPlus /></Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Adicionar Finalização
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center' }} >
                    <TextField label='Finalização' sx={{ m: 1 }} value={finalizacao} onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="inherit" >Fechar</Button>
                    <Button onClick={handleAdicionarFinalizacao} variant="contained" color="success" >
                        Adicionar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Finalização adicionada com sucesso!
                </Alert>
            </Snackbar>
        </>
    )

}

export default ModalAdicionarFinalizacao
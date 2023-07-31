import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Alert, Snackbar } from "@mui/material";
import { FiPlus } from 'react-icons/fi'
import { adicionarFormaPagamento } from "../../../../_services/rsd.service";

const ModalAdicionarFormaPagamento = ({ flushHook }) => {

    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [formaPagamento, setFormaPagamento] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = e => {
        setFormaPagamento(e.target.value)
    }

    const handleAdicionarFormaPagamento = async () => {
        await adicionarFormaPagamento({
            formaPagamento
        })
        setFormaPagamento('')
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
                    Adicionar Forma Pagamento
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center' }} >
                    <TextField label='Forma Pagamento' sx={{ m: 1 }} value={formaPagamento} onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="inherit" >Fechar</Button>
                    <Button onClick={handleAdicionarFormaPagamento} variant="contained" color="success" >
                        Adicionar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Forma de Pagamento adicionada com sucesso!
                </Alert>
            </Snackbar>
        </>
    )

}

export default ModalAdicionarFormaPagamento
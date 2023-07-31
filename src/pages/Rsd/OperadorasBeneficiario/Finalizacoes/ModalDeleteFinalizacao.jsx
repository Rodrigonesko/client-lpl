import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, Alert, Snackbar, Tooltip } from "@mui/material";
import { BsTrashFill } from 'react-icons/bs'
import { deleteFinalizacao } from "../../../../_services/rsd.service";

const ModalDeleteFinalizacao = ({ flushHook, id }) => {

    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteFinalizacao = async () => {
        await deleteFinalizacao(id)

        flushHook(true)
        setOpenSnack(true)
        handleClose()
    }

    return (
        <>
            <Tooltip title='Delete'>
                <Button variant='outlined' color='error' onClick={handleClickOpen} ><BsTrashFill /></Button>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Deletar Finalização
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="inherit" >Fechar</Button>
                    <Button onClick={handleDeleteFinalizacao} variant="contained" color="error" >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Finalização deletada com sucesso!
                </Alert>
            </Snackbar>
        </>
    )

}

export default ModalDeleteFinalizacao
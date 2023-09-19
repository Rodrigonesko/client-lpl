import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Typography, Snackbar, Alert } from "@mui/material"
import { useState } from "react";
import { deleteTreinamento } from "../../../../_services/treinamento.service";

const ModalDeletarTreinamento = ({ id, nome, setFlushHook }) => {

    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleDelete = async () => {
        await deleteTreinamento(id)

        setFlushHook(true)
        setOpenSnack(true)
        handleClose()
    }

    return (
        <>
            <Button size="small" variant="contained" color="error" onClick={handleClickOpen} >Deletar</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Treinamento: " + nome}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2">
                        Tem certeza que deseja deletar o treinamento {nome}?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">Deletar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Treinamento deletado com sucesso!
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalDeletarTreinamento
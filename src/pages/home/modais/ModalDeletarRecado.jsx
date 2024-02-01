import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, Tooltip } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import Axios from "axios";

const ModalDeletarRecado = ({ setFlushHook, id }) => {

    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {

        await Axios.delete(`${process.env.REACT_APP_API_KEY}/mural/${id}`, {
            withCredentials: true,
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setOpenSnack(true)
        handleClose()
        setFlushHook(true)
    }

    return (
        <>
            <Tooltip title={`Deletar recado`}>
                <IconButton onClick={handleClickOpen} color="error">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Deletar recado?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza que deseja deletar o recado?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={handleDelete} variant="contained" color="error" >
                        Deletar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Recado deletado com sucesso!
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalDeletarRecado
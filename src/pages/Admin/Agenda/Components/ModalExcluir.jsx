import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, Tooltip } from "@mui/material"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState } from "react";
import { deleteAgenda } from "../../../../_services/agenda.service";

const ModalExcluir = ({ id, setFlushHook }) => {

    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)

    const handleOpen = async () => {
        setOpen(true)
    }

    const handleClose = async () => {
        setOpen(false)
    }

    const handleDelete = async () => {
        await deleteAgenda(id)

        setFlushHook(true)
        setOpenSnack(true)
        handleClose()
    }

    return (
        <>
            <Tooltip title='Deletar' >
                <IconButton onClick={handleOpen} color='error' ><DeleteOutlineOutlinedIcon /></IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Deletar agenda"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Você realmente deseja deletar esse item da agenda?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={handleDelete} color='error' autoFocus>Deletar</Button>
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

export default ModalExcluir
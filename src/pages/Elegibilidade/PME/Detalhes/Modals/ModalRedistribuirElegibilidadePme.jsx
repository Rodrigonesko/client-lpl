import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Snackbar, Alert } from "@mui/material"
import { useState } from "react"
import { alterarStatusElegibildadePme } from "../../../../../_services/elegibilidadePme.service"
import { useNavigate, useParams } from "react-router-dom"

const ModalRedistribuirElegibilidadePme = ({setFlushHook}) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRedistribuir = async () => {
        await alterarStatusElegibildadePme({
            status: 'Redistribuído',
            id
        })

        setOpenSnack(true)
        handleClose()
        setFlushHook(true)
        setTimeout(() => {
            navigate('/elegibilidadePme/andamento')
        }, 1000)
    }

    return (
        <>
            <Button sx={{ marginLeft: '10px' }} onClick={handleClickOpen} variant="contained" color="info" >Redistribuir</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Devolver
                </DialogTitle>
                <DialogContent>
                    <DialogContentText mb={2} id="alert-dialog-description">
                        Deseja redistribuir a proposta?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="inherit"  >Fechar</Button>
                    <Button onClick={handleRedistribuir} variant="contained" color='info' autoFocus>
                        Redistribuir
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Redistribuída com sucesso
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalRedistribuirElegibilidadePme
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert, Snackbar } from "@mui/material"
import { useState } from "react"
import { AiOutlineCheck } from 'react-icons/ai'
import { alterarStatusElegibildadePme } from "../../../../../_services/elegibilidadePme.service"
import { useNavigate, useParams } from "react-router-dom"

const ModalConcluirElegibilidadePme = ({ setFlushHook }) => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConcluir = async () => {

        await alterarStatusElegibildadePme({
            status: 'Concluido',
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
            <Button style={{ marginRight: '10px' }} startIcon={<AiOutlineCheck />} onClick={handleClickOpen} variant="contained" color="success" >Concluir</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Concluir
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja concluir a proposta?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="inherit"  >Fechar</Button>
                    <Button onClick={handleConcluir} variant="contained" color='success' autoFocus>
                        Concluir
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Concluida com sucesso
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalConcluirElegibilidadePme
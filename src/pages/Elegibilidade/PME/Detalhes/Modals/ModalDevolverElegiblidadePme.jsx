import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Snackbar, Alert } from "@mui/material"
import { useState } from "react"
import { alterarStatusElegibildadePme } from "../../../../../_services/elegibilidadePme.service"
import { useNavigate, useParams } from "react-router-dom"

const ModalDevolverElegibilidadePme = ({ setFlushHook }) => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [motivo, setMotivo] = useState('')
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setMotivo(e.target.value)
    }

    const handleDevolverProposta = async () => {

        if (motivo === '') {
            setError(true)
            setMsg('Você precisa especificar o motivo para devolver!')
            return
        }

        await alterarStatusElegibildadePme({
            status: 'Devolvida',
            motivo,
            id
        })

        setError(false)
        setMsg('')
        setOpenSnack(true)
        handleClose()
        setFlushHook(true)
        setTimeout(() => {
            navigate('/elegibilidadePme/andamento')
        }, 1000)

    }

    return (
        <>
            <Button onClick={handleClickOpen} variant="contained" color="warning" >Devolver</Button>
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
                        Deseja Devolver a proposta?
                    </DialogContentText>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Motivo"
                        value={motivo}
                        onChange={handleChange}
                    />
                    {
                        error ? (
                            <Alert style={{ marginTop: '10px' }} variant="filled" severity="error">
                                {msg}
                            </Alert>
                        ) : null
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="inherit"  >Fechar</Button>
                    <Button onClick={handleDevolverProposta} variant="contained" color='warning' autoFocus>
                        Devolver
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Devolvida com sucesso
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalDevolverElegibilidadePme
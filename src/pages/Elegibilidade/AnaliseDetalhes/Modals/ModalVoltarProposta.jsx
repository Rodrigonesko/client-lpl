import React, { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Alert, Snackbar } from "@mui/material"
import { voltarPropostaElegibilidade } from "../../../../_services/elegibilidade.service"
import { useNavigate, useParams } from "react-router-dom"

const ModalVoltarProposta = () => {

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

    const handleVoltarProposta = async () => {

        await voltarPropostaElegibilidade({
            id
        })

        setOpenSnack(true)
        handleClose()

        setTimeout(() => {
            navigate('/elegibilidade/analise')
        }, 1000)


    }

    return (
        <>
            <Button color="error" onClick={handleClickOpen} variant="contained" sx={{ m: 1 }} >Voltar Proposta</Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Voltar Proposta?
                </DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit" >Fechar</Button>
                    <Button color='error' variant="contained" onClick={handleVoltarProposta} autoFocus>
                        Voltar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Proposta atribuida para iniciar
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalVoltarProposta
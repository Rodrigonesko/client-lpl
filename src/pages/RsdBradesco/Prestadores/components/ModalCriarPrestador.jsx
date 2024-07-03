import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useState } from "react"

const ModalCriarPrestador = () => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Button
                type="button"
                // size="small"
                variant="contained"
                sx={{ borderRadius: '10px' }}
                onClick={handleOpen}
                onClose={handleClose}
            >Adicionar Prestador</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Testando</DialogTitle>
                <DialogContent>
                    Teste deu certo
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error" >Fechar</Button>
                    <Button onClick={handleClose} color="primary" >Criar</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

export default ModalCriarPrestador
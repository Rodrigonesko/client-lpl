import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react"

const ModalCriarContato = () => {

    const [openModal, setOpenModal] = useState(false)

    const handleOpen = () => {
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    return (
        <>
            <Button type='button' variant='contained' size='small' onClick={handleOpen} sx={{ borderRadius: '10px' }}>Adicionar Contato</Button>
            <Dialog
                open={openModal}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>Adicionar Contato</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField type='text' size='small' margin='normal' label='Nome' />
                    <TextField type='text' size='small' margin='normal' label='DDD' />
                    <TextField type='text' size='small' margin='normal' label='Telefone' />
                    <TextField type='text' disabled size='small' margin='normal' label='Whatsapp' />
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>Fechar</Button>
                    <Button color='success' onClick={handleClose}>Enviar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalCriarContato
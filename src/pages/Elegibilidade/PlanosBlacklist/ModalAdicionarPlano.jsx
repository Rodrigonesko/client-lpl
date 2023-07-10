import { Button, Dialog, DialogActions, DialogContent, Box, DialogTitle, TextField, Snackbar, Alert } from "@mui/material"
import { useState } from "react"
import { FaPlus } from 'react-icons/fa'
import { adicionarPlanoBlacklist } from "../../../_services/elegibilidade.service"

const ModalAdicionarPlano = (props) => {

    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [plano, setPlano] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdicionarPlano = async () => {
        console.log('plano');

        await adicionarPlanoBlacklist({
            plano
        })

        props.flushHook(true)
        setOpenSnack(true)
        handleClose()
        setPlano('')

    }

    const handleChange = (e) => {
        setPlano(e.target.value)
    }

    return (
        <>
            <Button variant='outlined' onClick={handleClickOpen} ><FaPlus /></Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Adicinar Plano a Blacklist
                </DialogTitle>
                <DialogContent>
                    <Box m={2}>
                        <TextField value={plano} label='Plano' onChange={handleChange} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined' color='inherit' >Fechar</Button>
                    <Button onClick={handleAdicionarPlano} variant='outlined' color="success" >Adicionar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant='filled' onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Plano adicionado na Blacklist com sucesso
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalAdicionarPlano
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material"
import { useState } from "react";
import { FaPlus } from "react-icons/fa"

const ModalAdicionarMural = () => {

    const [open, setOpen] = useState(false);

    const [openSnack, setOpenSnack] = useState(false);
    const [textoSnack, setTextoSnack] = useState(false);
    const [severitySnack, setSeveritySnack] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleClickOpen} sx={{ mb: '20px', p: '10px' }} fullWidth variant='outlined'><FaPlus /></Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Criar Recado"}
                </DialogTitle>
                <DialogContent sx={{ width: '500px' }}>
                    <Box display='flex' flexDirection='column' minHeight='150px' justifyContent='space-around'></Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={handleSave} variant="contained" color="success">Salvar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity={severitySnack} sx={{ width: '100%' }}>
                    {textoSnack}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalAdicionarMural;
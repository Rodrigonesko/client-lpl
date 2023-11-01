import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react";
import { uploadImplantacao } from "../../../../../_services/teleEntrevista.service";

const ModalUploadImplantacao = () => {

    const [open, setOpen] = useState(false);
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSend = async e => {
        e.preventDefault()

        setLoading(true)

        try {

            let formData = new FormData()

            formData.append('file', file, file.name)

            const result = await uploadImplantacao(formData)

            console.log(result);

            setLoading(false)

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ ml: '10px' }}>
                Upload implantacao
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Upload de arquivo de implantacao"}
                </DialogTitle>
                <DialogContent >
                    <Box sx={{ m: 1 }}>
                        <TextField onChange={e => setFile(e.target.files[0])} type="file" label='Arquivo' focused />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button disabled={loading} onClick={handleClose} color="inherit">Fechar</Button>
                    <Button disabled={loading} endIcon={loading && <CircularProgress size={20} />} onClick={handleSend} autoFocus>
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalUploadImplantacao
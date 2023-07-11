import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useState } from "react"
import { FaPlus } from 'react-icons/fa'
import PdfUploader from "../PdfUploader"

const ModalAdicionarPolitica = () => {

    const [open, setOpen] = useState(false)
    const [file, setFile] = useState()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpload = async () => {
        console.log(file);
    }

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen} ><FaPlus /></Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Adicionar ou atualizar nova política
                </DialogTitle>
                <DialogContent>
                    <PdfUploader setFile={setFile} file={file} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color='inherit' onClick={handleClose}>Fechar</Button>
                    <Button variant="contained" onClick={handleUpload} autoFocus>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalAdicionarPolitica
import { useState } from "react";
import DragAndDrop from "../../../../components/DragAndDrop/DragAndDrop";
import { uploadNotasFiscais } from "../../../../_services/inventario.service";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";

const ModalInserirNotaFiscal = ({ id, setFlushHook }) => {

    const [message, setMessage] = useState('')
    const [file, setFile] = useState()
    const [openSnack, setOpenSnack] = useState(false)
    const [severitySnack, setSeveritySnack] = useState('')
    const [open, setOpen] = useState(false)

    const handleClickOpen = async () => {
        setOpen(true)
    }

    const handleClose = async () => {
        setOpen(false)
        setOpenSnack(false)
    }

    const handleUpload = async (_id) => {
        const formData = new FormData()
        formData.append('file', file, file.name)
        const result = await uploadNotasFiscais(
            formData,
            _id,
        )

        if (result.msg === 'ok') {
            setOpenSnack(true)
            setMessage('Certificado adicionado com sucesso')
            setSeveritySnack('success')
            setFile('')
            setFlushHook(true)
            setOpen(false)
        } else {
            setOpenSnack(true)
            setMessage('Algo deu errado ou ja existe esse Certificado')
            setSeveritySnack('warning')
        }
    }

    return (
        <>
            <Button variant='contained' onClick={handleClickOpen} sx={{ borderRadius: '10px' }} >Inserir NF</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Enviar Nota Fiscal"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <DragAndDrop
                            file={file}
                            setFile={setFile}
                            fontColor={'black'}
                            bgColor={'red'}
                            text={'Inserir Nota Fiscal'}
                            textOnDrag={'Insira aqui'}
                            textOnDrop={<object data={file ? URL.createObjectURL(file) : null} type="application/pdf" height={500} >
                                PDF
                            </object>}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Fechar</Button>
                    <Button onClick={() => { handleUpload(id) }} color='success' autoFocus>Enviar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} variant='filled' severity={severitySnack} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalInserirNotaFiscal
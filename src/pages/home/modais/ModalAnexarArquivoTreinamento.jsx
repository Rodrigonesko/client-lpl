import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material"
import DragAndDrop from "../../../components/DragAndDrop/DragAndDrop"
import { useState } from "react"
import { uploadCertificados } from "../../../_services/treinamento.service"

const ModalAnexarArquivoTreinamento = ({ id, setFlushHook }) => {

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

        console.log(_id);

        const result = await uploadCertificados(
            formData,
            _id
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
        <Box sx={{ display: 'flex' }}>
            <Button variant='contained' onClick={handleClickOpen} >Enviar Certificado do Curso</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Enviar Certificado de Conclusão de Curso"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <DragAndDrop
                            file={file}
                            setFile={setFile}
                            fontColor={'black'}
                            bgColor={'red'}
                            textOnDrag={'Solte aqui'}
                            text={'Arraste e solte o pdf aqui'}
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
        </Box>
    )
}

export default ModalAnexarArquivoTreinamento
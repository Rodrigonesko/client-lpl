import { useState } from "react"
import DragAndDrop from "../../../../components/DragAndDrop/DragAndDrop"
import Toast from "../../../../components/Toast/Toast"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { CloudUpload } from "@mui/icons-material"
import { blue } from "@mui/material/colors"
import { uploadArquivo } from "../../../../_services/rsdBradesco.service"

const ModalUploadArquivo = ({ item, setItem }) => {

    const [open, setOpen] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [file, setFile] = useState()

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleUpload = async () => {
        console.log(item);
        const formData = new FormData()
        formData.append('file', file, file.name)
        try {
            const response = await uploadArquivo(item._id, formData)
            setOpenToast(true)
            setMessage('Upload feito com sucesso')
            setSeverity('success')
            handleClose()
            setFile(null)
            setItem(response)
        } catch (error) {
            console.error(error);
            setOpenToast(true)
            setMessage('Erro ao fazer upload')
            setSeverity('error')
        }
    }

    return (
        <>
            <Button
                variant='contained'
                onClick={handleClickOpen}
                sx={{
                    mt: 2
                }}
                endIcon={<CloudUpload />}
            >
                Anexar Arquivo
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Enviar Arquivo"}
                </DialogTitle>
                <DialogContent>
                    <DragAndDrop
                        file={file}
                        setFile={setFile}
                        fontColor={'black'}
                        text={'Inserir Arquivo'}
                        textOnDrag={'Insira aqui'}
                        bgColor={blue[900]}
                        textOnDrop={`${file?.name} adicionado`}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleUpload}>Enviar</Button>
                </DialogActions>
            </Dialog>

            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                severity={severity}
                message={message}
            />
        </>
    )

}

export default ModalUploadArquivo
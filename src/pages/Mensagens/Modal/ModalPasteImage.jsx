import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { createPrivateChat, uploadArquivosChat } from "../../../_services/chat.service"
import { useState } from "react"

const ModalPasteImage = ({ open, setOpen, image, setImage, chatId, receptor }) => {

    const [loading, setLoading] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleSend = async () => {

        setLoading(true)

        let auxChatId = chatId

        if (!chatId) {
            const result = await createPrivateChat({
                receptor,
            })
            auxChatId = result._id
        }

        const formData = new FormData()
        formData.append('chatId', auxChatId)
        formData.append('receptor', receptor)
        formData.append('files', image)

        await uploadArquivosChat(formData)
        setImage(null)
        handleClose()
        setLoading(false)
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Enviar imagem"}
                </DialogTitle>
                <DialogContent>
                    <img
                        alt="Imagem"
                        style={{ width: '100%', height: 'auto' }}
                        src={!!image && URL.createObjectURL(image)} ></img>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button
                        disabled={loading}
                        color="primary"
                        variant="contained"
                        disableElevation
                        style={{ marginLeft: 10 }}
                        endIcon={loading && <CircularProgress color="inherit" size={14} />}
                        onClick={handleSend}
                        autoFocus
                    >
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalPasteImage
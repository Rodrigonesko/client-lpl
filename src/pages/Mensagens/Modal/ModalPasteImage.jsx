import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { createPrivateChat, uploadArquivosChat } from "../../../_services/chat.service"

const ModalPasteImage = ({ open, setOpen, image, setImage, chatId, receptor }) => {

    const handleClose = () => {
        setOpen(false)
    }

    const handleSend = async () => {
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
                    <img src={!!image && URL.createObjectURL(image)} ></img>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSend} autoFocus>
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalPasteImage
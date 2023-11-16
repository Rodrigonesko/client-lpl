import { Avatar, Box, Dialog, DialogContent, IconButton, Tooltip } from "@mui/material"
import { useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import { useRef } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { getChatDataByIdOrName, updateGroupImage } from "../../../_services/chat.service";

const ModalAlterarImagemGrupo = ({ chatId, groupImage, setFlushHook }) => {

    const [open, setOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState(null)
    const fileInputRef = useRef(null);

    const handleOpen = () => {
        fetchData()
        setOpen(true)
        console.log(selectedImage);
    }

    const fetchData = async () => {
        const result = await getChatDataByIdOrName({ chatId, nome: null })
        setSelectedImage(`${process.env.REACT_APP_CHAT_SERVICE}/media/${result.imageGroup}`)
    }

    const handleClose = () => {
        setImage(null)
        setSelectedImage(null)
        setOpen(false)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setImage(file)
        }
    }

    const handleSendImage = async () => {
        try {

            const formData = new FormData()

            if (!image) {
                return
            }

            formData.append('chatId', chatId)
            formData.append('file', image)

            await updateGroupImage(formData)

            setFlushHook(true)
            handleClose()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <IconButton onClick={handleOpen}>
                <Avatar sx={{ width: '150px', height: '150px' }} src={groupImage} />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <Avatar src={selectedImage} sx={{ width: 400, height: 400 }}>
                    </Avatar>
                    <Box display={"flex"} justifyContent={'center'}>
                        <Tooltip title='Alterar Imagem'>
                            <IconButton onClick={() => fileInputRef.current.click()}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Salvar'>
                            <IconButton onClick={handleSendImage} color="primary">
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                </DialogContent>
            </Dialog>
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleImageChange}
            />
        </>
    )
}

export default ModalAlterarImagemGrupo
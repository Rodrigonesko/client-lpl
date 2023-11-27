import { Avatar, Box, Button, Dialog, DialogContent, IconButton, Tooltip } from '@mui/material'
import { useRef } from 'react';
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { updateProfilePic } from '../../../../_services/user.service';

const ModalAlterarFoto = () => {

    const fileInputRef = useRef(null);

    const [open, setOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setSelectedImage(null)
        setOpen(false)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    }

    const handleSendImage = async () => {
        try {

            const formData = new FormData()

            if (!selectedImage) {
                return
            }

            formData.append('file', selectedImage)

            const result = await updateProfilePic(formData)

            console.log(result);

            // await updateGroupImage(formData)

            // setFlushHook(true)
            handleClose()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Tooltip title='Alterar foto'>
                <Button onClick={handleOpen} sx={{ borderRadius: '50%' }} >
                    <Avatar
                        alt='foto'
                        sx={{ width: '100px', height: '100px' }}
                    ></Avatar>
                </Button>
            </Tooltip>

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
                            <IconButton
                                onClick={handleSendImage}
                            color="primary">
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </DialogContent>
                <input
                    accept="image/*"
                    type="file"
                    hidden
                    onChange={handleImageChange}
                    ref={fileInputRef}
                />
            </Dialog>
        </>
    )
}

export default ModalAlterarFoto
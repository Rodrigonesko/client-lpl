import { Avatar, Box, Button, Dialog, DialogContent, IconButton, Tooltip } from '@mui/material'
import { useContext, useRef } from 'react';
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { updateProfilePic } from '../../../../_services/user.service';
import AuthContext from '../../../../context/AuthContext';
import { useEffect } from 'react';

const ModalAlterarFoto = () => {

    const { name } = useContext(AuthContext)

    const fileInputRef = useRef(null);

    const [open, setOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState(`${process.env.REACT_APP_API_URL}/media/profilePic/${name}.jpg`);
    const [image, setImage] = useState(null)

    const handleOpen = () => {
        setOpen(true)
        setSelectedImage(`${process.env.REACT_APP_API_KEY}/media/profilePic/${name}.jpg`)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setSelectedImage(URL.createObjectURL(file));
        }
    }

    useEffect(() => {
        setSelectedImage(`${process.env.REACT_APP_API_KEY}/media/profilePic/${name.split(' ').join('%20')}.jpg`)
    }, [name])

    const handleSendImage = async () => {
        try {
            const formData = new FormData()
            if (!selectedImage) {
                return
            }
            formData.append('file', image)
            await updateProfilePic(formData)
            handleClose()
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Tooltip title='Alterar foto'>
                <Button onClick={handleOpen} sx={{ borderRadius: '50%' }} >
                    <Avatar
                        src={`${process.env.REACT_APP_API_KEY}/media/profilePic/${name.split(' ').join('%20')}.jpg`}
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
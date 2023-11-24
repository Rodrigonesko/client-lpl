import { Box, Dialog } from "@mui/material"
import { useState } from "react"

const ModalExpandirImagem = ({ url }) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Box sx={{":hover": {cursor: 'pointer'}}}>
            <img style={{borderRadius: '5px', maxHeight: '400px', maxWidth: '400px'}} onClick={handleOpen} src={url} alt="Imagem" />
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'lg'}
            >
                <img src={url} width={'100%'} height={'100%'}></img>
            </Dialog>

        </Box>
    )
}

export default ModalExpandirImagem
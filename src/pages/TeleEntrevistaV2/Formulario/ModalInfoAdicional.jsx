import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, TextField } from '@mui/material'
import { useState } from 'react'

const ModalInfoAdicional = ({ infoAdicional }) => {
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                style={{ marginTop: '10px' }}
            >
                Informações Adicionais
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '& .MuiDialog-paper': {
                        width: '80%',
                        maxWidth: '800px',
                        maxHeight: '500px'
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title">{"Informações Adicionais"}</DialogTitle>
                <DialogContent>
                    {
                        Object.keys(infoAdicional).map((key, index) => {
                            return (
                                <Box key={index} mt={2}>
                                    <Typography variant="h6">{key}</Typography>
                                    <TextField
                                        id="outlined-multiline-static"
                                        value={infoAdicional[key]}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Box>
                            )
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalInfoAdicional
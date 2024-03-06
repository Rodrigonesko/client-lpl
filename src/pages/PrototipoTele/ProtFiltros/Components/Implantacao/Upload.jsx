import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState } from "react";
import { uploadImplantacao } from "../../../../../_services/teleEntrevista.service";
import Toast from "../../../../../components/Toast/Toast";

const Upload = () => {

    const [open, setOpen] = useState(false)
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)
    const [toastOpen, setToastOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSend = async e => {
        e.preventDefault()

        setLoading(true)

        try {

            let formData = new FormData()
            formData.append('file', file, file.name)
            const result = await uploadImplantacao(formData)

            if (result.msg === 'ok') {
                setMessage('Situação atualizada com sucesso!')
                setSeverity("success")
                setToastOpen(true)
                handleClose()
            } else { 
                setMessage('Erro ao fazer upload!')
                setSeverity("error")
                setToastOpen(true)
            }

            setLoading(false)

        } catch (error) {

            setMessage('Erro ao fazer upload!')
            setSeverity("error")
            setToastOpen(true)
        }

    }

    return (
        <>
            <Button
                variant="contained"
                startIcon={<FileUploadIcon />}
                sx={{
                    bgcolor: 'black',
                    color: 'white',
                    '&:hover': {
                        bgcolor: 'black',
                        opacity: 0.8,
                    },
                }}
                onClick={handleClickOpen}
            >
                Upload
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        Upload
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <input
                            type="file"
                            onChange={event => setFile(event.target.files[0])}
                            style={{
                                width: '100%',
                                height: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxSizing: 'border-box',

                            }}
                            disabled={loading}
                        />
                        {
                            loading && <Box sx={{ ml: 2 }}><CircularProgress /></Box>
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: 'black',
                            color: 'white',
                            '&:hover': {
                                bgcolor: 'black',
                                opacity: 0.8,
                            },
                        }}
                        onClick={handleSend}
                        autoFocus
                        disabled={loading}
                    >
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>

            <Toast
                open={toastOpen}
                message={message}
                severity={severity}
                duration={6000}
                onClose={() => setToastOpen(false)}
            />

        </>
    )
}

export default Upload
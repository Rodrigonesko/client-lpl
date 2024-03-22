import { Alert, Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Tooltip, Typography } from "@mui/material"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { createPrivateChat, uploadArquivosChat } from "../../../_services/chat.service";
import { blue } from "@mui/material/colors";

const ModalUploadArquivos = ({ chatId, receptor, setFlushHook }) => {

    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false)

    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
        setUploadedFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '*',
        multiple: true,
    });

    const activeDropzoneStyles = {
        border: `2px solid ${blue[200]}`, // Change as needed
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: blue[50], // Change as needed
        transition: 'all 0.3s ease-in-out',
    };

    const uploadedFileItems = useMemo(() => (
        uploadedFiles.map((file, index) => (
            <Chip
                m={1}
                key={index}
                label={file.name}
                onDelete={() => {
                    const newFiles = [...uploadedFiles];
                    newFiles.splice(index, 1);
                    setUploadedFiles(newFiles);
                }}
            >{file.name}</Chip>
        ))
    ), [uploadedFiles]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {

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

        for (let i = 0; i < uploadedFiles.length; i++) {
            formData.append('files', uploadedFiles[i]);
        }

        await uploadArquivosChat(formData)

        setUploadedFiles([])
        setOpenSnack(true)
        setFlushHook(true)
        handleClose()
        setLoading(false)
    }

    return (
        <>
            <Tooltip title='Anexar arquivos'>
                <Button onClick={handleClickOpen} variant="outlined" sx={{ mb: '10px' }}>
                    <AttachFileIcon />
                </Button>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {"Anexar arquivos?"}
                </DialogTitle>
                <DialogContent>
                    <Box
                        {...getRootProps()}
                        sx={isDragActive ? activeDropzoneStyles : dropzoneStyles}
                    >
                        <input {...getInputProps()} />
                        <p>Arraste e solte arquivos aqui ou clique para selecionar.</p>
                    </Box>
                    <Box mt={2}>
                        <h4>Arquivos enviados:</h4>
                        {uploadedFileItems}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">Fechar</Button>
                    <Button
                        onClick={handleSave}
                        color="info"
                        autoFocus
                        variant="contained"
                        disableElevation
                        endIcon={loading && <CircularProgress color="inherit" size={14} />}
                        disabled={loading || uploadedFiles.length === 0}
                    >
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog >
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Arquivos enviados com sucesso!
                </Alert>
            </Snackbar>
        </>
    )
}

const dropzoneStyles = {
    border: '2px solid #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#eeeeee',
    },
    transition: 'all 0.3s ease-in-out',
};

export default ModalUploadArquivos
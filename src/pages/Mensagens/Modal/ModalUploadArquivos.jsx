import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Tooltip, Typography } from "@mui/material"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { createPrivateChat, uploadArquivosChat } from "../../../_services/chat.service";

const ModalUploadArquivos = ({ chatId, receptor, setFlushHook }) => {

    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {

        console.log(acceptedFiles);
        setUploadedFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '*',
        multiple: true,
    });

    const uploadedFileItems = useMemo(() => (
        uploadedFiles.map((file, index) => (
            <Typography m={1} key={index}>{file.name}</Typography>
        ))
    ), [uploadedFiles]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {

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
                    <Box {...getRootProps()} style={dropzoneStyles}>
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
                    <Button onClick={handleSave} color="info" autoFocus>
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
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
};

export default ModalUploadArquivos
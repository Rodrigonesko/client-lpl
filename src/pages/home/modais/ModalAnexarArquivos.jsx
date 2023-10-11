import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Tooltip, Typography } from "@mui/material"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ModalAnexarArquivos = ({setFiles}) => {

    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        // Ao soltar os arquivos, você pode processá-los aqui, por exemplo, fazer upload para o servidor.
        // Aqui, estamos apenas armazenando os nomes dos arquivos em estado.
        console.log(acceptedFiles);
        setUploadedFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '*',
        multiple: true, // Permite vários arquivos.
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

    const handleSave = ()=>{
        setUploadedFiles([])
        setFiles(uploadedFiles)
        setOpenSnack(true)
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
                        Anexar
                    </Button>
                </DialogActions>
            </Dialog >
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Arquivos anexados com sucesso!
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

export default ModalAnexarArquivos
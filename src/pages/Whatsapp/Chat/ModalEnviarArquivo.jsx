import { Add } from "@mui/icons-material"
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import { useCallback, useContext, useMemo, useState } from "react";
import Toast from "../../../components/Toast/Toast";
import { blue } from "@mui/material/colors";
import { useDropzone } from "react-dropzone";
import { sendFiles, sendMessage } from "../../../_services/whatsapp.service";
import { ChatContext } from "./ChatContext";

const activeDropzoneStyles = {
    border: `2px solid ${blue[200]}`, // Change as needed
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: blue[50], // Change as needed
    transition: 'all 0.3s ease-in-out',
};

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

const ModalEnviarArquivo = () => {

    const { whatsappReceiver, whatsappSender } = useContext(ChatContext)

    const [open, setOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const onDrop = useCallback((acceptedFiles) => {
        setUploadedFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '*',
        multiple: true,
    });

    const handleSend = async () => {
        setLoading(true)
        try {
            const data = new FormData();
            uploadedFiles.forEach(file => {
                data.append('files', file);
            });
            console.log(data);
            const result = await sendFiles(data, whatsappReceiver.whatsapp, whatsappSender);
            console.log(result);
            for (const mediaUrl of result) {
                await sendMessage({
                    de: whatsappSender,
                    para: whatsappReceiver.whatsapp,
                    mediaUrl,
                    mensagem: ''
                })
            }
            setLoading(false)
            setMessage('Arquivo enviado com sucesso')
            setSeverity('success')
            setOpenToast(true)
            setOpen(false)
            setUploadedFiles([])
        } catch (error) {
            console.log(error)
            setLoading(false)
            setMessage('Erro ao enviar arquivo')
            setSeverity('error')
            setOpenToast(true)
        }
    }

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

    return (
        <>
            <IconButton
                onClick={() => setOpen(true)}
                color="primary"
                aria-label="upload picture"
                component="span"
            >
                <Add />
            </IconButton>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Enviar Arquivo</DialogTitle>
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
                    <Button
                        onClick={() => setOpen(false)}
                        color="inherit"
                    >
                        Fechar
                    </Button>
                    <Button
                        onClick={handleSend}
                        color="primary"
                        disabled={loading}
                    >
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                message={message}
                severity={severity}
            />
        </>
    )
}




export default ModalEnviarArquivo
import React from "react";
import { Alert, AppBar, Box, Button, Chip, Dialog, IconButton, Slide, Snackbar, Toolbar, Tooltip, Typography } from "@mui/material"
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import CloseIcon from '@mui/icons-material/Close';
import ModalAnexarArquivos from "./ModalAnexarArquivos";
import Axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalAdicionarMural = () => {

    const [open, setOpen] = useState(false);

    const [openSnack, setOpenSnack] = useState(false);
    const [textoSnack, setTextoSnack] = useState(false);
    const [severitySnack, setSeveritySnack] = useState(`success`);
    const [textContent, setTextContent] = useState('')
    const [files, setFiles] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        console.log(textContent);

        const formData = new FormData();
        formData.append('texto', textContent);

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/mural`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })

        console.log(result);
        setTextoSnack(`Recado enviado com sucesso!`)
        setSeveritySnack(`success`)
        setOpenSnack(true)
        setOpen(false)
        setTextContent(``)
        setFiles([])
    };



    return (
        <>
            <Tooltip title='Novo recado'>
                <Button onClick={handleClickOpen} sx={{ mb: '20px', p: '10px' }} fullWidth variant='outlined'><FaPlus /></Button>
            </Tooltip>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: 'gray' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Novo recado no mural
                        </Typography>
                        <Button autoFocus variant="contained" color="primary" onClick={handleSave}>
                            Salvar
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box p={1}>
                    <Box p={1}>
                        {
                            files.map(file => {
                                return (
                                    <Chip label={file.name} variant="outlined" />
                                )
                            })
                        }
                        {
                            files.length !== 0 && (
                                <Tooltip title='Limpar arquicos'>
                                    <Button
                                        onClick={() => setFiles([])}
                                    >
                                        <CleaningServicesIcon />
                                    </Button>
                                </Tooltip>
                            )
                        }
                    </Box>
                    <ModalAnexarArquivos setFiles={setFiles} />
                    <ReactQuill
                        theme='snow'
                        value={textContent}
                        onChange={setTextContent}
                    />
                </Box>
                <div dangerouslySetInnerHTML={{ __html: textContent }}>
                </div>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity={severitySnack} sx={{ width: '100%' }}>
                    {textoSnack}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalAdicionarMural;
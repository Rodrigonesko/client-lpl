import React from "react";
import { Alert, AppBar, Box, Button, Dialog, Divider, FormControlLabel, IconButton, Radio, RadioGroup, Snackbar, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import 'react-quill/dist/quill.snow.css'
import CloseIcon from '@mui/icons-material/Close';
import Axios from "axios";

const ModalAdicionarPessoas = ({ setFlushHook }) => {

    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [textoSnack, setTextoSnack] = useState(false);
    const [severitySnack, setSeveritySnack] = useState(`success`);
    const [textContent, setTextContent] = useState('')
    const [titulo, setTitulo] = useState('')
    const [files, setFiles] = useState([])
    const [solicitacaoChecked, setSolicitacaoChecked] = useState('Nova Conversa')
    const [dados, setDados] = useState({
        nomeColaborador: '',
        tipoSolicitacao: 'Nova Conversa',
    })

    const handleCheckedSolicitacao = (e) => {
        setSolicitacaoChecked(e.target.value)
        const objAux = dados
        objAux.tipoSolicitacao = e.target.value
        objAux.data = ''
        objAux.data2 = ''
        setDados(objAux)

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {

        const formData = new FormData();
        formData.append('titulo', titulo)
        formData.append('texto', textContent);

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        await Axios.post(`${process.env.REACT_APP_API_KEY}/mural`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
        setTextoSnack(`Recado enviado com sucesso!`)
        setSeveritySnack(`success`)
        setOpenSnack(true)
        setOpen(false)
        setTextContent(``)
        setFiles([])
        setFlushHook(true)
    };

    const handleChangeDados = (elemento) => {
        const name = elemento.target.name

        console.log(name, elemento.target.value);

        const objAux = dados

        if (name === 'data') {
            objAux.data = elemento.target.value
        } else {
            objAux.data2 = elemento.target.value
        }

        setDados(objAux)
    }

    return (
        <>
            <Tooltip title='Novo recado'>
                <Button onClick={handleClickOpen} sx={{ mb: '20px', p: '10px' }} fullWidth variant='outlined'><FaUserPlus /></Button>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
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
                            Nova Conversa / Grupo!
                        </Typography>
                        <Button autoFocus variant="contained" color="primary" onClick={handleSave} sx={{ marginLeft: `15px` }} >
                            Salvar
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box p={1}>
                    <Box mb={2}>
                        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="Nova Conversa" name="radio-buttons-group">
                            <FormControlLabel value="Nova Conversa" control={<Radio onClick={handleCheckedSolicitacao} />} label="Nova Conversa" />
                            <FormControlLabel value="Novo Grupo" control={<Radio onClick={handleCheckedSolicitacao} />} label="Novo Grupo" />
                        </RadioGroup>

                        {
                            solicitacaoChecked === 'Nova Conversa' ? (
                                <TextField type='text' margin='normal' name="nomeColaborador" onChange={handleChangeDados} size='small' label='Digite o nome do Colaborador' sx={{ width: `100%` }} />
                            ) : (
                                <>
                                    <TextField type='text' margin='normal' name="nomeColaboradores" placeholder multiline onChange={handleChangeDados} size='small' label='Digite o nome dos Colaboradores' sx={{ width: `100%` }} />
                                </>
                            )
                        }

                    </Box>
                </Box>
                <Divider sx={{ m: 1 }} />
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity={severitySnack} sx={{ width: '100%' }}>
                    {textoSnack}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalAdicionarPessoas
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Snackbar, TextField } from "@mui/material"
import { useState, useEffect } from "react";
import axios from "axios";

const ModalGerar = ({ setFlushHook, flushHook, setNomeCompleto, setNumero }) => {

    const [open, setOpen] = useState(false)
    const [dados, setDados] = useState({
        nomeCompleto: '',
        numero: '',
        email: '',
        observacao: '',
        status: '',
        data: '',
        tipoExame: ''
    })
    const [openSnack, setOpenSnack] = useState(false)
    const [textoSnack, setTextoSnack] = useState('Insira o nome do Colaborador!')
    const [severitySnack, setSeveritySnack] = useState('')

    const validateData = () => {
        if (dados.nomeCompleto.length === 0 || dados.numero.length === 0) {
            setOpenSnack(true);
            setSeveritySnack('warning');
            setTextoSnack('Insira o nome e número do Colaborador!');
            return false;
        }
        return true;
    };

    const handleCloseSnack = () => {
        setOpenSnack(false);

    };
    const handleClose = () => {
        setOpen(false);

    };

    const handleChangeDados = ({ target }) => {
        const { name, value } = target;
        setDados(prevState => ({ ...prevState, [name]: value }));

        if (name === 'nomeCompleto') {
            setNomeCompleto(value);
        } else if (name === 'numero') {
            setNumero(value);
        }
    }

    const handleSave = async () => {
        try {
            if (!validateData()) {
                return
            }

            const resultado = await axios.post(process.env.REACT_APP_API_KEY + '/admissaoDemissao/create', {
                nome: dados.nomeCompleto,
                numero: dados.numero
            })
            console.log(resultado)
            setOpenSnack(true)
            setSeveritySnack('success')
            setTextoSnack('Dados inserido com sucesso!')
            console.log(dados)
            setFlushHook(true)
            setOpen(false)
            setDados({
                nomeCompleto: '',
                numero: ''
            })
            return
        } catch (error) {
            console.log(error.response.data.msg);
            setTextoSnack('Erro ao solicitar férias.' + error.response.data.msg)
            setSeveritySnack('error')
            setOpenSnack(true)
        }
    }

    const handleClickOpen = async () => {
        setOpen(true);
    };

    useEffect(() => {
        setFlushHook(false)
    }, [flushHook])

    return (
        <>
            <Button onClick={handleClickOpen} variant='contained' sx={{ marginRight: '10px' }}>Iniciar dados do exame</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Insira os dados abaixo"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormGroup>
                            <TextField margin='dense' type='text' name='nomeCompleto' size='small' label='Nome' onChange={handleChangeDados} sx={{ width: '350px' }} />
                            <TextField margin='dense' type='text' name='numero' size='small' label='Número' onChange={handleChangeDados} sx={{ width: '350px' }} />
                        </FormGroup>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={handleSave} autoFocus>Salvar</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert variant="filled" onClose={handleCloseSnack} severity={severitySnack} sx={{ width: '100%' }}>
                    {textoSnack}
                </Alert>
            </Snackbar>

        </>
    )

}

export default ModalGerar
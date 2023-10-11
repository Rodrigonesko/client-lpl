import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Snackbar, TextField } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { useState } from "react";

const Inventario = () => {

    const [open, setOpen] = useState(false)
    const [dados, setDados] = useState({
        nomeItem: '',
        nomeQuantidade: ''
    })

    const [flushHook, setFlushHook] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [textoSnack, setTextoSnack] = useState('Insira o nome do Item!')
    const [severitySnack, setSeveritySnack] = useState('')

    const handleCloseSnack = () => {
        setOpenSnack(false);

    };

    const handleClose = () => {
        setOpen(false)
        const objAux = dados
        objAux.nomeItem = ''
        objAux.nomeQuantidade = ''
        setDados(objAux)
    }

    const handleChangeDados = (elemento) => {
        const name = elemento.target.name
        console.log(name, elemento.target.value);

        const objAux = dados

        setDados(objAux)
    }

    const handleSave = async () => {
        try {
            if (dados.nomeItem.length <= 0) {
                setOpenSnack(true)
                setSeveritySnack('warning')
                setTextoSnack('Insira o nome do Item!')
                return
            }

            if (dados.nomeQuantidade.length <= 0) {
                setOpenSnack(true)
                setSeveritySnack('warning')
                setTextoSnack('Insira a quantidade do Item!')
                return
            }

            const resultado = await axios.post(process.env.REACT_APP_API_KEY + '/vacation/request', {
                item: dados.nomeItem,
                quantidade: dados.nomeQuantidade,
            })
            console.log(resultado)
            setOpenSnack(true)
            setSeveritySnack('success')
            setTextoSnack('Dados inserido com sucesso!')
            console.log(dados)
            setFlushHook(true)
            setOpen(false)
            setDados({
                nomeItem: '',
            })
            return
        } catch (error) {
            console.log(error.response.data.msg);
            setTextoSnack('Erro ao inserir item.' + error.response.data.msg)
            setSeveritySnack('error')
            setOpenSnack(true)
        }
    }

    const handleClickOpen = async () => {
        setOpen(true);
    };

    return (
        <>
            <Sidebar />
            <Box display={"flex"} paddingTop={"15px"} paddingBottom={"15px"}>
                <Box>
                    <div className="title">
                        <h2>Inventário LPL</h2>
                    </div>
                    <br />
                    <Button onClick={handleClickOpen} variant='contained' sx={{ marginRight: '10px' }}>Inserir novo item</Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{'Insira o item no Inventário'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <FormGroup>
                                    <br />
                                    <TextField type='text' onChange={handleChangeDados} name='nomeItem' size='small' label='Qual o nome do item?' />
                                    <br />
                                    <TextField type='text' onChange={handleChangeDados} name='nomeQuantidade' size='small' label='Qual a quatidade do item?' />
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
                </Box>
            </Box>
        </>
    )
}

export default Inventario;
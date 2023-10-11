import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Radio, RadioGroup, Snackbar, TextField } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { useState } from "react";
import { getUsers } from "../../_services/user.service";

const Inventario = () => {

    const [solicitacaoChecked, setSolicitacaoChecked] = useState('30 dias')
    const [colaboradores, setColaboradores] = useState([])
    const [open, setOpen] = useState(false)
    const [dados, setDados] = useState({
        nomeColaborador: '',
        tipoSolicitacao: '30 dias',
        data: '',
        data2: '',
        statusRh: ''
    })

    const [flushHook, setFlushHook] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [textoSnack, setTextoSnack] = useState('Insira o nome do Colaborador!')
    const [severitySnack, setSeveritySnack] = useState('')

    const handleCloseSnack = () => {
        setOpenSnack(false);

    };

    const handleCheckedSolicitacao = (e) => {
        setSolicitacaoChecked(e.target.value)
        const objAux = dados
        objAux.tipoSolicitacao = e.target.value
        objAux.data = ''
        objAux.data2 = ''
        setDados(objAux)

    }

    const handleClose = () => {
        setOpen(false)
        setSolicitacaoChecked('30 dias')
        const objAux = dados
        objAux.tipoSolicitacao = '30 dias'
        objAux.data = ''
        objAux.data2 = ''
        setDados(objAux)
    }

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

    const handleSave = async () => {
        try {
            if (dados.nomeColaborador.length <= 0) {
                setOpenSnack(true)
                setSeveritySnack('warning')
                setTextoSnack('Insira o nome do Colaborador!')
                return
            }

            if ((dados.data.length <= 0) || ((dados.data2.length <= 0) && solicitacaoChecked !== '30 dias' && solicitacaoChecked !== '20/10 dias vendidos')) {
                setOpenSnack(true)
                setSeveritySnack('warning')
                setTextoSnack('Insira uma data!')
                return
            }
            const resultado = await axios.post(process.env.REACT_APP_API_KEY + '/vacation/request', {
                colaborador: dados.nomeColaborador,
                dataInicio: dados.data,
                dataInicio2: dados.data2,
                totalDias: dados.tipoSolicitacao,
                statusRh: dados.statusRh
            })
            console.log(resultado)
            setOpenSnack(true)
            setSeveritySnack('success')
            setTextoSnack('Dados inserido com sucesso!')
            console.log(dados)
            setFlushHook(true)
            setOpen(false)
            setSolicitacaoChecked('30 dias')
            setDados({
                nomeColaborador: '',
                tipoSolicitacao: '30 dias',
                data: '',
                data2: ''
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
        const resultColaboradores = await getUsers()
        setColaboradores(resultColaboradores)
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
                                    <TextField type='text' onChange={handleChangeDados} name='Nome do Item' size='small' label='Qual o nome do item?' />
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
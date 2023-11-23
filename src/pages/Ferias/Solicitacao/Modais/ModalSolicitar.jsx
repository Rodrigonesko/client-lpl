import { Alert, Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Radio, RadioGroup, Snackbar, TextField } from "@mui/material"
import { useState } from "react";
import axios from "axios";
import { getUsers } from "../../../../_services/user.service";

const ModalSolicitar = ({ setFlushHook }) => {

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

            if ((dados.data.length <= 0) || ((dados.data2.length <= 0) && solicitacaoChecked !== '30 dias' && solicitacaoChecked !== '20/10 dias vendidos' )) {
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
            <Button onClick={handleClickOpen} variant='contained' sx={{ marginRight: '10px' }}>Solicitar Férias</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Insira a escala desejada de Férias"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormGroup>
                            <br />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                onChange={(event, valor) => {
                                    console.log(valor);
                                    console.log(valor.nomeCompleto);
                                    const objAux = dados
                                    objAux.nomeColaborador = valor.nomeCompleto || valor.name
                                    setDados(objAux)
                                }}
                                options={colaboradores}
                                getOptionLabel={colaboradores => colaboradores?.nomeCompleto || colaboradores.name}
                                renderInput={(params) => <TextField {...params} label='Insira o nome do Colaborador' />}
                            />
                            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="30 dias" name="radio-buttons-group">
                                <FormControlLabel value="30 dias" control={<Radio onClick={handleCheckedSolicitacao} />} label="30 Dias" />
                                <FormControlLabel value="20/10 dias" control={<Radio onClick={handleCheckedSolicitacao} />} label="20/10 Dias" />
                                <FormControlLabel value="15/15 dias" control={<Radio onClick={handleCheckedSolicitacao} />} label="15/15 Dias" />
                                <FormControlLabel value="20/10 dias vendidos" control={<Radio onClick={handleCheckedSolicitacao} />} label="20 dias/10 dias vendidos" />

                                {
                                    solicitacaoChecked === '30 dias' || solicitacaoChecked === '20/10 dias vendidos' ? (
                                        <TextField type='date' onChange={handleChangeDados} name="data" focused size='small' label='Qual data deseja iniciar suas Férias?' />
                                    ) : (
                                        <>
                                            <TextField type='date' margin='normal' name="data" onChange={handleChangeDados} focused size='small' label={(solicitacaoChecked === '20/10 dias') ? ('Qual data deseja iniciar suas Férias de 20 dias?') : ('Qual data deseja iniciar suas Férias de 15 dias?')} />
                                            <br />
                                            <TextField type='date' margin='normal' name="data2" onChange={handleChangeDados} focused size='small' label={(solicitacaoChecked === '20/10 dias') ? ('Qual data deseja iniciar suas Férias de 10 dias?') : ('Qual data deseja iniciar suas Férias de 15 dias?')} />
                                        </>
                                    )
                                }

                            </RadioGroup>
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

export default ModalSolicitar
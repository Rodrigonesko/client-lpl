import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Radio, RadioGroup, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

export default function SolicitacaoFerias() {

    const [solicitacaoChecked, setSolicitacaoChecked] = useState('30 dias')
    const [open, setOpen] = useState(false)
    const [pesquisa, setPesquisa] = useState('')
    const [dados, setDados] = useState({
        tipoSolicitacao: '30 dias',
        data: '',
        data2: ''
    })
    const [openSnack, setOpenSnack] = useState(false)
    const [alerta, setAlerta] = useState(false)

    const handleCheckedSolicitacao = (e) => {
        setSolicitacaoChecked(e.target.value)
        const objAux = dados
        objAux.nomeColaborador = ''
        objAux.tipoSolicitacao = e.target.value
        objAux.data = ''
        objAux.data2 = ''
        setDados(objAux)

    }

    const handleChange = (elemento) => {
        setPesquisa(elemento.target.value)
        console.log(pesquisa)
    }

    const handleChangeDados = (elemento) => {
        const name = elemento.target.name

        console.log(name, elemento.target.value);

        const objAux = dados

        if (name === 'data') {
            objAux.data = elemento.target.value
            console.log('entrou');
        } else {
            objAux.data2 = elemento.target.value
        }

        setDados(objAux)
    }

    const handleFilter = async (event) => {
        event.preventDefault()

        if (pesquisa.length <= 2) {
            setAlerta(true)
            return
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSnack = () => {
        setOpenSnack(false);

    };

    const handleCloseInput = () => {
        setAlerta(false)
    }

    const handleSave = () => {
        if ((dados.data.length <= 0) || ((dados.data2.length <= 0) && solicitacaoChecked !== '30 dias')) {
            setOpenSnack(true)
            return
        }

        console.log(dados)
    }


    return (
        <>
            <Sidebar />
            <Container>
                <div className="solicitacao-container">

                    <div className="title">
                        <h2>Solicitação de Férias</h2>
                    </div>
                    <Box display={"flex"} paddingTop={"15px"} paddingBottom={"15px"}>
                        <Box>
                            <Button type="submit" onClick={handleClickOpen} variant='contained' sx={{ marginRight: '10px' }}>Solicitar Férias</Button>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                <DialogTitle id="alert-dialog-title">{"Insira a escala desejada de Férias"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        <FormGroup>
                                            <br />
                                            <TextField type='text' onChange={handleCheckedSolicitacao} name="data" size='small' label='Insira o nome do Colaborador' />
                                            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="30 dias" name="radio-buttons-group">
                                                <FormControlLabel value="30 dias" control={<Radio onClick={handleCheckedSolicitacao} />} label="30 Dias" />
                                                <FormControlLabel value="20/10 dias" control={<Radio onClick={handleCheckedSolicitacao} />} label="20/10 Dias" />
                                                <FormControlLabel value="15/15 dias" control={<Radio onClick={handleCheckedSolicitacao} />} label="15/15 Dias" />

                                                {
                                                    solicitacaoChecked === '30 dias' ? (
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
                        </Box>
                        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                            <Alert variant="filled" onClose={handleCloseSnack} severity="warning" sx={{ width: '100%' }}>
                                Insira uma data!
                            </Alert>
                        </Snackbar>


                    </Box>
                    <form action="" >
                        <TextField type='text' onChange={handleChange} size='small' label='Colaborador' sx={{ marginRight: '10px', width: '170px' }} />
                        <TextField type='date' onChange={handleChange} size='small' focused label='Mês' sx={{ marginRight: '10px', width: '170px' }} />
                        <TextField type='date' onChange={handleChange} size='small' focused label='Vencimento' sx={{ marginRight: '10px', width: '170px' }} />
                        <Button type="submit" onClick={handleFilter} variant='contained' >Pesquisar</Button>
                    </form>
                    <br />
                    <Snackbar open={alerta} autoHideDuration={6000} onClose={handleCloseInput}>
                        <Alert variant="filled" onClose={handleCloseInput} severity="warning" sx={{ width: '100%' }}>
                            Digite no minimo 3 caracteres!
                        </Alert>
                    </Snackbar>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow className="table-header">
                                        <TableCell>COLABORADOR</TableCell>
                                        <TableCell>GESTOR</TableCell>
                                        <TableCell>DATA DE FÉRIAS</TableCell>
                                        <TableCell>ESCALA ESCOLHIDA</TableCell>
                                        <TableCell>RETORNO</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>


                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>

            </Container >
        </>
    )

}

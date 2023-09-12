import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Radio, RadioGroup, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

export default function SolicitacaoFerias() {

    const [solicitacaoChecked, setSolicitacaoChecked] = useState('30 dias')
    const [open, setOpen] = useState(false)
    const [pesquisa, setPesquisa] = useState('')
    const [openSnack, setOpenSnack] = useState(false)
    const [alerta, setAlerta] = useState(false)

    const handleCheckedSolicitacao = (e) => {
        setSolicitacaoChecked(e.target.value)   

    }

    const handleChange = (elemento) => {
        setPesquisa(elemento.target.value)
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
        if (pesquisa.length <= 0) {
            setOpenSnack(true)
            return
        }
        
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
                                            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="30 dias" name="radio-buttons-group">
                                                <FormControlLabel value="30 dias" control={<Radio onClick={handleCheckedSolicitacao} />} label="30 Dias" />
                                                <FormControlLabel value="20/10 dias" control={<Radio onClick={handleCheckedSolicitacao} />} label="20/10 Dias" />
                                                <FormControlLabel value="15/15 dias" control={<Radio onClick={handleCheckedSolicitacao} />} label="15/15 Dias" />

                                                {solicitacaoChecked === '30 dias' ? (
                                                    <TextField type='date' onChange={handleChange} focused size='small' label='Qual data deseja iniciar suas Férias?' />
                                                ) : (
                                                    <form action="">
                                                        <TextField type='date' margin='normal' onChange={handleChange} focused size='small' required='required' label='Qual data deseja iniciar suas Férias?' />
                                                        <br />
                                                        <TextField type='date' margin='normal' onChange={handleChange} focused size='small' required='required' label='Qual data deseja iniciar suas Férias?' />
                                                    </form>
                                                )}


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

                        <form action="" >
                            <TextField onChange={handleChange} size='small' label='Nome, Gestor, Data e Escala' sx={{ marginRight: '10px' }}
                            />
                            <Button type="submit" onClick={handleFilter} variant='contained' >Pesquisar</Button>
                        </form>

                    </Box>
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

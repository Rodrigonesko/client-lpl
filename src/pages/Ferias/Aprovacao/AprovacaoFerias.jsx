import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Alert, Box, Button, Container, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { filterRn } from "../../../_services/teleEntrevista.service";

export default function AprovacaoFerias() {

    const [rns, setRns] = useState([])
    const [pesquisa, setPesquisa] = useState('')
    const [alerta, setAlerta] = useState(false)
    const [open, setOpen] = useState(false)

    const handleChange = (elemento) => {
        setPesquisa(elemento.target.value)
    }

    const handleFilter = async (event) => {
        event.preventDefault()

        if (pesquisa.length <= 2) {
            setAlerta(true)
            return
        }
        const resultado = await filterRn(pesquisa)
        setRns(resultado)
    }

    const handleClose = () => {
        setAlerta(false);
    };

    return (
        <>
            <Sidebar />
            <Container>
                <div className="solicitacao-container">

                    <div className="title">
                        <h2>Aprovação de Férias</h2>
                    </div>
                    <Box display={"flex"} paddingTop={"15px"} paddingBottom={"15px"}>
                        <form action="" >
                            <TextField onChange={handleChange} size='small' label='Nome, Data Férias, Escala e Retorno' sx={{ marginRight: '10px' }}
                            />
                            <Button type="submit" onClick={handleFilter} variant='contained' >Pesquisar</Button>
                        </form>
                    </Box>
                    <Snackbar open={alerta} autoHideDuration={6000} onClose={handleClose}>
                        <Alert variant="filled" onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                            Digite no minimo 3 caracteres!
                        </Alert>
                    </Snackbar>
                    <Box>

                    </Box>

                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow className="table-header">
                                        <TableCell>COLABORADOR</TableCell>
                                        <TableCell>DATA DE FÉRIAS</TableCell>
                                        <TableCell>ESCALA ESCOLHIDA</TableCell>
                                        <TableCell>RETORNO</TableCell>
                                        <TableCell>APROVAR</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>


                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
            </Container>
        </>
    )
}
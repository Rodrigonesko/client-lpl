import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, MenuItem, Select, FormControl, TextField, Box, Snackbar, CircularProgress, Typography, Container } from "@mui/material";
import { Alert } from "@mui/material";
import { atribuirAnalistaPre, getPropostasAnalise } from "../../../_services/elegibilidade.service";
import { getAnalistasElegibilidade } from "../../../_services/user.service";

const AnaliseDocumentos = () => {

    const [propostas, setPropostas] = useState([''])
    const [total, setTotal] = useState(0)
    const [analistas, setAnalistas] = useState([])
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const buscarPropostas = async () => {
        try {

            setLoading(true)
            const result = await getPropostasAnalise()

            setPropostas(result.propostas)
            setTotal(result.total)

            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const buscarAnalistas = async () => {
        try {
            //const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users/elegibilidade`, { withCredentials: true })

            const result = await getAnalistasElegibilidade()

            setAnalistas(result.analistas)

        } catch (error) {
            console.log(error);
        }
    }

    const atribuirAnalista = async (analista, id) => {
        try {

            if (analista === '') {
                return
            }

            await atribuirAnalistaPre({
                analista,
                id
            })

            setOpen(true);
            buscarPropostas()

        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        buscarPropostas()
        buscarAnalistas()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <Container>

                <Typography variant="h5">
                    Atribuição de analistas
                </Typography>

                <Box m={2} display='flex' alignItems='center'>
                    <TextField type="text" id="proposta-analise-doc" label="Proposta" variant="standard" size="small" />
                    <Typography variant="h6" marginLeft={2}>
                        Total: <strong>{total}</strong>
                    </Typography>
                </Box>

                {
                    loading ? (
                        <CircularProgress className="loading" />
                    ) : null
                }

                <Paper>
                    <TableContainer style={{ borderRadius: '6px' }}>
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                <TableRow >
                                    <TableCell style={{ backgroundColor: 'lightgray' }}>Proposta</TableCell>
                                    <TableCell style={{ backgroundColor: 'lightgray' }}>Data Importação</TableCell>
                                    <TableCell style={{ backgroundColor: 'lightgray' }}>Início Vigência</TableCell>
                                    <TableCell style={{ backgroundColor: 'lightgray' }}>Nome Titular</TableCell>
                                    <TableCell style={{ backgroundColor: 'lightgray' }}>Analista</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    propostas.map(e => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={e._id}>
                                                <TableCell >{e.proposta}</TableCell >
                                                <TableCell >{moment(e.dataImportacao).format('DD/MM/YYYY')}</TableCell >
                                                <TableCell >{moment(e.vigencia).format('DD/MM/YYYY')}</TableCell >
                                                <TableCell >{e.nome}</TableCell >
                                                <TableCell >
                                                    <FormControl>
                                                        <InputLabel id="demo-simple-select-label">Analista</InputLabel>
                                                        <Select style={{ minWidth: '100px' }} variant="standard" labelId="demo-simple-select-label" name="analistas" id="analistas" onChange={(item) => {
                                                            atribuirAnalista(item.target.value, e._id)
                                                        }}>
                                                            <MenuItem value="">
                                                                <em>Analista</em>
                                                            </MenuItem>
                                                            {
                                                                analistas.map(analista => {
                                                                    return (
                                                                        <MenuItem value={analista.name}>{analista.name}</MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </TableCell >
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} variant="filled" severity="success">
                        Analista atribuido com sucesso!
                    </Alert>
                </Snackbar>
            </Container>
        </>
    )
}

export default AnaliseDocumentos
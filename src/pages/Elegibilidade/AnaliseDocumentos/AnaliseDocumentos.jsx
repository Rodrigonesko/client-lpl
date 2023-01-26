import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, MenuItem, Select, FormControl, TextField, Box, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import './AnaliseDocumentos.css'

const AnaliseDocumentos = () => {

    const [propostas, setPropostas] = useState([''])
    const [total, setTotal] = useState(0)
    const [analistas, setAnalistas] = useState([])
    const [open, setOpen] = useState(false);

    const buscarPropostas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/propostas/analiseDoc`, { withCredentials: true })

            setPropostas(result.data.propostas)
            setTotal(result.data.total)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarAnalistas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users/elegibilidade`, { withCredentials: true })

            setAnalistas(result.data.analistas)

        } catch (error) {
            console.log(error);
        }
    }

    const atribuirAnalista = async (analista, id) => {
        try {

            if (analista === '') {
                return
            }

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/atribuir/preProcessamento`, {
                analista,
                id
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                setOpen(true);
            }

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
            <section className="section-padrao-elegi">
                <div className="div-padrao-elegi">
                    <div className="title">
                        <h3>Análise de Documentos (Atrbuição Pré Processamento)</h3>
                    </div>
                    <Box className="filtros-padrao-elegi">
                        <TextField type="text" id="proposta-analise-doc" label="Proposta" variant="standard" />
                        <span>Total: <strong>{total}</strong> </span>
                    </Box>
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
                </div>
            </section>
        </>
    )
}

export default AnaliseDocumentos
import React, { useEffect, useState, useContext, useRef } from "react";
import moment from "moment/moment";
import Axios from 'axios'
import AuthContext from "../../../context/AuthContext";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, MenuItem, Select, FormControl, TextField, Box, Snackbar, CircularProgress, Typography, Container, Button, Alert } from "@mui/material";
import TextColor from "../../../components/TextColor/TextColor";

const arrStatus = [
    'A iniciar',
    'Em andamento',
    'Devolvida',
    'Enviada para Under',
    'Erro Sistema',
    'Fase cancelamento',
    'Cancelada',
    'Implantada'
]

const TodosElegibilidade = () => {

    const { name } = useContext(AuthContext)

    const [propostas, setPropostas] = useState([])
    const [total, setTotal] = useState(0)
    const [analistas, setAnalistas] = useState([])
    const [entidades, setEntidades] = useState([])
    const [loading, setLoading] = useState(false)
    const [propostaPesquisada, setPropostaPesquisada] = useState('')
    const [pesquisando, setPesquisando] = useState(false)
    const [open, setOpen] = useState(false)
    const [blacklist, setBlacklist] = useState([])

    const analista = useRef(null)
    const vigencia = useRef(null)
    const status = useRef(null)

    const buscarBlacklist = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/blacklist`, { withCredentials: true })

            setBlacklist(result.data)

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

    const filtrar = async (e) => {
        try {

            e.preventDefault()

            let valorAnalista = analista.current.firstChild.textContent
            let valorVigencia = vigencia.current.children[1].firstChild.value
            let valorStatus = status.current.firstChild.textContent

            console.log(valorVigencia);

            setPesquisando(true)

            if (valorAnalista === 'Todos' || valorAnalista === '​') {
                valorAnalista = ''
            }

            if (valorVigencia === 'Todos' || valorVigencia === '​') {
                valorVigencia = ''
            }

            if (valorStatus === 'Todos' || valorStatus === '​') {
                valorStatus = ''
            }

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/proposta/filtroTodas?analista=${valorAnalista}&vigencia=${valorVigencia}&status=${valorStatus}`, { withCredentials: true })



            setPropostas(result.data)
            setTotal(result.data.length)
            setPesquisando(false)

        } catch (error) {
            console.log(error);
            setPesquisando(false)
        }
    }

    const atribuir = async (analista, id) => {
        try {

            await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/atribuir/analise`, {
                analista,
                id
            }, {
                withCredentials: true
            })

            setOpen(true);

        } catch (error) {
            console.log(error);
        }
    }

    const filtrarProposta = async (e) => {
        try {

            e.preventDefault()

            setPesquisando(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/propostas/todas/proposta/${propostaPesquisada}`, { withCredentials: true })

            console.log(result);

            setPropostas(result.data)
            setTotal(result.data.total)
            setPesquisando(false)

        } catch (error) {
            console.log(error);
            setPesquisando(false)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        buscarAnalistas()
        buscarBlacklist()
    }, [name])

    return (
        <>
            <Sidebar></Sidebar>
            <Container>
                <Typography variant="h5" m={2}>
                    Análise De Propostas
                </Typography>
                {
                    loading ? (
                        <CircularProgress className="loading" />
                    ) : null
                }
                <Box m={2} display='flex' alignItems='center'>
                    <form action="">
                        <Box component={Paper} p={1.5} elevation={3} mr={1}>
                            <TextField variant='outlined' label='Proposta' size='small' onKeyUp={e => {
                                setPropostaPesquisada(e.target.value)
                            }} />
                            <Button type="submit" onClick={filtrarProposta} style={{ marginLeft: '5px' }} variant="contained" disabled={pesquisando}>Pesquisar {pesquisando ? <CircularProgress style={{ width: '20px', height: '20px', marginLeft: '10px' }} /> : null}</Button>
                        </Box >

                    </form>
                    <form action="">
                        <Box component={Paper} p={1.5} elevation={3}>
                            <FormControl size="small" style={{ width: '150px', margin: '0 5px' }}>
                                <InputLabel>Analista</InputLabel>
                                <Select
                                    label='Analista'
                                    ref={analista}
                                    defaultValue=''
                                >
                                    <MenuItem>
                                        <em>Analista</em>
                                    </MenuItem>
                                    <MenuItem value='Todos'>
                                        Todos
                                    </MenuItem>
                                    {
                                        analistas.map(analista => {
                                            return (
                                                <MenuItem value={analista.name} >{analista.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <TextField
                                label='Vigência'
                                size="small"
                                type="date"
                                focused
                                ref={vigencia}
                            />
                            <FormControl size="small" style={{ width: '150px', margin: '0 5px' }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    label='Status'
                                    ref={status}
                                    defaultValue=''
                                >
                                    <MenuItem>
                                        <em>Status</em>
                                    </MenuItem>
                                    <MenuItem value='Todos'>
                                        Todos
                                    </MenuItem>
                                    {
                                        arrStatus.map(e => {
                                            return (
                                                <MenuItem value={e}>
                                                    {e}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <Button onClick={filtrar} display={pesquisando} variant="contained">Filtrar {pesquisando ? <CircularProgress style={{ width: '20px', height: '20px', marginLeft: '10px' }} /> : null}</Button>
                        </Box>
                    </form>
                </Box>
                <Box m={2}>
                    <Typography>
                        Total: <strong>{total}</strong>
                    </Typography>
                </Box>
                <Paper>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead className="table-header">
                                <TableRow>
                                    <TableCell>Proposta</TableCell>
                                    <TableCell>Data Importação</TableCell>
                                    <TableCell>Inicio Vigencia</TableCell>
                                    <TableCell>Nome Titular</TableCell>
                                    <TableCell>Entidade</TableCell>
                                    <TableCell>Analista</TableCell>
                                    <TableCell>Status Proposta</TableCell>
                                    <TableCell>Detalhes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    propostas.map(e => {

                                        const corretorBlacklist = blacklist.some(obj => obj.nomeCorretor === e.nomeCorretor)

                                        return (

                                            <TableRow style={{ backgroundColor: blacklist.some(obj => obj.nomeCorretor === e.nomeCorretor) ? '#b71c1c' : 'white' }}>
                                                <TableCell><TextColor text={e.proposta} Primary='White' Secundary='' condition={corretorBlacklist} /></TableCell>
                                                <TableCell><TextColor text={moment(e.dataImportacao).format('DD/MM/YYYY')} Primary='White' Secundary='' condition={corretorBlacklist} /></TableCell>
                                                <TableCell><TextColor text={moment(e.vigencia).format('DD/MM/YYYY')} Primary='White' Secundary='' condition={corretorBlacklist} /></TableCell>
                                                <TableCell><TextColor text={e.nome} Primary='White' Secundary='' condition={corretorBlacklist} /></TableCell>
                                                <TableCell><TextColor text={e.entidade} Primary='White' Secundary='' condition={corretorBlacklist} /></TableCell>
                                                <TableCell>
                                                    <select name="" id="" onChange={item => {
                                                        atribuir(item.target.value, e._id)
                                                    }} >
                                                        <option value="A definir">A definir</option>
                                                        {
                                                            analistas.map(analista => {
                                                                return (
                                                                    <option value={analista.name} selected={e.analista === analista.name} >{analista.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select></TableCell>
                                                <TableCell><TextColor text={e.status} Primary='White' Secundary='Black' condition={corretorBlacklist} /></TableCell>
                                                <TableCell><Button href={`/elegibilidade/analise/detalhes/${e._id}`}>Detalhes</Button></TableCell>
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

export default TodosElegibilidade
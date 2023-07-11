import { useEffect, useState, useContext } from "react"
import Sidebar from "../../../../components/Sidebar/Sidebar"
import { Box, Container, Typography, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, FormControl, InputLabel, Select, MenuItem, TextField, Tooltip, Snackbar, Alert } from "@mui/material"
import { getPropostaElegibilidadePmePorStatusEProposta, getPropostasElegibilidadePmePorStatus, getPropostasElegibilidadePmePorStatusEAnalista } from "../../../../_services/elegibilidadePme.service"
import { getAnalistasElegibilidade } from "../../../../_services/user.service"
import { BiSearchAlt, BiFilterAlt } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { MdPersonSearch } from 'react-icons/md'
import { GiBroom } from 'react-icons/gi'
import AuthContext from "../../../../context/AuthContext"
import moment from "moment"

const AndamentoElegibilidadePme = () => {

    const [flushHook, setFlushHook] = useState(false)
    const [propostas, setPropostas] = useState([])
    const [analistas, setAnalistas] = useState([])
    const [proposta, setProposta] = useState('')
    const [analistaFiltrado, setAnalistaFiltrado] = useState('')
    const { name } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        const result = await getPropostasElegibilidadePmePorStatus('A iniciar')
        const resultAnalistas = await getAnalistasElegibilidade()
        setAnalistas(resultAnalistas.analistas)
        setPropostas(result)
        setLoading(false)
    }

    const handleChangeProposta = (e) => {
        setProposta(e.target.value)
    }

    const handleFiltroAnalista = async () => {
        setLoading(true)
        const result = await getPropostasElegibilidadePmePorStatusEAnalista('A iniciar', analistaFiltrado)
        setPropostas(result)
        setLoading(false)
    }

    const handleChangeFiltroAnalista = (e) => {
        setAnalistaFiltrado(e.target.value)
    }

    const handleLimparFiltro = () => {
        setAnalistaFiltrado('')
        setFlushHook(true)
    }

    const handleMinhasPropostas = async () => {
        setLoading(true)

        const result = await getPropostasElegibilidadePmePorStatusEAnalista('A iniciar', name)
        setPropostas(result)
        setLoading(false)
    }

    const handleBuscarProposta = async (e) => {
        setLoading(true)
        e.preventDefault()
        const result = await getPropostaElegibilidadePmePorStatusEProposta('A iniciar', proposta)
        setPropostas(result)
        setLoading(false)
    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()

    }, [flushHook])

    return (
        <>
            <Sidebar />
            <Box width='100%' height='100vh' overflow='auto'>
                <Container>
                    <Typography m={2} variant="h6">
                        Propostas PME em andamento
                    </Typography>
                    <Divider />
                    <Box p={2} display='flex' justifyContent='space-between'>
                        <form>
                            <Box display='flex'>
                                <TextField size='small' label='Proposta' value={proposta} onChange={handleChangeProposta} />
                                <Tooltip title='Buscar'>
                                    <Button disabled={loading} type='submit' onClick={handleBuscarProposta} style={{ marginLeft: '10px' }} variant="contained" ><BiSearchAlt size='22px' /></Button>
                                </Tooltip>
                            </Box>
                        </form>
                        <Box display='flex'>
                            <Button disabled={loading} onClick={handleMinhasPropostas} style={{ marginRight: '10px' }} size="small" startIcon={<MdPersonSearch />} variant="contained" color='info' >Minhas Propostas</Button>
                            <FormControl style={{ minWidth: '120px', marginRight: '10px' }} size="small" >
                                <InputLabel>Analista</InputLabel>
                                <Select
                                    label='Analista'
                                    value={analistaFiltrado}
                                    onChange={handleChangeFiltroAnalista}
                                >
                                    <MenuItem>
                                        <em>Analista</em>
                                    </MenuItem>
                                    <MenuItem value='A definir'>
                                        A definir
                                    </MenuItem>
                                    {
                                        analistas.map(analista => {
                                            return (
                                                <MenuItem value={analista.name}>
                                                    {analista.name}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <Tooltip title='Filtrar'>
                                <Button disabled={loading} onClick={handleFiltroAnalista} variant="contained" style={{ marginRight: '10px' }} ><BiFilterAlt /></Button>
                            </Tooltip>
                            <Tooltip title='Limpar filtros'>
                                <Button disabled={loading} onClick={handleLimparFiltro} variant="contained" color="warning"><GiBroom /></Button>
                            </Tooltip>
                        </Box>
                    </Box>
                    <TableContainer>
                        <Table className="table">
                            <TableHead className="table-header">
                                <TableRow>
                                    <TableCell>Proposta</TableCell>
                                    <TableCell>Data Recebida</TableCell>
                                    <TableCell>Motor</TableCell>
                                    <TableCell>Analista</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    propostas.map(proposta => {
                                        return (
                                            <TableRow>
                                                <TableCell>{proposta.proposta}</TableCell>
                                                <TableCell>{moment(proposta.dataRecebimento).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell>{proposta.motor}</TableCell>
                                                <TableCell>
                                                    <FormControl size="small" fullWidth>
                                                        <InputLabel>Analista</InputLabel>
                                                        <Select
                                                            label='Analista'
                                                            value={proposta.analista}
                                                        >
                                                            <MenuItem>
                                                                <em>Analista</em>
                                                            </MenuItem>
                                                            <MenuItem value='A definir'>
                                                                A definir
                                                            </MenuItem>
                                                            {
                                                                analistas.map(analista => {
                                                                    return (
                                                                        <MenuItem value={analista.name} >
                                                                            {analista.name}
                                                                        </MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title='Detalhes'>
                                                        <Button variant="outlined" color="success" ><BsThreeDots /></Button>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container >
            </Box >
        </>
    )
}

export default AndamentoElegibilidadePme
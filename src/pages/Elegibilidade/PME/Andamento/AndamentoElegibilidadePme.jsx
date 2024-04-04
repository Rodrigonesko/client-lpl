import { useEffect, useState, useContext } from "react"
import Sidebar from "../../../../components/Sidebar/Sidebar"
import { Box, LinearProgress, Container, Typography, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, FormControl, InputLabel, Select, MenuItem, TextField, Tooltip, Snackbar, Alert, Badge, Chip, Pagination } from "@mui/material"
import { atribuirAnalistaPme, getPropostaElegibilidadePmePorStatusEProposta, getPropostasElegibilidadePmePorStatus, getPropostasElegibilidadePmePorStatusEAnalista } from "../../../../_services/elegibilidadePme.service"
import { getAnalistasElegibilidade } from "../../../../_services/user.service"
import { BiSearchAlt, BiFilterAlt } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { MdPersonSearch } from 'react-icons/md'
import { GiBroom } from 'react-icons/gi'
import AuthContext from "../../../../context/AuthContext"
import moment from "moment"

const AndamentoElegibilidadePme = () => {

    const { name } = useContext(AuthContext)

    const [flushHook, setFlushHook] = useState(false)
    const [propostas, setPropostas] = useState([])
    const [vidas, setVidas] = useState([])
    const [analistas, setAnalistas] = useState([])
    const [proposta, setProposta] = useState('')
    const [analistaFiltrado, setAnalistaFiltrado] = useState('Todos')
    const [vidasFiltrado, setVidasFiltrado] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [error, setError] = useState(false)

    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(0)

    const handleClose = () => {
        setOpen(false)
    }

    const fetchData = async () => {
        setLoading(true)
        const result = await getPropostasElegibilidadePmePorStatus('A iniciar', page, rowsPerPage)
        console.log(result);
        const resultAnalistas = await getAnalistasElegibilidade()
        setAnalistas(resultAnalistas.analistas)
        setPropostas(result.result)
        const valoresUnicos = result.result.reduce((unique, proposta) => {
            if (!unique.includes(proposta.vidas)) {
                unique.push(proposta.vidas);
            }
            return unique;
        }, []).sort();
        setVidas(valoresUnicos)
        setTotalPages(result.total)
        setLoading(false)
    }

    const handleChangeProposta = (e) => {
        setProposta(e.target.value)
    }

    const handleFiltroAnalista = async () => {
        try {
            setLoading(true)
            const result = await getPropostasElegibilidadePmePorStatusEAnalista('A iniciar', analistaFiltrado, vidasFiltrado, page, rowsPerPage)
            setPropostas(result.result)
            // console.log(result)
            setTotalPages(result.total)
            setLoading(false)
            if (result.length === 0) {
                setError(true)
                setMsg(`Nenhuma proposta encontrada`)
                setOpen(true)
            } else {
                setError(false)
                setMsg(`${result.result.length} no nome do analista ${analistaFiltrado}`)
                setOpen(true)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
            setError(false)
            setMsg(`Erro`)
            setOpen(true)
        }
    }

    const handleChangeFiltroAnalista = (e) => {
        setAnalistaFiltrado(e.target.value)
    }

    const handleChangeFiltroVidas = (e) => {
        setVidasFiltrado(e.target.value)
    }

    const handleLimparFiltro = () => {
        setAnalistaFiltrado('Todos')
        setVidasFiltrado('')
        setFlushHook(true)
        setError(false)
        setMsg('Propostas limpas com sucesso!')
        setOpen(true)
    }

    const handleMinhasPropostas = async () => {
        setLoading(true)

        const result = await getPropostasElegibilidadePmePorStatusEAnalista('A iniciar', name)
        setPropostas(result)
        setLoading(false)
        if (result.length === 0) {
            setError(true)
            setMsg(`Nenhuma proposta encontrada`)
            setOpen(true)
        } else {
            setError(false)
            setMsg(`${result.length} em seu nome`)
            setOpen(true)
        }

    }

    const handleBuscarProposta = async (e) => {
        try {

            setLoading(true)
            e.preventDefault()
            const result = await getPropostaElegibilidadePmePorStatusEProposta('A iniciar', proposta)
            setPropostas(result)
            setLoading(false)
            if (result.length === 0) {
                setError(true)
                setMsg(`Nenhuma proposta encontrada`)
                setOpen(true)
            } else {
                setError(false)
                setMsg(`Foram encontradas propostas`)
                setOpen(true)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
            setError(true)
            setMsg(`Erro`)
            setOpen(true)
        }
    }

    const handleAtribuirAnalista = async (analista, id, index) => {
        setError(false)

        const result = await atribuirAnalistaPme({
            analista,
            id
        })
        const arrAux = [...propostas];
        arrAux[index].analista = analista
        setPropostas(arrAux)
        setMsg('Analista atribuido com sucesso!')
        setOpen(true)

    }

    useEffect(() => {
        setFlushHook(false)
        if (analistaFiltrado === 'Todos' && vidasFiltrado === '') {
            fetchData()
        } else {
            handleFiltroAnalista()
        }
    }, [flushHook, page, rowsPerPage])

    return (
        <>
            <Sidebar>
                <Box width='100%' height='100vh' overflow='auto'>
                    <Container>
                        <Typography m={2} variant="h6">
                            Propostas PME em andamento - {totalPages}
                        </Typography>
                        <Divider />
                        <Box p={2} display='flex' justifyContent='space-between'>
                            <form>
                                <Box display='flex'>
                                    <TextField size='small' label='Proposta' value={proposta} onChange={handleChangeProposta} InputProps={{
                                        style: {
                                            borderRadius: '10px',
                                        }
                                    }}
                                    />
                                    <Tooltip title='Buscar'>
                                        <Button disabled={loading} type='submit' onClick={handleBuscarProposta} style={{ marginLeft: '10px', borderRadius: '10px' }} variant="contained" ><BiSearchAlt size='22px' /></Button>
                                    </Tooltip>
                                </Box>
                            </form>
                            <Box display='flex'>
                                <Button disabled={loading} onClick={handleMinhasPropostas} style={{ marginRight: '10px', alignItems: 'center', borderRadius: '10px' }} size="small" startIcon={<MdPersonSearch />} variant="contained" color='info' >Minhas Propostas</Button>
                                <FormControl style={{ minWidth: '120px', marginRight: '10px' }} size="small" >
                                    <InputLabel>Analista</InputLabel>
                                    <Select
                                        label='Analista'
                                        value={analistaFiltrado}
                                        onChange={handleChangeFiltroAnalista}
                                        sx={{ borderRadius: '10px' }}
                                    >
                                        <MenuItem>
                                            <em>Analista</em>
                                        </MenuItem>
                                        <MenuItem value='Todos'>
                                            Todos
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
                                <FormControl style={{ minWidth: '120px', marginRight: '10px' }} size='small'>
                                    <InputLabel>Vidas</InputLabel>
                                    <Select
                                        label='Vidas'
                                        value={vidasFiltrado}
                                        onChange={handleChangeFiltroVidas}
                                        sx={{ borderRadius: '10px' }}
                                    >
                                        <MenuItem>
                                            <em>Vidas</em>
                                        </MenuItem>
                                        {
                                            vidas.map(vidas => {
                                                return (
                                                    <MenuItem value={vidas}>
                                                        {vidas}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>

                                </FormControl>
                                <Tooltip title='Filtrar'>
                                    <Button disabled={loading} onClick={handleFiltroAnalista} variant="contained" style={{ marginRight: '10px', borderRadius: '10px' }} ><BiFilterAlt /></Button>
                                </Tooltip>
                                <Tooltip title='Limpar filtros'>
                                    <Button disabled={loading} onClick={handleLimparFiltro} variant="contained" color="warning" sx={{ borderRadius: '10px' }}><GiBroom /></Button>
                                </Tooltip>
                            </Box>
                        </Box>
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mt: 2,
                                mb: 2
                            }}
                        >
                            <FormControl size="small" sx={{ ml: 2 }} disabled={loading}>
                                <InputLabel>Linhas</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Linhas"
                                    sx={{ width: '100px', borderRadius: '10px' }}
                                    value={rowsPerPage}
                                    onChange={(e) => setRowsPerPage(e.target.value)}
                                >
                                    <MenuItem value={10} >10</MenuItem>
                                    <MenuItem value={20} >20</MenuItem>
                                    <MenuItem value={30} >30</MenuItem>
                                    <MenuItem value={40} >40</MenuItem>
                                    <MenuItem value={50} >50</MenuItem>
                                </Select>
                            </FormControl>
                            <Pagination count={
                                totalPages % rowsPerPage === 0 ?
                                    Math.floor(totalPages / rowsPerPage) :
                                    Math.floor(totalPages / rowsPerPage) + 1
                            } page={page} onChange={(e, value) => setPage(value)} disabled={loading} />
                        </Box>
                        <TableContainer>
                            <Table className="table">
                                <TableHead className="table-header">
                                    <TableRow>
                                        <TableCell>Proposta</TableCell>
                                        <TableCell align="center">Prioridade</TableCell>
                                        <TableCell>Data Recebida</TableCell>
                                        <TableCell>Vidas</TableCell>
                                        <TableCell>Motor</TableCell>
                                        <TableCell>Analista</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {
                                        !loading ? propostas.map((proposta, index) => {
                                            return (
                                                <TableRow key={proposta._id}>
                                                    <TableCell>{proposta.proposta}</TableCell>
                                                    <TableCell align="center">{proposta.prioridade && <Chip label='Prioridade' color="error" />}</TableCell>
                                                    <TableCell>{moment(proposta.dataRecebimento).format('DD/MM/YYYY')}</TableCell>
                                                    <TableCell>{proposta.vidas}</TableCell>
                                                    <TableCell>{proposta.motor}</TableCell>
                                                    <TableCell>
                                                        <FormControl size="small" fullWidth>
                                                            <InputLabel>Analista</InputLabel>
                                                            <Select
                                                                label='Analista'
                                                                value={proposta.analista}
                                                                onChange={(e) => {
                                                                    handleAtribuirAnalista(e.target.value, proposta._id, index)
                                                                }}
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
                                                            <Button target='_blank' href={`/elegibilidadePme/detalhes/${proposta._id}`} variant="outlined" color="success" ><BsThreeDots /></Button>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }) : (
                                            <LinearProgress style={{ width: '100vw' }} />
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container >
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert variant="filled" onClose={handleClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
                            {msg}
                        </Alert>
                    </Snackbar>
                </Box >
            </Sidebar>
        </>
    )
}

export default AndamentoElegibilidadePme
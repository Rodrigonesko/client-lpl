import { Box, Button, Chip, Container, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import ExpandIcon from '@mui/icons-material/Expand';
import { useEffect, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { getAnalistasSindicancia, getAreaEmpresa, getDemandas, getStatus, getTipoServico } from "../../_services/sindicancia.service";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { Search } from "@mui/icons-material";

const Demandas = () => {

    const [fullWidth, setFullWidth] = useState(true)
    const [loading, setLoading] = useState(false)
    const [areaEmpresa, setAreaEmpresa] = useState([])
    const [status, setStatus] = useState([])
    const [dados, setDados] = useState([])
    const [tipoServico, setTipoServico] = useState([])
    const [analista, setAnalista] = useState([])
    const [filtros, setFiltros] = useState([{
        areaEmpresa: null,
        tipoServico: null,
        status: null,
        analista: null,
        data: '',
        pesquisa: ''
    }])
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(0)

    const setarAreaDaEmpresa = async () => {
        try {
            const result = await getAreaEmpresa()
            setAreaEmpresa(result)
        } catch (error) {
            console.log(error);
        }
    }

    const setarStatus = async () => {
        try {
            const result = await getStatus()
            setStatus(result)
        } catch (error) {
            console.log(error)
        }
    }

    const setarTipoServico = async () => {
        try {
            const result = await getTipoServico()
            setTipoServico(result)
        } catch (error) {
            console.log(error)
        }
    }

    const setarAnalista = async () => {
        try {
            const result = await getAnalistasSindicancia()
            setAnalista(result)
        } catch (error) {
            console.log(error)
        }
    }

    const pegarDados = async () => {
        try {
            setLoading(true)

            const auxAreaEmpresa = filtros.areaEmpresa ? filtros.areaEmpresa.id[0] : ''
            const auxStatus = filtros.status ? filtros.status.id : ''
            const auxTipoServico = filtros.tipoServico ? filtros.tipoServico.id : ''
            const auxAnalista = filtros.analista ? filtros.analista.id : ''
            const auxData = filtros.data ? filtros.data : ''
            const auxPesquisa = filtros.pesquisa ? filtros.pesquisa : ''

            const result = await getDemandas(
                rowsPerPage,
                page,
                auxAreaEmpresa,
                auxStatus,
                auxTipoServico,
                auxAnalista,
                auxPesquisa,
                auxData
            )
            setDados(result.demandas)
            setTotalPages(result.count)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        pegarDados()
        setarAreaDaEmpresa()
        setarStatus()
        setarTipoServico()
        setarAnalista()
    }, [])

    useEffect(() => {
        pegarDados()
    }, [filtros, page, rowsPerPage])

    return (
        <Sidebar>
            <Container maxWidth={fullWidth ? '' : 'lg'}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                width: '30%',
                                height: '2px',
                                bottom: 0,
                                left: '0%',
                                backgroundColor: 'currentColor',
                                transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                            },
                            '&:hover::after': {
                                width: '100%',
                                left: '0%',
                            },
                        }}
                    >
                        Demandas
                    </Typography>
                    <Tooltip title={fullWidth ? 'Minimizar' : 'Maximizar'}>
                        <IconButton onClick={() => setFullWidth(!fullWidth)}>
                            <ExpandIcon sx={{
                                transition: 'transform 0.3s ease-in-out',
                                transform: fullWidth ? 'rotate(180deg)' : 'rotate(90deg)',
                            }} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignContent: 'center',
                    mt: 2
                }}>
                    <FormControl size="small">
                        <InputLabel>Área/Empresa</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Area/Empresa"
                            sx={{ width: '200px', mr: 4, borderRadius: '10px' }}
                            value={filtros.areaEmpresa}
                            onChange={(e) => { setFiltros({ ...filtros, areaEmpresa: e.target.value }) }}
                        >
                            <MenuItem value={''} >Todos</MenuItem>
                            {
                                areaEmpresa.map((item) => (
                                    <MenuItem value={item} >{item.nome}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <InputLabel>Tipo de Serviço</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Tipo de Servico"
                            sx={{ width: '200px', mr: 4, borderRadius: '10px' }}
                            onChange={(e) => { setFiltros({ ...filtros, tipoServico: e.target.value }) }}
                            value={filtros.tipoServico}
                        >
                            <MenuItem value={''} >Todos</MenuItem>
                            {
                                tipoServico.map((item) => (
                                    <MenuItem value={item} >{item.nome}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <InputLabel>Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Status"
                            sx={{ width: '200px', mr: 4, borderRadius: '10px' }}
                            onChange={(e) => { setFiltros({ ...filtros, status: e.target.value }) }}
                            value={filtros.status}
                        >
                            <MenuItem value={''} >Todos</MenuItem>
                            {
                                status.map((item) => (
                                    <MenuItem value={item} >{item.nome}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <InputLabel>Analista Executor</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Analista Executor"
                            sx={{ width: '200px', mr: 4, borderRadius: '10px' }}
                            onChange={(e) => { setFiltros({ ...filtros, analista: e.target.value }) }}
                            value={filtros.analista}
                        >
                            <MenuItem value={''} >Todos</MenuItem>
                            {
                                analista.map((item) => (
                                    <MenuItem value={item} >{item.nome}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        size="small"
                        type='date'
                        variant='outlined'
                        label='Data'
                        sx={{ mr: 4 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                        value={filtros.data}
                        onChange={(e) => { setFiltros({ ...filtros, data: e.target.value }) }}
                    />
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignContent: 'center',
                    mt: 2,
                    width: '100%'
                }}>
                    <TextField size="small" type='text' variant='outlined' placeholder='Codigo'
                        InputProps={{
                            style: {
                                borderRadius: '10px',
                            },
                            startAdornment: <Search sx={{ mr: 1 }} />
                        }}
                        fullWidth
                        value={filtros.pesquisa}
                        onChange={(e) => { setFiltros({ ...filtros, pesquisa: e.target.value }) }}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignContent: 'center',
                    mt: 2,
                    width: '100%'
                }}>
                    {
                        filtros.areaEmpresa && (
                            <Chip label={filtros.areaEmpresa.nome} onDelete={() => { setFiltros({ ...filtros, areaEmpresa: null }) }} sx={{ mr: 1 }} />
                        )
                    }
                    {
                        filtros.tipoServico && (
                            <Chip label={filtros.tipoServico.nome} onDelete={() => { setFiltros({ ...filtros, tipoServico: null }) }} sx={{ mr: 1 }} />
                        )
                    }
                    {
                        filtros.status && (
                            <Chip label={filtros.status.nome} onDelete={() => { setFiltros({ ...filtros, status: null }) }} sx={{ mr: 1 }} />
                        )
                    }
                    {
                        filtros.analista && (
                            <Chip label={filtros.analista.nome} onDelete={() => { setFiltros({ ...filtros, analista: null }) }} sx={{ mr: 1 }} />
                        )
                    }
                    {
                        filtros.data && (
                            <Chip label={filtros.data} onDelete={() => { setFiltros({ ...filtros, data: '' }) }} sx={{ mr: 1 }} />
                        )
                    }
                    {
                        filtros.pesquisa && (
                            <Chip label={filtros.pesquisa} onDelete={() => { setFiltros({ ...filtros, pesquisa: '' }) }} sx={{ mr: 1 }} />
                        )
                    }
                </Box>
                <Box>
                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Total: {totalPages}</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2
                    }}
                >
                    <FormControl size="small" sx={{ ml: 2 }}>
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
                    } page={page} onChange={(e, value) => setPage(value)} />
                </Box>
                <Box sx={{
                    mt: 4
                }}>
                    <TableContainer>
                        <Table size='small' >
                            <TableHead
                                sx={{
                                    bgcolor: grey[200],
                                }}
                            >
                                <TableRow>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Tipo de Investigação</TableCell>
                                    <TableCell>Nome Investigado</TableCell>
                                    <TableCell>Especialidade</TableCell>
                                    <TableCell>Frente</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Data de Início</TableCell>
                                    <TableCell>Data Ultima Atualização</TableCell>
                                    <TableCell>Dias sem Atualização</TableCell>
                                    <TableCell>Empresa/Área</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    loading ? (
                                        <TableRow>
                                            <TableCell colSpan={10}>
                                                <LinearProgress color='secondary' sx={{ width: '100%', m: 2 }} />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        dados.map((item) => {
                                            const dataDemanda = moment(item.dataDemanda);
                                            const dataAtualizacao = moment(item.data_atualizacao);
                                            // Calculando a diferença em dias
                                            const diasSemAtualizacao = dataAtualizacao.diff(dataDemanda, 'days');
                                            return (
                                                <TableRow key={item.key}>
                                                    <TableCell>{item.codigo}</TableCell>
                                                    <TableCell>{item.tipo_investigado_nome}</TableCell>
                                                    <TableCell>{item.nome}</TableCell>
                                                    <TableCell>{item.especialidade}</TableCell>
                                                    <TableCell>{item.tipo_servico_nome}</TableCell>
                                                    <TableCell>{item.status_nome}</TableCell>
                                                    <TableCell>{moment(item.data_demanda).format('DD/MM/YYYY')}</TableCell>
                                                    <TableCell>{moment(item.data_atualizacao).format('DD/MM/YYYY')}</TableCell>
                                                    <TableCell>{diasSemAtualizacao * (-1)}</TableCell>
                                                    <TableCell>{item.area_empresa_nome}</TableCell>
                                                    <TableCell>
                                                        <IconButton variant='contained' size='small' color='secondary'>
                                                            <MoreHorizIcon />
                                                    </IconButton>
                                                </TableCell>
                                                </TableRow>
                            )
                                        })
                            )
                                }
                        </TableBody>
                    </Table>
                </TableContainer >
            </Box>
        </Container>
        </Sidebar >
    )
}

export default Demandas
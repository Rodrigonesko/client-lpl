import { Box, Button, Chip, Container, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import ExpandIcon from '@mui/icons-material/Expand';
import { useEffect, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { getAnalistasSindicancia, getAreaEmpresa, getDemandas, getStatus, getTipoServico } from "../../_services/sindicancia.service";
import moment from "moment";

const Demandas = () => {

    const [fullWidth, setFullWidth] = useState(true)
    const [loading, setLoading] = useState(false)
    const [areaEmpresa, setAreaEmpresa] = useState([])
    const [status, setStatus] = useState([])
    const [dados, setDados] = useState([])
    const [tipoServico, setTipoServico] = useState([])
    const [analista, setAnalista] = useState([])

    const setarAreaDaEmpresa = async () => {
        try {
            const result = await getAreaEmpresa()
            // console.log(result);
            setAreaEmpresa(result)
        } catch (error) {
            console.log(error);
        }
    }

    const setarStatus = async () => {
        try {
            const result = await getStatus()
            // console.log(result);
            setStatus(result)
        } catch (error) {
            console.log(error)
        }
    }

    const setarTipoServico = async () => {
        try {
            const result = await getTipoServico()
            // console.log(result);
            setTipoServico(result)
        } catch (error) {
            console.log(error)
        }
    }

    const setarAnalista = async () => {
        try {
            const result = await getAnalistasSindicancia()
            console.log(result);
            setAnalista(result)
        } catch (error) {
            console.log(error)
        }
    }

    const pegarDados = async () => {
        try {
            setLoading(true)
            const result = await getDemandas()
            // console.log(result);
            setDados(result)
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
                    <FormControl>
                        <InputLabel>Área/Empresa</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Area/Empresa"
                            onChange={(e) => { setAreaEmpresa(e.target.value) }}
                            sx={{ width: '200px', mr: 4, borderRadius: '20px' }}
                        >
                            {
                                areaEmpresa.map((item) => (
                                    <MenuItem value={item.id[0]} >{item.nome}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Tipo de Serviço</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Tipo de Servico"
                            onChange={(e) => { setTipoServico(e.target.value) }}
                            sx={{ width: '200px', mr: 4, borderRadius: '20px' }}
                        >{
                                tipoServico.map((item) => (
                                    <MenuItem value={item.id} >{item.nome}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Status"
                            onChange={(e) => { setStatus(e.target.value) }}
                            sx={{ width: '200px', mr: 4, borderRadius: '20px' }}
                        >
                            {
                                status.map((item) => (
                                    <MenuItem value={item.id} >{item.nome}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Analista Executor</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Analista Executor"
                            onChange={(e) => { setAnalista(e.target.value) }}
                            sx={{ width: '200px', mr: 4, borderRadius: '20px' }}
                        >
                            {
                                analista.map((item) => (
                                    <MenuItem value={item.id} >{item.nome}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <TextField type='date' variant='outlined' label='Data' focused sx={{ mr: 4, borderRadius: '20px' }} />
                </Box>
                <Box sx={{
                    mt: 2
                }}>
                    <Chip
                        label={`Total de Registros Apresentados: ${12}`}
                        color='success'
                        sx={{ fontSize: 15 }}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignContent: 'center',
                    mt: 2
                }}>
                    <TextField type='text' variant='outlined' label='Pesquisar' />
                    <Button variant='contained' sx={{ ml: 2, borderRadius: '20px' }} >BUSCAR</Button>
                </Box>
                <Box sx={{
                    mt: 4
                }}>
                    <TableContainer component={Paper} >
                        <Table size='small' >
                            <TableHead>
                                <TableRow className="table-header">
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
                                                    <TableCell>{moment(item.dataDemanda).format('DD/MM/YYYY')}</TableCell>
                                                    <TableCell>{moment(item.data_atualizacao).format('DD/MM/YYYY')}</TableCell>
                                                    <TableCell>{diasSemAtualizacao}</TableCell>
                                                    <TableCell>{item.area_empresa_nome}</TableCell>
                                                    <TableCell><Button variant='contained' sx={{ borderRadius: '25px' }}><MoreHorizIcon /></Button></TableCell>
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
        </Sidebar>
    )
}

export default Demandas
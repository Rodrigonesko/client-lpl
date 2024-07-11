import { Box, CircularProgress, Container, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Tooltip, Typography } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import Title from "../../components/Title/Title"
import { blue, red } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { filterUrgenciasEmergencias } from "../../_services/urgenciaEmergenciaNew.service"
import { ArrowForwardIosOutlined } from "@mui/icons-material"
import Upload from "./Modais/Upload"
import Delete from "./Modais/Delete"
import ModalRelatorio from "./Modais/modalRelatorio"

const tabStyle = {
    '&:hover': {
        color: 'gray',
        opacity: 1,
        backgroundColor: '#fff',
    },
    '&.Mui-selected': {
        color: blue[900],
        backgroundColor: '#fff',
        fontWeight: 'bold',
    },
    Indicator: {
        backgroundColor: 'black',
    },
    color: 'gray',
    mr: 2,
}

const TabIcon = ({ children, value, status }) => {
    return (
        <Typography
            borderRadius={'4px'}
            padding={'2px'}
            fontWeight={'bold'}
            bgcolor={status === value ? blue[600] : red[300]}
            color={'white'}
            sx={{
                transition: 'all ease 300ms',
                ml: 1
            }}
        >
            {children}
        </Typography>
    )
}

const UrgenciaEmergenciaNew = () => {

    const [status, setStatus] = useState('A INICIAR')
    const [totais, setTotais] = useState({
        total: 0,
        totalAIniciar: 0,
        totalEmAndamento: 0,
        totalConcluido: 0,
    })

    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const [urgenciaEmergencia, setUrgenciaEmergencia] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    const fetch = async () => {
        setLoading(true)
        try {
            const get = await filterUrgenciasEmergencias({
                status,
                pesquisa,
                page,
                limit: rowsPerPage
            })
            setUrgenciaEmergencia(get.urgencias)
            setTotalPages(get.total)
            const [totalAIniciar, totalEmAndamento, totalConcluido, todos] = await Promise.all([
                filterUrgenciasEmergencias({
                    status: 'A INICIAR',
                    page: 1,
                    limit: 1
                }),
                filterUrgenciasEmergencias({
                    status: 'EM ANDAMENTO',
                    page: 1,
                    limit: 1
                }),
                filterUrgenciasEmergencias({
                    status: 'Concluído',
                    page: 1,
                    limit: 1
                }),
                filterUrgenciasEmergencias({
                    page: 1,
                    limit: 1
                })
            ].map((promise) => promise.then((res) => res.total)))
            setTotais({
                total: todos,
                totalAIniciar,
                totalEmAndamento,
                totalConcluido
            })
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetch()
    }, [status, pesquisa, page, rowsPerPage, refresh])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title size={'medium'}>Urgência Emergência</Title>
                        <Box
                            display='flex'
                            alignItems='center'
                            gap={2}
                        >
                            <ModalRelatorio />
                            <Upload setRefresh={setRefresh} />
                        </Box>
                    </Box>
                    <Tabs
                        value={status}
                        onChange={(e, newValue) => {
                            setStatus(newValue)
                            setPage(1)
                        }}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: red[600],
                            },
                            mt: 1,
                        }}
                    >
                        <Tab value={'A INICIAR'} label="A iniciar" icon={<TabIcon status={status} value={'A Iniciar'}>{totais.totalAIniciar}</TabIcon>} iconPosition="end" sx={tabStyle} />
                        <Tab value={'EM ANDAMENTO'} label="Em andamento" icon={<TabIcon status={status} value={'Andamento'}>{totais.totalEmAndamento}</TabIcon>} iconPosition="end" sx={tabStyle} />
                        <Tab value={'Concluído'} label="Concluído" icon={<TabIcon status={status} value={'Concluído'}>{totais.totalConcluido}</TabIcon>} iconPosition="end" sx={tabStyle} />
                        <Tab value={''} label="Todos" icon={<TabIcon status={status} value={''}>{totais.total}</TabIcon>} iconPosition="end" sx={tabStyle} />
                    </Tabs>
                    <Box sx={{ mt: 2, mb: 3 }}>
                        <TextField type='text' label='Nome, MO ou Pedido' fullWidth size='small' value={pesquisa} onChange={(e) => {
                            setPesquisa(e.target.value)
                            setPage(1)
                        }} InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }} />
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'} sx={{ mb: 2, mt: 2 }}>
                        <FormControl size="small" disabled={loading}>
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
                                <MenuItem value={100} >100</MenuItem>
                            </Select>
                        </FormControl>
                        <Pagination count={
                            totalPages % rowsPerPage === 0 ?
                                Math.floor(totalPages / rowsPerPage) :
                                Math.floor(totalPages / rowsPerPage) + 1
                        } page={page} onChange={(e, value) => setPage(value)} disabled={loading} />
                    </Box>
                    <TableContainer>
                        {
                            !loading ? (
                                <Table
                                    size="small" elevation={7} sx={{ mb: 5, borderRadius: '15px' }}
                                >
                                    <TableHead sx={{ background: blue[600] }}>
                                        <TableRow>
                                            <TableCell sx={{ color: 'white' }}>Nome Associado</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Marca Ótica</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Pedido</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Retificou?</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Observações</TableCell>
                                            <TableCell sx={{ color: 'white' }}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {urgenciaEmergencia.map((item) => (
                                            <TableRow key={item._id}>
                                                <TableCell>{item.nomeAssociado}</TableCell>
                                                <TableCell>{item.numAssociado}</TableCell>
                                                <TableCell>{item.pedido}</TableCell>
                                                <TableCell>{item.retorno}</TableCell>
                                                <TableCell>{item.observacoes}</TableCell>
                                                <TableCell
                                                    align="right"
                                                >{

                                                    <>
                                                        {
                                                            (item.status === 'A INICIAR') && <Delete pedido={item} setLoading={setLoading} setRefresh={setRefresh} />
                                                        }
                                                        <Tooltip title='Detalhes'>
                                                            <IconButton
                                                                href={`/urgenciaEmergencia/detalhes/${item._id}`}
                                                            ><ArrowForwardIosOutlined />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </>

                                                }</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <Box width={'100%'} display={'flex'} justifyContent={"center"}>
                                    <CircularProgress />
                                </Box>
                            )
                        }
                    </TableContainer>
                </Container>
            </Sidebar>
        </>
    )
}

export default UrgenciaEmergenciaNew
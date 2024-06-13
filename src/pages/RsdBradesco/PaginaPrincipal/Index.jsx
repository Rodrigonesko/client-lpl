import { Box, Button, Chip, CircularProgress, Container, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import { blue, indigo, red } from "@mui/material/colors"
import { ArrowForward, CleaningServicesOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { getPacotesByFilter } from "../../../_services/rsdBradesco.service"
import { ThemeProvider } from "@emotion/react"
import { themeBradesco } from "../components/theme"
import { colorStatusRsdBradesco } from "../FichaSegurado/utils/types"

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
            bgcolor={status === value ? red[900] : blue[900]}
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

const RsdBradesco = () => {

    const [status, setStatus] = useState('A INICIAR')
    const [pesquisa, setPesquisa] = useState('')
    const [pacote, setPacote] = useState('')
    const [sinistro, setSinistro] = useState('')
    const [data, setData] = useState('')

    const [totais, setTotais] = useState({
        total: 0,
        totalAIniciar: 0,
        totalAgendado: 0,
        totalEmAndamento: 0,
        totalConcluido: 0,
        totalCancelado: 0
    })

    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)

    const [pacotes, setPacotes] = useState([])

    const cleanFilters = () => {
        setPacote('')
        setPesquisa('')
        setSinistro('')
        setData('')
        setPage(1)
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const get = await getPacotesByFilter(status, pesquisa, pacote, sinistro, data, page, rowsPerPage)
            setPacotes(get.pacotes)
            setTotalPages(get.total)
            const [totalAIniciar, totalAgendado, totalEmAndamento, totalConcluido, totalCancelado, todos] = await Promise.all([
                getPacotesByFilter('A INICIAR', '', '', '', '', 1, 1),
                getPacotesByFilter('AGENDADO', '', '', '', '', 1, 1),
                getPacotesByFilter('EM ANDAMENTO', '', '', '', '', 1, 1),
                getPacotesByFilter('SUCESSO CONTATO', '', '', '', '', 1, 1),
                getPacotesByFilter('INSUCESSO CONTATO', '', '', '', '', 1, 1),
                getPacotesByFilter('', '', '', '', '', 1, 1)
            ].map((promise) => promise.then((res) => res.total)))
            setTotais({
                total: todos,
                totalAIniciar,
                totalAgendado,
                totalEmAndamento,
                totalConcluido,
                totalCancelado
            })
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [status, pesquisa, pacote, sinistro, data, page, rowsPerPage])

    return (
        <>
            <Sidebar>
                <ThemeProvider theme={themeBradesco}>
                    <Container maxWidth>
                        <Title size={'medium'} fontColor={indigo[800]} lineColor={red[600]} >Rsd Bradesco</Title>
                        <Tabs
                            value={status}
                            onChange={(e, newValue) => setStatus(newValue)}
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                '& .MuiTabs-indicator': {
                                    backgroundColor: red[900],
                                },
                                mt: 1,
                            }}
                        >
                            <Tab value={'A INICIAR'} label="A iniciar" icon={<TabIcon status={status} value={'A INICIAR'}>{totais.totalAIniciar}</TabIcon>} iconPosition="end" sx={tabStyle} />
                            <Tab value={'AGENDADO'} label="Agendado" icon={<TabIcon status={status} value={'AGENDADO'}>{totais.totalAgendado}</TabIcon>} iconPosition="end" sx={tabStyle} />
                            <Tab value={'EM ANDAMENTO'} label="Em andamento" icon={<TabIcon status={status} value={'EM ANDAMENTO'}>{totais.totalEmAndamento}</TabIcon>} iconPosition="end" sx={tabStyle} />
                            <Tab value={'SUCESSO CONTATO'} label="Sucesso" icon={<TabIcon status={status} value={'SUCESSO CONTATO'}>{totais.totalConcluido}</TabIcon>} iconPosition="end" sx={tabStyle} />
                            <Tab value={'INSUCESSO CONTATO'} label="Insucesso" icon={<TabIcon status={status} value={'INSUCESSO CONTATO'}>{totais.totalCancelado}</TabIcon>} iconPosition="end" sx={tabStyle} />
                            <Tab value={''} label="Todos" icon={<TabIcon status={status} value={''}>{totais.total}</TabIcon>} iconPosition="end" sx={tabStyle} />
                        </Tabs>
                        <Box
                            sx={{
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'flex-start',
                                mt: 2,
                                flexWrap: 'wrap',
                                gap: 2
                            }}
                        >

                            <TextField type='text' size='small' name='Analista Responsavel' label='Analista Responsavel'
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                sx={{ minWidth: 250 }}
                            />
                            <TextField type='date' size='small' name='Data Criacao' label='Data Criação'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                sx={{ minWidth: 250 }}
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                            />
                            <TextField
                                size='small'
                                label='Pacote'
                                value={pacote}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                sx={{ minWidth: 250 }}
                                onChange={(e) => setPacote(e.target.value)}
                            />
                            <TextField
                                size='small'
                                label='Sinistro'
                                value={sinistro}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                sx={{ minWidth: 250 }}
                                onChange={(e) => setSinistro(e.target.value)}
                            />
                            <Button onClick={cleanFilters} variant='contained' sx={{ borderRadius: '10px' }} ><CleaningServicesOutlined /></Button>
                        </Box>
                        <Box
                            mt={2}
                        >
                            <TextField type='text' size='small' placeholder="Titular, codigo, segurado, codigo segurado ou cpf"
                                value={pesquisa}
                                onChange={(e) => setPesquisa(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                fullWidth
                            />
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
                        <Box
                            display={'flex'}
                            alignItems={'center'}
                            sx={{ mb: 2 }}
                            gap={2}
                        >
                            <Chip
                                label={`Total de Pedidos: ${totalPages}`}
                                color="primary"
                                variant="filled"
                                sx={{ bgcolor: red[700], color: 'white' }}
                            />
                        </Box>
                        <TableContainer>
                            {
                                !loading ? (
                                    <Table
                                        size="small" elevation={7} sx={{ mb: 5, borderRadius: '15px' }}
                                    >
                                        <TableHead sx={{ background: indigo[800] }}>
                                            <TableRow>
                                                <TableCell sx={{ color: 'white' }}>Pacote</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Titular</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Codigo</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Segurados</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                                <TableCell sx={{ color: 'white' }}></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                pacotes.map((pacote, index) => (
                                                    <TableRow key={index} >
                                                        <TableCell>{pacote.codigo}</TableCell>
                                                        <TableCell>
                                                            {pacote.titular.nome}
                                                        </TableCell>
                                                        <TableCell>{pacote.titular.codigo}</TableCell>
                                                        <TableCell>
                                                            {
                                                                pacote.protocolos.map((protocolo) => {
                                                                    return <Typography
                                                                        key={protocolo._id}
                                                                        variant={'body2'}
                                                                    >
                                                                        {
                                                                            protocolo.pedidos[0].segurado.nome
                                                                        }
                                                                    </Typography>
                                                                })
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                label={pacote.status}
                                                                sx={{
                                                                    color: 'white',
                                                                    backgroundColor: colorStatusRsdBradesco[pacote.status],
                                                                }}
                                                                size="small"
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton
                                                                size="small"
                                                                href={`/bradesco/fichaSegurado/${pacote.titular._id}`}
                                                            >
                                                                <ArrowForward />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <Box width={'100%'} display={'flex'} justifyContent={"center"}>
                                        <CircularProgress />
                                    </Box>
                                )}
                        </TableContainer>
                    </Container>
                </ThemeProvider>
            </Sidebar>
        </>
    )
}

export default RsdBradesco 
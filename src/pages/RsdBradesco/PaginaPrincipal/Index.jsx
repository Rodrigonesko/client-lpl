import { Box, Button, Chip, CircularProgress, Container, FormControl, InputLabel, MenuItem, Pagination, Select, Tab, Table, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import { blue, red } from "@mui/material/colors"
import { CleaningServicesOutlined } from "@mui/icons-material"
import { useState } from "react"

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
            bgcolor={status === value ? red[900] : blue[600]}
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

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Title size={'medium'} fontColor={red[700]} lineColor={'black'} >Rsd Bradesco</Title>
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
                        {/* <Tab value={'AGENDADO'} label="Agendado" icon={<TabIcon status={status} value={'AGENDADO'}>{totais.totalAgendado}</TabIcon>} iconPosition="end" sx={tabStyle} /> */}
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
                            mt: 2
                        }}
                    >
                        <TextField type='text' size='small' name='Prestador' label='Prestador'
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                            sx={{ mr: 2, minWidth: 250 }}
                        />
                        <TextField type='text' size='small' name='Nome Segurado' label='Nome Segurado'
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                            sx={{ mr: 2, minWidth: 250 }}
                        />
                        <TextField type='text' size='small' name='Analista Responsavel' label='Analista Responsavel'
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                            sx={{ mr: 2, minWidth: 250 }}
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
                            sx={{ mr: 2, minWidth: 250 }}
                        />
                        <Button startIcon={<CleaningServicesOutlined />} variant='contained' sx={{ borderRadius: '10px' }} >Limpar Pesquisa</Button>
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
                        {/* {
                            status && (
                                <Chip
                                    label={status}
                                    color="primary"
                                    variant="filled"
                                    sx={{ bgcolor: blue[900], color: 'white' }}
                                    onDelete={() => setStatus('')}
                                />
                            )
                        }
                        {
                            subStatus && (
                                <Chip
                                    label={subStatus}
                                    color="primary"
                                    variant="filled"
                                    sx={{ bgcolor: blue[900], color: 'white' }}
                                    onDelete={() => setSubStatus('')}
                                />
                            )
                        }
                        {
                            prestador && (
                                <Chip
                                    label={prestador}
                                    color="primary"
                                    variant="filled"
                                    sx={{ bgcolor: blue[900], color: 'white' }}
                                    onDelete={() => setPrestador('')}
                                />
                            )
                        }
                        {
                            beneficiario && (
                                <Chip
                                    label={beneficiario}
                                    color="primary"
                                    variant="filled"
                                    sx={{ bgcolor: blue[900], color: 'white' }}
                                    onDelete={() => setBeneficiario('')}
                                />
                            )
                        }
                        {
                            responsavel && (
                                <Chip
                                    label={responsavel}
                                    color="primary"
                                    variant="filled"
                                    sx={{ bgcolor: blue[900], color: 'white' }}
                                    onDelete={() => setResponsavel('')}
                                />
                            )
                        }
                        {
                            lote && (
                                <Chip
                                    label={lote}
                                    color="primary"
                                    variant="filled"
                                    sx={{ bgcolor: blue[900], color: 'white' }}
                                    onDelete={() => setLote('')}
                                />
                            )
                        } */}
                    </Box>
                    <TableContainer>
                        {
                            !loading ? (
                                <Table
                                    size="small" elevation={7} sx={{ mb: 5, borderRadius: '15px' }}
                                >
                                    <TableHead sx={{ background: red[700] }}>
                                        <TableRow>
                                            <TableCell sx={{ color: 'white' }}>Segurado</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Valor Solicitado</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Prestador</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Titular do Segurado</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Data Solicitação</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Data Criação</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            ) : (
                                <Box width={'100%'} display={'flex'} justifyContent={"center"}>
                                    <CircularProgress />
                                </Box>
                            )}
                    </TableContainer>
                </Container>
            </Sidebar>
        </>
    )
}

export default RsdBradesco 
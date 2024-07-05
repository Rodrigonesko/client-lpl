import { Box, CircularProgress, Container, FormControl, InputLabel, MenuItem, Pagination, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import Title from "../../components/Title/Title"
import { blue, red } from "@mui/material/colors"
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
                    <Title size={'medium'}>Urgência Emergência</Title>
                    <Tabs
                        value={status}
                        onChange={(e, newValue) => setStatus(newValue)}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: red[600],
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
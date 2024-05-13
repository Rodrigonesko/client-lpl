import { Autocomplete, Box, Button, Chip, CircularProgress, Container, FormControl, IconButton, InputLabel, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { blue, orange } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { filterPedidos, getPedidos, getPrestadoresComPedidosEmAberto } from "../../../_services/sulAmerica.service"
import Title from "../../../components/Title/Title"
import moment from "moment"
import { ArrowForward } from "@mui/icons-material"
import { valueToBRL } from "../../../functions/functions"
import { filterUsers } from "../../../_services/user.service"

const Pedidos = () => {

    const [pedidos, setPedidos] = useState([])
    const [prestador, setPrestador] = useState('')
    const [prestadores, setPrestadores] = useState([])
    const [beneficiario, setBeneficiario] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [status, setStatus] = useState('')
    const [responsaveis, setResponsaveis] = useState([])

    const [flushHook, setFlushHook] = useState(false)
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false)

    const findPrestadores = async () => {
        try {
            const find = await getPrestadoresComPedidosEmAberto()
            setPrestadores(find)
        } catch (error) {
            console.log(error);
        }
    }

    const fetch = async () => {
        try {
            setLoading(true)
            const set = await getPedidos(
                page,
                rowsPerPage,
            )
            const response = await filterUsers({
                atividadePrincipal: 'Tele Entrevista',
                inativo: { $ne: true }
            })
            setResponsaveis(response.map(analista => analista.name))
            setPedidos(set.result)
            setTotalPages(set.total)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        if ((prestador === '') && (beneficiario === '') && (responsavel === '') && (status === '')) {
            fetch(page)
        } else {
            handleFilter()
        }
        findPrestadores()
        setFlushHook(false)
    }, [flushHook, page, rowsPerPage, prestador, beneficiario, responsavel, status])

    const handleFilter = async (event) => {
        event?.preventDefault()
        try {
            setLoading(true)
            if ((prestador?.length > 2) || (beneficiario.length > 2) || (responsavel.length > 2) || (status.length > 2)) {
                const filter = await filterPedidos(prestador, beneficiario, responsavel, status, page, rowsPerPage)
                setPedidos(filter.result)
                setTotalPages(filter.total)
                setLoading(false)
                return
            }
            fetch(page)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Title size={'medium'} fontColor={blue[900]} lineColor={orange[900]}>Pedidos</Title>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mt: 2,
                        }}
                    >
                        <Autocomplete
                            size='small'
                            disablePortal
                            id="combo-box-demo"
                            value={prestador}
                            options={prestadores}
                            onChange={(e, newValue) => {
                                setPrestador(newValue);
                            }}
                            sx={{
                                width: 300, mr: 3, borderRadius: '10px', '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px'
                                }
                            }}
                            renderInput={(params) => <TextField {...params} label="Prestador" />}
                        />
                        <TextField type='text' label='Beneficiario' size='small' value={beneficiario} onChange={(e) => { setBeneficiario(e.target.value) }} sx={{ mr: 3, }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }} />
                        <FormControl size="small" disabled={loading}>
                            <InputLabel>Responsável</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Responsável"
                                sx={{ width: '200px', borderRadius: '10px', mr: 3 }}
                                onChange={(e) => { setResponsavel(e.target.value) }}
                                value={responsavel}
                            >
                                <MenuItem value={'A DEFINIR'} >A DEFINIR</MenuItem>
                                {
                                    responsaveis.map((analista, index) => (
                                        <MenuItem key={index} value={analista}>{analista}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '170px', mr: 3 }} size='small'>
                            <InputLabel id='Status'>Status</InputLabel>
                            <Select
                                value={status}
                                labelId="Status"
                                id='Status'
                                label='Status'
                                onChange={(e) => { setStatus(e.target.value) }}
                                sx={{ borderRadius: '10px' }}
                            >
                                <MenuItem value={'A INICIAR'}>A INICIAR</MenuItem>
                                <MenuItem value={'AGENDADO'}>AGENDADO</MenuItem>
                                <MenuItem value={'CONCLUÍDO'}>CONCLUÍDO</MenuItem>
                                <MenuItem value={'CANCELADO'}>CANCELADO</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <Button type='submit' variant='contained' onClick={handleFilter} sx={{
                            borderRadius: '10px', mr: 1, bgcolor: blue[900], ':hover': {
                                bgcolor: blue[800]
                            }
                        }}>BUSCAR</Button> */}
                        <Button type='submit' variant='contained'
                            onClick={() => {
                                setPrestador('')
                                setBeneficiario('')
                                setResponsavel('')
                                setStatus('')
                                setFlushHook(true)
                            }} sx={{
                                borderRadius: '10px',
                                bgcolor: blue[900],
                                ':hover': {
                                    bgcolor: blue[800]
                                }
                            }}>LIMPAR PESQUISA</Button>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: 4 }} >
                        <TableContainer>
                            <Box display={'flex'} justifyContent={'space-between'} sx={{ mb: 2 }}>
                                <Chip label={`Quantidade de Pedidos: ${totalPages}`} sx={{ fontSize: '15px', background: blue[900], color: 'white' }} />
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
                            {
                                !loading ? (
                                    <Table
                                        size="small" elevation={7} sx={{ mb: 5, borderRadius: '15px' }}
                                    >
                                        <TableHead sx={{ background: blue[900] }}>
                                            <TableRow>
                                                <TableCell sx={{ color: 'white' }}>Beneficiario</TableCell>

                                                <TableCell sx={{ color: 'white' }}>Valor Pago</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Prestador</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Responsável</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Data Agendamento</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Data Criação</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                pedidos.map((pedido) => (
                                                    <TableRow key={pedido.id}>
                                                        <TableCell>
                                                            {pedido.beneficiario.nome}
                                                            <Typography
                                                                variant='body2'
                                                                color='textSecondary'
                                                            >
                                                                {pedido.beneficiario.cpf}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            {valueToBRL(pedido.valorPago)}
                                                            <Typography
                                                                variant='body2'
                                                                color='textSecondary'
                                                            >
                                                                Qtd serviços: {pedido.qtdServicosPagos}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>{pedido.prestador.nome}</TableCell>
                                                        <TableCell>{pedido.responsavel}</TableCell>
                                                        <TableCell>{pedido.dataAgendamento}</TableCell>
                                                        <TableCell>{moment(pedido.dataCriacao).format('DD/MM/YYYY')}</TableCell>
                                                        <TableCell>{pedido.status}</TableCell>
                                                        <TableCell>
                                                            <Tooltip title='Detalhes'>
                                                                <IconButton href={`/sulAmerica/beneficiario/${pedido.beneficiario._id}`} >
                                                                    <ArrowForward />
                                                                </IconButton>
                                                            </Tooltip>

                                                            {/* <DrawerDetailsPedidos key={pedido._id} data={pedido} /> */}
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
                                )
                            }
                        </TableContainer>
                    </Box>
                </Container>
            </Sidebar>
        </>
    )
}

export default Pedidos
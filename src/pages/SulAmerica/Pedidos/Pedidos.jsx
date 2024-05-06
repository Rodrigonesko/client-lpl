import { Autocomplete, Box, Button, Chip, CircularProgress, Container, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { blue } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { filterPedidos, getPedidos } from "../../../_services/sulAmerica.service"
import { ArrowForward } from "@mui/icons-material"
import Title from "../../../components/Title/Title"
import moment from "moment"

const Pedidos = () => {

    const [pedidos, setPedidos] = useState([])
    const [prestador, setPrestador] = useState('')
    const [beneficiario, setBeneficiario] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [status, setStatus] = useState('')

    const [flushHook, setFlushHook] = useState(false)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false)

    const handlePageChange = (event, value) => {
        setPage(value);
        if ((prestador.length > 2) || (beneficiario.length > 2) || (responsavel.length > 2) || (status.length > 2)) {
            handleFilter(event, value);
        } else {
            fetch(value)
        }
    }

    const fetch = async (valor) => {
        try {
            setLoading(true)
            const set = await getPedidos(valor)
            setPedidos(set.result)
            console.log(set.total)
            setTotalPages(set.total)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetch(page)
        setFlushHook(false)
    }, [flushHook])

    const handleFilter = async (event, valor) => {
        event?.preventDefault()
        try {
            setLoading(true)
            if ((prestador.length > 2) || (beneficiario.length > 2) || (responsavel.length > 2) || (status.length > 2)) {
                const filter = await filterPedidos(prestador, beneficiario, responsavel, status, valor)
                console.log(filter.result);
                setPedidos(filter.result)
                setTotalPages(filter.total)
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Title size={'medium'}>Pedidos</Title>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mt: 2,
                        }}>
                        <TextField type='text' label='Prestador' size='small' value={prestador} onChange={(e) => { setPrestador(e.target.value) }} sx={{ mr: 3, }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }} />
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
                                <MenuItem value={''} >Todos</MenuItem>
                                {
                                    pedidos.map((item) => (
                                        <MenuItem value={item} >{item.nome}</MenuItem>
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
                        <Button type='submit' variant='contained' onClick={handleFilter} sx={{ borderRadius: '10px', mr: 1 }}>BUSCAR</Button>
                        <Button type='submit' variant='contained'
                            onClick={() => {
                                setPrestador('')
                                setBeneficiario('')
                                setResponsavel('')
                                setStatus('')
                                setFlushHook(true)
                            }} sx={{ borderRadius: '10px' }}>LIMPAR PESQUISA</Button>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: 4 }} >
                        <TableContainer>
                            <Box display={'flex'} justifyContent={'space-between'} sx={{ mb: 2 }}>
                                <Chip label={`Quantidade de Pedidos: ${totalPages}`} color='secondary' sx={{ fontSize: '15px' }} />
                                <Pagination count={Math.ceil(totalPages / 25)} page={page} onChange={handlePageChange} />
                            </Box>
                            {
                                !loading ? (
                                    <Table
                                        size="small"
                                    >
                                        <TableHead sx={{ backgroundColor: blue[500] }}>
                                            <TableRow>
                                                <TableCell sx={{ color: 'white' }}>Menor Data Execução</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Maior Data Execução</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Quantidade Serviços Pagos</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Valor Pago</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Prestador</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Beneficiario</TableCell>
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
                                                        <TableCell>{moment(pedido.menorDataExecucao).format('DD/MM/YYYY')}</TableCell>
                                                        <TableCell>{moment(pedido.maiorDataExecucao).format('DD/MM/YYYY')}</TableCell>
                                                        <TableCell>{pedido.qtdServicosPagos}</TableCell>
                                                        <TableCell>{
                                                            new Intl.NumberFormat('pt-BR', {
                                                                style: 'currency',
                                                                currency: 'BRL'
                                                            }).format(pedido.valorPago)
                                                        }</TableCell>
                                                        <TableCell>{pedido.prestador.nome}</TableCell>
                                                        <TableCell>{pedido.beneficiario.nome}</TableCell>
                                                        <TableCell>{pedido.responsavel}</TableCell>
                                                        <TableCell>{pedido.dataAgendamento}</TableCell>
                                                        <TableCell>{moment(pedido.dataCriacao).format('DD/MM/YYYY')}</TableCell>
                                                        <TableCell>{pedido.status}</TableCell>
                                                        <TableCell>
                                                            <IconButton>
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
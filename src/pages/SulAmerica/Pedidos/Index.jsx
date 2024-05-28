import { Autocomplete, Box, Button, Chip, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Tooltip, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { blue, deepOrange, green, orange, red } from "@mui/material/colors"
import { useEffect, useState } from "react"
import Title from "../../../components/Title/Title"
import { filterPedidos, getDatasCriacoaPedido, getPrestadoresByStatus } from "../../../_services/sulAmerica.service"
import { ArrowForward, Clear } from "@mui/icons-material"
import { filterUsers } from "../../../_services/user.service"
import { valueToBRL } from "../../../functions/functions"
import moment from "moment"
import ModalGerarRelatorio from "./components/ModalGerarRelatorio"
import { colorStatus, colorSubStatus } from "./utils/types"

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
            bgcolor={status === value ? blue[900] : orange[300]}
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

const PedidosAjuste = () => {

    const [status, setStatus] = useState('A INICIAR')
    const [pedidos, setPedidos] = useState([])
    const [totais, setTotais] = useState({
        total: 0,
        totalAIniciar: 0,
        totalAgendado: 0,
        totalEmAndamento: 0,
        totalConcluido: 0,
        totalCancelado: 0
    })
    const [prestadores, setPrestadores] = useState([''])
    const [prestador, setPrestador] = useState('')
    const [beneficiario, setBeneficiario] = useState('')
    const [responsaveis, setResponsaveis] = useState([])
    const [responsavel, setResponsavel] = useState('')
    const [lotes, setLotes] = useState([''])
    const [lote, setLote] = useState('')
    const [tentativasDeContato, setTentativasDeContato] = useState('')


    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchTotais = async () => {
            try {
                const Ainiciar = await filterPedidos('', '', '', 'A INICIAR', '', '', 1, 1)
                const Agendado = await filterPedidos('', '', '', 'AGENDADO', '', '', 1, 1)
                const EmAndamento = await filterPedidos('', '', '', 'EM ANDAMENTO', '', '', 1, 1)
                const Concluido = await filterPedidos('', '', '', 'SUCESSO CONTATO', '', '', 1, 1)
                const Cancelado = await filterPedidos('', '', '', 'INSUCESSO CONTATO', '', '', 1, 1)
                const response = await filterPedidos('', '', '', '', '', '', 1, 1)
                setTotais({
                    total: response.total,
                    totalAIniciar: Ainiciar.total,
                    totalAgendado: Agendado.total,
                    totalEmAndamento: EmAndamento.total,
                    totalConcluido: Concluido.total,
                    totalCancelado: Cancelado.total
                })
            } catch (error) {
                console.error(error);
            }
        }

        const fetchResponsaveis = async () => {
            try {
                const response = await filterUsers({
                    atividadePrincipal: 'Tele Entrevista',
                    'acessos.sulAmerica': true,
                    inativo: { $ne: true }
                })
                setResponsaveis(response.map(analista => analista.name))
            } catch (error) {
                console.error(error);
            }
        }

        const fetchLotes = async () => {
            const responseLotes = await getDatasCriacoaPedido()
            setLotes(['', ...responseLotes])
        }

        fetchTotais()
        fetchResponsaveis()
        fetchLotes()
    }, [])

    useEffect(() => {
        const fetchPedidos = async () => {
            setLoading(true)
            try {

                const response = await filterPedidos(prestador, beneficiario, responsavel, status, tentativasDeContato, lote ? moment(lote, 'DD/MM/YYYY').format('YYYY-MM-DD') : '', page, rowsPerPage)
                setPedidos(response.result)
                setTotalPages(response.total)
            } catch (error) {
                console.error(error);
            }
            setLoading(false)
        }

        const fetchPrestadores = async () => {
            try {
                const response = await getPrestadoresByStatus(status)
                setPrestadores(['', ...response])

            } catch (error) {
                console.error(error);
            }
        }

        fetchPedidos()
        fetchPrestadores()
    }, [prestador, beneficiario, responsavel, status, tentativasDeContato, page, rowsPerPage, lote])

    return (
        <Sidebar>
            <Box
                sx={{
                    m: 2
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Title size={'medium'} fontColor={blue[900]} lineColor={'white'}>Pedidos</Title>
                    <ModalGerarRelatorio />
                </Box>
                <Tabs
                    value={status}
                    onChange={(e, newValue) => setStatus(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTabs-indicator': {
                            backgroundColor: orange[900],
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
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            mt: 2,
                            gap: 2
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
                                width: 300, borderRadius: '10px', '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px'
                                }
                            }}
                            renderInput={(params) => <TextField {...params} label="Prestador" />}
                        />
                        <TextField type='text' label='Beneficiario' size='small' value={beneficiario} onChange={(e) => { setBeneficiario(e.target.value) }}
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
                                sx={{ width: '200px', borderRadius: '10px' }}
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
                        <Autocomplete
                            size='small'
                            disablePortal
                            value={lote}
                            options={lotes.map(lote => lote && moment(lote).format('DD/MM/YYYY'))}
                            onChange={(e, newValue) => {
                                setLote(newValue);
                            }}
                            sx={{
                                width: 200, borderRadius: '10px', '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px'
                                }
                            }}
                            renderInput={(params) => <TextField {...params} label="Lote" />}
                        />
                        <FormControl size="small" disabled={loading}>
                            <InputLabel>Tentativas de Contato</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Tentativas de Contato"
                                sx={{ width: 250, borderRadius: '10px' }}
                                onChange={(e) => { setTentativasDeContato(e.target.value) }}
                                value={tentativasDeContato}
                            >
                                <MenuItem value={''} >Todos</MenuItem>
                                <MenuItem value={'0'} >0</MenuItem>
                                <MenuItem value={'1'} >1</MenuItem>
                                <MenuItem value={'2'} >2</MenuItem>
                                <MenuItem value={'3'} >3+</MenuItem>
                            </Select>
                        </FormControl>
                        {
                            status === 'INSUCESSO CONTATO' && (
                                <FormControl size="small" disabled={loading}>
                                    <InputLabel>Sub Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Sub Status"
                                        sx={{ width: 250, borderRadius: '10px' }}
                                    // onChange={(e) => { setTentativasDeContato(e.target.value) }}
                                    // value={tentativasDeContato}
                                    >
                                        <MenuItem value={''} >Todos</MenuItem>
                                        <MenuItem value={'TRÊS TENTATIVAS'} >TRÊS TENTATIVAS</MenuItem>
                                        <MenuItem value={'TRÊS TENTATIVAS WHATSAPP'} >TRÊS TENTATIVAS WHATSAPP</MenuItem>
                                    </Select>
                                </FormControl>
                            )
                        }
                        {
                            status === 'SUCESSO CONTATO' && (
                                <FormControl size="small" disabled={loading}>
                                    <InputLabel>Sub Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Sub Status"
                                        sx={{ width: 250, borderRadius: '10px' }}
                                    // onChange={(e) => { setTentativasDeContato(e.target.value) }}
                                    // value={tentativasDeContato}
                                    >
                                        <MenuItem value={''} >Todos</MenuItem>
                                        <MenuItem value={'REALIZADO'} >REALIZADO</MenuItem>
                                        <MenuItem value={'FALECIDO'} >FALECIDO</MenuItem>
                                        <MenuItem value={'RECUSADO'} >RECUSADO</MenuItem>
                                        <MenuItem value={'PRESTADOR DIVERGENTE'} >PRESTADOR DIVERGENTE</MenuItem>
                                        <MenuItem value={'PARCIAL'} >PARCIAL</MenuItem>
                                    </Select>
                                </FormControl>
                            )
                        }
                        {
                            status === '' && (
                                <FormControl size="small" disabled={loading}>
                                    <InputLabel>Sub Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Sub Status"
                                        sx={{ width: 250, borderRadius: '10px' }}
                                    // onChange={(e) => { setTentativasDeContato(e.target.value) }}
                                    // value={tentativasDeContato}
                                    >
                                        <MenuItem value={''} >Todos</MenuItem>
                                        <MenuItem value={'REALIZADO'} >REALIZADO</MenuItem>
                                        <MenuItem value={'FALECIDO'} >FALECIDO</MenuItem>
                                        <MenuItem value={'RECUSADO'} >RECUSADO</MenuItem>
                                        <MenuItem value={'PRESTADOR DIVERGENTE'} >PRESTADOR DIVERGENTE</MenuItem>
                                        <MenuItem value={'PARCIAL'} >PARCIAL</MenuItem>
                                        <MenuItem value={'TRÊS TENTATIVAS'} >TRÊS TENTATIVAS</MenuItem>
                                        <MenuItem value={'TRÊS TENTATIVAS WHATSAPP'} >TRÊS TENTATIVAS WHATSAPP</MenuItem>
                                    </Select>
                                </FormControl>
                            )
                        }
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: '10px',
                                bgcolor: blue[900],
                                color: 'white',
                                ':hover': {
                                    bgcolor: blue[800]
                                }
                            }}
                            onClick={() => {
                                setPrestador('')
                                setBeneficiario('')
                                setResponsavel('')
                                setLote('')
                                setTentativasDeContato('')
                            }}
                        >
                            <Clear />
                        </Button>
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
                            sx={{ bgcolor: orange[900], color: 'white' }}
                        />
                        {
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
                        }
                    </Box>
                    <TableContainer>
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
                                                <TableRow key={pedido._id}>
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
                                                    <TableCell>{pedido.dataAgendamento && moment(pedido.dataAgendamento).format('DD/MM/YYYY HH:mm')}</TableCell>
                                                    <TableCell>{moment(pedido.dataCriacao).format('DD/MM/YYYY')}</TableCell>
                                                    <TableCell
                                                        align="center"
                                                    >
                                                        <Box
                                                            display={'flex'}
                                                            flexDirection={'column'}
                                                            justifyContent={'center'}
                                                        >
                                                            <Chip
                                                                label={pedido.status}
                                                                color="primary"
                                                                variant="filled"
                                                                sx={{ bgcolor: colorStatus[pedido.status], color: 'white' }}
                                                                size="small"
                                                            />
                                                            <Typography
                                                                sx={{
                                                                    bgcolor: colorSubStatus[pedido.subStatus]?.backgroundColor,
                                                                    color: colorSubStatus[pedido.subStatus]?.color,
                                                                    borderRadius: 2,
                                                                    mt: 1
                                                                }}
                                                                variant='caption'
                                                            >
                                                                {pedido.subStatus}
                                                            </Typography>
                                                        </Box>

                                                    </TableCell>
                                                    <TableCell>
                                                        <Tooltip title='Detalhes'>
                                                            <IconButton href={`/sulAmerica/beneficiario/${pedido.beneficiario._id}`} >
                                                                <ArrowForward />
                                                            </IconButton>
                                                        </Tooltip>
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
            </Box>
        </Sidebar >
    )
}

export default PedidosAjuste
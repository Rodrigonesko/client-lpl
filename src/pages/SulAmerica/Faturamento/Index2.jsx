import { useContext, useEffect, useState } from "react"
import Sidebar from "../../../components/Sidebar/Sidebar"
import AuthContext from "../../../context/AuthContext"
import Toast from "../../../components/Toast/Toast"
import { filterFaturamento, updateFaturamento, deleteFaturamento, getDatasCriacoaPedido } from "../../../_services/sulAmerica.service"
import { Alert, Box, Button, FormControl, InputLabel, LinearProgress, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import Title from "../../../components/Title/Title"
import { blue, green, orange, red } from "@mui/material/colors"
import { colorStatus, colorSubStatus } from "../Pedidos/utils/types"
import ModalComponent from "../../../components/ModalComponent/ModalComponent"
import moment from "moment"
import { Delete } from "@mui/icons-material"
import { useForm } from "react-hook-form"

const Row = ({ pedido, setPedidos, handleFaturar, handleDelete }) => {

    const [nf, setNf] = useState(pedido.nf)

    return (
        <TableRow>
            <TableCell align="center" >{pedido.pedido._id}</TableCell>
            <TableCell align="center" >{moment(pedido.pedido.dataCriacao).format('DD/MM/YYYY')}</TableCell>
            <TableCell align="center" >{pedido.pedido.beneficiario.nome}</TableCell>
            <TableCell align="center">
                <Typography
                    sx={{
                        bgcolor: colorStatus[pedido.pedido.status] || 'black',
                        color: 'white',
                        borderRadius: 2,
                        p: 1
                    }}
                    variant="caption"
                >
                    {pedido.pedido.status}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography
                    sx={{
                        bgcolor: colorSubStatus[pedido.pedido.subStatus]?.backgroundColor || 'black',
                        color: colorSubStatus[pedido.pedido.subStatus]?.color || 'black',
                        borderRadius: 2,
                        p: 1
                    }}
                    variant="caption"
                >
                    {pedido.pedido.subStatus}
                </Typography>
            </TableCell>
            <TableCell align="center" >{pedido.pedido.responsavel}</TableCell>
            <TableCell align="center" >
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="NF"
                    value={nf}
                    onChange={(e) => setNf(e.target.value)}
                    onBlur={() => {
                        setPedidos((prevState) => prevState.map((prevPedido) => {
                            if (prevPedido.pedido._id === pedido.pedido._id) {
                                prevPedido.nf = nf
                            }
                            return prevPedido
                        }))
                    }}
                    disabled={pedido.status === 'FATURADO'}
                />
            </TableCell>
            <TableCell>
                {
                    pedido.status === 'A FATURAR' ? (
                        <Button
                            variant="contained"
                            onClick={() => handleFaturar(pedido._id, nf)}
                        >
                            Faturar
                        </Button>
                    ) : (
                        <Typography
                            sx={{
                                bgcolor: green[100],
                                color: green[900],
                                borderRadius: 2,
                                p: 1,
                                fontWeight: 'bold'
                            }}
                            variant="caption"
                        >
                            FATURADO
                        </Typography>
                    )
                }
                <ModalComponent
                    buttonColorScheme={red[900]}
                    headerText={'Excluir'}
                    textButton={'Excluir'}
                    size={'sm'}
                    saveButtonColorScheme={red[900]}
                    onAction={() => handleDelete(pedido._id)}
                    buttonIcon={<Delete />}
                >
                    <Typography>Tem certeza que deseja excluir do faturamento?</Typography>
                    <Alert
                        severity="error"
                        sx={{
                            mt: 2
                        }}
                        variant="filled"
                    >
                        Este caso deverá ser refeito para voltar para o faturamento
                    </Alert>
                </ModalComponent>
            </TableCell>
        </TableRow>
    )
}

const Nf = ({ setPedidos, setMessage, setSeverity, setOpenToast, handleFaturarLote, pedidos, progress }) => {

    const [nf, setNf] = useState('')

    const handlePreencherNfs = () => {
        try {
            setPedidos((prevState) => prevState.map((pedido) => {
                pedido.nf = nf
                return pedido
            }))
            setOpenToast(true)
            setMessage('NFs preenchidas com sucesso')
            setSeverity('success')
        }
        catch (error) {
            console.error(error)
            setOpenToast(true)
            setMessage('Erro ao preencher NFs')
            setSeverity('error')
        }
    }

    return <Box
        display={'flex'}
        gap={1}
        flexWrap={'wrap'}
    >
        <TextField
            variant="outlined"
            size="small"
            placeholder="NF"
            value={nf}
            onChange={(e) => setNf(e.target.value)}
        />
        <Button
            variant="contained"
            sx={{
                bgcolor: blue[900],
                color: 'white'
            }}
            onClick={handlePreencherNfs}
        >
            Preenhcer nfs
        </Button>
        <ModalComponent
            buttonColorScheme={orange[900]}
            headerText={'Faturar Lote'}
            textButton={'Faturar Lote'}
            buttonText={'Faturar Lote'}
            size={'sm'}
            saveButtonColorScheme={orange[900]}
            isButton={true}
            onAction={handleFaturarLote}
        >
            <Box
                display={'flex'}
                gap={2}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
            >
                <Typography>Tem certeza que deseja faturar o lote? {pedidos.filter(pedido => pedido.nf).length} pedidos</Typography>
                <LinearProgress
                    sx={{
                        width: '100%'
                    }}
                    variant="determinate"
                    value={progress}
                />
            </Box>
        </ModalComponent>
    </Box>
}


const Faturamento = () => {

    const { acessos } = useContext(AuthContext)
    // const { register, handleSubmit, setValue } = useForm()

    const [pedidos, setPedidos] = useState([])
    const [lotes, setLotes] = useState([])
    const [lote, setLote] = useState('')
    const [statusFaturamento, setStatusFaturamento] = useState('A FATURAR')
    const [beneficiario, setBeneficiario] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')

    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(100)
    const [total, setTotal] = useState(0)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    useEffect(() => {
        if (acessos) {
            if (!acessos.administrador) {
                window.location.href = '/'
            }
        }
    }, [acessos])

    useEffect(() => {
        const fetchLotes = async () => {
            try {
                const response = await getDatasCriacoaPedido()
                setLotes(response)
            } catch (error) {
                console.error(error)
                setOpenToast(true)
                setMessage('Erro ao buscar lotes')
                setSeverity('error')
            }
        }
        fetchLotes()
    }, [])

    const fetch = async () => {
        try {
            setLoading(true)
            const response = await filterFaturamento(page, limit, lote, statusFaturamento, beneficiario)
            setPedidos(response.result)
            setTotal(response.total)
            setLoading(false)
        } catch (error) {
            console.error(error);
            setOpenToast(true)
            setMessage('Erro ao buscar pedidos')
            setSeverity('error')
        }
    }

    useEffect(() => {
        fetch()
    }, [page, limit, lote, statusFaturamento])

    const handleFaturar = async (id, nf) => {
        try {
            if (!nf) {
                throw new Error('NF é obrigatório')
            }
            console.log(id, nf);
            await updateFaturamento(id, { status: 'FATURADO', nf })
            setOpenToast(true)
            setMessage('Pedido faturado com sucesso')
            setSeverity('success')
            await fetch()
        }
        catch (error) {
            console.log(error);
            setOpenToast(true)
            setSeverity('error')
            setMessage(`Erro! ${error}`)
        }
    }

    const handleFaturarLote = async () => {
        try {
            const newPedidos = [...pedidos].filter((pedido) => pedido.nf && pedido.status === 'A FATURAR')
            for (const pedido of newPedidos) {
                if (!pedido.nf) {
                    throw new Error('NF é obrigatório')
                }
                await updateFaturamento(pedido._id, { status: 'FATURADO', nf: pedido.nf })
                // setPedidos((prevState) => prevState.filter((prevPedido) => prevPedido.pedido._id !== pedido.pedido._id))
                setProgress((prevState) => prevState + 100 / newPedidos.length)
            }
            fetch()
            setOpenToast(true)
            setMessage('Lote faturado com sucesso')
            setSeverity('success')
        }
        catch (error) {
            setOpenToast(true)
            setMessage('Erro ao faturar lote')
            setSeverity('error')
            throw new Error(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteFaturamento(id)
            setPedidos((prevState) => prevState.filter((prevPedido) => prevPedido._id !== id))
            setOpenToast(true)
            setMessage('NF excluída com sucesso')
            setSeverity('success')
        }
        catch (error) {
            console.error(error)
            setOpenToast(true)
            setMessage('Erro ao excluir NF')
            setSeverity('error')
        }
    }

    return (
        <Sidebar>
            <Box
                sx={{
                    m: 2
                }}
            >
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Title
                        fontColor={blue[900]}
                        lineColor={orange[900]}
                        size={'small'}
                    >
                        Faturamento Sul America
                    </Title>
                    <ModalComponent
                        buttonColorScheme={blue[900]}
                        headerText={'Relatório de Faturamento'}
                        textButton={'Gerar Relatório'}
                        buttonText={'Gerar Relatório'}
                        size={'sm'}
                        saveButtonColorScheme={blue[900]}
                        isButton={true}
                    >
                        <Box
                            display={'flex'}
                            gap={2}
                            justifyContent={'center'}
                            alignItems={'center'}
                            flexDirection={'column'}
                        >
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Data Início"
                                fullWidth
                                type="date"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Data Fim"
                                fullWidth
                                type="date"
                                value={dataFim}
                                onChange={(e) => setDataFim(e.target.value)}
                            />
                        </Box>
                    </ModalComponent>
                </Box>
                <Box>
                    <Box
                        mt={2}
                        mb={2}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                        flexWrap={'wrap'}
                        gap={2}
                    >
                        <Box
                            display={'flex'}
                            gap={1}
                            flexWrap={'wrap'}
                        >
                            <FormControl sx={{ width: '300px' }} size="small">
                                <InputLabel>Lote</InputLabel>
                                <Select
                                    label="Lote"
                                    value={lote}
                                    onChange={(e) => setLote(e.target.value)}
                                >
                                    <MenuItem value={''}>Todos</MenuItem>
                                    {
                                        lotes.map((lote) => (
                                            <MenuItem key={lote} value={lote}>{moment(lote).format('DD/MM/YYYY')}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: '300px' }} size="small">
                                <InputLabel>Status Faturamento</InputLabel>
                                <Select
                                    label="Status Faturamento"
                                    value={statusFaturamento}
                                    onChange={(e) => setStatusFaturamento(e.target.value)}
                                >
                                    <MenuItem value={''}>Todos</MenuItem>
                                    <MenuItem value={'FATURADO'}>Faturado</MenuItem>
                                    <MenuItem value={'A FATURAR'}>A Faturar</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Nf
                            setPedidos={setPedidos}
                            setMessage={setMessage}
                            setSeverity={setSeverity}
                            setOpenToast={setOpenToast}
                            handleFaturarLote={handleFaturarLote}
                            pedidos={pedidos}
                            progress={progress}
                            key={pedidos.length}
                        />
                    </Box>
                    <form onSubmit={e => {
                        e.preventDefault()
                        console.log(beneficiario);
                        // fetch()
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 2
                            }}
                        >
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Pesquisar"
                                fullWidth
                            // value={beneficiario}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: blue[900],
                                    color: 'white'
                                }}
                                type="submit"
                            >
                                Pesquisar
                            </Button>

                        </Box>
                    </form>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'gray'
                            }}
                        >
                            {total} Pedidos
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2
                        }}
                    >
                        <FormControl
                            sx={{
                                width: '100px'
                            }}
                            size="small"
                        >
                            <InputLabel>Limite</InputLabel>
                            <Select
                                value={limit}
                                onChange={(e) => setLimit(e.target.value)}
                                label="Limite"
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                                <MenuItem value={500}>500</MenuItem>
                            </Select>
                        </FormControl>
                        <Pagination
                            count={Math.ceil(total / limit)}
                            onChange={(e, page) => setPage(page)}
                        />
                    </Box>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow
                                    sx={{
                                        backgroundColor: blue[900]
                                    }}
                                >
                                    <TableCell align="center" sx={{ color: 'white' }}>ID</TableCell>
                                    <TableCell align="center" sx={{ color: 'white' }}>Lote</TableCell>
                                    <TableCell align="center" sx={{ color: 'white' }}>Beneficiário</TableCell>
                                    <TableCell align="center" sx={{ color: 'white' }}>Status</TableCell>
                                    <TableCell align="center" sx={{ color: 'white' }}>Sub Status</TableCell>
                                    <TableCell align="center" sx={{ color: 'white' }}>Responsável</TableCell>
                                    <TableCell align="center" sx={{ color: 'white' }}>NF</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    loading && (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">
                                                <LinearProgress />
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                                {
                                    pedidos.map((pedido) => (
                                        <Row
                                            key={`${pedido.nf}-${pedido._id}`}
                                            pedido={pedido}
                                            setPedidos={setPedidos}
                                            handleFaturar={handleFaturar}
                                            handleDelete={handleDelete}
                                        />
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            <Toast
                open={openToast}
                message={message}
                severity={severity}
                onClose={() => setOpenToast(false)}
            />

        </Sidebar >
    )
}

export default Faturamento
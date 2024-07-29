import { useEffect, useState } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { TextField, Select, FormControl, MenuItem, InputLabel, Box, CircularProgress, Container, Chip, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Pagination, LinearProgress } from "@mui/material";
import { filterUsers } from "../../../../_services/user.service";
import { PropostaService } from "../../../../_services/teleEntrevistaV2.service";
import { Search } from "@mui/icons-material";
import Title from "../../../../components/Title/Title";
import Toast from "../../../../components/Toast/Toast";
import LinhaAgendado from "./components/LinhaAgendado";
import { RnService } from "../../../../_services/rn.service";
import MenuOpcoes from "../Agendar/components/MenuOpcoes";
import moment from "moment";

const propostaService = new PropostaService()
const rnService = new RnService()

const Agendado = () => {

    const [propostas, setPropostas] = useState([])
    const [enfermeiros, setEnfermeiros] = useState([])
    const [responsavel, setResponsavel] = useState('')
    const [loading, setLoading] = useState(false)
    const [pesquisa, setPesquisa] = useState('')
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [refresh, setRefresh] = useState(false)

    const searchEnfermeiro = async () => {
        try {
            const result = await filterUsers({
                atividadePrincipal: 'Tele Entrevista',
                inativo: { $ne: true }
            })
            setEnfermeiros(result)
        } catch (error) {
            console.log(error);
            setOpenToast(true)
            setMessage('Erro ao buscar enfermeiros')
            setSeverity('error')
        }
    }

    useEffect(() => {
        searchEnfermeiro()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const result = await propostaService.findByFilter({
                    status: { $nin: ['Concluído', 'Cancelado'] },
                    pesquisa,
                    responsavel,
                    agendado: 'agendado',
                    sort: 'dataEntrevista',
                    limit,
                    page
                })
                const resultRn = await rnService.findByFilter({
                    status: { $nin: ['Concluido', 'Cancelado'] },
                    pesquisa,
                    responsavel,
                    agendado: 'Agendado',
                    sort: 'dataEntrevista',
                    limit,
                    page
                })
                console.log(resultRn);
                setPropostas([...result.propostas.map(p => { return { ...p, tipo: 'Tele' } }), ...resultRn.pedidos.map(p => { return { ...p, tipo: 'RN' } })].sort((a, b) => new Date(a.dataEntrevista) - new Date(b.dataEntrevista)))
                setTotal(result.total)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setOpenToast(true)
                setMessage('Erro ao buscar propostas')
                setSeverity('error')
                setLoading(false)
                setPropostas([])
            }
        }
        fetch()

    }, [responsavel, pesquisa, limit, page, refresh])

    return (
        <Sidebar>
            <Container
                maxWidth="xl"
            >
                <Title
                    size={'medium'}
                >
                    Agendados
                </Title>
                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    mt={2}
                    mb={2}
                >
                    <FormControl size='small'>
                        <InputLabel>Analista</InputLabel>
                        <Select
                            style={{ minWidth: '200px' }}
                            labelId='label-analista'
                            id='select-analista'
                            label="Analista"
                            onChange={e => {
                                setResponsavel(e.target.value)
                            }}
                            value={responsavel}
                        >
                            <MenuItem value=''>Todos</MenuItem>
                            {
                                enfermeiros.map(e => {
                                    return (
                                        <MenuItem key={e._id} value={e.name}>{e.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <TextField
                        size="small"
                        placeholder="Nome, CPF, Proposta"
                        fullWidth
                        InputProps={{
                            endAdornment: <Search />
                        }}
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                    />
                </Box>
                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    mt={2}
                    mb={2}
                >
                    <FormControl size="small">
                        <InputLabel>Linhas</InputLabel>
                        <Select
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            label="Linhas"
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                    <Pagination
                        count={Math.ceil(total / limit)}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                    />
                </Box>
                <Box
                    mt={2}
                    mb={2}
                >
                    <Chip
                        color="primary" label={`Total: ${total}`}
                    />
                </Box>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Analista</TableCell>
                                <TableCell>Proposta</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Idade</TableCell>
                                <TableCell>Sexo</TableCell>
                                <TableCell align="center">Telefone</TableCell>
                                <TableCell align="center">Tentativas</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loading && (
                                    <TableRow>
                                        <TableCell colSpan={10} style={{ textAlign: 'center' }}>
                                            <LinearProgress />
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                            {
                                propostas.map(proposta => {
                                    return (
                                        proposta.tipo === 'Tele' ? <LinhaAgendado
                                            key={proposta._id}
                                            proposta={proposta}
                                            setPropostas={setPropostas}
                                            setOpenToast={setOpenToast}
                                            setSeverity={setSeverity}
                                            setMessage={setMessage}
                                            setRefresh={setRefresh}
                                        /> : (
                                            <TableRow key={proposta._id}>
                                                <TableCell>{proposta.tipo}</TableCell>
                                                <TableCell>{moment(proposta.dataEntrevista).format('DD/MM/YYYY HH:mm')}</TableCell>
                                                <TableCell>{proposta.responsavel}</TableCell>
                                                <TableCell>{proposta.proposta}</TableCell>
                                                <TableCell>{proposta.beneficiario}</TableCell>
                                                <TableCell>{proposta.idade}</TableCell>
                                                <TableCell>{proposta.sexo}</TableCell>
                                                <TableCell align="center">{proposta.telefones}</TableCell>
                                                <TableCell align="center"></TableCell>
                                                <TableCell align="center">
                                                    <MenuOpcoes
                                                        proposta={proposta}
                                                        setRefresh={setRefresh}
                                                        setOpenToast={setOpenToast}
                                                        setSeverity={setSeverity}
                                                        setMessage={setMessage}
                                                        rn={true}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Toast
                    open={openToast}
                    onClose={() => setOpenToast(false)}
                    message={message}
                    severity={severity}
                />
            </Container>
        </Sidebar>

    )
}

export default Agendado
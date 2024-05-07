import { useEffect, useState } from "react"
import { getUsers } from "../../../../_services/user.service"
import { Box, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, FormControl, InputLabel, Select, MenuItem, Button, Divider, Typography, FormControlLabel, Checkbox, FormGroup, CardContent, Card } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { blue, green, grey, red, yellow } from "@mui/material/colors";
import { filterTableDemi, findAcoesDemissao } from "../../../../_services/admissaoDemissao.service";
import moment from "moment";
import TableObs from "./Components/TableObs";
import TableData from "./Components/TableData";
import TableStatus from "./Components/TableStatus";

const TableEnhanced = ({ nomes, setFlushHook, setUser }) => {

    return (
        <Container maxWidth>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ bgcolor: blue[600] }}>
                        <TableCell sx={{ color: "white" }} >
                            NOME
                        </TableCell>
                        <TableCell sx={{ color: "white" }}>
                            E-MAIL
                        </TableCell>
                        <TableCell sx={{ color: "white" }}>
                            DATA DE ADMISSÃO
                        </TableCell>
                        <TableCell sx={{ color: "white" }}>
                            SETOR
                        </TableCell>
                        <TableCell sx={{ color: "white" }} >
                            MATRÍCULA
                        </TableCell>
                        <TableCell sx={{ color: "white" }}>
                            AÇÕES
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {nomes.map((item) => {
                        return (
                            <TableBodyAdmDem setUser={setUser} user={item} setFlushHook={setFlushHook} />
                        )
                    })}
                </TableBody>
            </Table>
        </Container >
    )
}

const TableBodyAdmDem = ({ setUser, user, setFlushHook }) => {

    const [openRow, setOpenRow] = useState(false)

    return (
        <>
            <TableRow key={user._id}>
                <TableCell >{user.nomeCompleto ? (user.nomeCompleto) : (user.name)}</TableCell>
                <TableCell >{user.email}</TableCell>
                <TableCell >{user.dataAdmissao ? (moment(user.dataAdmissao).format('DD/MM/YYYY')) : ('')}</TableCell>
                <TableCell >{user.atividadePrincipal}</TableCell>
                <TableCell >{user.matricula}</TableCell>
                <TableCell >
                    <IconButton
                        size="small"
                        onClick={() => {
                            setOpenRow(!openRow)
                        }}
                    >
                        {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={15}>
                    <Collapse in={openRow} timeout="auto" unmountOnExit>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow className="table-header">
                                        <TableCell>RESPONSÁVEL</TableCell>
                                        <TableCell>AÇÃO</TableCell>
                                        <TableCell>FORNECEDOR</TableCell>
                                        <TableCell>OBSERVAÇÃO</TableCell>
                                        <TableCell>STATUS</TableCell>
                                        <TableCell>DATA</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.demissao.map((item) => {
                                        let color
                                        if (item.status === 'pendente' || !item.status) {
                                            color = red[300]
                                        } if (item.status === 'emAndamento') {
                                            color = yellow[300]
                                        } if (item.status === 'concluido') {
                                            color = green[300]
                                        }
                                        return (
                                            <TableRow key={item.id} style={{ backgroundColor: color }}>
                                                <TableCell>{item.responsavel}</TableCell>
                                                <TableCell>{item.acao}</TableCell>
                                                <TableCell>{item.fornecedor}</TableCell>
                                                <TableCell>{
                                                    <TableObs item={item} user={user} setFlushHook={setFlushHook} setUser={setUser} />
                                                }</TableCell>
                                                <TableCell>
                                                    <TableStatus item={item} user={user} setFlushHook={setFlushHook} setUser={setUser} />
                                                </TableCell>
                                                <TableCell>{
                                                    <TableData item={item} user={user} setFlushHook={setFlushHook} setUser={setUser} />
                                                }</TableCell>
                                            </TableRow>)
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Collapse>
                </TableCell >
            </TableRow >
        </>
    )
}

const Filter = ({ acao, setAcoes, acoes, status, setStatus, responsaveis, setResponsaveis, handleClickFilter }) => {


    const handleChangeResponsaveis = (event) => {
        if (event.target.name === 'samanthaMacielGiazzon') {
            setResponsaveis({ ...responsaveis, samanthaMacielGiazzon: event.target.checked });
        } else if (event.target.name === 'administrador') {
            setResponsaveis({ ...responsaveis, administrador: event.target.checked });
        } else if (event.target.name === 'gersonDouglas') {
            setResponsaveis({ ...responsaveis, gersonDouglas: event.target.checked });
        }
    }

    const handleChangeStatus = (event) => {
        setStatus({ ...status, [event.target.name]: event.target.checked });
    }

    const handleClear = () => {
        setResponsaveis({
            samanthaMacielGiazzon: false,
            administrador: false,
            gersonDouglas: false,
        })

        setStatus({
            pendente: false,
            naoSeAplica: false,
            emAndamento: false,
            concluido: false,
        })
        setAcoes('')
    }

    return (
        <>
            <Box m={2}>
                <h3>Filtros</h3>
                <br />
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button variant='contained' onClick={handleClickFilter}>Filtrar</Button>
                    <Button variant='contained' onClick={handleClear}>Limpar</Button>
                </Box>
                <br />
                <Divider />
                <Typography>
                    <strong>Responsáveis</strong>
                </Typography>
                <FormGroup >
                    <FormControlLabel control={<Checkbox checked={responsaveis.samanthaMacielGiazzon} onChange={handleChangeResponsaveis} name='samanthaMacielGiazzon' />} label='Samantha Maciel Giazzon' />
                    <FormControlLabel control={<Checkbox checked={responsaveis.administrador} onChange={handleChangeResponsaveis} name='administrador' />} label='Administrador' />
                    <FormControlLabel control={<Checkbox checked={responsaveis.gersonDouglas} onChange={handleChangeResponsaveis} name='gersonDouglas' />} label='Gerson Douglas' />
                </FormGroup>
                <Divider />
                <Typography>
                    <strong>Status</strong>
                </Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={status.naoSeAplica} onChange={handleChangeStatus} name='naoSeAplica' />} label='N/A' />
                    <FormControlLabel control={<Checkbox checked={status.pendente} onChange={handleChangeStatus} name='pendente' />} label='Pendente' />
                    <FormControlLabel control={<Checkbox checked={status.emAndamento} onChange={handleChangeStatus} name='emAndamento' />} label='Em Andamento' />
                    <FormControlLabel control={<Checkbox checked={status.concluido} onChange={handleChangeStatus} name='concluido' />} label='Concluído' />
                </FormGroup>
                <Divider />
                <Typography>
                    <strong>Ação</strong>
                </Typography>
                <br />
                <FormControl size='small' fullWidth>
                    <InputLabel id="demo-simple-select-label">Ação</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={acoes}
                        label='Acao'
                        onChange={(e) => setAcoes(e.target.value)}
                        sx={{ borderRadius: '10px' }}
                    >
                        {acao.map((acoes) => (
                            <MenuItem
                                key={acoes}
                                value={acoes}
                            >
                                {acoes}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </>
    )
}

const CardDemissional = () => {

    const color = grey[300]

    const [nomes, setNomes] = useState([])
    const [flushHook, setFlushHook] = useState(false)
    const [acao, setAcao] = useState([])
    const [acoes, setAcoes] = useState('')
    const [user, setUser] = useState(null);

    const [responsaveis, setResponsaveis] = useState({
        samanthaMacielGiazzon: false,
        administrador: false,
        gersonDouglas: false,
    })

    const [status, setStatus] = useState({
        naoSeAplica: false,
        pendente: false,
        emAndamento: false,
        concluido: false,
    })

    const handleClickFilter = async () => {
        const filter = await filterTableDemi({ status, responsavel: responsaveis, acao: acoes })
        setNomes(filter.result)
        console.log(filter)
    }

    const handleChange = async () => {
        const encontrarAcao = await findAcoesDemissao()
        setAcao(encontrarAcao.acoes)
        console.log(encontrarAcao)
    }

    useEffect(() => {
        const buscarNomes = async () => {
            try {
                const result = await getUsers()
                setNomes(result)
                console.log(result)
            } catch (error) {
                console.log(error);
            }
        }
        handleChange()
        handleClickFilter()
        setFlushHook(false)
    }, [flushHook])

    return (
        <>
            <Box display={'flex'} mt={2}>
                <Card sx={{ bgcolor: color, width: '350px', mb: `20px`, borderRadius: `10px`, padding: '0' }}>
                    <CardContent sx={{ padding: '0' }} >
                        <Box width={'100%'}>
                            <Filter
                                acao={acao}
                                acoes={acoes}
                                setAcoes={setAcoes}
                                nomes={nomes}
                                status={status}
                                setStatus={setStatus}
                                responsaveis={responsaveis}
                                setResponsaveis={setResponsaveis}
                                handleClickFilter={handleClickFilter}
                            />
                        </Box>
                    </CardContent>
                </Card>
                <Box width={'100%'} ml={2}>
                    <Card sx={{ bgcolor: color, borderRadius: `10px` }}>
                        <Box component={Paper} p={1} m={1} sx={{ overflow: 'hidden' }}>
                            <TableContainer sx={{ marginBottom: '20px' }}>
                                <Table size={'small'}>
                                    <TableEnhanced nomes={nomes} setFlushHook={setFlushHook} setUser={setUser} />
                                </Table>
                            </TableContainer>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </>
    )
}

export default CardDemissional
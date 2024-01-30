import { useEffect, useState } from "react"
import { getUsers } from "../../../../_services/user.service"
import { Box, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, FormControl, InputLabel, Select, TextField, MenuItem, FormControlLabel, Checkbox, Card, Button, Divider, Typography, FormGroup, CardContent } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { blue, green, grey, red, yellow } from "@mui/material/colors";
import { filterTableAdmi, findAcoesAdmissao, setarStatus, updateData, updateObs, updateProrrogacao } from "../../../../_services/admissaoDemissao.service";
import moment from "moment";

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
    const [prorrogacao, setProrrogacao] = useState(user.prorrogacao)

    const handleChangeStatus = async (_id, status, id) => {
        const resultado = await setarStatus({
            _id: _id, status: status, id: id, tipoExame: 'admissao'
        })
        setUser(resultado)
        setFlushHook(true)
        console.log(resultado)
        console.log(_id, status, id)
    }

    const ativarObs = async (_id, obs, id) => {
        try {
            const result = await updateObs({
                _id: user._id, obs: obs, id: id, tipoExame: 'admissao'
            });
            setUser(result)
            console.log(_id, obs, id);
        } catch (error) {
            console.error('Erro no Update das Observações:', error);
        }
        setFlushHook(true)
    }

    const ativarData = async (_id, data, id) => {
        try {
            const result = await updateData({
                _id: user._id, data: data, id: id, tipoExame: 'admissao'
            });
            setUser(result)
            console.log(_id, data, id);
        } catch (error) {
            console.error('Erro no update da Data:', error);
        }
        setFlushHook(true)
    }

    return (
        <>
            <TableRow key={user._id}>
                <TableCell >{user.name}</TableCell>
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
                        <FormControlLabel
                            value={prorrogacao}
                            control={<Checkbox value={prorrogacao} checked={prorrogacao} />}
                            label="Assinado contrato de prorrogação após 30 dias"
                            labelPlacement="start"
                            onChange={async (e) => {
                                await updateProrrogacao({ name: user.name, prorrogacao: !prorrogacao })
                                setProrrogacao(!prorrogacao)
                                setFlushHook(true)
                            }}
                        />
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
                                    {user.admissao.map((item) => {
                                        let color
                                        if (item.status === 'pendente' || !item.status) {
                                            color = red[300]
                                        } if (item.status === 'emAndamento') {
                                            color = yellow[300]
                                        } if (item.status === 'concluido') {
                                            color = green[300]
                                        }
                                        return (
                                            <TableRow key={item._id} style={{ backgroundColor: color }}>
                                                <TableCell>{item.responsavel}</TableCell>
                                                <TableCell>{item.acao}</TableCell>
                                                <TableCell>{item.fornecedor}</TableCell>
                                                <TableCell>{<TextField defaultValue={item.obs} type='text' label='Obs' onChange={(elemento) => ativarObs(user._id, elemento.target.value, item.id)} />}</TableCell>
                                                <TableCell>
                                                    <FormControl sx={{ minWidth: 150 }}>
                                                        <InputLabel id='Status'>Status</InputLabel>
                                                        <Select value={item.status} labelId="Status" id='Status' label='Status' onChange={(elemento) => handleChangeStatus(user._id, elemento.target.value, item.id)} >
                                                            <MenuItem value={'naoSeAplica'}>N/A</MenuItem>
                                                            <MenuItem value={'pendente'}>PENDENTE</MenuItem>
                                                            <MenuItem value={'emAndamento'}>EM ANDAMENTO</MenuItem>
                                                            <MenuItem value={'concluido'}>CONCLUIDO</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>{<TextField defaultValue={item.data} type='date' focused label='Data' onChange={(elemento) => ativarData(user._id, elemento.target.value, item.id)} />}</TableCell>
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
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Ação</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={acoes}
                        label='Acao'
                        onChange={(e) => setAcoes(e.target.value)}
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

const CardAdmissional = () => {

    const color = grey[300]

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

    const [nomes, setNomes] = useState([])
    const [acao, setAcao] = useState([])
    const [acoes, setAcoes] = useState('')
    const [flushHook, setFlushHook] = useState(false)
    const [user, setUser] = useState(null);

    const handleClickFilter = async () => {
        const filter = await filterTableAdmi({ status, responsavel: responsaveis, acao: acoes })
        setNomes(filter.result)
        console.log(filter)
    }

    const handleChange = async () => {
        const encontrarAcao = await findAcoesAdmissao()
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
        handleClickFilter()
        handleChange()
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
                                nomes={nomes}
                                acoes={acoes}
                                setAcoes={setAcoes}
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

export default CardAdmissional
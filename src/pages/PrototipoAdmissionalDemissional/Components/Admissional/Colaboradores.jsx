import { useEffect, useState } from "react"
import { getUsers } from "../../../../_services/user.service"
import { Box, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, FormControl, InputLabel, Select, TextField, MenuItem, FormControlLabel, Checkbox } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { blue, green, red, yellow } from "@mui/material/colors";
import { setarStatus, updateData, updateObs, updateProrrogacao } from "../../../../_services/admissaoDemissao.service";
import moment from "moment";

const TableEnhanced = () => {

    const [nomes, setNomes] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const [user, setUser] = useState(null);

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
        setFlushHook(false)
        buscarNomes()
    }, [flushHook])


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
                                                        <Select defaultValue={item.status} labelId="Status" id='Status' label='Status' onChange={(elemento) => handleChangeStatus(user._id, elemento.target.value, item.id)} >
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

const Colaboradores = () => {

    return (
        <Box component={Paper} p={1} m={1} sx={{ overflow: 'hidden' }}>
            <TableContainer sx={{ marginBottom: '20px' }}>
                <Table size={'small'}>
                    <TableEnhanced />
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Colaboradores
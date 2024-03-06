import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import axios from "axios"
import moment from "moment"
import { useState, useEffect } from "react"
import ModalEditarFerias from "../Modais/ModalEditarFerias"
import { red, yellow, green, blue } from '@mui/material/colors';
import { updateGestorAceitou } from "../../../../_services/ferias"

const TabelaSolicitacao = ({ flushHook, setFlushHook }) => {

    const [snackSelect, setSnackSelect] = useState(false)
    const [solicitacoes, setSolicitacoes] = useState([])
    const [alerta, setAlerta] = useState(false)
    const [colaborador, setColaborador] = useState('')
    const [mes, setMes] = useState('')
    const [vencimento, setVencimento] = useState('')
    const [setor, setSetor] = useState('')

    const handleChangeSelect = async (id, status) => {
        const resultado = await axios.put(`${process.env.REACT_APP_API_KEY}/vacation/status`, {
            statusRh: status, _id: id
        }, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setFlushHook(true)
        setSnackSelect(true)
        console.log(resultado)
        console.log(id, status)
    }

    const handleCloseSelect = () => {
        setSnackSelect(false)
    }

    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/vacation/findAll`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setSolicitacoes(resultado.data.encontrarTodos)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook, setFlushHook])

    const handleFilter = async (event) => {
        event.preventDefault()

        if (colaborador.length > 2 || mes.length > 2 || vencimento.length > 2 || setor.length > 2) {
            const result = await axios.get(`${process.env.REACT_APP_API_KEY}/vacation/filter?colaborador=${colaborador}&mes=${mes}&vencimento=${vencimento}&setor=${setor}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(result)
            setSolicitacoes(result.data)
        } else {
            setAlerta(true)
            return
        }
    }

    const handleCloseInput = () => {
        setAlerta(false)
    }

    const isTrintaDias = (dataInicio) => {
        const currentDate = moment()
        const trintaDias = currentDate.add(30, 'days');

        return dataInicio.isSameOrBefore(trintaDias, 'day');
    }

    return (
        <>
            <form action="" >
                <TextField type='text' onChange={(e) => { setColaborador(e.target.value) }} size='small' label='Colaborador' sx={{ marginRight: '10px', width: '170px' }} />
                <TextField type='month' onChange={(e) => { setMes(e.target.value) }} size='small' focused label='Mês' sx={{ marginRight: '10px', width: '170px' }} />
                <TextField type='month' onChange={(e) => { setVencimento(e.target.value) }} size='small' focused label='Vencimento' sx={{ marginRight: '10px', width: '170px' }} />
                <TextField type='text' onChange={(e) => { setSetor(e.target.value) }} size='small' label='Setor' sx={{ marginRight: '10px', width: '170px' }} />
                <Button type="submit" onClick={handleFilter} variant='contained' >Pesquisar</Button>
                <Button onClick={() => setFlushHook(true)} variant='contained' sx={{ marginLeft: '10px' }}>Limpar Pesquisa</Button>
            </form>
            <br />
            <Snackbar open={alerta} autoHideDuration={6000} onClose={handleCloseInput}>
                <Alert variant="filled" onClose={handleCloseInput} severity="warning" sx={{ width: '100%' }}>
                    Digite no minimo 3 caracteres!
                </Alert>
            </Snackbar>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow className="table-header">
                                <TableCell>MÊS</TableCell>
                                <TableCell>VENCIMENTO</TableCell>
                                <TableCell>COLABORADOR</TableCell>
                                <TableCell>DATA DE INICIO</TableCell>
                                <TableCell>DATA FIM</TableCell>
                                <TableCell>TOTAL DIAS</TableCell>
                                <TableCell>STATUS RH</TableCell>
                                <TableCell>GESTOR APROVOU?</TableCell>
                                <TableCell>EDITAR</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {solicitacoes.map((item) => {
                                let color
                                const verificaData = isTrintaDias(moment(item.dataInicio))
                                if (verificaData) {
                                    color = red[300]
                                } if (item.statusRh === 'solicitado') {
                                    color = blue[300]
                                } if (item.statusRh === 'assinado') {
                                    color = yellow[300]
                                } if (item.statusRh === 'retirada') {
                                    color = green[300]
                                }
                                let gestorAprovou = item.gestorAprovou
                                let teste = solicitacoes.findIndex(solicitacao => (item.setor === solicitacao.setor) && (moment(item.dataInicio).format('YYYY-MM') === moment(solicitacao.dataInicio).format('YYYY-MM') && (solicitacao.colaborador !== item.colaborador)))
                                let corSetor

                                if (teste !== -1) {
                                    corSetor = red[900]
                                }
                                console.log(teste);

                                return (
                                    <TableRow key={item._id} style={{ backgroundColor: color }}>
                                        <TableCell sx={{ color: corSetor }}>{moment(item.dataInicio).format('MM/YYYY')}</TableCell>
                                        <TableCell>{moment(item.vencimento).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{item.colaborador}</TableCell>
                                        <TableCell>{moment(item.dataInicio).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{item.dataRetorno}</TableCell>
                                        <TableCell>{item.totalDias}</TableCell>
                                        <TableCell>
                                            <FormControl sx={{ minWidth: 135 }}>
                                                <InputLabel id='StatusRh'>Status do RH</InputLabel>
                                                <Select defaultValue={item.statusRh} labelId="StatusRh" id='StatusRh' label='Status do RH' onChange={(elemento) => handleChangeSelect(item._id, elemento.target.value)} >
                                                    <MenuItem value={'solicitado'}>SOLICITADO</MenuItem>
                                                    <MenuItem value={'assinado'}>ASSINADO</MenuItem>
                                                    <MenuItem value={'retirada'}>RETIRADA</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <FormControlLabel
                                                value={item.gestorAprovou}
                                                control={<Checkbox value={item.gestorAprovou} checked={item.gestorAprovou} />}
                                                label="Aprovado"
                                                labelPlacement="start"
                                                onChange={async (e) => {
                                                    await updateGestorAceitou({ _id: item._id, gestorAprovou: !gestorAprovou })
                                                    gestorAprovou = (!gestorAprovou)
                                                    setFlushHook(true)
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <ModalEditarFerias trocaData={item.dataInicio} setFlushHook={setFlushHook} id={item._id} />
                                        </TableCell>
                                    </TableRow>)
                            })}
                            <Snackbar open={snackSelect} autoHideDuration={6000} onClose={handleCloseSelect} >
                                <Alert variant="filled" onClose={handleCloseSelect} severity="success" sx={{ width: '100%' }}>
                                    Status alterado com sucesso!
                                </Alert>
                            </Snackbar>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default TabelaSolicitacao;
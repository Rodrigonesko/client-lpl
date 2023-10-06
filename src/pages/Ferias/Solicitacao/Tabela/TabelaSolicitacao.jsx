import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import axios from "axios"
import moment from "moment"
import { useState, useEffect } from "react"
import ModalEditarFerias from "../Modais/ModalEditarFerias"

const TabelaSolicitacao = ({ flushHook, setFlushHook }) => {

    const [snackSelect, setSnackSelect] = useState(false)
    const [solicitacoes, setSolicitacoes] = useState([])
    const [alerta, setAlerta] = useState(false)
    const [colaborador, setColaborador] = useState('')
    const [mes, setMes] = useState('')
    const [vencimento, setVencimento] = useState('')

    const handleChangeSelect = async (id, status) => {
        const resultado = await axios.put(`${process.env.REACT_APP_API_KEY}/vacation/status`, {
            statusRh: status, _id: id
        })
        setSnackSelect(true)
        console.log(resultado)
        console.log(id, status)
    }

    const handleCloseSelect = () => {
        setSnackSelect(false)
    }

    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/vacation/findAll`, { withCredentials: true })
        setSolicitacoes(resultado.data.encontrarTodos)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook, setFlushHook])

    const handleFilter = async (event) => {
        event.preventDefault()

        if (colaborador.length > 2 || mes.length > 2 || vencimento.length > 2) {
            const result = await axios.get(`${process.env.REACT_APP_API_KEY}/vacation/filter?colaborador=${colaborador}&mes=${mes}&vencimento=${vencimento}`, {
                withCredentials: true
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
    return (
        <>
            <form action="" >
                <TextField type='text' onChange={(e) => { setColaborador(e.target.value) }} size='small' label='Colaborador' sx={{ marginRight: '10px', width: '170px' }} />
                <TextField type='month' onChange={(e) => { setMes(e.target.value) }} size='small' focused label='Mês' sx={{ marginRight: '10px', width: '170px' }} />
                <TextField type='date' onChange={(e) => { setVencimento(e.target.value) }} size='small' focused label='Vencimento' sx={{ marginRight: '10px', width: '170px' }} />
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
                                <TableCell>DATA DE RETORNO</TableCell>
                                <TableCell>TOTAL DIAS</TableCell>
                                <TableCell>STATUS RH</TableCell>
                                <TableCell>EDITAR</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {solicitacoes.map((item) => {
                                return (
                                    <TableRow key={item._id}>
                                        <TableCell>{moment(item.dataInicio).format('MM/YYYY')}</TableCell>
                                        <TableCell>{moment(item.vencimento).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{item.colaborador}</TableCell>
                                        <TableCell>{moment(item.dataInicio).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{item.dataRetorno}</TableCell>
                                        <TableCell>{item.totalDias}</TableCell>
                                        <TableCell>
                                            <FormControl sx={{ minWidth: 135 }}>
                                                <InputLabel id='StatusRh'>Status do RH</InputLabel>
                                                <Select defaultValue={item.statusRh} labelId="StatusRh" id='StatusRh' label='Status do RH' onChange={(elemento) => handleChangeSelect(item._id, elemento.target.value)}>
                                                    <MenuItem value={'solicitado'}>SOLICITADO</MenuItem>
                                                    <MenuItem value={'assinado'}>ASSINADO</MenuItem>
                                                    <MenuItem value={'retirada'}>RETIRADA</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <ModalEditarFerias trocaData={item.dataInicio} setFlushHook={setFlushHook} id={item._id}/>
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
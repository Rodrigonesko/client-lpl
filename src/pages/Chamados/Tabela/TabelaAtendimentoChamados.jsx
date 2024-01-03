import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import ModalRetornarChamados from "../Modais/ModalRetornarChamado";

const TabelaAtendimentoChamados = () => {

    const [chamados, setChamados] = useState([])
    const [flushHook, setFlushHook] = useState(false)
    const [snackSelect, setSnackSelect] = useState(false)
    const [alerta, setAlerta] = useState(false)
    const [colaborador, setColaborador] = useState('')
    const [analista, setAnalista] = useState('')

    const handleCloseInput = () => {
        setAlerta(false)
    }

    const handleFilter = async (event) => {
        event.preventDefault()

        if ((colaborador.length > 2) || (analista.length > 2)) {
            const result = await axios.get(`${process.env.REACT_APP_API_KEY}/tasks/filter?colaborador=${colaborador}&analista=${analista}`, {
                withCredentials: true
            })
            console.log(result)
            setChamados(result.data)
        } else {
            setAlerta(true)
            return
        }
    }

    const handleChangeSelect = async (id, status) => {
        const resultado = await axios.put(`${process.env.REACT_APP_API_KEY}/tasks/status`, {
            status: status, _id: id
        })
        setSnackSelect(true)
        console.log(resultado)
        console.log(id, status)
    }

    const handleChangeAnalist = async (id, analista) => {
        const result = await axios.put(`${process.env.REACT_APP_API_KEY}/tasks/analist`, {
            analista: analista, _id: id
        })
        setSnackSelect(true)
        console.log(result)
        console.log(id, analista)
    }

    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/tasks/findAll`, { withCredentials: true })
        setChamados(resultado.data.encontrarTodos)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook])

    return (
        <>
            <div className="title">
                <h2>Atendimento de Chamados</h2>
            </div>
            <br />
            <form action="" >
                <TextField type='text' onChange={(e) => { setColaborador(e.target.value.toLocaleLowerCase()) }} size='small' label='Colaborador' sx={{ marginRight: '10px', width: '170px' }} />
                <TextField type='text' onChange={(e) => { setAnalista(e.target.value.toLocaleLowerCase()) }} size='small' label='Nome do Analista' sx={{ marginRight: '10px', width: '170px' }} />
                <Button type="submit" onClick={handleFilter} variant='contained' >Pesquisar</Button>
                <Button onClick={() => setFlushHook(true)} variant='contained' sx={{ marginLeft: '10px' }}>Atualizar Pesquisa</Button>
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
                                <TableCell>DATA ABERTURA</TableCell>
                                <TableCell>NOME</TableCell>
                                <TableCell>SETOR</TableCell>
                                <TableCell>ASSUNTO</TableCell>
                                <TableCell>DESCRIÇÃO</TableCell>
                                <TableCell>DATA FINALIZAÇÃO</TableCell>
                                <TableCell>ANALISTA</TableCell>
                                <TableCell>STATUS</TableCell>
                                <TableCell>RETORNO ANALISTA</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {chamados.map((item) => {
                                return (
                                    <TableRow key={item._id}>
                                        <TableCell>{moment(item.dataInicio).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{item.colaborador}</TableCell>
                                        <TableCell>{item.setor}</TableCell>
                                        <TableCell>{item.assunto}</TableCell>
                                        <TableCell>{item.descricao}</TableCell>
                                        <TableCell>{item.dataFinalizado ? moment(item.dataFinalizado).format('DD/MM/YYYY') : ('')}</TableCell>
                                        <TableCell>
                                            <FormControl sx={{ minWidth: 135 }}>
                                                <InputLabel id='Analista'>Analista</InputLabel>
                                                <Select defaultValue={item.analista} labelId="Analista" id='analista' label='analista' onChange={(elemento) => handleChangeAnalist(item._id, elemento.target.value).setFlushHook(true)}>
                                                    <MenuItem value={'leonardo'}>LEONARDO</MenuItem>
                                                    <MenuItem value={'rodrigo'}>RODRIGO</MenuItem>
                                                    <MenuItem value={'gerson'}>GERSON</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <FormControl sx={{ minWidth: 135 }}>
                                                <InputLabel id='Status'>Status</InputLabel>
                                                <Select defaultValue={item.status} labelId="Status" id='status' label='status' onChange={(elemento) => handleChangeSelect(item._id, elemento.target.value).setFlushHook(true)}>
                                                    <MenuItem value={'verificado'}>VERIFICADO</MenuItem>
                                                    <MenuItem value={'tratando'}>TRATANDO</MenuItem>
                                                    <MenuItem value={'finalizado'}>FINALIZADO</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <ModalRetornarChamados item={item} />
                                        </TableCell>
                                    </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default TabelaAtendimentoChamados;
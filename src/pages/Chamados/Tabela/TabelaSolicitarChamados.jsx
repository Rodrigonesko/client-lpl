import { Alert, Box, Button, Container, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

const TabelaSolicitarChamados = () => {

    const [chamados, setChamados] = useState([])
    const [flushHook, setFlushHook] = useState(false)
    const [snackSelect, setSnackSelect] = useState(false)
    const [colaborador, setColaborador] = useState('')
    const [alerta, setAlerta] = useState(false)


    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/tasks/findAll`, { withCredentials: true })
        setChamados(resultado.data.encontrarTodos)
    }

    const handleCloseInput = () => {
        setAlerta(false)
    }

    const handleFilter = async (event) => {
        event.preventDefault()

        if (colaborador.length > 2) {
            const result = await axios.get(`${process.env.REACT_APP_API_KEY}/tasks/filter?colaborador=${colaborador}`, {
                withCredentials: true
            })
            console.log(result)
            setChamados(result.data)
        } else {
            setAlerta(true)
            return
        }
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook])

    const handleCloseSelect = () => {
        setSnackSelect(false)
    }

    return (
        <>
            <Container>
                <Box display={"flex"} paddingTop={"15px"} paddingBottom={"15px"}>
                    <form action="" >
                        <TextField type='text' onChange={(e) => { setColaborador(e.target.value) }} size='small' label='Colaborador' sx={{ marginRight: '10px', width: '170px' }} />
                        <Button type="submit" onClick={handleFilter} variant='contained' >Pesquisar</Button>
                        <Button onClick={() => setFlushHook(true)} variant='contained' sx={{ marginLeft: '10px' }}>Atualizar Pesquisa</Button>
                    </form>
                    <br />
                    <Snackbar open={alerta} autoHideDuration={6000} onClose={handleCloseInput}>
                        <Alert variant="filled" onClose={handleCloseInput} severity="warning" sx={{ width: '100%' }}>
                            Digite no minimo 3 caracteres!
                        </Alert>
                    </Snackbar>
                </Box>
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
                                            <TableCell>{item.analista?.toUpperCase()}</TableCell>
                                            <TableCell>{item.status?.toUpperCase()}</TableCell>
                                            <TableCell>{item.retorno}</TableCell>
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
            </Container>
        </>
    )
}

export default TabelaSolicitarChamados;
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { red, yellow, green } from '@mui/material/colors';
import { useEffect, useState } from "react";
import axios from "axios";

const TabelaInventario = ({ flushHook, setFlushHook }) => {

    const [solicitacoes, setSolicitacoes] = useState([])
    const [nomeItem, setNomeItem] = useState('')
    const [ondeEsta, setOndeEsta] = useState('')
    const [snackSelect, setSnackSelect] = useState(false)
    const [alerta, setAlerta] = useState(false)

    const handleChangeStatus = async (id, status) => {
        const resultado = await axios.put(`${process.env.REACT_APP_API_KEY}/inventario/status`, {
            status: status, _id: id
        })
        setFlushHook(true)
        setSnackSelect(true)
        console.log(resultado)
        console.log(id, status)
    }

    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/inventario/findAll`, { withCredentials: true })
        setSolicitacoes(resultado.data.encontrarTodos)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook, setFlushHook])

    const handleCloseSelect = () => {
        setSnackSelect(false)
    }

    const handleFilter = async (event) => {
        event.preventDefault()

        if ((nomeItem.length > 2) || (ondeEsta.length > 2)) {
            const result = await axios.get(`${process.env.REACT_APP_API_KEY}/inventario/filter?nomeItem=${nomeItem}&ondeEsta=${ondeEsta}`, {
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
                <TextField type='text' onChange={(e) => { setNomeItem(e.target.value) }} size='small' label='Nome do Item' sx={{ marginRight: '10px', width: '170px' }} />
                <TextField type='text' onChange={(e) => { setOndeEsta(e.target.value) }} size='small' label='Com quem está' sx={{ marginRight: '10px', width: '170px' }} />
                <Button type="submit" onClick={handleFilter} variant='contained' >Pesquisar</Button>
                <Button onClick={() => setFlushHook(true)} variant='contained' sx={{ marginLeft: '10px' }}>Limpar Pesquisa</Button>
            </form>
            <Snackbar open={alerta} autoHideDuration={6000} onClose={handleCloseInput}>
                <Alert variant="filled" onClose={handleCloseInput} severity="warning" sx={{ width: '100%' }}>
                    Digite no minimo 3 caracteres!
                </Alert>
            </Snackbar>
            <br />
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow className="table-header">
                                <TableCell>NOME ITEM</TableCell>
                                <TableCell>ETIQUETA</TableCell>
                                <TableCell>COM QUEM ESTÁ</TableCell>
                                <TableCell>DESCRIÇÃO</TableCell>
                                <TableCell>STATUS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {solicitacoes.map((item) => {
                                let color
                                if (item.status === 'emEstoque') {
                                    color = yellow[300]
                                } if (item.status === 'emUso') {
                                    color = green[300]
                                } if (item.status === 'descontinuado') {
                                    color = red[300]
                                }
                                return (
                                    <TableRow key={item._id} style={{ backgroundColor: color }}>
                                        <TableCell>{item.nome}</TableCell>
                                        <TableCell>{item.etiqueta}</TableCell>
                                        <TableCell>{item.ondeEsta}</TableCell>
                                        <TableCell>{item.descricao}</TableCell>
                                        <TableCell>
                                            <FormControl sx={{ minWidth: 135 }}>
                                                <InputLabel id='Status'>Status</InputLabel>
                                                <Select defaultValue={item.status} labelId="Status" id='Status' label='Status' onChange={(elemento) => handleChangeStatus(item._id, elemento.target.value)} >
                                                    <MenuItem value={'emEstoque'}>EM ESTOQUE</MenuItem>
                                                    <MenuItem value={'emUso'}>EM USO</MenuItem>
                                                    <MenuItem value={'descontinuado'}>DESCONTINUADO</MenuItem>
                                                </Select>
                                            </FormControl></TableCell>
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

export default TabelaInventario
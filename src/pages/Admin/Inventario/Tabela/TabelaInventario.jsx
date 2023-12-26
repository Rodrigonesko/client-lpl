import { Alert, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Pagination, Select, Slide, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { red, yellow, green } from '@mui/material/colors';
import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalEditarInventario from "../Modais/ModalEditarInventario";
import { filterInventario } from "../../../../_services/inventario.service";

const TabelaInventario = ({ flushHook, setFlushHook }) => {

    const [solicitacoes, setSolicitacoes] = useState([])
    const [nomeItem, setNomeItem] = useState('')
    const [ondeEsta, setOndeEsta] = useState('')
    const [etiqueta, setEtiqueta] = useState('')
    const [snackSelect, setSnackSelect] = useState(false)
    const [alerta, setAlerta] = useState(false)

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [inventario, setInventario] = useState([]);

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

        setLoading(true);

        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/inventario/findAll`, { withCredentials: true })
        const solicitacoesData = resultado.data.encontrarTodos;

        const sortedSolicitacoes = solicitacoesData.sort((a, b) => a.etiqueta.localeCompare(b.etiqueta));
        setLoading(false)
        setSolicitacoes(sortedSolicitacoes)
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

        if ((nomeItem.length > 2) || (ondeEsta.length > 1) || (etiqueta.length > 2)) {
            const result = await axios.get(`${process.env.REACT_APP_API_KEY}/inventario/filter?nomeItem=${nomeItem}&ondeEsta=${ondeEsta}&etiqueta=${etiqueta}`, {
                withCredentials: true
            })
            console.log(result)

            setLoading(true);
            setPage(1)
            const sortedSolicitacoes = result.data.sort((a, b) => a.etiqueta.localeCompare(b.etiqueta))
            setSolicitacoes(sortedSolicitacoes)

            setInventario(result.result);
            setTotalPages(result.total);
            setLoading(false)
        } else {
            setAlerta(true)
            return
        }
    }

    const handleCloseInput = () => {
        setAlerta(false)
    }

    const fetchInventario = async (page) => {

        setLoading(true);

        try {
            const result = await filterInventario({
                nomeItem: nomeItem,
                ondeEsta: ondeEsta,
                etiqueta: etiqueta,
                page: page,
                limit: 100
            })
            setInventario(result.result);
            setTotalPages(result.total);
            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const handlePageChange = (event, value) => {
        setPage(value);
        fetchInventario(value);
    }

    return (
        <>
            <form action="" >
                <TextField type='text' onChange={(e) => { setNomeItem(e.target.value) }} size='small' label='Nome do Item' sx={{ marginRight: '10px', width: '170px' }} />
                <TextField type='text' onChange={(e) => { setOndeEsta(e.target.value) }} size='small' label='Com quem está' sx={{ marginRight: '10px', width: '170px' }} />
                <TextField type='text' onChange={(e) => { setEtiqueta(e.target.value) }} size='small' label='Etiqueta' sx={{ marginRight: '10px', width: '170px' }} />
                <Button type="submit" onClick={handleFilter} variant='contained' >Pesquisar</Button>
                <Button onClick={() => setFlushHook(true)} variant='contained' sx={{ marginLeft: '10px' }}>Limpar Pesquisa</Button>
            </form>
            <Snackbar open={alerta} autoHideDuration={6000} onClose={handleCloseInput}>
                <Alert variant="filled" onClose={handleCloseInput} severity="warning" sx={{ width: '100%' }}>
                    Digite no minimo 2 caracteres!
                </Alert>
            </Snackbar>
            <br />
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <TableContainer>
                    <Box display={'flex'} justifyContent={'flex-end'}>
                        <Pagination count={Math.ceil(totalPages / 10)} page={page} onChange={handlePageChange} />
                    </Box>
                    {
                        !loading ? (
                            <Table size='small'>
                                <TableHead>
                                    <TableRow className="table-header">
                                        <TableCell>NOME ITEM</TableCell>
                                        <TableCell>ETIQUETA</TableCell>
                                        <TableCell>COM QUEM ESTÁ</TableCell>
                                        <TableCell>DESCRIÇÃO</TableCell>
                                        <TableCell>STATUS</TableCell>
                                        <TableCell>BOTÕES</TableCell>
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
                                                    <FormControl sx={{ minWidth: 190 }}>
                                                        <InputLabel id='Status'>Status</InputLabel>
                                                        <Select defaultValue={item.status} labelId="Status" id='Status' label='Status' onChange={(elemento) => handleChangeStatus(item._id, elemento.target.value)} >
                                                            <MenuItem value={'emEstoque'}>EM ESTOQUE</MenuItem>
                                                            <MenuItem value={'emUso'}>EM USO</MenuItem>
                                                            <MenuItem value={'descontinuado'}>DESCONTINUADO</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>
                                                    <ModalEditarInventario id={item._id} setFlushHook={setFlushHook} trocaNome={item.nome} trocaEtiqueta={item.etiqueta} trocaOndeEsta={item.ondeEsta} trocaDescricao={item.descricao} />
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
                        ) : (
                            <Box width={'100%'} display={'flex'} justifyContent={"center"}>
                                <CircularProgress />
                            </Box>
                        )
                    }
                </TableContainer>
            </Box>
        </>
    )
}

export default TabelaInventario
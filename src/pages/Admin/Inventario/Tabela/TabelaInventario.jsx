import { Alert, Box, Button, Chip, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material"
import { red, yellow, green, blue } from '@mui/material/colors';
import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalEditarInventario from "../Modais/ModalEditarInventario";
import moment from "moment";
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { filterInventario } from "../../../../_services/inventario.service";

const TabelaInventario = ({ flushHook, setFlushHook }) => {

    const [solicitacoes, setSolicitacoes] = useState([])
    const [nomeItem, setNomeItem] = useState('')
    const [ondeEsta, setOndeEsta] = useState('')
    const [etiqueta, setEtiqueta] = useState('')
    const [status, setStatus] = useState('')
    const [snackSelect, setSnackSelect] = useState(false)

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1);

    const handleChangeStatus = async (id, status) => {
        const resultado = await axios.put(`${process.env.REACT_APP_API_KEY}/inventario/status`, {
            status: status, _id: id
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

    useEffect(() => {
        handleFilter()
        setFlushHook(false)
    }, [flushHook, setFlushHook, nomeItem, ondeEsta, etiqueta, status, page, rowsPerPage])

    const handleCloseSelect = () => {
        setSnackSelect(false)
    }

    const handleFilter = async () => {
        try {
            setLoading(true);
            const result = await filterInventario(
                nomeItem,
                ondeEsta,
                etiqueta,
                status,
                page,
                rowsPerPage,
            )
            setSolicitacoes(result.resultOrdenado)

            setTotalPages(result.total)
            console.log(result.total);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form action="" >
                <TextField type='text' onChange={(e) => { setNomeItem(e.target.value) }} value={nomeItem} size='small' label='Nome do Item' sx={{ marginRight: '10px', width: '170px' }} InputProps={{
                    style: {
                        borderRadius: '10px',
                    }
                }} />
                <TextField type='text' onChange={(e) => { setOndeEsta(e.target.value) }} value={ondeEsta} size='small' label='Com quem está' sx={{ marginRight: '10px', width: '170px' }} InputProps={{
                    style: {
                        borderRadius: '10px',
                    }
                }} />
                <TextField type='text' onChange={(e) => { setEtiqueta(e.target.value) }} value={etiqueta} size='small' label='Etiqueta' sx={{ marginRight: '10px', width: '170px' }} InputProps={{
                    style: {
                        borderRadius: '10px',
                    }
                }} />
                <FormControl size='small' sx={{ minWidth: 190 }} >
                    <InputLabel id='Status'>Status</InputLabel>
                    <Select
                        value={status}
                        labelId="Status"
                        margin='dense'
                        id='Status'
                        label='Status'
                        onChange={(e) => { setStatus(e.target.value) }}
                        sx={{ borderRadius: '10px', marginRight: '10px' }} >
                        <MenuItem value={'emEstoque'}>EM ESTOQUE</MenuItem>
                        <MenuItem value={'emUso'}>EM USO</MenuItem>
                        <MenuItem value={'descontinuado'}>DESCONTINUADO</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={() => {
                    setNomeItem('')
                    setOndeEsta('')
                    setEtiqueta('')
                    setStatus('')
                    setFlushHook(true)
                }} variant='contained' sx={{ marginLeft: '10px', borderRadius: '10px' }}>Limpar Pesquisa</Button>
            </form>
            <br />
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <TableContainer>
                    <Chip label={`Quantidade de Itens no inventario: ${totalPages}`} color='secondary' sx={{ fontSize: '15px' }} />
                    <Box display={'flex'} justifyContent={'space-between'} sx={{ mb: 2, mt: 2 }}>
                        <FormControl size="small" disabled={loading}>
                            <InputLabel>Linhas</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Linhas"
                                sx={{ width: '100px', borderRadius: '10px' }}
                                value={rowsPerPage}
                                onChange={(e) => setRowsPerPage(e.target.value)}
                            >
                                <MenuItem value={10} >10</MenuItem>
                                <MenuItem value={20} >20</MenuItem>
                                <MenuItem value={30} >30</MenuItem>
                                <MenuItem value={40} >40</MenuItem>
                                <MenuItem value={50} >50</MenuItem>
                                <MenuItem value={100} >100</MenuItem>
                            </Select>
                        </FormControl>
                        <Pagination count={
                            totalPages % rowsPerPage === 0 ?
                                Math.floor(totalPages / rowsPerPage) :
                                Math.floor(totalPages / rowsPerPage) + 1
                        } page={page} onChange={(e, value) => setPage(value)} disabled={loading} />
                    </Box>
                    {
                        !loading ? (
                            <Table size='small'>
                                <TableHead>
                                    <TableRow className="table-header" sx={{ bgcolor: blue[600] }}>
                                        <TableCell sx={{ color: "white" }} >NOME ITEM</TableCell>
                                        <TableCell sx={{ color: "white" }} >ETIQUETA</TableCell>
                                        <TableCell sx={{ color: "white" }} >COM QUEM ESTÁ</TableCell>
                                        <TableCell sx={{ color: "white" }} >DESCRIÇÃO</TableCell>
                                        <TableCell sx={{ color: "white" }} >DATA DE COMPRA</TableCell>
                                        <TableCell sx={{ color: "white" }} >DATA DE GARANTIA</TableCell>
                                        <TableCell sx={{ color: "white" }} >STATUS</TableCell>
                                        <TableCell sx={{ color: "white" }} >BOTÕES</TableCell>
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
                                                <TableCell>{
                                                    item.dataDeCompra ? moment(item.dataDeCompra).format('DD/MM/YYYY') : ''
                                                }</TableCell>
                                                <TableCell>{
                                                    item.dataGarantia ? moment(item.dataGarantia).format('DD/MM/YYYY') : ''
                                                }</TableCell>
                                                <TableCell>
                                                    <FormControl size='small' sx={{ minWidth: 190 }} >
                                                        <InputLabel id='Status'>Status</InputLabel>
                                                        <Select
                                                            defaultValue={item.status}
                                                            labelId="Status"
                                                            margin='dense'
                                                            id='Status'
                                                            label='Status'
                                                            onChange={(elemento) => handleChangeStatus(item._id, elemento.target.value)}
                                                            sx={{ borderRadius: '10px' }} >
                                                            <MenuItem value={'emEstoque'}>EM ESTOQUE</MenuItem>
                                                            <MenuItem value={'emUso'}>EM USO</MenuItem>
                                                            <MenuItem value={'descontinuado'}>DESCONTINUADO</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>
                                                    <ModalEditarInventario
                                                        id={item._id}
                                                        setFlushHook={setFlushHook}
                                                        trocaNome={item.nome}
                                                        trocaEtiqueta={item.etiqueta}
                                                        trocaOndeEsta={item.ondeEsta}
                                                        trocaDescricao={item.descricao}
                                                        trocaDataCompra={item.dataDeCompra}
                                                        trocaDataGarantia={item.dataGarantia}
                                                        trocaSerial={item.serial}
                                                    />
                                                    <Tooltip title='Nota Fiscal'>
                                                        <IconButton href={`${process.env.REACT_APP_API_KEY}/media/notasFiscais/${item.ondeEsta}-${item._id}.pdf`} target='_blank'>{item.anexado ? <FeedOutlinedIcon color='inherit' /> : []}</IconButton>
                                                    </Tooltip>
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
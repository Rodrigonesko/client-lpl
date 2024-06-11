import { Box, Chip, CircularProgress, Container, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import { indigo, red } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { getSeguradoByFilter, getSegurados } from "../../../_services/rsdBradesco.service"
import { ArrowForwardIos } from "@mui/icons-material"

const Segurados = () => {

    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)

    const [segurados, setSegurados] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    const fetchData = async () => {
        setLoading(true)
        try {
            const get = await getSeguradoByFilter(pesquisa, page, rowsPerPage)
            setSegurados(get.segurados)
            setTotalPages(get.total)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [page, rowsPerPage, pesquisa])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Title size={'medium'} fontColor={indigo[900]} lineColor={red[700]} >Segurados</Title>
                    <Box
                        sx={{
                            display: 'flex',
                            alignContent: 'center',
                            justifyContent: 'flex-start',
                            mt: 2
                        }}
                    >
                        <TextField type='text' size='small' name='pesquisa' label='Nome, cpf ou carteirinha' fullWidth
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                        />
                    </Box>
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
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        sx={{ mb: 2 }}
                        gap={2}
                    >
                        <Chip
                            label={`Total de Pedidos: ${totalPages}`}
                            color="primary"
                            variant="filled"
                            sx={{ bgcolor: red[700], color: 'white' }}
                        />
                    </Box>
                    <TableContainer>
                        {
                            !loading ? (
                                <Table
                                    size="small" elevation={7} sx={{ mb: 5, borderRadius: '15px' }}
                                >
                                    <TableHead sx={{ background: indigo[800] }}>
                                        <TableRow>
                                            <TableCell sx={{ color: 'white' }}>CPF</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Segurado</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Titular do Segurado</TableCell>
                                            <TableCell sx={{ color: 'white' }}>E-mail</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Celular</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            segurados.map((segurado) => (
                                                <TableRow>
                                                    <TableCell>{segurado.cpf}</TableCell>
                                                    <TableCell>
                                                        {
                                                            segurado.nome === segurado.nomeTitular ? (
                                                                <Chip label={segurado.nome} variant="outlined" color="error" sx={{ fontWeight: 'bold' }} />
                                                            ) : (
                                                                segurado.nome
                                                            )
                                                        }
                                                    </TableCell>
                                                    <TableCell>{segurado.nomeTitular}</TableCell>
                                                    <TableCell>{segurado.email}</TableCell>
                                                    <TableCell>{segurado.celular}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title={'Ficha Segurado'}>
                                                            <IconButton size="small" href={`/bradesco/fichaSegurado/${segurado._id}`} >
                                                                <ArrowForwardIos fontSize="10px" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            ) : (
                                <Box width={'100%'} display={'flex'} justifyContent={"center"}>
                                    <CircularProgress />
                                </Box>
                            )}
                    </TableContainer>
                </Container>
            </Sidebar>
        </>
    )
}

export default Segurados
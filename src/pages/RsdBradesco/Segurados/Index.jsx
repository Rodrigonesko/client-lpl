import { Box, Chip, CircularProgress, Container, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Tooltip } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import { indigo, red } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { getTitularesByFilter } from "../../../_services/rsdBradesco.service"
import { ArrowForwardIos } from "@mui/icons-material"
import ModalCriarTitular from "./components/ModalCriarTitular"
import { themeBradesco } from "../components/theme"

const Segurados = () => {

    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)
    const [flushHook, setFlushHook] = useState(false)

    const [titulares, setTitulares] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    const fetchData = async () => {
        setLoading(true)
        try {
            const get = await getTitularesByFilter(pesquisa, page, rowsPerPage)
            setTitulares(get.titulares)
            setTotalPages(get.total)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [page, rowsPerPage, pesquisa, flushHook])

    return (
        <Sidebar>
            <ThemeProvider theme={themeBradesco}>
                <Container maxWidth>
                    <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <Title size={'medium'} fontColor={indigo[900]} lineColor={red[700]} >Titulares</Title>
                        <ModalCriarTitular setFlushHook={setFlushHook} />
                    </Box>
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
                                            <TableCell sx={{ color: 'white' }}>Carteirinha</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Titular</TableCell>
                                            <TableCell sx={{ color: 'white' }}>E-mail</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Celular</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            titulares.map((titular) => (
                                                <TableRow>
                                                    <TableCell>{titular.codigo}</TableCell>
                                                    <TableCell>{titular.nome}</TableCell>
                                                    <TableCell>{titular.email}</TableCell>
                                                    <TableCell>{titular.celular}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title={'Ficha Titular'}>
                                                            <IconButton size="small" href={`/bradesco/fichaSegurado/${titular._id}`} >
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
            </ThemeProvider>
        </Sidebar>
    )
}

export default Segurados
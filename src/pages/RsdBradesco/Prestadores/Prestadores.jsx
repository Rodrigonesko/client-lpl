import { Box, Container, FormControl, InputLabel, Pagination, Select, TextField, MenuItem, ThemeProvider, CircularProgress, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip, IconButton, Tooltip, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import { indigo, red } from "@mui/material/colors"
import ModalCriarPrestador from "./components/ModalCriarPrestador"
import { useEffect, useState } from "react"
import { themeBradesco } from "../components/theme"
import { ArrowForwardIos } from "@mui/icons-material"
import { getPrestadoresByFilter } from "../../../_services/rsdBradesco.service"

const Prestadores = () => {

    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)

    const [pedidos, setPedidos] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    const fetch = async () => {
        setLoading(true)
        try {
            const get = await getPrestadoresByFilter(pesquisa, page, rowsPerPage)
            setPedidos(get.pedidos)
            setTotalPages(get.total)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetch()
    }, [page, rowsPerPage, pesquisa])

    return (
        <>
            <Sidebar>
                <ThemeProvider theme={themeBradesco}>
                    <Container maxWidth>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <Title size={'medium'} fontColor={indigo[800]} lineColor={red[600]} >Prestadores</Title>
                            <ModalCriarPrestador />
                        </Box>
                        <Box>
                            <TextField size="small" type="text" label='CNPJ ou Nome' fullWidth value={pesquisa} onChange={(e) => { setPesquisa(e.target.value) }} InputProps={{
                                style: {
                                    borderRadius: '10px',
                                }
                            }}
                                sx={{ mt: 2 }}
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
                                                <TableCell sx={{ color: 'white' }}>Prestador</TableCell>
                                                <TableCell sx={{ color: 'white' }}>UF</TableCell>
                                                <TableCell align='center' sx={{ color: 'white' }}>Status</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                pedidos.map((prestador) => (
                                                    <TableRow>
                                                        <TableCell>
                                                            {prestador.nome}
                                                            <Typography
                                                                variant='body2'
                                                                color='textSecondary'
                                                            >
                                                                {prestador.cpfCnpj}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>{prestador.uf}</TableCell>
                                                        <TableCell align="center" >{
                                                            prestador.status === 'Ativo' ? <Chip color="success" label='Ativo' /> : <Chip color="error" label='Inativo' />
                                                        }</TableCell>
                                                        <TableCell>
                                                            <Tooltip title={'Ficha Prestador'}>
                                                                <IconButton size="small"
                                                                    href={`/bradesco/fichaPrestador/${prestador._id}`}
                                                                >
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
        </>
    )
}

export default Prestadores
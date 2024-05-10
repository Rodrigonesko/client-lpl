import { Box, Button, Chip, CircularProgress, Container, FormControl, IconButton, InputLabel, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { blue, orange } from "@mui/material/colors"
import { useEffect, useState } from "react"
import Title from "../../../components/Title/Title"
import { ArrowForward } from "@mui/icons-material"
import { getBeneficiarios } from "../../../_services/sulAmerica.service"

const Beneficiarios = () => {

    const [beneficiarios, setBeneficiarios] = useState([])

    const [flushHook, setFlushHook] = useState(false)
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false)

    const fetch = async () => {
        setLoading(true)
        try {
            const find = await getBeneficiarios(
                page,
                rowsPerPage
            )
            setBeneficiarios(find.result)
            setTotalPages(find.total)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetch(page)
        setFlushHook(false)
    }, [flushHook, page, rowsPerPage])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Title size={'medium'} fontColor={blue[900]} lineColor={orange[900]}>Beneficiários</Title>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mt: 3,
                        }}
                    >
                        <TextField type='text' size='small' label='Nome do Beneficiário' sx={{ mr: 3 }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }} />
                        <TextField type='text' size='small' label='Plano' sx={{ mr: 3 }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }} />
                        <TextField type='text' size='small' label='Empresa' sx={{ mr: 3 }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }} />
                        <TextField type='text' size='small' label='CPF' sx={{ mr: 3 }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }} />
                        <Button type='submit' variant='contained' sx={{ mr: 1 }}>Buscar</Button>
                        <Button type='submit' variant='contained' >Limpar Pesquisa</Button>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: 4 }} >
                        <TableContainer>
                            <Box display={'flex'} justifyContent={'space-between'} sx={{ mb: 2 }}>
                                <Chip label={`Quantidade de Pedidos: ${totalPages}`} color='warning' sx={{ fontSize: '15px' }} />
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
                            {
                                !loading ? (
                                    <Table
                                        size="small" component={Paper} elevation={7} sx={{ mb: 5, borderRadius: '15px' }}
                                    >
                                        <TableHead sx={{ background: `linear-gradient(45deg, ${blue[900]} 30%, ${orange[900]} 75%)` }}>
                                            <TableRow>
                                                <TableCell sx={{ color: 'white' }}>Carteira Empresa</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Plano</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Cód Sistemico Beneficiario</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Cód Carteirinha Beneficiario</TableCell>
                                                <TableCell sx={{ color: 'white' }}>CPF</TableCell>
                                                <TableCell sx={{ color: 'white' }}>CPF Titular</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Nome</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Melhor E-mail</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Melhor Celular</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Empresa</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                beneficiarios.map((beneficiario) => (
                                                    <TableRow key={beneficiario._id}>
                                                        <TableCell>{beneficiario.carteiraEmpresa}</TableCell>
                                                        <TableCell>{beneficiario.plano}</TableCell>
                                                        <TableCell>{beneficiario.codSistemicoBeneficiario}</TableCell>
                                                        <TableCell>{beneficiario.codSistemicoBeneficiario}</TableCell>
                                                        <TableCell>{beneficiario.cpf}</TableCell>
                                                        <TableCell>{beneficiario.cpfTitular}</TableCell>
                                                        <TableCell>{beneficiario.nome}</TableCell>
                                                        <TableCell>{beneficiario.melhorEmail}</TableCell>
                                                        <TableCell>{beneficiario.melhorCelular}</TableCell>
                                                        <TableCell>{beneficiario.empresa}</TableCell>
                                                        <TableCell>
                                                            <Tooltip title='Detalhes'>
                                                                <IconButton>
                                                                    <ArrowForward />
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
                                )
                            }
                        </TableContainer>
                    </Box>
                </Container>
            </Sidebar>
        </>
    )
}

export default Beneficiarios
import { Box, Button, Chip, CircularProgress, Container, FormControl, InputLabel, MenuItem, Pagination, Select, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import { red } from "@mui/material/colors"
import { CleaningServicesOutlined } from "@mui/icons-material"
import { useState } from "react"

const Segurados = () => {

    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Title size={'medium'} fontColor={red[700]} lineColor={'black'} >Segurados</Title>
                    <Box
                        sx={{
                            display: 'flex',
                            alignContent: 'center',
                            justifyContent: 'flex-start',
                            mt: 2
                        }}
                    >
                        <TextField type='text' size='small' name='Segurado' label='Segurado' fullWidth
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
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
                                    <TableHead sx={{ background: red[700] }}>
                                        <TableRow>
                                            <TableCell sx={{ color: 'white' }}>Segurado</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Valor Solicitado</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Prestador</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Titular do Segurado</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Data Solicitação</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Data Criação</TableCell>
                                            <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
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
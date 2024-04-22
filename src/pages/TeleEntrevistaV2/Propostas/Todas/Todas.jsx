import { Search } from "@mui/icons-material";
import { Box, Button, FormControl, InputLabel, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getPropostaByStatus } from "../../../../_services/teleEntrevistaV2.service";

const Todas = () => {

    const [propostas, setPropostas] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const result = await getPropostaByStatus(limit, page, {
                    pesquisa,
                });
                setPropostas(result.propostas);
                setTotal(result.total);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }

        }
        fetch();
    }, [page, limit, pesquisa])

    return (
        <Box>
            <Box
                sx={{
                    m: 2,
                }}
            >
                <TextField
                    placeholder="Pesquisar"
                    variant="outlined"
                    fullWidth
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <Search sx={{ mr: 1 }} />
                        )
                    }}
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                />
            </Box>
            <Box
                sx={{
                    m: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <FormControl size="small">
                    <InputLabel>Linhas</InputLabel>
                    <Select
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        label="Linhas"
                        sx={{
                            width: '200px',
                        }}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
                <Pagination
                    count={Math.ceil(total / limit)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    sx={{
                        float: 'right',
                    }}
                />
            </Box>
            <TableContainer>
                <Table
                    size="small"
                >
                    <TableHead
                        sx={{
                            backgroundColor: '#f5f5f5',
                        }}
                    >
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>CPF</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Proposta</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading ? propostas.map((proposta, index) => (
                            <TableRow key={index}>
                                <TableCell>{proposta.beneficiario.nome}</TableCell>
                                <TableCell>{proposta.beneficiario.cpf}</TableCell>
                                <TableCell>{proposta.beneficiario.telefone}</TableCell>
                                <TableCell>{proposta.proposta}</TableCell>
                                <TableCell>{proposta.status}</TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 1,
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                        >
                                            Visualizar
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">Carregando...</TableCell>
                            </TableRow>

                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Todas;
import { useEffect, useState } from "react";
import { getPropostaByStatus } from "../../../../_services/teleEntrevistaV2.service";
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";

const Realizadas = () => {

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
                    status: ['Concluído', 'Cancelado']
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
                        sx={{
                            minWidth: 100,
                        }}
                        label="Linhas"
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
                <Pagination
                    count={Math.ceil(total / limit)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                />
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>CPF</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading ? propostas.map((proposta, index) => (
                            <TableRow key={index}>
                                <TableCell>{proposta.nome}</TableCell>
                                <TableCell>{proposta.cpf}</TableCell>
                                <TableCell>{proposta.telefone}</TableCell>
                                <TableCell>{proposta.email}</TableCell>
                                <TableCell>{proposta.status}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Typography align="center">
                                        Carregando...
                                    </Typography>
                                </TableCell>
                            </TableRow>

                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    m: 2,
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Typography>
                    Total: {total}
                </Typography>
            </Box>
        </Box>
    )
}

export default Realizadas;
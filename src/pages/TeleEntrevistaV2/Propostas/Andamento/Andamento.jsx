import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Pagination, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getPropostaByStatus } from "../../../../_services/teleEntrevistaV2.service";
import { Search } from "@mui/icons-material";

// export type FilterProposta = {
//     status: string[];
//     agendado: boolean;
//     humanizado: boolean;
//     tipoContrato: string;
//     vigencia: string;
//     risco: string;
//     idade: string;
//     pesquisa: string;
//     responsavel: string;
// };

const status = [
    'Ajustar',
    'Enviado',
    'Não enviado',
    'Agendado',
    'Concluído',
    'Cancelado',
]

const Andamento = () => {

    const [propostas, setPropostas] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [filtros, setFiltros] = useState({
        status: [],
        agendado: false,
        humanizado: false,
        tipoContrato: '',
        vigencia: '',
        risco: '',
        idade: '',
        pesquisa: '',
    });

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const result = await getPropostaByStatus(limit, page, {
                    pesquisa,
                    status: ['Ajustar', 'Enviado', 'Não enviado']
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
        <Box
            sx={{
                m: 2,
            }}
            display={'flex'}
        >
            <Box>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    Filtros
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    Status
                </Typography>
                <FormGroup>
                    {
                        status.map((s, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        checked={filtros.status.includes(s)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFiltros({
                                                    ...filtros,
                                                    status: [...filtros.status, s]
                                                })
                                            } else {
                                                setFiltros({
                                                    ...filtros,
                                                    status: filtros.status.filter(f => f !== s)
                                                })
                                            }
                                        }}
                                    />
                                }
                                label={s}
                            />
                        ))
                    }
                </FormGroup>
            </Box>
            <Box
                sx={{
                    m: 2,
                }}
                width={'100%'}
            >
                <Box>
                    <TextField
                        placeholder="Pesquisar"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <Search sx={{ mr: 1 }} />
                            )
                        }}
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
                                backgroundColor: '#f5f5f5'
                            }}
                        >
                            <TableRow>
                                <TableCell>
                                    Proposta
                                </TableCell>
                                <TableCell>
                                    Nome
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                !loading ? propostas.map((proposta, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {proposta.proposta}
                                        </TableCell>
                                        <TableCell>
                                            {proposta.beneficiario.nome}
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={1}>
                                            Carregando...
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default Andamento;
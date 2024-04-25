import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Pagination, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getPropostaByStatus } from "../../../../_services/teleEntrevistaV2.service";
import { Search } from "@mui/icons-material";
import TabelaRn from "./TabelaRn";
import TabelaUrgenciaEmergencia from "./TabelaUrgenciaEmergencia";
import { PropostasContext } from "../context";
import FiltrosRn from "./FiltrosRn";
import FiltrosUrgenciaEmergencia from "./FIltrosUrgenciaEmergencia";

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
    'Não enviado',
    'Enviado',
    'Agendado',
    'Concluído',
    'Cancelado',
]

const Andamento = () => {

    const { propostas, setPropostas } = useContext(PropostasContext)

    // const [propostas, setPropostas] = useState([]);
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
    const [frente, setFrente] = useState('Tele Entrevista');

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
            <Box
                sx={{
                    width: '200px',
                }}
            >
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
                    Frente
                </Typography>
                <RadioGroup
                    value={frente}
                    onChange={(e) => setFrente(e.target.value)}
                >
                    <FormControlLabel value='Tele Entrevista' control={<Radio size="small" />} label='Tele Entrevista'
                        sx={{
                            fontWeight: frente === 'Tele Entrevista' ? 'bold' : 'normal',
                            color: frente === 'Tele Entrevista' ? 'black' : 'gray',
                        }}
                    />
                    <FormControlLabel value='RN' control={<Radio size="small" />} label='RN'
                        sx={{
                            fontWeight: frente === 'RN' ? 'bold' : 'normal',
                            color: frente === 'RN' ? 'black' : 'gray',
                        }}
                    />
                    <FormControlLabel value='UE' control={<Radio size="small" />} label='UE'
                        sx={{
                            fontWeight: frente === 'UE' ? 'bold' : 'normal',
                            color: frente === 'UE' ? 'black' : 'gray',
                        }}
                    />
                </RadioGroup>
                {
                    frente === 'Tele Entrevista' && (
                        <>
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
                                                    size="small"
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
                        </>
                    )
                }
                {frente === 'RN' && <FiltrosRn />}
                {frente === 'UE' && <FiltrosUrgenciaEmergencia />}
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
                    {
                        frente === 'Tele Entrevista' && (
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
                        )
                    }
                    {frente === 'RN' && <TabelaRn />}
                    {frente === 'UE' && <TabelaUrgenciaEmergencia />}
                </TableContainer>
            </Box>
        </Box>
    );
}

export default Andamento;
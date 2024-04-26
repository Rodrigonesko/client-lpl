import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Pagination, Radio, RadioGroup, Select, TableContainer, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getPropostaByStatus, getRnByFilter, getUeByFilter } from "../../../../_services/teleEntrevistaV2.service";
import { Search } from "@mui/icons-material";
import TabelaRn from "./TabelaRn";
import TabelaUrgenciaEmergencia from "./TabelaUrgenciaEmergencia";
import { PropostasContext } from "../context";
import FiltrosRn from "./FiltrosRn";
import FiltrosUrgenciaEmergencia from "./FIltrosUrgenciaEmergencia";
import TabelaTeleEntrevista from "./TabelaTeleEntrevista";
import FiltrosTeleEntrevista from "./FiltrosTeleEntrevista";

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

const frentes = [
    'Tele Entrevista',
    'RN',
    'UE',
]

const Andamento = () => {

    const { setPropostas, setPropostasRn, setPropostasUe, statusRn, statusUe, filtros, setFiltros } = useContext(PropostasContext)

    const [pesquisa, setPesquisa] = useState('');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [frente, setFrente] = useState('Tele Entrevista');

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                if (frente === 'Tele Entrevista') {
                    const result = await getPropostaByStatus(limit, page, {
                        pesquisa,
                        status: filtros.status,
                        agendado: filtros.agendado,
                        humanizado: filtros.humanizado,
                        tipoContrato: filtros.tipoContrato,
                        vigencia: filtros.vigencia,
                        risco: filtros.risco,
                        idade: filtros.idade
                    });
                    setPropostas(result.propostas);
                    setTotal(result.total);
                }
                if (frente === 'RN') {
                    const result = await getRnByFilter({
                        limit,
                        page,
                        pesquisa,
                        status: statusRn
                    });
                    setPropostasRn(result.propostas);
                    setTotal(result.total);
                }
                if (frente === 'UE') {
                    const result = await getUeByFilter({
                        limit,
                        page,
                        pesquisa,
                        status: statusUe
                    });
                    setPropostasUe(result.propostas);
                    setTotal(result.total);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetch();
    }, [page, limit, pesquisa, frente, statusRn, filtros, statusUe])

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
                    {
                        frentes.map((f, index) => (
                            <FormControlLabel
                                key={index}
                                value={f}
                                control={<Radio />}
                                label={f}
                                sx={{
                                    fontWeight: frente === f ? 'bold' : 'normal',
                                    color: frente === f ? 'primary.main' : 'initial'
                                }}
                            />
                        ))
                    }
                </RadioGroup>
                {frente === 'Tele Entrevista' && <FiltrosTeleEntrevista />}
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
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
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
                        <Typography>
                            Total: {total}
                        </Typography>
                    </Box>

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
                    {frente === 'Tele Entrevista' && <TabelaTeleEntrevista loading={loading} />}
                    {frente === 'RN' && <TabelaRn loading={loading} />}
                    {frente === 'UE' && <TabelaUrgenciaEmergencia loading={loading} />}
                </TableContainer>
            </Box>
        </Box>
    );
}

export default Andamento;
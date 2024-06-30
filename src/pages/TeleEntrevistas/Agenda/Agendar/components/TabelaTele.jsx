import { Box, Chip, FormControl, InputLabel, LinearProgress, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useState, useEffect } from "react"
import { getPropostasByAgendamento } from "../../../../../_services/teleEntrevistaV2.service"
import { Search } from "@mui/icons-material"
import LinhaTele from "./LinhaTele"

const TabelaTele = () => {

    const [propostas, setPropostas] = useState([])
    const [tiposContrato, setTiposContrato] = useState([])
    const [total, setTotal] = useState(0)
    const [pesquisa, setPesquisa] = useState('')
    const [tipoContrato, setTipoContrato] = useState('')
    const [sort, setSort] = useState('vigencia')
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const result = await getPropostasByAgendamento('', sort, pesquisa.trim(), '', tipoContrato, limit, page)
            setPropostas(result.propostas)
            setTotal(result.total)
            setTiposContrato(result.tiposContrato)
            setLoading(false)
        }
        fetch()
    }, [pesquisa, sort, limit, page, refresh, tipoContrato])

    return (
        <Box
            width={"100%"}
        >
            <Box
                width="100%"
            >
                <TextField
                    size="small"
                    label="Pesquisar"
                    placeholder="Nome, CPF, Proposta"
                    fullWidth
                    InputProps={{
                        endAdornment: <Search />
                    }}
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                />
            </Box>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
            >
                <Box
                    display="flex"
                    gap={2}
                >
                    <FormControl size="small" sx={{width: '120px'}}>
                        <InputLabel>Linhas</InputLabel>
                        <Select
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            label="Linhas"
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{width: '300px'}}>
                        <InputLabel>Tipo Contrato</InputLabel>
                        <Select
                            value={tipoContrato}
                            onChange={(e) => setTipoContrato(e.target.value)}
                            label="Tipo Contrato"
                        >
                            <MenuItem value="">Todos</MenuItem>
                            {
                                tiposContrato.map(tipo => (
                                    <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>

                <Pagination
                    count={Math.ceil(total / limit)}
                    page={page}
                    onChange={(e, v) => setPage(v)}
                    size="small"
                />
            </Box>
            <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
            >
                <Chip
                    label={`Total: ${total}`}
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                />
                <FormControl
                    size="small"
                >
                    <InputLabel>Ordenar por</InputLabel>
                    <Select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        label="Ordenar por"
                    >
                        <MenuItem value="vigencia">Vigência</MenuItem>
                        <MenuItem value="vigenciaAmil">Vigência Amil</MenuItem>
                        <MenuItem value="proposta">Proposta</MenuItem>
                        <MenuItem value="beneficiario">Beneficiário</MenuItem>
                        <MenuItem value="dataNascimento">Data Nascimento</MenuItem>
                        <MenuItem value="telefone">Telefone</MenuItem>
                        <MenuItem value="tipoContrato">Tipo Contrato</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <TableContainer
                sx={{
                    mt: 2
                }}
            >
                <Table
                    size="small"
                >
                    <TableHead
                        sx={{
                            backgroundColor: 'primary.main'
                        }}
                    >
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>
                                Vigência
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                Proposta
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                Beneficiário
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                Idade
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                Sexo
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                Telefone
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                N° tentativas
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && <TableRow>
                            <TableCell
                                colSpan={8}
                            >
                                <LinearProgress />
                            </TableCell>
                        </TableRow>}
                        {
                            propostas.map(proposta => (
                                <LinhaTele setRefresh={setRefresh} key={proposta._id} proposta={proposta} />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default TabelaTele
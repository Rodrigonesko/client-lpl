import { AppBar, Button, Checkbox, Chip, Dialog, Divider, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, LinearProgress, MenuItem, Pagination, Select, Slide, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import { Box } from "@mui/system"
import { forwardRef, useContext, useEffect, useState } from "react";
import { divergenciaAnexo, filterEntrevistasRealizadas } from "../../../../../_services/teleEntrevista.service";
import moment from "moment";
import SearchIcon from '@mui/icons-material/Search';
import ProtDetalhesTele from "../../../ProtDetalhesTele/ProtDetalhesTele";
import CloseIcon from '@mui/icons-material/Close';
import { getPropostaById, getPropostaPorNomeEProposta } from "../../../../../_services/teleEntrevistaExterna.service";
import RelatorioMensal from "./RelatorioMensal";
import RelatorioGeral from "./RelatorioGeral";
import AuthContext from "../../../../../context/AuthContext";
import Toast from "../../../../../components/Toast/Toast";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Realizadas = () => {

    const { acessos } = useContext(AuthContext)
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [pesquisa, setPesquisa] = useState('');
    const [propostas, setPropostas] = useState([])
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [cpfTitular, setCpfTitular] = useState('');
    const [entrevistaQualidade, setEntrevistaQualidade] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [severity, setSeverity] = useState('info');
    const [message, setMessage] = useState('Salvando...');

    const handleSearch = async (page = page, pesquisa = pesquisa, rowsPerPage = rowsPerPage, entrevistaQualidade = entrevistaQualidade) => {
        setLoading(true);
        const result = await filterEntrevistasRealizadas({
            limit: rowsPerPage,
            page,
            pesquisa,
            entrevistaQualidade
        });
        setPropostas(result.result);
        setTotal(result.total);
        setLoading(false);
    }

    const buscarCpfTitular = async (proposta) => {
        let result = ''
        if (!proposta.idProposta) {
            result = await getPropostaPorNomeEProposta(proposta.nome, proposta.proposta)
        } else {
            result = await getPropostaById(proposta.idProposta)
        }
        setCpfTitular(result.cpfTitular)
        setOpenDialog(true)
    }

    const handleChangeDivergenciaAnexo = async (e, id) => {

        setPropostas(propostas.map((proposta) => {
            if (proposta._id === id) {
                return {
                    ...proposta,
                    divergenciaAnexo: e.target.checked
                }
            }
            return proposta
        }))

        await divergenciaAnexo({
            id,
            divergenciaAnexo: e.target.checked
        })

        setSeverity('success')
        setMessage('Salvo com sucesso!')
        setOpenToast(true)

    }

    useEffect(() => {
        handleSearch(page, pesquisa, rowsPerPage, entrevistaQualidade);
    }, [])

    return (
        <Box>
            <Box display={'flex'} mb={2}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '30%',
                            height: '2px',
                            bottom: 0,
                            left: '0%',
                            backgroundColor: 'currentColor',
                            transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                        },
                        '&:hover::after': {
                            width: '100%',
                            left: '0%',
                        },
                    }}
                >
                    Realizadas
                </Typography>
            </Box>
            <Divider />
            <Grid
                spacing={2}
                container
                alignItems={'center'}
                sx={{
                    mt: 1,
                }}
            >
                <Grid item xs={12} md={6} lg={4}>
                    <TextField
                        label="Pesquisa"
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Pesquisar por nome, cpf, proposta"
                        value={pesquisa}
                        onChange={(e) => {
                            setPesquisa(e.target.value);
                            handleSearch(page, e.target.value, rowsPerPage, entrevistaQualidade);
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Switch
                                color="success"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                checked={entrevistaQualidade}
                            />
                        }
                        onChange={(e) => {
                            setEntrevistaQualidade(e.target.checked);
                            handleSearch(page, pesquisa, rowsPerPage, e.target.checked, entrevistaQualidade);
                        }}
                        label="Entrevista Qualidade"
                    />
                </Grid>
                <Grid item>
                    <RelatorioMensal />
                </Grid>
                <Grid item>
                    <RelatorioGeral />
                </Grid>
            </Grid>
            <Box>
                <Typography
                    variant="h6"
                    sx={{
                        mt: 2,
                    }}
                >
                    {`Total: ${total}`}
                </Typography>
            </Box>
            <Box
                display={'flex'}
                alignItems={'center'}
                sx={{
                    mt: 2,
                }}
            >
                <Pagination
                    page={page}
                    onChange={(e, value) => {
                        setPage(value);
                        handleSearch(value, pesquisa, rowsPerPage, entrevistaQualidade);
                    }}
                    sx={{
                        mt: 2,
                    }}
                    count={Math.ceil(total / rowsPerPage)}
                />
                <FormControl
                    sx={{
                        ml: 2,
                    }}
                >
                    <InputLabel>Linhas</InputLabel>
                    <Select
                        value={rowsPerPage}
                        label="Linhas"
                        onChange={(e) => {
                            setRowsPerPage(e.target.value);
                            handleSearch(page, pesquisa, e.target.value, entrevistaQualidade);
                        }}
                        size="small"
                    >
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <TableContainer
                sx={{
                    mt: 2,
                }}
            >
                <Table
                    size="small"
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: '#F5F5F5',
                            }}
                        >
                            <TableCell>
                                Proposta
                            </TableCell>
                            <TableCell>
                                Data Entrevista
                            </TableCell>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                CPF
                            </TableCell>
                            <TableCell>
                                Idade
                            </TableCell>
                            <TableCell>
                                Sexo
                            </TableCell>
                            <TableCell>
                                Status
                            </TableCell>
                            {
                                acessos?.administrador ? (
                                    <TableCell>
                                        Divergência Anexo
                                    </TableCell>
                                ) : null
                            }
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !loading ? (propostas.map((proposta) => (
                                <TableRow
                                    key={proposta.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                        bgcolor: proposta.entrevistaQualidade ? green[200] : 'white',
                                    }}
                                >
                                    <TableCell>
                                        {proposta.proposta}
                                    </TableCell>
                                    <TableCell>
                                        {moment(proposta.dataEntrevista).format('DD/MM/YYYY')}
                                    </TableCell>
                                    <TableCell>
                                        {proposta.nome}
                                    </TableCell>
                                    <TableCell>
                                        {proposta.cpf}
                                    </TableCell>
                                    <TableCell>
                                        {proposta.idade}
                                    </TableCell>
                                    <TableCell>
                                        {proposta.sexo}
                                    </TableCell>
                                    <TableCell>
                                        {proposta.cancelado ? (
                                            <Chip
                                                label={'Cancelado'}
                                                sx={{
                                                    color: red[800],
                                                    bgcolor: red[100],
                                                }}
                                            />
                                        ) : (
                                            <Chip
                                                label={'Realizada'}
                                                sx={{
                                                    color: green[800],
                                                    bgcolor: green[100],
                                                }}
                                            />
                                        )}
                                    </TableCell>
                                    {
                                        acessos?.administrador ? (
                                            <TableCell
                                                align="center"
                                            >
                                                <FormControlLabel
                                                    control={<Checkbox
                                                        checked={proposta.divergenciaAnexo}
                                                        onChange={(e) => handleChangeDivergenciaAnexo(e, proposta._id)}
                                                        color="error"
                                                    />
                                                    }
                                                />
                                            </TableCell>
                                        ) : null
                                    }
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                bgcolor: 'black',
                                                color: 'white',
                                                '&:hover': {
                                                    bgcolor: 'black',
                                                    opacity: 0.8,
                                                },
                                            }}
                                            onClick={() => {
                                                buscarCpfTitular(proposta)
                                            }}
                                        >
                                            Detalhes
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                    >
                                        <LinearProgress
                                            sx={{
                                                width: '100%'
                                            }}
                                            color="inherit"
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Toast
                open={openToast}
                severity={severity}
                message={message}
                onClose={() => setOpenToast(false)}
            />
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fullScreen
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: grey[500] }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                setOpenDialog(false)
                                setCpfTitular('')
                            }}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <ProtDetalhesTele
                    key={cpfTitular}
                    cpfTitular={cpfTitular}
                    atualizarTabela={() => handleSearch(
                        page,
                        pesquisa,
                        rowsPerPage,
                        entrevistaQualidade
                    )}
                    atualizarPesquisa={() => {
                        handleSearch(
                            page,
                            pesquisa,
                            rowsPerPage,
                            entrevistaQualidade
                        )

                    }}
                    pesquisa={() => {
                        handleSearch(
                            page,
                            pesquisa,
                            rowsPerPage,
                            entrevistaQualidade
                        )
                    }}
                />
            </Dialog>
        </Box>

    )
}

export default Realizadas;
import { AppBar, Badge, Box, Button, Chip, Dialog, Divider, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { blue, deepPurple, grey } from "@mui/material/colors";
import ProtDetalhesTele from "../../../ProtDetalhesTele/ProtDetalhesTele";
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Toast from "../../../../../components/Toast/Toast";
import GerarHorarios from "./GerarHorarios";
import RelatorioPropostas from "./RelatorioPropostas";
import RelatorioNaoRealizadas from "./RelatorioNaoRealizadas";
import RelatorioDevolverAmil from "./RelatorioDevolverAmil";
import Search from "@mui/icons-material/Search";
import RelatorioRespondeuWhats from "./RelatorioRespondeuWhats";
import { PropostaService } from "../../../../../_services/teleEntrevistaV2.service";
import FiltrosAgendar from "./FiltrosAgendar";
import { filtros } from "./filtros";

const propostaService = new PropostaService();

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FiltroEmAnalise = () => {

    const [filters, setFilters] = useState(filtros)

    const [propostas, setPropostas] = useState([]);

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pesquisa, setPesquisa] = useState('');
    const [sort, setSort] = useState('createdAt');
    const [order, setOrder] = useState(1);
    const [selected, setSelected] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [cpfTitular, setCpfTitular] = useState('')
    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')

    useEffect(() => {
        const fech = async () => {
            setLoading(true);
            const res = await propostaService.filterPendentes({
                ...filters,
                page,
                limit: 100,
                pesquisa,
                sort,
                order
            });
            setPropostas(res.propostas);
            setTotal(res.total);
            console.log(res);
            setLoading(false);
        }
        fech();

    }, [filters, page, pesquisa, sort, order, refresh]);

    const handleClose = async () => {
        setOpenDialog(false)
        await propostaService.saiuDaProposta(cpfTitular)
    }

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
                    Em Análise
                </Typography>
            </Box>
            <Divider />
            <Box display={'flex'} m={1} gap={2} >
                <GerarHorarios />
                <RelatorioPropostas />
                <RelatorioNaoRealizadas />
                <RelatorioDevolverAmil />
                <RelatorioRespondeuWhats />
            </Box>
            <Box display={'flex'} m={2}>
                <FiltrosAgendar
                    filters={filters}
                    setFilters={setFilters}
                />
                <Box p={1} width={'100%'}>
                    <TextField
                        label="Pesquisar"
                        variant="outlined"
                        value={pesquisa}
                        onChange={e => setPesquisa(e.target.value)}
                        sx={{ width: '100%' }}
                        placeholder="Nome ou proposta"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <Search
                                    sx={{
                                        color: grey[800],
                                        mr: 1
                                    }}
                                />
                            )
                        }}
                    />
                    <Box display={'flex'} justifyContent={'space-between'} m={1}>
                        <Typography fontWeight={'bold'}>
                            {total} propostas encontradas
                        </Typography>
                        <Box
                            display={'flex'}
                            gap={2}
                        >
                            <Pagination
                                count={Math.ceil(total / 100)}
                                page={page}
                                onChange={(_, value) => setPage(value)}
                            />
                            <FormControl
                                size="small"
                                sx={{
                                    minWidth: 200
                                }}
                            >
                                <InputLabel>Ordenar</InputLabel>
                                <Select
                                    label="Ordenar"
                                    value={sort}
                                    onChange={e => setSort(e.target.value)}
                                >
                                    <MenuItem value={'createdAt'}>Data de Recebimento</MenuItem>
                                    <MenuItem value={'vigenciaAmil'}>Vigência Amil</MenuItem>
                                    <MenuItem value={'nome'}>Nome</MenuItem>
                                    <MenuItem value={'tipoAssociado'}>Associado</MenuItem>
                                    <MenuItem value={'idade'}>Idade</MenuItem>
                                    <MenuItem value={'horarioRespondido'}>Horario Respondido</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl
                                size="small"
                                sx={{
                                    minWidth: 200
                                }}
                            >
                                <InputLabel>Ordem</InputLabel>
                                <Select
                                    label="Ordem"
                                    value={order}
                                    onChange={e => setOrder(e.target.value)}
                                >
                                    <MenuItem value={1}>Crescente</MenuItem>
                                    <MenuItem value={-1}>Decrescente</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                    </Box>
                    <TableContainer>
                        {
                            <Table size="small">
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                                        <TableCell>Recebimento</TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                            >
                                                ANS
                                            </Typography>
                                            <Typography
                                                variant={'caption'}
                                                color={'textSecondary'}
                                            >
                                                Vigência Amil
                                            </Typography>
                                        </TableCell>
                                        <TableCell>Proposta</TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Associado</TableCell>
                                        <TableCell>Idade</TableCell>
                                        <TableCell>Sexo</TableCell>
                                        <TableCell>Contrato</TableCell>
                                        <TableCell>Janela</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>N° Contatos</TableCell>
                                        <TableCell>Detalhes</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        loading && (
                                            <TableRow>
                                                <TableCell colSpan={12} align={'center'}>
                                                    <LinearProgress />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    {propostas.map((proposta) => (
                                        <TableRow
                                            key={proposta._id}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                                bgcolor: selected === proposta.cpfTitular ? blue[50] : 'white'
                                            }}
                                        >
                                            <TableCell>{moment(proposta.dataRecebimento).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>
                                                <Typography
                                                >
                                                    {moment(proposta.vigencia).format('DD/MM/YYYY')}
                                                </Typography>
                                                <Typography
                                                    variant={'caption'}
                                                    color={'textSecondary'}
                                                >
                                                    {moment(proposta.vigenciaAmil).format('DD/MM/YYYY')}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{proposta.proposta}</TableCell>
                                            <TableCell>{proposta.nome}</TableCell>
                                            <TableCell>{proposta.tipoAssociado}</TableCell>
                                            <TableCell>{proposta.idade}</TableCell>
                                            <TableCell>{proposta.sexo}</TableCell>
                                            <TableCell>{proposta.tipoContrato}</TableCell>
                                            <TableCell>{proposta.janelaHorario}</TableCell>
                                            <TableCell>{
                                                proposta.atendimentoHumanizado && proposta.newStatus === 'Janela escolhida' ? (
                                                    <Tooltip title='Humanizado'>
                                                        <Chip label={'Agendar'} sx={{
                                                            backgroundColor: deepPurple[100],
                                                        }} size="small" />
                                                    </Tooltip>
                                                ) : proposta.atendimentoHumanizado ? (
                                                    <Tooltip title='Humanizado'>
                                                        <Chip label={proposta.newStatus} sx={{
                                                            backgroundColor: deepPurple[100],
                                                        }} size="small" />
                                                    </Tooltip>
                                                ) : (
                                                    proposta.newStatus
                                                )
                                            }</TableCell>
                                            <TableCell>{proposta.tentativasDeContato.length}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    color="success"
                                                    variant="dot"
                                                    sx={{ '& > *': { mr: 2, p: '3px' } }}
                                                    invisible={!proposta.visualizado}
                                                >
                                                    <Button
                                                        variant={'contained'}
                                                        size={'small'}
                                                        onClick={() => {
                                                            if (!proposta.cpfTitular) {
                                                                setMessage('Sem cpf de titular')
                                                                setSeverity('error')
                                                                setOpenToast(true)
                                                                return;
                                                            }
                                                            setCpfTitular(proposta.cpfTitular)
                                                            setOpenDialog(true)
                                                            setSelected(proposta.cpfTitular)
                                                        }}
                                                        sx={{
                                                            bgcolor: 'black',
                                                            color: 'white',
                                                            '&:hover': {
                                                                bgcolor: 'black',
                                                                opacity: 0.8,
                                                            },
                                                        }}
                                                    >
                                                        Detalhes
                                                    </Button>
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    }
                                </TableBody>
                            </Table>
                        }
                    </TableContainer>
                </Box>
            </Box>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                fullScreen
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: grey[500] }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={async () => {
                                await handleClose()
                                setCpfTitular('')
                            }}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <ProtDetalhesTele key={cpfTitular} cpfTitular={cpfTitular} atualizarTabela={() => { setRefresh(!refresh) }} atualizarPesquisa={() => { setRefresh(!refresh) }} pesquisa={pesquisa} />
            </Dialog>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                severity={severity}
                message={message}
            />
        </Box >
    );
}

export default FiltroEmAnalise;

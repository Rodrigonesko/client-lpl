import { AppBar, Badge, Box, Button, Chip, CircularProgress, Dialog, Divider, IconButton, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { filterPropostas, filterPropostasNaoRealizadas } from "../../../../../_services/teleEntrevistaExterna.service";
import Filtros from "./Filtros";
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

const propostaService = new PropostaService();

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FiltroEmAnalise = () => {

    const [status, setStatus] = useState({
        agendar: true,
        agendado: false,
        canceladoHumanizado: false,
        humanizado: false,
        naoLidas: false,
        janelas: false,
        ajustar: false,
        semWhats: false,
        erroWhatsapp: false,
        semResposta: false,
        respondido: false,
        incidencia: false,
    });

    const [tipoContrato, setTipoContrato] = useState({
        pme: false,
        pf: false,
        adesao: false,
    });

    const [vigencia, setVigencia] = useState({
        noPrazo: false,
        foraDoPrazo: false,
    });

    const [altoRisco, setAltoRisco] = useState({
        baixo: false,
        medio: false,
        alto: false,
    });

    const [idade, setIdade] = useState({
        maior60: false,
        menor60: false,
    });

    const [propostas, setPropostas] = useState([]);

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pesquisa, setPesquisa] = useState('');
    const [openDialog, setOpenDialog] = useState(false)
    const [cpfTitular, setCpfTitular] = useState('')
    const [selected, setSelected] = useState('')
    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')
    const [clear, setClear] = useState(false)

    const handleChangeAgendado = (event) => {
        if (event.target.name === 'agendado' && (status.agendar || status.canceladoHumanizado)) {
            setStatus({ ...status, agendado: true, agendar: false, canceladoHumanizado: false });
        } else if (event.target.name === 'agendar' && (status.agendado || status.canceladoHumanizado)) {
            setStatus({ ...status, agendado: false, agendar: true, canceladoHumanizado: false });
        } else if (event.target.name === 'canceladoHumanizado' && (status.agendar || status.agendado)) {
            setStatus({ ...status, agendado: false, agendar: false, canceladoHumanizado: true });
        } else {
            setStatus({ ...status, [event.target.name]: event.target.checked });
        }
    }

    const handleChangeStatus = (event) => {
        setStatus({ ...status, [event.target.name]: event.target.checked });
    }

    const handleChangeTipoContrato = (event) => {
        // Quando um for true, os outros devem ser false
        if (event.target.name === 'pme' && (tipoContrato.pf || tipoContrato.adesao)) {
            setTipoContrato({
                pme: true,
                pf: false,
                adesao: false,
            })
        }
        else if (event.target.name === 'pf' && (tipoContrato.pme || tipoContrato.adesao)) {
            setTipoContrato({
                pme: false,
                pf: true,
                adesao: false,
            })
        }
        else if (event.target.name === 'adesao' && (tipoContrato.pme || tipoContrato.pf)) {
            setTipoContrato({
                pme: false,
                pf: false,
                adesao: true,
            })
        } else {
            setTipoContrato({ ...tipoContrato, [event.target.name]: event.target.checked });
        }
    }

    const handleChangeVigencia = (event) => {
        // Quando um for true, os outros devem ser false
        if (event.target.name === 'noPrazo' && vigencia.foraDoPrazo) {
            setVigencia({
                noPrazo: true,
                foraDoPrazo: false,
            })
        }
        else if (event.target.name === 'foraDoPrazo' && vigencia.noPrazo) {
            setVigencia({
                noPrazo: false,
                foraDoPrazo: true,
            })
        } else {
            setVigencia({ ...vigencia, [event.target.name]: event.target.checked });
        }
    }

    const handleChangeAltoRisco = (event) => {
        // Quando um for true, os outros devem ser false
        if (event.target.name === 'baixo' && (altoRisco.medio || altoRisco.alto)) {
            setAltoRisco({
                baixo: true,
                medio: false,
                alto: false,
            })
        }
        else if (event.target.name === 'medio' && (altoRisco.baixo || altoRisco.alto)) {
            setAltoRisco({
                baixo: false,
                medio: true,
                alto: false,
            })
        }
        else if (event.target.name === 'alto' && (altoRisco.baixo || altoRisco.medio)) {
            setAltoRisco({
                baixo: false,
                medio: false,
                alto: true,
            })
        } else {
            setAltoRisco({ ...altoRisco, [event.target.name]: event.target.checked });
        }
    }

    const handleChangeIdade = (event) => {
        // Quando um for true, os outros devem ser false
        if (event.target.name === 'maior60' && idade.menor60) {
            setIdade({
                maior60: true,
                menor60: false,
            })
        } else if (event.target.name === 'menor60' && idade.maior60) {
            setIdade({
                maior60: false,
                menor60: true,
            })
        } else {
            setIdade({ ...idade, [event.target.name]: event.target.checked });
        }

    }

    const handleFilter = async () => {
        try {

            setLoading(true)
            setPage(1);

            const result = await propostaService.filterPendentes({
                status: status,
                tipoContrato: tipoContrato,
                vigencia: vigencia,
                altoRisco: altoRisco,
                idade: idade,
                page: 1,
                limit: 100
            })

            setPropostas(result.result);
            setTotalPages(result.total);
            setLoading(false)
            setPesquisa('')
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const handleClear = () => {
        setStatus({
            agendar: false,
            humanizado: false,
            canceladoHumanizado: false,
            janelas: false,
            ajustar: false,
            semWhats: false,
            agendado: false,
            semResposta: false,
            respondido: false,
            incidencia: false,
        });

        setTipoContrato({
            pme: false,
            pf: false,
            adesao: false,
        });

        setVigencia({
            noPrazo: false,
            foraDoPrazo: false,
        });

        setAltoRisco({
            baixo: false,
            medio: false,
            alto: false,
        });

        setIdade({
            maior60: false,
            menor60: false,
        });

        setPage(1);
        setPesquisa('');
        fetchPropostas(1);
    }

    const handleAll = () => {
        setStatus({
            agendar: true,
            humanizado: true,
            canceladoHumanizado: true,
            janelas: true,
            ajustar: true,
            semWhats: true,
            agendado: true,
            semResposta: true,
            respondido: true,
            incidencia: true,
        });

        setTipoContrato({
            pme: true,
            pf: true,
            adesao: true,
        });

        setVigencia({
            noPrazo: true,
            foraDoPrazo: true,
        });

        setAltoRisco({
            baixo: true,
            medio: true,
            alto: true,
        });

        setIdade({
            maior60: true,
            menor60: true,
        });
    }

    const fetchPropostas = async (page) => {

        setLoading(true);

        try {
            const result = await filterPropostas({
                status: status,
                tipoContrato: tipoContrato,
                vigencia: vigencia,
                altoRisco: altoRisco,
                page: page,
                idade: idade,
                limit: 100
            })
            setPropostas(result.result);
            setTotalPages(result.total);
            setLoading(false)
            setPesquisa('')

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const handlePageChange = (event, value) => {
        setPage(value);
        fetchPropostas(value);
    }

    const handlePesquisar = async (e) => {

        if (e) {
            e.preventDefault()
        }

        if (pesquisa === '') {
            return;
        }
        setLoading(true);
        setPage(1)
        const result = await filterPropostasNaoRealizadas({
            pesquisa: pesquisa,
            page: 1,
            limit: 100,
            filters: {
                status: status,
                tipoContrato: tipoContrato,
                vigencia: vigencia,
                altoRisco: altoRisco,
                idade: idade,
            }
        })
        setPropostas(result.result);
        setTotalPages(result.total);
        setLoading(false)
    }
    useEffect(() => {
        fetchPropostas(page);
    }, []);

    useEffect(() => {
        if (clear) {
            handleClear()
            setClear(false)
        }
    }, [clear])

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
                <Filtros
                    status={status}
                    tipoContrato={tipoContrato}
                    vigencia={vigencia}
                    altoRisco={altoRisco}
                    handleChangeStatus={handleChangeStatus}
                    handleChangeAgendado={handleChangeAgendado}
                    handleChangeTipoContrato={handleChangeTipoContrato}
                    handleChangeVigencia={handleChangeVigencia}
                    handleChangeAltoRisco={handleChangeAltoRisco}
                    handleFilter={handleFilter}
                    handleClear={setClear}
                    handleAll={handleAll}
                    idade={idade}
                    handleChangeIdade={handleChangeIdade}
                />
                <Box p={1} width={'100%'}>
                    <form
                        action=""
                        style={{
                            display: 'flex',
                            margin: '10px'
                        }}
                        onSubmit={handlePesquisar}
                    >
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
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: blue[100],
                                color: blue[800],
                                '&:hover': {
                                    bgcolor: blue[500],
                                    opacity: 0.8,
                                },
                            }}
                            type="submit"
                            size="small"
                        >
                            Pesquisar
                        </Button>
                    </form>
                    <Typography fontWeight={'bold'}>
                        {totalPages} propostas encontradas
                    </Typography>
                    <TableContainer>
                        <Box display={'flex'} justifyContent={'flex-end'}>
                            <Pagination count={Math.ceil(totalPages / 100)} page={page} onChange={handlePageChange} />
                        </Box>
                        {
                            !loading ? (
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                                            <TableCell>Recebimento</TableCell>
                                            <TableCell>Vigência</TableCell>
                                            <TableCell>Proposta</TableCell>
                                            <TableCell>Nome</TableCell>
                                            <TableCell>Associado</TableCell>
                                            <TableCell>Idade</TableCell>
                                            <TableCell>Sexo</TableCell>
                                            <TableCell>Contrato</TableCell>
                                            <TableCell>Janela</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Risco</TableCell>
                                            <TableCell>Detalhes</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {propostas.map((proposta) => (
                                            <TableRow
                                                key={proposta._id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: selected === proposta.cpfTitular ? deepPurple[100] : 'white' }}
                                            >
                                                <TableCell>{moment(proposta.dataRecebimento).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell>{moment(proposta.vigencia).format('DD/MM/YYYY')}</TableCell>
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
                                                <TableCell>{proposta.riscoBeneficiario}</TableCell>
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
                                                        // href={`/entrevistas/protDetalhesTele/${proposta.cpfTitular}`}
                                                        // target="_blank"
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
                            ) : (
                                <Box width={'100%'} display={'flex'} justifyContent={"center"}>
                                    <CircularProgress />
                                </Box>
                            )
                        }
                    </TableContainer>
                </Box>
            </Box>
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
                <ProtDetalhesTele key={cpfTitular} cpfTitular={cpfTitular} atualizarTabela={() => fetchPropostas(page)} atualizarPesquisa={handlePesquisar} pesquisa={pesquisa} />
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

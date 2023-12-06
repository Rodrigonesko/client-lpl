import { AppBar, Badge, Box, Button, Chip, CircularProgress, Dialog, Divider, IconButton, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { filterPropostas, filterPropostasNaoRealizadas } from "../../../../_services/teleEntrevistaExterna.service";
import Filtros from "./Filtros";
import moment from "moment";
import { blue, deepPurple, grey } from "@mui/material/colors";
import ProtDetalhesTele from "../../ProtDetalhesTele/ProtDetalhesTele";
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FiltroEmAnalise = () => {

    const [status, setStatus] = useState({
        agendar: true,
        agendado: false,
        humanizado: false,
        naoLidas: false,
        janelas: false,
        ajustar: false,
        semWhats: false,
        erroWhatsapp: false
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

    const handleChangeAgendado = (event) => {
        if (event.target.name === 'agendado' && status.agendar) {
            setStatus({ ...status, agendado: true, agendar: false });
        } else if (event.target.name === 'agendar' && status.agendado) {
            setStatus({ ...status, agendado: false, agendar: true });
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

            const result = await filterPropostas({
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
            janelas: false,
            ajustar: false,
            semWhats: false,
            agendado: false,
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
    }

    const handleAll = () => {
        setStatus({
            agendar: true,
            humanizado: true,
            janelas: true,
            ajustar: true,
            semWhats: true,
            agendado: true,
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

    return (
        <Box >
            <Typography
                variant="h5"
                m={2}
            >
                Em análise
            </Typography>
            <Divider />
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
                    handleClear={handleClear}
                    handleAll={handleAll}
                    idade={idade}
                    handleChangeIdade={handleChangeIdade}
                />
                <Box p={1} width={'100%'}>

                    <form action="" style={{ display: 'flex', margin: '10px' }} onSubmit={handlePesquisar} >
                        <TextField label="Pesquisar" variant="outlined" size="small" value={pesquisa} onChange={e => setPesquisa(e.target.value)} />
                        <Button sx={{ ml: 2 }} variant={'contained'} color={'primary'} size="small" type="submit">Pesquisar</Button>
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
                                        <TableRow sx={{ bgcolor: blue[600] }}>
                                            <TableCell sx={{ color: "white" }}>Recebimento</TableCell>
                                            <TableCell sx={{ color: "white" }} >Vigência</TableCell>
                                            <TableCell sx={{ color: "white" }}>Proposta</TableCell>
                                            <TableCell sx={{ color: "white" }}>Nome</TableCell>
                                            <TableCell sx={{ color: "white" }}>Associado</TableCell>
                                            <TableCell sx={{ color: "white" }}>Idade</TableCell>
                                            <TableCell sx={{ color: "white" }}>Sexo</TableCell>
                                            <TableCell sx={{ color: "white" }}>Tipo Contrato</TableCell>
                                            <TableCell sx={{ color: "white" }}>Janela Escolhida</TableCell>
                                            <TableCell sx={{ color: "white" }}>Status</TableCell>
                                            <TableCell sx={{ color: "white" }}>Risco</TableCell>
                                            <TableCell sx={{ color: "white" }}>Detalhes</TableCell>
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
                                                            color={'primary'}
                                                            size={'small'}
                                                            onClick={() => {
                                                                setCpfTitular(proposta.cpfTitular)
                                                                setOpenDialog(true)
                                                                setSelected(proposta.cpfTitular)
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
        </Box >
    );
}

export default FiltroEmAnalise;
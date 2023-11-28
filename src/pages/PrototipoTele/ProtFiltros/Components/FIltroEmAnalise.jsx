import { Box, Button, CircularProgress, Divider, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { filterPropostas, filterPropostasNaoRealizadas } from "../../../../_services/teleEntrevistaExterna.service";
import Filtros from "./Filtros";
import moment from "moment";
import { blue } from "@mui/material/colors";

const FiltroEmAnalise = () => {

    const [agendado, setAgendado] = useState(false);

    const [status, setStatus] = useState({
        agendar: false,
        agendado: false,
        humanizado: false,
        janelas: false,
        ajustar: false,
        semWhats: false,
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

    const handleChangeStatus = (event) => {
        setStatus({ ...status, [event.target.name]: event.target.checked });
    }

    const handleChangeTipoContrato = (event) => {
        setTipoContrato({ ...tipoContrato, [event.target.name]: event.target.checked });
    }

    const handleChangeVigencia = (event) => {
        setVigencia({ ...vigencia, [event.target.name]: event.target.checked });
    }

    const handleChangeAltoRisco = (event) => {
        setAltoRisco({ ...altoRisco, [event.target.name]: event.target.checked });
    }

    const handleChangeIdade = (event) => {
        setIdade({ ...idade, [event.target.name]: event.target.checked });
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
        e.preventDefault();
        if (pesquisa === '') {
            return;
        }
        setLoading(true);
        setPage(1)
        const result = await filterPropostasNaoRealizadas({
            pesquisa: pesquisa,
            page: 1,
            limit: 100
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
                                                <TableCell>{proposta.newStatus}</TableCell>
                                                <TableCell>{proposta.riscoBeneficiario}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant={'contained'}
                                                        color={'primary'}
                                                        size={'small'}
                                                        href={`/entrevistas/protDetalhesTele/${proposta.cpfTitular}`}
                                                        target="_blank"
                                                    >
                                                        Detalhes
                                                    </Button>
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
        </Box >
    );
}

export default FiltroEmAnalise;
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { filterPropostas } from "../../../../_services/teleEntrevistaExterna.service";
import Filtros from "./Filtros";

const FiltroEmAnalise = () => {

    const [status, setStatus] = useState({
        agendar: true,
        humanizado: true,
        janelas: true,
        ajustar: true,
        semWhats: true,
        agendado: true,
    });

    const [tipoContrato, setTipoContrato] = useState({
        pme: true,
        pf: true,
        adesao: true,
    });

    const [vigencia, setVigencia] = useState({
        noPrazo: true,
        foraDoPrazo: true,
    });

    const [altoRisco, setAltoRisco] = useState({
        baixo: true,
        medio: true,
        alto: true,
    });

    const [propostas, setPropostas] = useState([]);

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

    const handleFilter = async () => {
        try {

            const result = await filterPropostas({
                status: status,
                tipoContrato: tipoContrato,
                vigencia: vigencia,
                altoRisco: altoRisco,
            })

            setPropostas(result);

            console.log(result);

        } catch (error) {
            console.log(error);
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
    }

    const fetchPropostas = async () => {
        try {
            const result = await filterPropostas({
                status: status,
                tipoContrato: tipoContrato,
                vigencia: vigencia,
                altoRisco: altoRisco,
            })

            setPropostas(result);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPropostas();
    }, []);

    return (
        <Box>
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
                />
                <Box>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Recebimento</TableCell>
                                    <TableCell>Vigência</TableCell>
                                    <TableCell>Proposta</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Associado</TableCell>
                                    <TableCell>Idade</TableCell>
                                    <TableCell>Sexo</TableCell>
                                    <TableCell>Tipo Contrato</TableCell>
                                    <TableCell>Janela Escolhida</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Risco</TableCell>
                                    <TableCell>Detalhes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {propostas.map((proposta) => (
                                    <TableRow
                                        key={proposta._id}
                                    >
                                        <TableCell>{proposta.dataRecebimento}</TableCell>
                                        <TableCell>{proposta.vigencia}</TableCell>
                                        <TableCell>{proposta.proposta}</TableCell>
                                        <TableCell>{proposta.nome}</TableCell>
                                        <TableCell>{proposta.tipoAssociado}</TableCell>
                                        <TableCell>{proposta.idade}</TableCell>
                                        <TableCell>{proposta.sexo}</TableCell>
                                        <TableCell>{proposta.tipoContrato}</TableCell>
                                        <TableCell>{proposta.janelaEscolhida}</TableCell>
                                        <TableCell>{proposta.newStatus}</TableCell>
                                        <TableCell>{proposta.risco}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant={'contained'}
                                                color={'primary'}
                                            >
                                                Detalhes
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
}

export default FiltroEmAnalise;
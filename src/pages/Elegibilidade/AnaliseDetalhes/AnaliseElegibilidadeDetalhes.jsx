import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import StatusGeral from "./StatusGeral";
import { Box, Typography, Container, Paper, Alert } from "@mui/material";
import PrimeiraFase from "./PrimeiraFase";
import SegundaFase from "./SegundaFase";
import BlacklistDiplomas from "./BlacklistDiplomas";
import AgendaElegibilidade from "./AgendaElegibilidade";
import BotoesElegibilidade from "./BotoesElegibilidade";
import MotivoCancelamento from "./MotivoCancelamento";
import { alterarStatus, getAgenda, getBlacklist, getConsultaCpf, getInfoProposta, getPlanosBlacklist } from "../../../_services/elegibilidade.service";

const AnaliseElegibilidadeDetalhes = () => {

    const { id } = useParams()
    const [proposta, setProposta] = useState({})
    const [agenda, setAgenda] = useState([])
    const [blacklist, setBlacklist] = useState([])
    const [cpfCancelado, setCpfCancelado] = useState(false)
    const [planos, setPlanos] = useState([])

    const buscarBlacklist = async () => {
        try {

            //const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/blacklist`, { withCredentials: true })

            const result = await getBlacklist()

            setBlacklist(result)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarDados = async () => {
        try {

            const { proposta } = await getInfoProposta(id)

            if (proposta.status === 'A iniciar') {

                await alterarStatus({ id: proposta._id })

                buscarDados()
            }

            setProposta(proposta);

            let consultaCpf

            if (proposta.cpfCorretor) {
                consultaCpf = await getConsultaCpf(proposta.cpfCorretor)
            }

            if (consultaCpf?.msg === 'ok') {
                setCpfCancelado(true)
            }

            const resultPlanos = await getPlanosBlacklist()

            console.log(resultPlanos);

            setPlanos(resultPlanos)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarAgenda = async () => {
        try {

            const result = await getAgenda(id)

            setAgenda(result)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarDados()
        buscarAgenda()
        buscarBlacklist()
    }, [])

    return (
        <>
            <Sidebar />
            <Box width='100%' height='100vh' overflow='auto'>
                <Container>
                    <Typography variant="h6" m={2}>
                        Responsável: {proposta.analista}
                    </Typography>
                    {
                        planos.includes(proposta.plano) ? (
                            <Alert severity="error">Plano na Blacklist - {proposta.plano}</Alert>
                        ) : null
                    }
                    <Box component={Paper} elevation={3} p={2}>
                        <Typography variant="h6" bgcolor='royalblue' p={1} color='white' borderRadius='5px'>
                            {proposta.proposta} - {proposta.nome} - {blacklist.some(obj => obj.nomeCorretor === proposta.nomeCorretor) && proposta.nomeCorretor ? '*Corretor na blacklist*' : null} {cpfCancelado ? '- CPF JÁ CANCELADO' : ''}
                        </Typography>

                        {
                            Object.keys(proposta).length !== 0 ? (
                                <StatusGeral
                                    statusProposta={proposta.status}
                                    status1Analise={proposta.status1Analise}
                                    status2Analise={proposta.status2Analise}
                                    status3Analise={proposta.status3Analise}
                                    corretor={proposta.nomeCorretor}
                                />
                            ) : null
                        }

                        {
                            Object.keys(proposta).length !== 0 ? (
                                <PrimeiraFase
                                    entidade={proposta.entidade}
                                    planoAmil={proposta.planoAmil}
                                    dataInicio={proposta.dataInicioPlanoAmil}
                                    dataFim={proposta.dataFimPlanoAmil}
                                    custo={proposta.custoPlanoAmil}
                                    cpfCorretor={proposta.cpfCorretor}
                                    nomeCorretor={proposta.nomeCorretor}
                                    telefoneCorretor={proposta.telefoneCorretor}
                                    cpfSupervisor={proposta.cpfCorretor}
                                    nomeSupervisor={proposta.nomeSupervisor}
                                    telefoneSupervisor={proposta.telefoneSupervisor}
                                    fase1={proposta.fase1}
                                    id={id}
                                    atualizarDados={buscarDados}
                                />
                            ) : null
                        }

                        {
                            Object.keys(proposta).length !== 0 ? (
                                <SegundaFase
                                    proposta={proposta}
                                />
                            ) : null
                        }

                        {
                            Object.keys(proposta).length !== 0 ? (
                                <BlacklistDiplomas proposta={proposta} />
                            ) : null
                        }

                        {
                            Object.keys(proposta).length !== 0 && proposta.fase1 ? (
                                <BotoesElegibilidade
                                    atualizarDados={buscarDados}
                                    proposta={proposta}
                                    blacklistPlanos={planos}
                                />
                            ) : null
                        }
                        {
                            Object.keys(proposta).length !== 0 && proposta.motivoCancelamento ? (
                                <MotivoCancelamento proposta={proposta}></MotivoCancelamento>
                            ) : null
                        }
                        <AgendaElegibilidade id={id} agenda={agenda} buscarAgenda={() => buscarAgenda()} />

                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default AnaliseElegibilidadeDetalhes
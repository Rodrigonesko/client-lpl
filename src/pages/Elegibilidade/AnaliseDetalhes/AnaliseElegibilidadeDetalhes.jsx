import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import './AnaliseElegibilidadeDetalhes.css'
import StatusGeral from "./StatusGeral";
import { Box, Typography, Container, Paper } from "@mui/material";
import PrimeiraFase from "./PrimeiraFase";
import SegundaFase from "./SegundaFase";
import AgendaElegibilidade from "./AgendaElegibilidade";
import BotoesElegibilidade from "./BotoesElegibilidade";

const AnaliseElegibilidadeDetalhes = () => {

    const { id } = useParams()
    const [proposta, setProposta] = useState({})
    const [agenda, setAgenda] = useState([])


    const buscarDados = async () => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/infoProposta/${id}`, { withCredentials: true })
        const { proposta } = result.data;
        setProposta(proposta);
    }

    const buscarAgenda = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/agenda/${id}`, {
                withCredentials: true
            })

            setAgenda(result.data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarDados()
        buscarAgenda()
    }, [])

    return (
        <>
            <Sidebar />
            <Box width='100%' height='100vh' overflow='auto'>
                <Container>
                    <Typography variant="h6" m={2}>
                        Responsável: {proposta.analista}
                    </Typography>
                    <Box component={Paper} elevation={3} p={2}>
                        <Typography variant="h6" bgcolor='royalblue' p={1} color='white' borderRadius='5px'>
                            {proposta.proposta} - {proposta.nome}
                        </Typography>

                        {
                            Object.keys(proposta).length !== 0 ? (
                                <StatusGeral
                                    statusProposta={proposta.status}
                                    status1Analise={proposta.status1Analise}
                                    status2Analise={proposta.status2Analise}
                                    status3Analise={proposta.status3Analise}
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
                            <BotoesElegibilidade></BotoesElegibilidade>
                        }
                        <AgendaElegibilidade id={id} agenda={agenda} buscarAgenda={() => buscarAgenda()} />

                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default AnaliseElegibilidadeDetalhes

import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import './AnaliseElegibilidadeDetalhes.css'
import StatusGeral from "./StatusGeral";
import { Box, Typography, Container, Paper } from "@mui/material";

import PrimeiraFase from "./PrimeiraFase";
import SegundaFase from "./SegundaFase";

const AnaliseElegibilidadeDetalhes = () => {

    const { id } = useParams()
    const [proposta, setProposta] = useState({})




    useEffect(() => {

        const buscarDados = async () => {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/infoProposta/${id}`, { withCredentials: true })
            const { proposta } = result.data;
            setProposta(proposta);
        }

        buscarDados()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <Container>
                <Typography variant="h6" m={2}>
                    Responsável: {proposta.analista}
                </Typography>
                <Box component={Paper} elevation={3} p={2}>

                    <Typography variant="h6" bgcolor='royalblue' p={1} color='white' borderRadius='5px'>
                        {proposta.proposta} - {proposta.nome}
                    </Typography>

                    <StatusGeral
                        statusProposta={proposta.status}
                        status1Analise={proposta.status1Analise}
                        status2Analise={proposta.status2Analise}
                        status3Analise={proposta.status3Analise}
                    />

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
                            />
                        ) : null
                    }

                    {
                        Object.keys(proposta).length !== 0 ? (
                            <SegundaFase />
                        ) : null
                    }


                </Box>

            </Container>
        </>
    )
}

export default AnaliseElegibilidadeDetalhes

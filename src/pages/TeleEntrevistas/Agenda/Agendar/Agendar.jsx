import React, { useState, useEffect } from "react";
import { Typography, Box, Container } from "@mui/material";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import TabelaAgendarRn from "../../../../components/TabelaAgendar/TabelaAgendarRn";
import BotoesRelatorios from "../../../../components/TabelaAgendar/BotoesRelatorio";
import Agendamento from "../../../../components/TabelaAgendar/Agendamento";
import GerarHorarios from "../../../../components/TabelaAgendar/GerarHorarios";
import { CircularProgress } from "@mui/material";

import './Agendar.css'
import { getDiasDisponiveis, getHorariosDisponiveis, getRnsNaoAgendadas } from "../../../../_services/teleEntrevista.service";
import HorariosDisponiveis from "./HorariosDisponiveis";
import TabelaTele from "./components/TabelaTele";


const Agendar = () => {

    const [rns, setRns] = useState([])
    const [loading, setLoading] = useState(false)
    const [datasEntrevista, setDatasEntrevista] = useState([])

    const [horarios, setHorarios] = useState({})
    const [analistasDisponiveis, setAnalistasDisponiveis] = useState({})

    const searchPropostas = async () => {
        try {
            setLoading(true)
            const resultRns = await getRnsNaoAgendadas()
            let arrRn = []
            for (const proposta of resultRns.result) {
                arrRn.push({
                    proposta: proposta.proposta,
                    nome: `${proposta.beneficiario} - RN`,
                    id: proposta._id,
                    celula: 'rn'
                })
            }
            setRns(resultRns.result)
            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarHorariosDisp = async () => {
        try {
            const result = await getHorariosDisponiveis()
            setHorarios(result.obj)
            setAnalistasDisponiveis(result.analistasDisponiveis)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const buscarDiasDisponiveis = async () => {
            try {
                const result = await getDiasDisponiveis()
                setDatasEntrevista(result)
            } catch (error) {
                console.log(error);
            }
        }
        buscarDiasDisponiveis()
        searchPropostas()
        buscarHorariosDisp()

    }, [])

    return (

        <Sidebar>
            <Container
                maxWidth="xl"
            >
                {
                    loading ? (
                        <CircularProgress style={{ position: 'absolute', right: '50%', top: '50%' }} />
                    ) : null
                }
                <Box className="agendamento-container">
                    <Typography variant="h5">
                        <h3>Agendamento de Horários</h3>
                    </Typography>
                    <GerarHorarios />
                    <Agendamento propostas={0} dias={datasEntrevista} />
                    <BotoesRelatorios />
                    <TabelaTele />
                    <TabelaAgendarRn propostas={rns} />
                    {
                        (Object.keys(horarios).length !== 0 && Object.keys(analistasDisponiveis) !== 0) && (
                            <HorariosDisponiveis horarios={horarios} analistasDisponiveis={analistasDisponiveis} />

                        )
                    }
                </Box>
            </Container>


        </Sidebar>

    )
}

export default Agendar
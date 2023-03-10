import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { Typography } from "@mui/material";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import TabelaAgendarRn from "../../../../components/TabelaAgendar/TabelaAgendarRn";
import TabelaAgendarTele from "../../../../components/TabelaAgendar/TabelaAgendarTele";
import BotoesRelatorios from "../../../../components/TabelaAgendar/BotoesRelatorio";
import Agendamento from "../../../../components/TabelaAgendar/Agendamento";
import GerarHorarios from "../../../../components/TabelaAgendar/GerarHorarios";
import { CircularProgress } from "@mui/material";
import config from "../../../../config/axiosHeader";
// import AuthContext from "../../../../context/AuthContext";

import './Agendar.css'


const Agendar = () => {

    // const { accessLevel } = useContext(AuthContext)

    const [propostas, setPropostas] = useState([])
    const [rns, setRns] = useState([])
    const [propostasTotal, setPropostasTotal] = useState([])
    const [enfermeiros, setEnfermeiros] = useState([])
    const [loading, setLoading] = useState(false)

    const [horarios, setHorarios] = useState({})


    const searchPropostas = async () => {
        try {

            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/naoAgendadas`, { withCredentials: true, headers: config.headers })

            const resultRns = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/naoAgendadas`, { withCredentials: true })

            let arrTele = []
            let arrRn = []

            for (const proposta of result.data.propostas) {
                arrTele.push({
                    proposta: proposta.proposta,
                    nome: `${proposta.nome} - TELE`,
                    id: proposta._id,
                    celula: 'tele'
                })
            }

            for (const proposta of resultRns.data.result) {
                arrRn.push({
                    proposta: proposta.proposta,
                    nome: `${proposta.beneficiario} - RN`,
                    id: proposta._id,
                    celula: 'rn'
                })
            }

            const arrTotal = arrTele.concat(arrRn)

            setRns(resultRns.data.result)

            setPropostas(result.data.propostas)

            setPropostasTotal(arrTotal)

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    const searchEnfermeiros = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users/enfermeiros`, { withCredentials: true })

            setEnfermeiros(result.data.enfermeiros)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarHorariosDisp = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/horarios/disponiveis`, { withCredentials: true })

            setHorarios(result.data.obj)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        searchPropostas()
        searchEnfermeiros()
        buscarHorariosDisp()

    }, [])

    return (
        <>
            <Sidebar />
            <section className="section-agendamento-container">
                {
                    loading ? (
                        <CircularProgress style={{ position: 'absolute', right: '50%', top: '50%' }} />
                    ) : null
                }
                <div className="agendamento-container">
                    <Typography variant="h5">
                        <h3>Agendamento de Horários</h3>
                    </Typography>

                    <GerarHorarios />

                    <Agendamento propostas={propostasTotal} responsaveis={enfermeiros} />

                    <BotoesRelatorios />

                    <TabelaAgendarTele atualizarTabela={searchPropostas} propostas={propostas}>

                    </TabelaAgendarTele>

                    <TabelaAgendarRn propostas={rns}>

                    </TabelaAgendarRn>

                    {/* <HorariosDisponiveis /> */}

                    <div className="horarios-disponiveis-container">
                        <div className="title">
                            <h3>Horarios Disponíveis</h3>
                        </div>
                        {
                            Object.keys(horarios).map(data => {
                                return (
                                    <div className="horarios-disponiveis-card">
                                        <span>Horários disponíveis para o dia <strong>{data}</strong></span>
                                        <br />
                                        {
                                            horarios[data].map(horario => {
                                                return (
                                                    <span>{horario} - </span>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Agendar
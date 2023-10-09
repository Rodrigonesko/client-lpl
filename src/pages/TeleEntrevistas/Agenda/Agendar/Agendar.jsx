import React, { useState, useEffect } from "react";
import { Typography, TextField, Box, Paper, Button } from "@mui/material";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import TabelaAgendarRn from "../../../../components/TabelaAgendar/TabelaAgendarRn";
import TabelaAgendarTele from "../../../../components/TabelaAgendar/TabelaAgendarTele";
import BotoesRelatorios from "../../../../components/TabelaAgendar/BotoesRelatorio";
import Agendamento from "../../../../components/TabelaAgendar/Agendamento";
import GerarHorarios from "../../../../components/TabelaAgendar/GerarHorarios";
import { CircularProgress } from "@mui/material";

import './Agendar.css'
import { getDiasDisponiveis, getHorariosDisponiveis, getProposasNaoAgendadas, getRnsNaoAgendadas } from "../../../../_services/teleEntrevista.service";
import HorariosDisponiveis from "./HorariosDisponiveis";


const Agendar = () => {

    const [propostas, setPropostas] = useState([])
    const [rns, setRns] = useState([])
    const [propostasTotal, setPropostasTotal] = useState([])
    const [loading, setLoading] = useState(false)
    const [datasEntrevista, setDatasEntrevista] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    const [horarios, setHorarios] = useState({})
    const [analistasDisponiveis, setAnalistasDisponiveis] = useState({})

    const buscarPessoa = async (event) => {
        try {
            event.preventDefault()
            setLoading(true)
            const result = await getProposasNaoAgendadas()
            // const resultRns = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/naoAgendadas`, { withCredentials: true })
            let arrAux = result.propostas.filter(elem => {
                return elem.nome?.includes(pesquisa) || elem.proposta?.includes(pesquisa)
            })
            setPropostas(arrAux)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const searchPropostas = async () => {
        try {
            setLoading(true)
            const result = await getProposasNaoAgendadas()
            const resultRns = await getRnsNaoAgendadas()
            let arrTele = []
            let arrRn = []
            for (const proposta of result.propostas) {
                arrTele.push({
                    proposta: proposta.proposta,
                    nome: `${proposta.nome} - TELE`,
                    id: proposta._id,
                    celula: 'tele'
                })
            }
            for (const proposta of resultRns.result) {
                arrRn.push({
                    proposta: proposta.proposta,
                    nome: `${proposta.beneficiario} - RN`,
                    id: proposta._id,
                    celula: 'rn'
                })
            }
            const arrTotal = arrTele.concat(arrRn)
            setRns(resultRns.result)
            setPropostas(result.propostas)
            setPropostasTotal(arrTotal)
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
                    <Agendamento propostas={propostasTotal} dias={datasEntrevista} />
                    <BotoesRelatorios />
                    <Box component={Paper} p={2} m={2} width='100%'>
                        <form action="">
                            <TextField label='Pessoa ou proposta' size="small" onChange={e => setPesquisa(e.target.value)} />
                            <Button type="submit" variant="contained" style={{ marginLeft: '10px' }} onClick={buscarPessoa}>Buscar</Button>
                        </form>
                    </Box>
                    <TabelaAgendarTele atualizarTabela={searchPropostas} propostas={propostas} />
                    <TabelaAgendarRn propostas={rns} />
                    {
                        (Object.keys(horarios).length !== 0 && Object.keys(analistasDisponiveis) !== 0) && (
                            <HorariosDisponiveis horarios={horarios} analistasDisponiveis={analistasDisponiveis} />

                        )
                    }
                    {/* <div className="horarios-disponiveis-container">
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
                    </div> */}
                </div>
            </section>
        </>
    )
}

export default Agendar
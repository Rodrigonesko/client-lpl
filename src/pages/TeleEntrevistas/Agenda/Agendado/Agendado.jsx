import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { Typography, Select, FormControl, MenuItem, InputLabel, Box, CircularProgress } from "@mui/material";
import RnsAgendadas from "../../../../components/Agendadas/RnsAgendadas";
import TeleAgendadas from "../../../../components/Agendadas/TeleAgendadas";
import './Agendado.css'


const Agendado = () => {

    const [propostas, setPropostas] = useState([])
    const [enfermeiros, setEnfermeiros] = useState([])
    const [qtdAgendado, setQtdAgendado] = useState(0)
    const [rns, setRns] = useState([])
    const [loading, setLoading] = useState(false)

    const searchEnfermeiro = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users/enfermeiros`, { withCredentials: true })

            setEnfermeiros(result.data.enfermeiros)

            console.log(enfermeiros);

        } catch (error) {
            console.log(error);
        }
    }

    const searchPropostas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/agendadas`, { withCredentials: true })
            const resultRn = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/agendadas`, { withCredentials: true })

            setPropostas(result.data.propostas)
            setRns(resultRn.data.rns)
            setQtdAgendado(result.data.propostas.length + resultRn.data.rns.length)

        } catch (error) {
            console.log(error);
        }
    }

    const filtroEnfermeiro = async enfermeiro => {
        setLoading(true)
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/agendadas`, { withCredentials: true })
        const resultRn = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/agendadas`, { withCredentials: true })
        setPropostas([])
        setRns([])

        if (enfermeiro === 'Todos') {
            searchPropostas()
        }

        Object.values(result.data.propostas).forEach(e => {
            if (e.enfermeiro === enfermeiro) {
                setPropostas(propostas => [...propostas, e])
            }
        })

        Object.values(resultRn.data.rns).forEach(e => {
            if (e.responsavel === enfermeiro) {
                setRns(rns => [...rns, e])
            }
        })

        setLoading(false)

    }

    useEffect(() => {
        searchPropostas()
        searchEnfermeiro()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            {
                loading ? (
                    <CircularProgress style={{ position: 'absolute', top: '50%', left: '49%' }} />
                ) : null
            }
            <section className="section-agendados-container">
                <div className="agendados-container">
                    <Typography variant="h5" m={3}>
                        Agendados Tele e Rn - Total: {qtdAgendado}
                    </Typography>
                    <Box>
                        <FormControl size='small'>
                            <InputLabel>Analista</InputLabel>
                            <Select
                                defaultValue=''
                                style={{ minWidth: '100px' }}
                                labelId='label-analista'
                                id='select-analista'
                                label="Analista"
                                onChange={e => {
                                    filtroEnfermeiro(e.target.value)
                                }}
                            >
                                <MenuItem key='todos' value='Todos'>Todos</MenuItem>
                                {
                                    enfermeiros.map(e => {
                                        return (
                                            <MenuItem key={e._id} value={e.name}>{e.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <TeleAgendadas propostas={propostas}>

                    </TeleAgendadas>

                    <RnsAgendadas propostas={rns}>

                    </RnsAgendadas>
                </div>
            </section>
        </>
    )
}

export default Agendado
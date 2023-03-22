import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { Select, FormControl, MenuItem, InputLabel, Box, CircularProgress } from "@mui/material";
import TeleAgendadas from "../../../../components/Agendadas/TeleAgendadas";
import './Agendado.css'
import moment from "moment";
import { getCookie } from "react-use-cookie";


const Agendado = () => {

    const [propostas, setPropostas] = useState([])
    const [enfermeiros, setEnfermeiros] = useState([])
    const [responsavel, setResponsavel] = useState('todos')
    const [loading, setLoading] = useState(false)

    const searchEnfermeiro = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users/enfermeiros`, { withCredentials: true })

            setEnfermeiros(result.data.enfermeiros)

        } catch (error) {
            console.log(error);
        }
    }

    const searchPropostas = async () => {
        try {

            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/agendadas`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${getCookie('token')}` }
            })
            const resultRn = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/agendadas`, { withCredentials: true })

            let arr = []

            for (const item of result.data) {
                arr.push({
                    dataEntrevista: item.dataEntrevista,
                    proposta: item.proposta,
                    telefone: item.telefone,
                    nome: item.nome,
                    idade: item.idade,
                    sexo: item.sexo,
                    enfermeiro: item.enfermeiro,
                    _id: item._id,
                    tipo: 'Tele',
                    contato1: item.contato1,
                    contato2: item.contato2,
                    contato3: item.contato3,
                })
            }

            for (const item of resultRn.data.rns) {
                arr.push({
                    dataEntrevista: item.dataEntrevista,
                    proposta: item.proposta,
                    telefone: item.telefones,
                    nome: item.beneficiario,
                    idade: item.idade,
                    enfermeiro: item.responsavel,
                    _id: item._id,
                    tipo: 'Rn'
                })
            }

            arr.sort(function compare(a, b) {
                if (moment(a.dataEntrevista) < moment(b.dataEntrevista)) return -1;
                if (moment(a.dataEntrevista) > moment(b.dataEntrevista)) return 1;
                return 0;
            })

            setPropostas(arr)

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    const filtroEnfermeiro = async enfermeiro => {
        setLoading(true)
        const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/agendadas`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${getCookie('token')}` }
        })
        const resultRn = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/agendadas`, { withCredentials: true })

        let arr = []

        for (const item of result.data) {
            arr.push({
                dataEntrevista: item.dataEntrevista,
                proposta: item.proposta,
                telefone: item.telefone,
                nome: item.nome,
                idade: item.idade,
                sexo: item.sexo,
                enfermeiro: item.enfermeiro,
                _id: item._id,
                tipo: 'Tele',
                contato1: item.contato1,
                contato2: item.contato2,
                contato3: item.contato3,
            })
        }

        for (const item of resultRn.data.rns) {
            arr.push({
                dataEntrevista: item.dataEntrevista,
                proposta: item.proposta,
                telefone: item.telefones,
                nome: item.beneficiario,
                idade: item.idade,
                enfermeiro: item.responsavel,
                _id: item._id,
                tipo: 'Rn'
            })
        }

        arr.sort(function compare(a, b) {
            if (moment(a.dataEntrevista) < moment(b.dataEntrevista)) return -1;
            if (moment(a.dataEntrevista) > moment(b.dataEntrevista)) return 1;
            return 0;
        })

        setPropostas([])

        if (enfermeiro === 'Todos') {
            searchPropostas()
        }

        arr.forEach(e => {
            if (e.enfermeiro === enfermeiro) {
                setPropostas(propostas => [...propostas, e])
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
                    <Box mt={3}>
                        <FormControl size='small'>
                            <InputLabel>Analista</InputLabel>
                            <Select
                                defaultValue=''
                                style={{ minWidth: '100px' }}
                                labelId='label-analista'
                                id='select-analista'
                                label="Analista"
                                onChange={e => {
                                    setResponsavel(e.target.value)
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
                    <TeleAgendadas propostas={propostas} atualizarPropostas={filtroEnfermeiro} analista={responsavel} />
                </div>
            </section>
        </>
    )
}

export default Agendado
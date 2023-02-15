import React, { useState } from "react";
import Axios from 'axios'
import { Box, TextField, Autocomplete, Select, FormControl, MenuItem, InputLabel, Button } from "@mui/material";

const Agendamento = ({ propostas, responsaveis, dias, horarios }) => {

    const [idProposta, setIdProposta] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [datasEntrevista, setDatasEntrevista] = useState([])
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([])
    const [dataEntrevista, setDataEntrevista] = useState('')
    const [horarioEntrevista, setHorarioEntrevista] = useState('')

    const ajustarDia = (data) => {
        const arr = data.split('/')

        return `${arr[2]}-${arr[1]}-${arr[0]}`
    }

    const searchDataDisp = async (responsavel) => {
        try {

            setResponsavel(responsavel)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/buscarDiasDisponiveis/${responsavel}`, { withCredentials: true })

            setDatasEntrevista(result.data.dias)

        } catch (error) {
            console.log(error);
        }
    }

    const searchHorariosDisp = async (dia) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/buscarHorariosDisponiveis/${responsavel}/${ajustarDia(dia)}`, { withCredentials: true })

            setHorariosDisponiveis(result.data.horarios)

        } catch (error) {
            console.log(error);
        }
    }

    const agendar = async () => {
        try {
            console.log(idProposta, responsavel, dataEntrevista, horarioEntrevista);

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/agendar`, { id: idProposta, responsavel, data: dataEntrevista, horario: horarioEntrevista }, { withCredentials: true })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box minWidth='60%' m={2} display='flex' alignItems='center' justifyContent='space-around'>
            <Autocomplete
                fullWidth
                onChange={(event, newValue) => {
                    setIdProposta(newValue.id);
                }}
                id='propostas'
                options={propostas}
                getOptionLabel={propostas => propostas.nome}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Beneficiário" />}
                size='small'
            />
            <FormControl size="small">
                <InputLabel id="label-responsavel">Responsável</InputLabel>
                <Select
                    labelId="label-responsavel"
                    id="select-responsavel"
                    label="Responsável"
                    style={{ minWidth: '140px' }}
                    onChange={e => {
                        searchDataDisp(e.target.value)
                    }}
                    defaultValue=''
                >
                    {
                        responsaveis.map(e => {
                            return (
                                <MenuItem key={e._id} value={e.name}>{e.name}</MenuItem>
                            )
                        })
                    }

                </Select>
            </FormControl>
            <FormControl size="small">
                <InputLabel id="label-dia">Dia</InputLabel>
                <Select
                    defaultValue=''
                    style={{ minWidth: '100px' }}
                    labelId="label-dia"
                    id="select-doa"
                    label="Dia"
                    onChange={e => {
                        searchHorariosDisp(e.target.value)
                        setDataEntrevista(e.target.value)
                    }}
                >
                    {
                        datasEntrevista.map(e => {
                            return (
                                <MenuItem key={e} value={e}>{e}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
            <FormControl size="small" >
                <InputLabel id="label-horario">Horário</InputLabel>
                <Select
                    defaultValue=''
                    style={{ minWidth: '100px' }}
                    labelId="label-horario"
                    id="select-horario"
                    label="Horario"
                    onChange={e => setHorarioEntrevista(e.target.value)}
                >
                    {
                        horariosDisponiveis.map(e => {
                            return (
                                <MenuItem key={e} value={e}>{e}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
            <Button variant='contained' onClick={agendar}>Agendar</Button>
        </Box>
    )
}

export default Agendamento
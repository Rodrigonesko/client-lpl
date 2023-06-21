import React, { useState } from "react";
import { Box, TextField, Autocomplete, Select, FormControl, MenuItem, InputLabel, Button, CircularProgress } from "@mui/material";
import { agendarEntrevista, getAnalistasDisponiveis, getHorariosDisponiveisPorDia } from "../../_services/teleEntrevista.service";

const Agendamento = ({ propostas, dias }) => {

    const [idProposta, setIdProposta] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [responsaveis, setResponsaveis] = useState([])
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([])
    const [dataEntrevista, setDataEntrevista] = useState('')
    const [horarioEntrevista, setHorarioEntrevista] = useState('')
    const [loading, setLoading] = useState(false)

    const ajustarDia = (data) => {
        const arr = data.split('/')

        return `${arr[2]}-${arr[1]}-${arr[0]}`
    }


    const buscarHorarios = async (dia) => {
        try {

            const result = await getHorariosDisponiveisPorDia(ajustarDia(dia))

            setHorariosDisponiveis(result)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarAnalistasDisponiveis = async (horario) => {
        try {

            const result = await getAnalistasDisponiveis(ajustarDia(dataEntrevista), horario)

            setResponsaveis(result)

        } catch (error) {
            console.log(error);
        }
    }

    const agendar = async () => {
        try {

            setLoading(true)

            console.log(idProposta, responsavel, dataEntrevista, horarioEntrevista);

            await agendarEntrevista({ id: idProposta, responsavel, data: dataEntrevista, horario: horarioEntrevista })

            window.location.reload()

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
                <InputLabel id="label-dia">Dia</InputLabel>
                <Select
                    defaultValue=''
                    style={{ minWidth: '100px' }}
                    labelId="label-dia"
                    id="select-doa"
                    label="Dia"
                    onChange={e => {
                        buscarHorarios(e.target.value)
                        setDataEntrevista(e.target.value)
                    }}
                >
                    {
                        dias.map(e => {
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
                    onChange={e => {
                        setHorarioEntrevista(e.target.value)
                        buscarAnalistasDisponiveis(e.target.value)
                    }}
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
            <FormControl size="small">
                <InputLabel id="label-responsavel">Responsável</InputLabel>
                <Select
                    labelId="label-responsavel"
                    id="select-responsavel"
                    label="Responsável"
                    style={{ minWidth: '140px' }}
                    onChange={e => {
                        setResponsavel(e.target.value)
                    }}
                    defaultValue=''
                >
                    {
                        responsaveis.map(e => {
                            return (
                                <MenuItem key={e} value={e}>{e}</MenuItem>
                            )
                        })
                    }

                </Select>
            </FormControl>
            <Button variant='contained' onClick={agendar}>Agendar</Button>
            {
                loading ? (
                    <CircularProgress />
                ) : null
            }
        </Box>
    )
}

export default Agendamento
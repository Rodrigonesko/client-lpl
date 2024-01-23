import { Box, FormControl, InputLabel, Select, MenuItem, Tooltip, IconButton, Typography, Divider, LinearProgress } from "@mui/material"
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { useState } from "react";
import { useEffect } from "react";
import { filterUsers } from "../../../../_services/user.service";
import { getAnalistasDisponiveis, getDiasDisponiveis, getDiasDisponiveisAnalista, getHorariosDisponiveisPorDia, getHorariosDisponiveisPorDiaEAnalista } from "../../../../_services/teleEntrevista.service";
import CheckIcon from '@mui/icons-material/Check';

const Agendamento = ({ onAgendar, obj }) => {

    const [analistas, setAnalistas] = useState([])
    const [datas, setDatas] = useState([])
    const [horarios, setHorarios] = useState([])
    const [analista, setAnalista] = useState('')
    const [data, setData] = useState('')
    const [horario, setHorario] = useState('')
    const [loading, setLoading] = useState(false)

    const ajustarDia = (data) => {
        const arr = data.split('/')

        return `${arr[2]}-${arr[1]}-${arr[0]}`
    }

    const fetchData = async () => {
        setLoading(true)
        let result = await filterUsers({
            atividadePrincipal: 'Tele Entrevista',
            inativo: { $ne: true }
        })
        result = result?.map(analista => {
            return analista.name
        })
        setAnalistas(result)
        const datas = await getDiasDisponiveis()
        setDatas(datas)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleClear = () => {
        setAnalista('')
        setData('')
        setHorario('')
        fetchData()
    }



    useEffect(() => {

        const fetchHorarios = async (data) => {
            setLoading(true)
            const result = await getHorariosDisponiveisPorDia(ajustarDia(data))
            setHorarios(result)
            setLoading(false)
        }

        const fetchHorariosPorAnalistaEData = async () => {
            setLoading(true)
            const result = await getHorariosDisponiveisPorDiaEAnalista(ajustarDia(data), analista)
            setHorarios(result.horarios)
            setLoading(false)
        }

        if (analista === '') {
            fetchHorarios(data)
        } else {
            fetchHorariosPorAnalistaEData()
        }
    }, [data, analista])

    useEffect(() => {

        const fetchDiasPorAnalista = async () => {
            setLoading(true)
            const result = await getDiasDisponiveisAnalista(analista)
            setDatas(result?.dias)
            setLoading(false)
        }


        if (data === '' && analista !== '') {
            fetchDiasPorAnalista()
        }
    }, [analista, data])

    useEffect(() => {

        const fetchAnalistaPorDataEHora = async () => {
            setLoading(true)
            const result = await getAnalistasDisponiveis(ajustarDia(data), horario)
            setAnalistas(result)
            setLoading(false)
        }

        if (analista === '' && data !== '') {
            fetchAnalistaPorDataEHora()
        } else if (analista !== '' && data !== '') {
            fetchAnalistaPorDataEHora()
        }
    }, [horario, data, analista])

    return (
        <Box p={1}>
            <LinearProgress style={{ display: loading ? 'block' : 'none', marginBottom: '4px' }} />
            <Typography variant="body">
                {obj.nome} - {obj.idade} - {obj.sexo} - {obj.tipoAssociado}
            </Typography>
            <Box display={'flex'}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel htmlFor="standard-adornment-amount">Analista</InputLabel>
                    <Select
                        id="standard-adornment-amount"
                        label="Local"
                        value={analista}
                        onChange={(e) => setAnalista(e.target.value)}
                    >
                        {analistas.map((analista, index) => {
                            return (
                                <MenuItem key={index} value={analista}>{analista}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel htmlFor="standard-adornment-amount">Data</InputLabel>
                    <Select
                        id="standard-adornment-amount"
                        label="Data"
                        value={data}
                        onChange={(e) => {
                            setData(e.target.value)
                        }}
                    >
                        {
                            datas.map((data, index) => {
                                return (
                                    <MenuItem key={index} value={data}>{data}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel htmlFor="standard-adornment-amount">Hora</InputLabel>
                    <Select
                        id="standard-adornment-amount"
                        label="Hora"
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                    >
                        {
                            horarios.map((horario, index) => {
                                return (
                                    <MenuItem key={index} value={horario}>{horario}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Tooltip title='Agendar'>
                        <IconButton onClick={() => onAgendar(analista, data, horario, obj.nome, obj._id)} size="small" sx={{ bgcolor: 'green', color: 'white' }}>
                            <CheckIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Limpar'>
                        <IconButton onClick={handleClear} size="small" color="primary">
                            <CleaningServicesIcon />
                        </IconButton>
                    </Tooltip>

                </Box>
            </Box>
            <Divider />
        </Box >
    )
}

export default Agendamento
import { Schedule } from "@mui/icons-material"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from "@mui/material"
import { useEffect, useState } from "react"
import { fecharHorarios, getAnalistasDisponiveis, getDiasDisponiveis, getDiasDisponiveisAnalista, getHorariosDisponiveisPorDia, getHorariosDisponiveisPorDiaEAnalista } from "../../../../_services/teleEntrevista.service"
import { filterUsers } from "../../../../_services/user.service"
import { invertDate } from "../../../../functions/functions"
import Toast from "../../../../components/Toast/Toast"
import { updatePedido } from "../../../../_services/sulAmerica.service"
import moment from "moment"

const ModalAgendamento = ({ pedido, setFlushHook }) => {

    const [open, setOpen] = useState(false)
    const [analistas, setAnalistas] = useState([])
    const [datas, setDatas] = useState([])
    const [horarios, setHorarios] = useState([])
    const [analista, setAnalista] = useState('')
    const [data, setData] = useState('')
    const [horario, setHorario] = useState('')
    const [loading, setLoading] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')

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

    const fetchHorarios = async (data) => {
        setLoading(true)
        const result = await getHorariosDisponiveisPorDia(invertDate(data))
        setHorarios(result)
        setLoading(false)
    }

    const fetchDiasPorAnalista = async () => {
        setLoading(true)
        const result = await getDiasDisponiveisAnalista(analista)
        setDatas(result?.dias)
        setLoading(false)
    }

    const fetchHorariosPorAnalistaEData = async () => {
        setLoading(true)
        const result = await getHorariosDisponiveisPorDiaEAnalista(invertDate(data), analista)
        console.log(result);
        setHorarios(result.horarios)
        setLoading(false)
    }

    const fetchAnalistaPorDataEHora = async () => {
        setLoading(true)
        const result = await getAnalistasDisponiveis(invertDate(data), horario)
        setAnalistas(result)
        setLoading(false)
    }

    useEffect(() => {
        if (analista === '') {
            fetchHorarios(data)
        } else {
            fetchHorariosPorAnalistaEData()
        }
    }, [data])

    useEffect(() => {
        if (data === '' && analista !== '') {
            fetchDiasPorAnalista()
        }
    }, [analista])

    useEffect(() => {
        if (analista === '' && data !== '') {
            fetchAnalistaPorDataEHora()
        } else if (analista !== '' && data !== '') {
            fetchAnalistaPorDataEHora()
        }
    }, [horario])

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleAgendar = async () => {
        try {
            setLoading(true)
            await fecharHorarios({
                responsavel: analista,
                data: invertDate(data),
                horarios: [horario],
                justiticativa: 'Agendado para Entrevista SulAmérica'
            })
            await updatePedido(pedido, {
                status: 'AGENDADO',
                dataAgendamento: `${moment(data, 'DD/MM/YYYY').format('YYYY-MM-DD')} ${horario}`,
                responsavel: analista
            })
            setLoading(false)
            setMessage('Agendado com sucesso')
            setSeverity('success')
            setOpenToast(true)
            setOpen(false)
            handleClear()
            setFlushHook(prev => !prev)
        } catch (error) {
            console.log(error);
            setMessage('Erro ao agendar')
            setSeverity('error')
            setOpenToast(true)
        }
    }

    return (
        <>
            <Tooltip title="Agendar">
                <IconButton
                    onClick={handleClickOpen}
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                >
                    <Schedule />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>
                    Agendar
                </DialogTitle>
                <DialogContent>
                    {
                        loading && (
                            <div>
                                Carregando horários disponíveis...
                            </div>
                        )
                    }
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
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
                        <Button
                            onClick={handleClear}
                            variant="contained"
                        >
                            Limpar
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleClear()
                            handleClose()
                        }}
                        color='inherit'
                        variant="contained"
                    >
                        Fechar
                    </Button>
                    <Button
                        onClick={handleAgendar}
                        variant="contained"
                        color="success"
                    >
                        Agendar
                    </Button>
                </DialogActions>
                <Toast
                    open={openToast}
                    onClose={() => setOpenToast(false)}
                    severity={severity}
                    message={message}
                />
            </Dialog>
        </>
    )
}

export default ModalAgendamento
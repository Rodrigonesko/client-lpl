import { Box, Paper, Divider, FormControl, InputLabel, Select, MenuItem, TextField, Button, Tooltip, Alert, Snackbar } from "@mui/material"
import { useState } from "react"
import { BsGraphUp } from 'react-icons/bs'
import ProducaoTeleIndividualDiaria from "./ProducaoTeleIndividualDiaria"
import ProducaoTeleIndividualMensal from "./ProducaoTeleIndividualMensal"
import { getRendimentoMensalIndividualTele } from "../../../../../_services/teleEntrevista.service"

const ProducaoIndividualTele = () => {

    const [option, setOption] = useState('')
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState('')
    const [month, setMonth] = useState('')
    const [analista, setAnalista] = useState('')
    const [openComponent, setOpenComponent] = useState(false)
    const [producaoMensal, setProducaoMensal] = useState([])
    const [totalMensal, setTotalMensal] = useState(0)
    const [houveDivergenciaMensal, setHouveDivergenciaMensal] = useState(0)
    const [naoHouveDivergenciaMensal, setNaoHouveDivergenciaMensal] = useState(0)
    const [agendadoMensal, setAgendadoMensal] = useState(0)
    const [naoAgendadoMensal, setNaoAgendadoMensal] = useState(0)
    const [primeiroContatoMensal, setPrimeiroContatoMensal] = useState(0)
    const [segundoContatoMensal, setSegundoContatoMensal] = useState(0)
    const [terceiroContatoMensal, setTerceiroContatoMensal] = useState(0)
    const [producaoMensalRn, setProducaoMensalRn] = useState([])
    const [totalRnMensal, setMensalRn] = useState(0)
    const [producaoMensalUe, setProducaoMensalUe] = useState([])
    const [totalUeMensal, setTotalMensalUe] = useState(0)

    const handleClose = () => {
        setOpen(false)
    }

    const handleShowProduction = async () => {

        if (option === '' || analista === '') {
            setOpen(true)
            return
        }

        if ((date === '' && option === 'Por dia' || month === '' && option === 'Por mês') && option !== 'Total') {
            setOpen(true)
            return
        }

        if (option === 'Por dia') {
            setOpenComponent(true)
        }

        if (option === 'Por mês') {

            const result = await getRendimentoMensalIndividualTele(month, analista)

            console.log(result);

            setProducaoMensal(result.producaoTele)
            setTotalMensal(result.total)
            setHouveDivergenciaMensal(result.houveDivergencia)
            setNaoHouveDivergenciaMensal(result.naoHouveDivergencia)
            setAgendadoMensal(result.agendadas)
            setNaoAgendadoMensal(result.naoAgendadas)
            setPrimeiroContatoMensal(result.primeiroContato)
            setSegundoContatoMensal(result.segundoContato)
            setTerceiroContatoMensal(result.terceiroContato)
            setProducaoMensalRn(result.producaoRn)
            setMensalRn(result.totalRn)
            setProducaoMensalUe(result.producaoUe)
            setTotalMensalUe(result.totalUe)
            setOpenComponent(true)
            setProducaoMensalRn()
        }
    }

    return (
        <Box component={Paper} elevation={3} p={1}>
            <Box display='flex' flexWrap='wrap' >
                <FormControl sx={{ minWidth: '200px', margin: '10px' }} size="small">
                    <InputLabel>Selecione o analista</InputLabel>
                    <Select
                        label='Selecione o analista'
                        value={analista}
                        onChange={(e) => {
                            setOpenComponent(false)
                            setDate('')
                            setMonth('')
                            setAnalista(e.target.value)
                        }}
                    >
                        <MenuItem>
                            <em>
                                Analista
                            </em>
                        </MenuItem>
                        <MenuItem value='Giovana Santana'>
                            Giovana Santana
                        </MenuItem>
                        <MenuItem value='Allana'>
                            Allana
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: '200px', margin: '10px' }} size="small">
                    <InputLabel>Selecione o período</InputLabel>
                    <Select
                        label='Selecione o período'
                        value={option}
                        onChange={e => {
                            setOpenComponent(false)
                            setDate('')
                            setMonth('')
                            setOption(e.target.value)
                        }}
                    >
                        <MenuItem>
                            <em>
                                Período
                            </em>
                        </MenuItem>
                        <MenuItem value='Por dia'>
                            Por dia
                        </MenuItem>
                        <MenuItem value='Por mês'>
                            Por mês
                        </MenuItem>
                        <MenuItem value='Total'>
                            Total
                        </MenuItem>
                    </Select>
                </FormControl>
                {
                    option === 'Por dia' ? (
                        <TextField onChange={e => setDate(e.target.value)} sx={{ margin: '10px' }} label='Data' type='date' focused size="small" />
                    ) : null
                }
                {
                    option === 'Por mês' ? (
                        <TextField onChange={e => setMonth(e.target.value)} sx={{ margin: '10px' }} label='Mês' type='month' focused size="small" />
                    ) : null
                }
                <Tooltip title='Show'>
                    <Button onClick={handleShowProduction} sx={{ margin: '10px' }} variant="contained"><BsGraphUp /></Button>
                </Tooltip>
            </Box>
            <Divider />
            <Box>
                {
                    openComponent && option === 'Por dia' ? (
                        <ProducaoTeleIndividualDiaria />
                    ) : null
                }
                {
                    openComponent && option === 'Por mês' ? (
                        <ProducaoTeleIndividualMensal
                            producaoMensal={producaoMensal}
                            totalMensal={totalMensal}
                            houveDivergencia={houveDivergenciaMensal}
                            naoHouveDivergencia={naoHouveDivergenciaMensal}
                            agendado={agendadoMensal}
                            naoAgendado={naoAgendadoMensal}
                            primeiroContato={primeiroContatoMensal}
                            segundoContato={segundoContatoMensal}
                            terceiroContato={terceiroContatoMensal}
                            producaoRn={producaoMensalRn}
                            totalRn={totalRnMensal}
                            producaoUe={producaoMensalUe}
                            totalUe={totalUeMensal}
                        />
                    ) : null
                }
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%' }}>
                    Analista, período ou data vazios
                </Alert>
            </Snackbar>
        </Box>
    )

}

export default ProducaoIndividualTele
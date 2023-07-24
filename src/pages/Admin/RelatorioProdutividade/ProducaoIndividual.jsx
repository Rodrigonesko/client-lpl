import { Box, Paper, Divider, FormControl, InputLabel, Select, MenuItem, TextField, Button, Tooltip, Alert, Snackbar } from "@mui/material"
import { useEffect, useState } from "react"
import { BsGraphUp } from 'react-icons/bs'
import ProducaoTeleIndividualMensal from "./Tele/ProducaoTeleIndividualMensal"
import ProduvidadeElegi from "./Elegi/ProdutividadeElegi"
import ProdutividadeRsd from "./Rsd/ProdutividadeRsd"
import { buscaAnalistasTele, getAnalistasElegibilidade, getAnalistasRsd } from "../../../_services/user.service"


const ProducaoIndividual = ({ celula }) => {

    const [option, setOption] = useState('')
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState('')
    const [month, setMonth] = useState('')
    const [analistas, setAnalistas] = useState([])
    const [analista, setAnalista] = useState('')
    const [openComponent, setOpenComponent] = useState(false)
    const [flushHook, setFlushHook] = useState(false)

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
            setFlushHook(true)
            setOpenComponent(true)
        }
    }

    const fetchData = async () => {
        let result = []

        if (celula === 'Tele Entrevista') {
            let { enfermeiros } = await buscaAnalistasTele()
            result = enfermeiros
        }

        if (celula === 'Elegibilidade') {
            const { analistas } = await getAnalistasElegibilidade()
            result = analistas
        }

        if (celula === 'RSD') {
            const analistas = await getAnalistasRsd()
            result = analistas
        }

        

        setAnalistas(result)
    }

    useEffect(() => {

        fetchData()

    }, [])

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
                            setAnalista(e.target.value)
                        }}
                    >
                        <MenuItem>
                            <em>
                                Analista
                            </em>
                        </MenuItem>
                        {
                            analistas.map(analista => {
                                return (
                                    <MenuItem value={analista.name}>
                                        {analista.name}
                                    </MenuItem>
                                )
                            })
                        }
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
                        {/* <MenuItem value='Por dia'>
                            Por dia
                        </MenuItem> */}
                        <MenuItem value='Por mês'>
                            Por mês
                        </MenuItem>
                        {/* <MenuItem value='Total'>
                            Total
                        </MenuItem> */}
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
                    openComponent && option === 'Por mês' && celula === 'Tele Entrevista' ? (
                        <ProducaoTeleIndividualMensal
                            analista={analista}
                            month={month}
                            hook={flushHook}
                            flushHook={setFlushHook}
                        />
                    ) : null
                }
                {
                    openComponent && option === 'Por mês' && celula === 'Elegibilidade' ? (
                        <ProduvidadeElegi
                            analista={analista}
                            mes={month}
                            hook={flushHook}
                            flushHook={setFlushHook}
                        />
                    ) : null
                }
                {
                    openComponent && option === 'Por mês' && celula === 'RSD' ? (
                        <ProdutividadeRsd
                            analista={analista}
                            mes={month}
                            hook={flushHook}
                            flushHook={setFlushHook}
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

export default ProducaoIndividual
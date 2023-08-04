import { useState } from "react"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { Container, Box, Typography, Button, Divider, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from "@mui/material"
import { indigo, deepPurple } from "@mui/material/colors"
import ProducaoIndividual from "./ProducaoIndividual"
import ProdutividadeGeral from "./ProdutividadeGeral"
import RelatoriosProdutividade from "./RelatoriosProdutividade"
import Chart from "react-google-charts"

const RelatorioProdutividade = () => {

    const [celula, setCelula] = useState('')
    const [component, setComponent] = useState(<></>)
    const [open, setOpen] = useState(false)
    const [openComponent, setOpenComponent] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleLoadProduction = (option) => {

        if (celula === '') {
            setOpen(true)
            return
        }

        if (option === 'Individual') {
            setOpenComponent(true)
            setComponent('individual')
        }

        if (option === 'Geral') {
            setOpenComponent(true)
            setComponent('Geral')
        }
    }

    const renderComponent = () => {
        switch (component) {
            case 'individual':
                return <ProducaoIndividual celula={celula} />
            case 'Geral':
                return <ProdutividadeGeral celula={celula} />
            default:
                return <></>
        }
    }

    return (
        <>
            <Sidebar />
            <Container sx={{ height: '100vh', overflow: 'auto' }}>
                <RelatoriosProdutividade />
                <Typography variant="h6" m={2}>
                    Produtividade por célula
                </Typography>
                <Divider />
                <Box p={1} m={1}>
                    <FormControl sx={{ minWidth: '200px' }} size="small">
                        <InputLabel>Selecionar célula</InputLabel>
                        <Select
                            variant='standard'
                            label='Selecionar célula'
                            value={celula}
                            onChange={e => {
                                setOpenComponent(false)
                                setCelula(e.target.value)
                            }}
                        >
                            <MenuItem>
                                <em>Célula</em>
                            </MenuItem>
                            <MenuItem value='RSD'>
                                RSD
                            </MenuItem>
                            <MenuItem value='Elegibilidade'>
                                Elegibilidade
                            </MenuItem>
                            <MenuItem value='Investigação'>
                                Investigação
                            </MenuItem>
                            <MenuItem value='Tele Entrevista'>
                                Tele Entrevista
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Divider />
                <Box p={1} m={1}>
                    <Button sx={{ margin: '10px', bgcolor: indigo[500], ":hover": { bgcolor: indigo[200] } }} variant="contained" onClick={() => {
                        handleLoadProduction('Individual')
                    }}>Produção individual</Button>
                    <Button sx={{ margin: '10px', bgcolor: deepPurple[500], ":hover": { bgcolor: deepPurple[200] } }} variant="contained" onClick={() => {
                        handleLoadProduction('Geral')
                    }}>Produção Geral</Button>
                </Box>
                <Divider />
                <Box>
                    {
                        openComponent ? (
                            <>
                                {renderComponent()}
                            </>
                        ) : null
                    }
                </Box>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%' }}>
                        Selecione uma célula
                    </Alert>
                </Snackbar>
                <Chart style={{ display: 'none' }} />
            </Container>

        </>
    )
}

export default RelatorioProdutividade
import { useState } from "react"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { Container, Box, Typography, Button, Divider, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from "@mui/material"
import { indigo, deepPurple } from "@mui/material/colors"

import ProducaoIndividualTele from "./Tele/ProducaoIndividualTele/ProducaoIndividualTele"
import ComparativoTele from "./Tele/ComparativoTele"

const RelatorioProdutividade = () => {

    const [loading, setLoading] = useState(false)
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
            switch (celula) {
                case 'Tele Entrevista':
                    console.log('oii');
                    setComponent('individual-tele')
                default:

            }
        }

        if (option === 'Comparativo') {
            setOpenComponent(true)

            switch (celula) {
                case 'Tele Entrevista':
                    setComponent('comparativo-tele')
                default:

            }
        }
    }

    const renderComponent = () => {
        switch (component) {
            case 'individual-tele':
                return <ProducaoIndividualTele />
            case 'comparativo-tele':
                return <ComparativoTele />
            default:
                return <></>
        }
    }

    return (
        <>
            <Sidebar />
            <Container>
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
                        handleLoadProduction('Comparativo')
                    }}>Comparativo</Button>
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
            </Container>
        </>
    )
}

export default RelatorioProdutividade
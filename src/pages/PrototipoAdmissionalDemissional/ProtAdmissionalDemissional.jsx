import { Box, Container, Tab, Tabs } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import CardColaboradoresAdmissional from "./Cards/Admissional/CardColaboradores"
import CardFiltrosAdmissional from "./Cards/Admissional/CardFiltros"
import CardFiltrosDemissional from "./Cards/Demissional/CardFiltrosDemissional"
import CardColaboradoresDemissional from "./Cards/Demissional/CardColaboradoresDemissional"

const ProtAdmissionalDemissional = () => {

    const [tipoExame, setTipoExame] = useState('')
    const [flushHook, setFlushHook] = useState('')

    const handleChange = (e, newValue) => {
        setTipoExame(newValue)
        setFlushHook(true)
    }

    useEffect(() => {
        setFlushHook(false)
    }, [flushHook])

    return (
        <Sidebar>
            <Container maxWidth>
                <div className="title">
                    <h2>Admissional / Demissional</h2>
                </div>
                <br />
                <Tabs value={tipoExame} onChange={handleChange} aria-label="wrapped label tabs example" >
                    <Tab value="admissional" label="Admissional" />
                    <Tab value="demissional" label="Demissional" />
                </Tabs>
                {
                    tipoExame === 'admissional' ? (
                        <Box display={'flex'} mt={2}>
                            <CardFiltrosAdmissional flushHook={flushHook} setFlushHook={setFlushHook} />
                            <Box width={'100%'} ml={2} >
                                <CardColaboradoresAdmissional flushHook={flushHook} setFlushHook={setFlushHook} />
                            </Box>
                        </Box>
                    ) : tipoExame === 'demissional' ? (
                        <Box display={'flex'} mt={2}>
                            <CardFiltrosDemissional flushHook={flushHook} setFlushHook={setFlushHook} />
                            <Box width={'100%'} ml={2} >
                                <CardColaboradoresDemissional flushHook={flushHook} setFlushHook={setFlushHook} />
                            </Box>
                        </Box>
                    ) : (
                        <>
                        </>
                    )}

            </Container >
        </Sidebar >
    )
}

export default ProtAdmissionalDemissional
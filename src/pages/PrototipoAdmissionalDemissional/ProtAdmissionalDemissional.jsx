import { Box, Container, Tab, Tabs } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import CardAdmissional from "./Cards/Admissional/CardAdmissional"
import CardDemissional from "./Cards/Demissional/CardDemissional"

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
                        <Box>
                            <CardAdmissional />
                        </Box>
                    ) : tipoExame === 'demissional' ? (
                        <Box>
                            <CardDemissional />
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
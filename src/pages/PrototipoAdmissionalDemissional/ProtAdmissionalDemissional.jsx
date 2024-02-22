import { Box, Container, Tab, Tabs, Typography } from "@mui/material"
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
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                width: '30%',
                                height: '2px',
                                bottom: 0,
                                left: '0%',
                                backgroundColor: 'currentColor',
                                transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                            },
                            '&:hover::after': {
                                width: '100%',
                                left: '0%',
                            },
                        }}
                    >
                        Admissional / Demissional
                    </Typography>
                </Box>
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
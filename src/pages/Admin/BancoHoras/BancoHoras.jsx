import { Box, Container, Tabs, Tab } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { getUsers } from "../../../_services/user.service"
import HorarioSaida from "./Components/HorarioSaida"
import Ausencias from "./Components/Ausencias"

const tabStyle = {
    '&:hover': {
        color: 'gray',
        opacity: 1,
        backgroundColor: '#fff',
    },
    '&.Mui-selected': {
        color: 'black',
        backgroundColor: '#fff',
        fontWeight: 'bold',
    },
    Indicator: {
        backgroundColor: 'black',
    },
    color: 'gray',
    mr: 2,
}

const BancoHoras = () => {

    const [tab, setTab] = useState('Horario Saida')

    return (
        <>
            <Sidebar>
                <Box width='100%' height='100vh' overflow='auto' >
                    <Container>
                        <Tabs
                            value={tab}
                            onChange={(e, value) => setTab(value)}
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                mt: 2,
                                '& .MuiTabs-indicator': {
                                    backgroundColor: 'black',
                                    width: '100%',
                                },
                            }}
                        >
                            <Tab label="Horario Saída" value="Horario Saida" sx={tabStyle} />
                            <Tab label="Ausências" value="Ausencias" sx={tabStyle} />
                        </Tabs>
                        {tab === 'Horario Saida' && <HorarioSaida key={'Horario Saida'} />}
                        {tab === 'Ausencias' && <Ausencias key={'Ausencias'} />}
                    </Container>
                </Box>
            </Sidebar>
        </>
    )
}

export default BancoHoras
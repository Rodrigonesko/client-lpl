import { Box, Tab, Tabs, Typography } from "@mui/material";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Andamento from "./Andamento/Andamento";
import Agendadas from "./Agendadas/Agendadas";
import Realizadas from "./Realizadas/Realizadas";
import Todas from "./Todas/Todas";
import { useState } from "react";
import { blue, deepOrange, green } from "@mui/material/colors";

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

const Propostas = () => {

    const [tab, setTab] = useState('Em andamento')

    return (
        <Sidebar>
            <Box
                sx={{
                    m: 2,
                }}
            >
                <Tabs
                    sx={{
                        mt: 2,
                        '& .MuiTabs-indicator': {
                            width: '100%',
                            backgroundColor: 'black',
                        },
                    }}
                    value={tab}
                    onChange={(e, value) => setTab(value)}
                >
                    <Tab label="Em Andamento" value={'Em andamento'} sx={tabStyle} iconPosition="end" icon={
                        <Typography
                            sx={{
                                color: 'white',
                                backgroundColor: tab === 'Em andamento' ? deepOrange[500] : deepOrange[300],
                                borderRadius: '10%',
                                padding: '3px',
                                transition: 'all 0.5s ease',
                            }}
                        >
                            1
                        </Typography>
                    } />
                    <Tab label="Agendadas" value={'Agendadas'} sx={tabStyle} iconPosition="end" icon={
                        <Typography
                            sx={{
                                color: 'white',
                                backgroundColor: tab === 'Agendadas' ? blue[500] : blue[300],
                                borderRadius: '10%',
                                padding: '3px',
                                transition: 'all 0.5s ease',
                            }}
                        >
                            2
                        </Typography>

                    } />
                    <Tab label="Realizadas" value={"Realizadas"} sx={tabStyle} iconPosition="end" icon={
                        <Typography
                            sx={{
                                color: 'white',
                                backgroundColor: tab === 'Realizadas' ? green[500] : green[300],
                                borderRadius: '10%',
                                padding: '3px',
                                transition: 'all 0.5s ease',
                            }}
                        >
                            3
                        </Typography>

                    } />
                    <Tab label="Todas" value={"Todas"} sx={tabStyle} iconPosition="end" icon={
                        <Typography
                            sx={{
                                color: 'white',
                                backgroundColor: tab === 'Todas' ? 'black' : 'gray',
                                borderRadius: '10%',
                                padding: '3px',
                                transition: 'all 0.5s ease',
                            }}
                        >
                            4
                        </Typography>
                    } />
                </Tabs>
                <Box>
                    {tab === 'Em andamento' && <Andamento />}
                    {tab === 'Agendadas' && <Agendadas />}
                    {tab === 'Realizadas' && <Realizadas />}
                    {tab === 'Todas' && <Todas />}
                </Box>
            </Box>
        </Sidebar>
    )
}

export default Propostas;
import { useState } from "react"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { Box, Container } from "@mui/system"
import { IconButton, Tab, Tabs, Tooltip, Typography } from "@mui/material"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { red } from "@mui/material/colors";
import AnaliticoTele from "./components/Tele/AnaliticoTele";
import ExpandIcon from '@mui/icons-material/Expand';
import AnaliticoAgendamento from "./components/Agendamento/AnaliticoAgendamento";
import AnaliticoElegibilidade from "./components/Elegibilidade/AnaliticoElegibilidade";
import AnaliticoRsd from "./components/RSD/AnaliticoRsd";
import AnaliticoSindicancia from "./components/Sindicancia/AnaliticoSindicancia";

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

const Analitico = () => {

    const [tab, setTab] = useState('Tele Entrevista')
    const [fullWidth, setFullWidth] = useState(true)
    return (
        <Sidebar>
            <Container maxWidth={fullWidth ? '' : 'lg'}>
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
                        Analítico
                    </Typography>
                    <Tooltip title={fullWidth ? 'Minimizar' : 'Maximizar'}>
                        <IconButton onClick={() => setFullWidth(!fullWidth)}>
                            <ExpandIcon sx={{
                                transition: 'transform 0.3s ease-in-out',
                                transform: fullWidth ? 'rotate(180deg)' : 'rotate(90deg)',
                            }} />
                        </IconButton>
                    </Tooltip>
                </Box>
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
                    <Tab label="Tele Entrevista" value="Tele Entrevista" sx={tabStyle} iconPosition="end" icon={
                        <LocalHospitalIcon sx={{
                            color: tab === 'Tele Entrevista' ? red[500] : red[200],
                        }} />
                    } />
                    <Tab label="Agendamento" value="Agendamento" sx={tabStyle} />
                    <Tab label="RSD" value="RSD" sx={tabStyle} />
                    <Tab label="Elegibilidade" value="Elegibilidade" sx={tabStyle} />
                    <Tab label="Sindicância" value={'Sindicancia'} sx={tabStyle} />

                </Tabs>
                {tab === 'Tele Entrevista' && <AnaliticoTele key={'Tele Entrevista'} />}
                {tab === 'RSD' && <AnaliticoRsd key={'RSD'} />}
                {tab === 'Agendamento' && <AnaliticoAgendamento key={'Agendamento'} />}
                {tab === 'Elegibilidade' && <AnaliticoElegibilidade key={'Elegibilidade'} />}
                {tab === 'Sindicancia' && <AnaliticoSindicancia key={'Sindicancia'} />}

            </Container>
        </Sidebar>
    )
}

export default Analitico
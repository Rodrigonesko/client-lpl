import { Container, Tab, Tabs } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import AnaliticoSulAmerica from "../../Admin/Analitico/components/SulAmerica/AnaliticoSulAmerica"
import { useState } from "react"
import Dashboard from "./components/Dashboard"

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

const RendimentoSulAmerica = () => {

    const [tab, setTab] = useState('Rendimento Sul América')

    return (
        <>
            <Sidebar>
                <Container maxWidth>
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
                        <Tab label="Rendimento Sul América" value="Rendimento Sul América" sx={tabStyle} />
                        <Tab label="Dashboard" value="Dashboard" sx={tabStyle} />

                    </Tabs>
                    {tab === 'Rendimento Sul América' && <AnaliticoSulAmerica key={'Rendimento Sul América'} />}
                    {tab === 'Dashboard' && <Dashboard />}
                </Container>
            </Sidebar>
        </>
    )
}

export default RendimentoSulAmerica
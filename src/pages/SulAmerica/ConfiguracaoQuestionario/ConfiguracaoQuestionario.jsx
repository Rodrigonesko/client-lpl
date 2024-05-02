import { Box, Container, Tab, Tabs } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useState } from "react"
import Questionario from "./Components/Questionario"
import PerguntasSulAmerica from "./Components/PerguntasSulAmerica"

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

const ConfiguracaoQuestionario = () => {

    const [tab, setTab] = useState('Perguntas')

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
                            <Tab label="Perguntas" value="Perguntas" sx={tabStyle} />
                            <Tab label="Questionario" value="Questionario" sx={tabStyle} />
                        </Tabs>
                        {tab === 'Perguntas' && <PerguntasSulAmerica key={'Perguntas'} />}
                        {tab === 'Questionario' && <Questionario key={'Questionario'} />}
                    </Container>
                </Box>
            </Sidebar>
        </>
    )
}

export default ConfiguracaoQuestionario
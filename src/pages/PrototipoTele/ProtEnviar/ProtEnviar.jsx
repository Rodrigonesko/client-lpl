import { Box, Tab, Tabs } from "@mui/material";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useState } from "react";
import ProtAjustar from "./Components/ProtAjustar";
import NaoRespondias from "./Components/NaoRespondidas";
import NaoEnviadas from "./Components/NaoEnviadas";
import Estatisticas from "./Components/Estatisticas";

const ProtEnviar = () => {

    const [tab, setTab] = useState('Enviar')
    
    return (
        <Sidebar>
            <Box m={2}>
                <Tabs
                    value={tab}
                    onChange={(e, value) => setTab(value)}
                >
                    <Tab label="Enviar" value='Enviar' />
                    <Tab label="Ajustar" value={'Ajustar'} />
                    <Tab label="Não Respondias" value={'NaoRespondidas'} />
                    <Tab label="Estatisticas" value={'Estatisticas'} />
                </Tabs>
                {
                    tab === 'Enviar' && (
                        <NaoEnviadas />
                    )
                }
                {
                    tab === 'Ajustar' && (
                        <ProtAjustar />
                    )
                }
                {
                    tab === 'NaoRespondidas' && <NaoRespondias />
                }
                {
                    tab === 'Estatisticas' && <Estatisticas />
                }
            </Box>
        </Sidebar >
    )
}

export default ProtEnviar;
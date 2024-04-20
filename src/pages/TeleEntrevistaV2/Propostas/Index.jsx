import { Box, Tab, Tabs } from "@mui/material";
import Sidebar from "../../../components/Sidebar/Sidebar";

const Propostas = () => {
    return (
        <Sidebar>
            <Box>
                <Tabs>
                    <Tab label="Não Enviados" />
                    <Tab label="Ajustar" />
                    <Tab label="Enviados" />
                </Tabs>
            </Box>
        </Sidebar>
    )
}

export default Propostas;
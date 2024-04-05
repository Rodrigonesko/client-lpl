import { Box, Tab, Tabs } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useState } from "react"
import Perguntas from "./Perguntas/Perguntas"
import Questionarios from "./Questionarios/Questionarios"

const ConfigPerguntas = () => {

    const [tab, setTab] = useState(0)

    return (
        <Sidebar>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 2,
                }}
            >
                <Tabs
                    value={tab}
                    onChange={(e, value) => setTab(value)}
                >
                    <Tab
                        label="Perguntas"
                        value={0}
                    />
                    <Tab
                        label="Questionario"
                        value={1}
                    />
                </Tabs>
                {
                    tab === 0 && <Perguntas />
                }
                {
                    tab === 1 && <Questionarios />
                }
            </Box>
        </Sidebar>
    )
}

export default ConfigPerguntas
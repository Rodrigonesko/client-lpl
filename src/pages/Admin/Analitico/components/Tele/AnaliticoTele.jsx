import { Box, TextField } from "@mui/material"
import { useState } from "react"
import moment from "moment"
import TeleCards from "./TeleCards"
import TeleChart from "./TeleChart"
import TeleTable from "./TeleTable"

const AnaliticoTele = () => {
    const [mes, setMes] = useState(moment().format('YYYY-MM'))

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 2,
            }}>
                <TextField
                    label="Mês"
                    variant="outlined"
                    size="small"
                    type="month"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={mes}
                    onChange={(e) => {
                        setMes(e.target.value)
                    }}
                />
            </Box>
            <TeleCards
                mes={mes}
                key={`${mes}cards`}
            />
            <TeleChart
                mes={mes}
                key={`${mes}chart`}
            />
            <TeleTable
                mes={mes}
                key={`${mes}table`}
            />

        </Box>
    )
}

export default AnaliticoTele
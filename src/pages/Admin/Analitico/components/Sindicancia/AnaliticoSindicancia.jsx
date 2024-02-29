import { Box, TextField } from "@mui/material"
import moment from "moment"
import { useState } from "react"
import SindicanciaCards from "./SindicanciaCards"
import SindicanciaChart from "./SindicanciaChart"
import SindicanciaTable from "./SindicanciaTable"

const AnaliticoSindicancia = () => {

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
                    label='Mês'
                    type='month'
                    size='small'
                    value={mes}
                    onChange={(e) => { setMes(e.target.value) }}
                />
            </Box>
            <SindicanciaCards mes={mes} key={`card-${mes}`} />
            <SindicanciaChart mes={mes} key={`chart-${mes}`} />
            <SindicanciaTable mes={mes} key={`table-${mes}`} />
        </Box>
    )
}

export default AnaliticoSindicancia
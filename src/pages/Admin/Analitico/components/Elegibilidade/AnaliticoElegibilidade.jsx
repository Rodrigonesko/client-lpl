import { Box, TextField } from "@mui/material"
import moment from "moment"
import { useState } from "react"
import ElegibilidadeCards from "./ElegibilidadeCards"
import ElegibilidadeChart from "./ElegibilidadeChart"
import ElegibilidadeTable from "./ElegibilidadeTable"

const AnaliticoElegibilidade = () => {

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
                    focused
                    type='month'
                    variant='standard'
                    size='small'
                    value={mes}
                    onChange={(e) => { setMes(e.target.value) }}
                />
            </Box>
            <ElegibilidadeCards mes={mes} />
            <ElegibilidadeChart mes={mes} />
            <ElegibilidadeTable mes={mes} />
        </Box>
    )
}

export default AnaliticoElegibilidade
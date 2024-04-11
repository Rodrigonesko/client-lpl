import { Box, TextField } from "@mui/material"
import moment from "moment"
import { useState } from "react"
import ElegibilidadeCards from "./ElegibilidadeCards"
import ElegibilidadeChart from "./ElegibilidadeChart"
import ElegibilidadeTable from "./ElegibilidadeTable"
import PmeCards from "./PmeCards"
import PmeChart from "./PmeChart"
import PmeTable from "./PmeTable"

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
            <ElegibilidadeCards mes={mes} key={`card-${mes}`} />
            <ElegibilidadeChart mes={mes} key={`chart-${mes}`} />
            <ElegibilidadeTable mes={mes} key={`table-${mes}`} />
            <PmeCards mes={mes} key={`pmeCard-${mes}`} />
            <PmeChart mes={mes} key={`pmeChart-${mes}`} />
            <PmeTable mes={mes} key={`pmeTable-${mes}`} />
        </Box>
    )
}

export default AnaliticoElegibilidade
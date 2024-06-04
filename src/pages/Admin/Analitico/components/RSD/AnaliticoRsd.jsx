import { Box, TextField } from "@mui/material"
import moment from "moment"
import { useState } from "react"
import RsdCards from "./RsdCards"
import RsdChart from "./RsdChart"
import RsdTable from "./RsdTable"


const AnaliticoRsd = () => {

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
                    variant='standard'
                    size='small'
                    value={mes}
                    onChange={(e) => { setMes(e.target.value) }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </Box>
            <RsdCards mes={mes} key={`card-${mes}`} />
            <RsdChart mes={mes} key={`chart-${mes}`} />
            <RsdTable mes={mes} key={`table-${mes}`} />
        </Box>
    )
}

export default AnaliticoRsd
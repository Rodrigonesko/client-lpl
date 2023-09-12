import { Box, Paper, TextField, Button, CircularProgress } from "@mui/material"
import { useState } from "react"

const RelatorioPorData = ({ service, setResult }) => {

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [loading, setLoading] = useState(false)

    const handleGenerate = async () => {

        setLoading(true)

        const result = await service(startDate, endDate)

        setResult(result)

        setLoading(false)
    }

    return (
        <Box component={Paper} p={1}>
            <Box display='flex' flexDirection='column'>
                <TextField onChange={event => setStartDate(event.target.value)} value={startDate} type="date" label='Data Inicio' focused sx={{ mt: 2 }} />
                <TextField onChange={event => setEndDate(event.target.value)} value={endDate} type="date" label='Data FIm' focused sx={{ mt: 2 }} />
            </Box>
            <Box mt={2} textAlign='center'>
                <Button disabled={loading} startIcon={loading && <CircularProgress />} onClick={handleGenerate} variant="contained">Gerar Relatorio</Button>
            </Box>
        </Box>
    )
}

export default RelatorioPorData
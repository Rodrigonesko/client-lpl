import { Box, Typography, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import Chart from "react-google-charts"

const ProduvidadeElegi = () => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {

    }, [])

    return (
        <Box>
            <Typography m={1} variant="h6">
                Produção mensal - Elegi
            </Typography>
            <Box component={Paper} elevation={3} p={1} fontSize='1 rem'>
                <Typography m={2} fontWeight='bold'>
                    Total mensal - X
                </Typography>
                <Chart />
            </Box>
            <Box display='flex' width='100%' flexWrap='wrap' mt={1} justifyContent='space-around'>
                <Box width='45%' component={Paper} elevation={3} p={1}>
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        options={{ title: 'Propostas Canceladas' }}
                    />
                </Box>
                <Box width='45%' component={Paper} elevation={3} p={1}>
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        options={{ title: 'Ligações realizadas' }}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default ProduvidadeElegi
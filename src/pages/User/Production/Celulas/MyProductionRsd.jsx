import { Box, Paper, Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Chart from "react-google-charts"
import { getProdutividadeMensalRsd } from "../../../../_services/rsd.service"
import { useParams } from "react-router-dom"

const MyProductionRsd = ({ mes }) => {

    const { name } = useParams()

    const [data, setData] = useState({})

    const fetchData = async () => {

        const result = await getProdutividadeMensalRsd(mes, name)
        setData(result)

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Box>
            <Box display='flex'>
                <Box component={Paper} p={1} width='60%' m={1} >
                    <Chart
                        chartType='ComboChart'
                        width="100%"
                        height="400px"
                        data={data.arrPrazo}
                        options={{
                            title: 'Produção',
                            vAxis: { title: 'Propostas' },
                            hAxis: { title: 'Dias' },
                            isStacked: true,
                            seriesType: 'bars',
                            series: { 5: { type: 'line' } },
                            colors: ["#43a047", "#0288d1", "#673ab7", "#ff9800", "#d50000"]
                        }}
                    />
                </Box>
                <Box width='30%' m={1} height={'400px'} display='flex' flexDirection='column' justifyContent='space-around'>
                    <Card sx={{ bgcolor: 'lightgreen' }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Meu rendimento
                            </Typography>
                            <Typography variant="h5" component="div">
                                320 - Rendimento
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                14% Relação a média
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                10% Relação ao melhor desempenho
                            </Typography>
                            <Typography color="text.secondary">
                                1% Relação a meta
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card >
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Melhor rendimento
                            </Typography>
                            <Typography variant="h5" component="div">
                                400 - Melhor rendimento
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                370 - Média
                            </Typography>
                            <Typography color="text.secondary">
                                370 - Meta
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            <Box display='flex' width='100%' flexWrap='wrap' mt={1} justifyContent='space-around'>
                <Box width='45%' component={Paper} elevation={3} p={1}>
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        options={{ title: 'Indeferidos' }}
                        data={[
                            ['Categoria', 'Quantidade'],
                            ['Indeferido', data.indeferidos],
                            ['Não Indeferido', data.naoIndeferidos]
                        ]}
                    />
                </Box>
                <Box width='45%' component={Paper} elevation={3} p={1}>
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        options={{ title: 'Pedidos cancelados' }}
                        data={[
                            ['Categoria', 'Quantidade'],
                            ['Cancelado', data.cancelado],
                            ['Não Cancelado', data.naoCancelado]
                        ]}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default MyProductionRsd
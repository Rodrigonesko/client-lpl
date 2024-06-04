import { Box, CircularProgress, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { getQuantidadeDemandasMensal } from "../../../../../_services/sindicancia.service"

const SindicanciaChart = ({ mes }) => {

    const [loading, setLoading] = useState(false)
    const [grafico, setGrafico] = useState([])

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const result = await getQuantidadeDemandasMensal(mes)
            console.log(result);
            setGrafico(result)
            setLoading(false)
        }
        fetch()
    }, [])

    return (
        <>
            <Box
                component={Paper}
            >
                <Box
                    m={2}
                >
                    <Typography
                        variant="h6"
                        fontWeight={600}
                    >
                        Demandas Diárias
                    </Typography>
                    <Typography
                        variant="body2"
                        color={"text.secondary"}
                    >
                        (Últimos 30 dias)
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        textAlign: 'center',
                        borderRadius: 2,
                    }}
                >
                    {
                        loading ? <CircularProgress size={'100px'} /> : (
                            <Chart
                                height={500}
                                type="line"
                                series={[{
                                    data: grafico.findDemanda || []
                                }]}
                                options={{
                                    chart: {
                                        type: 'line',
                                        zoom: {
                                            enabled: false
                                        }
                                    },
                                    dataLabels: {
                                        enabled: false
                                    },
                                    stroke: {
                                        curve: 'straight'
                                    },
                                    title: {
                                        text: 'Demandas Diárias',
                                        align: 'left'
                                    },
                                    grid: {
                                        row: {
                                            colors: ['#f3f3f3', 'transparent'],
                                            opacity: 0.5
                                        },
                                    },
                                }}
                            />
                        )}
                </Box>
            </Box>
        </>
    )
}

export default SindicanciaChart
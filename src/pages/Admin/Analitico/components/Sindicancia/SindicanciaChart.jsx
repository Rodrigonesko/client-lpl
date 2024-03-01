import { Box, Paper, Typography } from "@mui/material"
import Chart from "react-apexcharts"

const SindicanciaChart = ({ mes }) => {
    return (
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
                <Chart
                    height={500}
                    type="line"
                    series={[{
                        name: 'Demandas',
                        data: [
                            30, 40, 35, 50, 49, 60, 70
                        ]
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
                        xaxis: {
                            categories: [
                                '01', '02', '03', '04', '05', '06', '07', 
                            ],
                        }
                    }}
                />
        </Box>
    )
}

export default SindicanciaChart
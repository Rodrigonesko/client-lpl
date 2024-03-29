import { CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { getGraficoPropostasAgendadas } from "../../../../../_services/teleEntrevistaExterna.service"
import { blue } from "@mui/material/colors"

const options = {
    chart: {
        type: 'bar'
    },
    stroke: {
        width: [5, 5, 1],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            columnWidth: '50%'
        }
    },
    fill: {
        opacity: [0.1, 1, 0.5],
        gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
        }
    },
}

const AnaliticoChart = ({ mes }) => {

    const [loadingGrafico, setLoadingGrafico] = useState(false)
    const [graficoData, setGraficoData] = useState([])

    useEffect(() => {
        const fetch = async () => {
            setLoadingGrafico(true)
            const result = await getGraficoPropostasAgendadas(mes)
            console.log(result);
            setGraficoData([
                {
                    name: 'Agendadas',
                    data: result,
                    color: blue[500],
                    type: 'column'
                }
            ])
            setLoadingGrafico(false)

        }

        fetch()

    }, [])

    return (
        <Box>
            <Box>
                <Typography variant="h6" sx={{
                    mt: 2,
                    mb: 1,
                }}>
                    Gráfico
                </Typography>
            </Box>
            <Box
                sx={{
                    textAlign: 'center',
                }}
            >
                {
                    loadingGrafico ? <CircularProgress size={'100px'} /> : (
                        <Chart
                            options={options}
                            series={graficoData}
                            width={'100%'}
                            height={500} />
                    )
                }
            </Box>
        </Box>
    )
}

export default AnaliticoChart
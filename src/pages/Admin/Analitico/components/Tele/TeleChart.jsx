import { CircularProgress, Typography } from "@mui/material"
import { blue, green, red } from "@mui/material/colors"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { graficoPropostasPorMesFiltradas } from "../../../../../_services/teleEntrevistaExterna.service"

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

const TeleChart = ({ mes }) => {

    const [loadingGrafico, setLoadingGrafico] = useState(false)
    const [graficoData, setGraficoData] = useState([])

    const fetchDataGrafico = async () => {
        setLoadingGrafico(true)
        try {
            const resultTotal = await graficoPropostasPorMesFiltradas({
                query: {
                    dataRecebimento: { $regex: mes }
                },
                key: 'dataRecebimento'
            })

            const resultConcluidas = await graficoPropostasPorMesFiltradas({
                query: {
                    dataConclusao: { $regex: mes },
                    status: 'Concluído'
                },
                key: 'dataConclusao'
            })

            const resultCanceladas = await graficoPropostasPorMesFiltradas({
                query: {
                    dataConclusao: { $regex: mes },
                    status: 'Cancelado'
                },
                key: 'dataConclusao'
            })
            const graficoData = [
                {
                    name: 'Concluídas',
                    data: resultConcluidas,
                    color: green[400],
                    type: 'area'
                },
                {
                    name: 'Canceladas',
                    data: resultCanceladas,
                    color: red[500],
                    type: 'line'
                },
                {
                    name: 'Recebidas',
                    data: resultTotal,
                    color: blue[500],
                    type: 'bar',
                }
            ]
            setGraficoData(graficoData)
            setLoadingGrafico(false)
        } catch (error) {
            console.log(error)
            setLoadingGrafico(false)
        }
    }

    useEffect(() => {
        fetchDataGrafico()
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

export default TeleChart
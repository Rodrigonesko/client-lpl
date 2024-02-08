import { CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import Chart from "react-apexcharts"

// const options = {
//     chart: {
//         type: 'pie'
//     },
//     stroke: {
//         width: [5, 5, 1],
//         curve: 'smooth'
//     },
//     plotOptions: {
//         pie: {
//             columnWidth: '50%'
//         }
//     },
//     fill: {
//         opacity: [0.1, 1, 0.5],
//         gradient: {
//             inverseColors: false,
//             shade: 'light',
//             type: "circular",
//             opacityFrom: 0.85,
//             opacityTo: 0.55,
//             stops: [0, 100, 100, 100]
//         }
//     },
// }

const PropostasChart = ({ mes, data }) => {

    const [loadingGrafico, setLoadingGrafico] = useState(false)
    const [graficoData, setGraficoData] = useState([])

    useEffect(() => {
        setLoadingGrafico(true)
        if (data) {
            setGraficoData(data.situacoesAmil.map(item => {
                return {
                    _id: item._id || 'Sem Situação',
                    total: item.total
                }
            }))
            console.log(data.situacoesAmil);
            setLoadingGrafico(false)
        }
    }, [data, mes])

    return (
        <Box>
            <Box>
                <Typography variant="h6" sx={{
                    mt: 2,
                    mb: 1,
                }}>
                    Gráfico de % de Propostas por Situação
                </Typography>
            </Box>
            <Box
                sx={{
                    textAlign: 'center',
                }}
            >
                {
                    loadingGrafico ? <CircularProgress size={'100px'} /> : (
                        <>
                            <Chart
                                type="bar"
                                options={{
                                    labels: graficoData.map(item => item?._id),
                                    inverseColors: false,
                                }}
                                series={graficoData.map(item => item?.total)}
                                width={'50%'}
                                height={500}
                            />
                            <Chart
                                type='pie'
                                options={{
                                    labels: graficoData.map(item => item?._id),
                                    inverseColors: false,
                                }}
                                series={graficoData.map(item => item?.total)}
                                width={'35%'}
                                height={500} />
                        </>

                    )
                }
            </Box>
        </Box>
    )
}

export default PropostasChart
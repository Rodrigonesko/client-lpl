import { CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
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

const PropostasChart = ({ mes }) => {

    const [loadingGrafico, setLoadingGrafico] = useState(false)
    // const [graficoData, setGraficoData] = useState([])

    return (
        <Box>
            <Box>
                <Typography variant="h6" sx={{
                    mt: 2,
                    mb: 1,
                }}>
                    Gráfico Agendamentos Propostas
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
                            type='pie'
                            options={{
                                labels: ['Agendar', 'Agendado', 'Cancelado Humanizado', 'Humanizado', 'Não lidas', 'Janelas', 'Ajustar', 'Sem Whatsapp', 'Erro Whatsapp'],
                                inverseColors: false,
                            }}
                            series={[20, 10, 10, 10, 10, 10, 10, 10, 10]}
                            width={'100%'}
                            height={500} />
                    )
                }
            </Box>
        </Box>
    )
}

export default PropostasChart
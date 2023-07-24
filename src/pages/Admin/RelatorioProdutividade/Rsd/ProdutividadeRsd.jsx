import { Box, Typography, Paper, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import Chart from "react-google-charts"
import { getProdutividadeMensalRsd } from "../../../../_services/rsd.service"

const ProdutividadeRsd = ({ mes, analista, hook, flushHook }) => {

    const [loading, setLoading] = useState(false)

    const [producao, setProducao] = useState([])
    const [total, setTotal] = useState(0)
    const [indeferidos, setIndeferidos] = useState(0)
    const [naoIndeferidos, setNaoIndeferidos] = useState(0)
    const [canceladas, setCanceladas] = useState(0)
    const [naoCanceladas, setNaoCanceladas] = useState(0)

    const fetchData = async () => {
        setLoading(true)

        const result = await getProdutividadeMensalRsd(mes, analista)


        setProducao(result.arrPrazo)
        setTotal(result.total)
        setIndeferidos(result.indeferidos)
        setNaoIndeferidos(result.naoIndeferidos)
        setCanceladas(result.cancelado)
        setNaoCanceladas(result.naoCancelado)

        setLoading(false)
    }

    useEffect(() => {
        flushHook(false)
        fetchData()

    }, [hook])

    return (
        <Box>
            <Typography m={1} variant="h6">
                Produção mensal - RSD
            </Typography>
            {
                !loading ? (
                    <>
                        <Box component={Paper} elevation={3} p={1} fontSize='1 rem' >
                            <Typography m={2} fontWeight='bold'>
                                Total mensal - {total}
                            </Typography>
                            <Typography m={2}>
                                Média diária - {(total / producao.length).toFixed(2)}
                            </Typography>
                            <Chart
                                chartType='ComboChart'
                                width="100%"
                                height="400px"
                                data={producao}
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
                        <Box display='flex' width='100%' flexWrap='wrap' mt={1} justifyContent='space-around'>
                            <Box width='45%' component={Paper} elevation={3} p={1}>
                                <Chart
                                    chartType="PieChart"
                                    width="100%"
                                    height="400px"
                                    options={{ title: 'Indeferidos' }}
                                    data={[
                                        ['Categoria', 'Quantidade'],
                                        ['Indeferido', indeferidos],
                                        ['Não Indeferido', naoIndeferidos]
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
                                        ['Cancelado', canceladas],
                                        ['Não Cancelado', naoCanceladas]
                                    ]}
                                />
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Box textAlign='center' >
                        <CircularProgress />
                    </Box>
                )
            }
        </Box >
    )
}

export default ProdutividadeRsd
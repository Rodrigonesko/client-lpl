import { Box, Paper, Card, CardContent, Typography, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import Chart from "react-google-charts"
import { getProdutividadeMensalRsd } from "../../../../_services/rsd.service"
import { useParams } from "react-router-dom"

const MyProductionRsd = ({ mes }) => {

    const { name } = useParams()

    const [data, setData] = useState({})
    const [somaMelhor, setSomaMelhor] = useState(0)
    const [melhorRendimento, setMelhorRendimento] = useState(false)
    const [porcentalMelhorDesempenho, setPorcentualMelhorDesempenho] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {

        setLoading(true)

        const result = await getProdutividadeMensalRsd(mes, name)

        const arrProdutividade = result.arrComparativo
        let somaUltimaColuna = 0
        for (let i = 1; i < arrProdutividade.length; i++) {
            const valorUltimaColuna = arrProdutividade[i][arrProdutividade[i].length - 1];
            somaUltimaColuna += valorUltimaColuna;
        }

        if (somaUltimaColuna === 0) {
            setMelhorRendimento(true)
        } else {
            const percMelhorDesempenho = 100 - ((result.total / somaUltimaColuna) * 100)

            setPorcentualMelhorDesempenho('-' + percMelhorDesempenho.toFixed(2) + '%')
        }

        setSomaMelhor(somaUltimaColuna)
        setData(result)

        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Box>
            {
                melhorRendimento ? (
                    <Typography ml={1} width='300px' p={1} borderRadius='4px' mt={2} bgcolor='#357a38' color='white'>
                        Você teve o melhor rendimento do mês
                    </Typography>
                ) : null
            }
            {
                !loading ? (
                    <>
                        <Box display='flex'>
                            <Box component={Paper} p={1} width='60%' m={1} >
                                <Chart
                                    chartType="ColumnChart"
                                    width="100%"
                                    height="400px"
                                    data={data.arrComparativo}
                                    options={{
                                        title: 'Produção',
                                        vAxis: { title: 'Pedidos' },
                                        hAxis: { title: 'Dias' },
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
                                            {data.total} - Rendimento
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {porcentalMelhorDesempenho} Relação ao melhor desempenho
                                        </Typography>
                                        <Typography color="text.secondary">
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card >
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Melhor rendimento
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {somaMelhor} - Melhor rendimento
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">

                                        </Typography>
                                        <Typography color="text.secondary">

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
                    </>
                ) : (
                    <>
                        <Box textAlign='center' mt='12%'>
                            <CircularProgress />
                        </Box>
                    </>
                )
            }
        </Box>
    )
}

export default MyProductionRsd
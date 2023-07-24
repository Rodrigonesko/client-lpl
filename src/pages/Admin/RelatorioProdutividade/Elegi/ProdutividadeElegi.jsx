import { Box, Typography, Paper, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import Chart from "react-google-charts"
import { getProducaoMensalElegi } from "../../../../_services/elegibilidade.service"
import { getProducaoMensalPme } from "../../../../_services/elegibilidadePme.service"

const ProduvidadeElegi = ({ mes, analista, hook, flushHook }) => {

    const [loading, setLoading] = useState(false)
    const [producao, setProducao] = useState([])
    const [total, setTotal] = useState(0)
    const [propostasCanceladas, setPropostasCanceladas] = useState(0)
    const [propostasNaoCanceladas, setPropostasNaoCanceladas] = useState(0)
    const [qtdLigadas, setQtdLigadas] = useState(0)
    const [qtdNaoLigadas, setQtdNaoLigadas] = useState(0)

    const [producaoPme, setProducaoPme] = useState([])
    const [totalPme, setTotalPme] = useState(0)
    const [propostasDevolvidas, setPropostasDevolvidas] = useState(0)
    const [propostasNaoDevolvidas, setPropostasNaoDevolvidas] = useState(0)

    const fetchData = async () => {
        setLoading(true)

        const result = await getProducaoMensalElegi(mes, analista)

        const resultPme = await getProducaoMensalPme(mes, analista)

        setProducaoPme(resultPme.arrPrazo)
        setTotalPme(resultPme.total)
        setPropostasDevolvidas(resultPme.propostasDevolvidas)
        setPropostasNaoDevolvidas(resultPme.propostasNaoDevolvidas)

        setProducao(result.arrPrazo)
        setTotal(result.total)
        setPropostasCanceladas(result.propostasCanceladas)
        setPropostasNaoCanceladas(result.propostasNaoCanceladas)
        setQtdLigadas(result.qtdLigadas)
        setQtdNaoLigadas(result.qtdNaoLigadas)

        setLoading(false)
    }

    useEffect(() => {
        flushHook(false)
        fetchData()
    }, [hook])

    return (
        <Box>
            <Typography m={1} variant="h6">
                Produção mensal - Elegi
            </Typography>

            {
                !loading ? (
                    <>
                        <Box component={Paper} elevation={3} p={1} fontSize='1 rem'>
                            <Typography m={2} fontWeight='bold'>
                                Total mensal - {total}
                            </Typography>
                            <Typography>
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
                                    options={{ title: 'Propostas Canceladas' }}
                                    data={[
                                        ['Item', 'Quantidade'],
                                        ['Canceladas', propostasCanceladas],
                                        ['Não canceladas', propostasNaoCanceladas]
                                    ]}

                                />
                            </Box>
                            <Box width='45%' component={Paper} elevation={3} p={1}>
                                <Chart
                                    chartType="PieChart"
                                    width="100%"
                                    height="400px"
                                    options={{ title: 'Ligações realizadas' }}
                                    data={[
                                        ['Item', 'Quantidade'],
                                        ['Ligadas', qtdLigadas],
                                        ['Não ligadas', qtdNaoLigadas]
                                    ]}
                                />
                            </Box>
                        </Box>
                        <Box component={Paper} elevation={3} p={1} fontSize='1 rem'>
                            <Typography m={2} fontWeight='bold'>
                                Total mensal pme - {totalPme}
                            </Typography>
                            <Chart
                                chartType='ComboChart'
                                width="100%"
                                height="400px"
                                data={producaoPme}
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
                                    options={{ title: 'Propostas Devolvidas' }}
                                    data={[
                                        ['Item', 'Quantidade'],
                                        ['Devolvidas', propostasDevolvidas],
                                        ['Não Devolvidas', propostasNaoDevolvidas]
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
        </Box>
    )
}

export default ProduvidadeElegi
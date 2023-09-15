import { Box, Typography, Paper, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react";
import Chart from "react-google-charts"
import { getRendimentoMensalIndividualTele } from "../../../../_services/teleEntrevista.service";

const ProducaoTeleIndividualMensal = ({
    month,
    analista,
    hook,
    flushHook
}) => {

    const [loading, setLoading] = useState(false)
    const [producao, setProducao] = useState([])
    const [prazo, setPrazo] = useState([])
    const [total, setTotal] = useState(0)
    const [houveDivergencia, setHouveDivergencia] = useState(0)
    const [naoHouveDivergencia, setNaoHouveDivergencia] = useState(0)
    const [agendado, setAgendado] = useState(0)
    const [naoAgendado, setNaoAgendado] = useState(0)
    const [primeiroContato, setPrimeiroContato] = useState(0)
    const [segundoContato, setSegundoContato] = useState(0)
    const [terceiroContato, setTerceiroContato] = useState(0)
    const [producaoRn, setProducaoRn] = useState([])
    const [totalRn, setTotalRn] = useState(0)
    const [producaoUe, setProducaoUe] = useState([])
    const [totalUe, setTotalUe] = useState(0)

    const fetchData = async () => {

        setLoading(true)

        const result = await getRendimentoMensalIndividualTele(month, analista)

        console.log(result);

        setProducao(result.producaoTele)
        setPrazo(result.arrPrazo)
        setTotal(result.total)
        setHouveDivergencia(result.houveDivergencia)
        setNaoHouveDivergencia(result.naoHouveDivergencia)
        setAgendado(result.agendadas)
        setNaoAgendado(result.naoAgendadas)
        setPrimeiroContato(result.primeiroContato)
        setSegundoContato(result.segundoContato)
        setTerceiroContato(result.terceiroContato)
        setProducaoRn(result.producaoRn)
        setTotalRn(result.totalRn)
        setProducaoUe(result.producaoUe)
        setTotalUe(result.totalUe)

        setLoading(false)
    }

    useEffect(() => {
        flushHook(false)
        fetchData()
    }, [hook])

    // Opções de configuração do gráfico
    const options = {
        title: 'Produção',
        vAxis: { title: 'Entrevistas' },
        hAxis: { title: 'Dias' },
        isStacked: true,
        seriesType: 'bars',
        series: { 5: { type: 'line' } },
        colors: ["#43a047", "#0288d1", "#673ab7", "#ff9800", "#d50000"]
    };

    const data = [
        ['Categoria', 'Quantidade'],
        ['Não houve divergencia', houveDivergencia],
        ['Houve divergencia', naoHouveDivergencia],
    ];

    const dataAgendados = [
        ['Categoria', 'Quantidade'],
        ['Agendado', agendado],
        ['Não Agendado', naoAgendado]
    ]

    const dataContatos = [
        ['Contato', 'Tentativas'],
        ['Primeiro Contato', primeiroContato],
        ['Segundo Contato', segundoContato],
        ['Terceiro Contato', terceiroContato]
    ]

    const optionsHouveDivergencia = {
        title: 'Houve divergência'
    }

    return (
        <Box>
            <Typography m={1} variant="h6">
                Produção mensal - Tele - {analista} - {month}
            </Typography>
            {
                !loading ? (
                    <>
                        <Box component={Paper} elevation={3} p={1}>
                            <Typography m={2} fontWeight='bold' fontSize='1 rem'>
                                Total mensal - {total}
                            </Typography>
                            <Chart
                                chartType='ComboChart'
                                width="100%"
                                height="400px"
                                data={prazo}
                                options={options}
                            />
                        </Box>
                        <Box display='flex' width='100%' flexWrap='wrap' mt={1} justifyContent='space-around'>
                            <Box width='45%' component={Paper} elevation={3} p={1}>
                                <Chart
                                    chartType="PieChart"
                                    width="100%"
                                    height="400px"
                                    data={data}
                                    options={optionsHouveDivergencia}
                                />
                            </Box>
                            <Box width='45%' component={Paper} elevation={3} p={1}>
                                <Chart
                                    chartType="PieChart"
                                    width="100%"
                                    height="400px"
                                    data={dataAgendados}
                                    options={{ title: 'Agendados e não agendados' }}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Chart
                                chartType='BarChart'
                                width='100%'
                                height='400px'
                                options={{
                                    title: 'Tentativas de Contato',
                                    hAxis: { title: 'Contato' },
                                    vAxis: { title: 'Tentativas' },
                                    legend: 'none',
                                }}
                                data={dataContatos}
                            />
                        </Box>
                        <Box component={Paper} elevation={3} p={1}>
                            <Typography m={2} fontWeight='bold' fontSize='1 rem'>
                                Total Rn mensal - {totalRn}
                            </Typography>
                            <Chart
                                chartType="ColumnChart"
                                width="100%"
                                height="400px"
                                data={producaoRn}
                                options={options}
                            />
                        </Box>
                        <Box component={Paper} elevation={3} p={1}>
                            <Typography m={2} fontWeight='bold' fontSize='1 rem'>
                                Total UE mensal - {totalUe}
                            </Typography>
                            <Chart
                                chartType="ColumnChart"
                                width="100%"
                                height="400px"
                                data={producaoUe}
                                options={options}
                            />
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

export default ProducaoTeleIndividualMensal
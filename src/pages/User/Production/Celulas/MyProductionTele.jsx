import { Box, Paper, Card, CardContent, Typography, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react";
import Chart from "react-google-charts"
import { getRendimentoMensalIndividualTele } from "../../../../_services/teleEntrevista.service";
import moment from "moment";
import { useParams } from "react-router-dom";
import { diasUteisNoMes } from "../../../../functions/functions";

const options = {
    title: 'Produção',
    vAxis: { title: 'Entrevistas' },
    hAxis: { title: 'Dias' },
};

const MyProductionTele = ({ mes = moment().format('YYYY-MM') }) => {

    const { name } = useParams()
    const [data, setData] = useState({})
    const [somaMelhor, setSomaMelhor] = useState(0)
    const [melhorRendimento, setMelhorRendimento] = useState(false)
    const [porcentalMelhorDesempenho, setPorcentualMelhorDesempenho] = useState('')
    const [mediaDiaTrabalhado, setMediaDiaTrabalhado] = useState(0)
    const [mediaDiasPorMes, setMediaDiasPorMes] = useState(0)
    const [metaMensal, setMetaMensal] = useState(0)
    const [mediaMelhorMensal, setMediaMelhorMensal] = useState(0)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        const result = await getRendimentoMensalIndividualTele(mes, name)
        const arrProdutividade = result.arrComparativo
        let somaUltimaColuna = 0
        for (let i = 1; i < arrProdutividade.length; i++) {
            const valorUltimaColuna = arrProdutividade[i][arrProdutividade[i].length - 1];
            somaUltimaColuna += valorUltimaColuna;
        }
        setMediaDiaTrabalhado(result.total / result.arrPrazo.length);
        const diasUteis = diasUteisNoMes(moment(mes).format('YYYY'), moment(mes).format('MM'))
        setMediaDiasPorMes(result.total / diasUteis)
        setMetaMensal(diasUteis * 22)
        if (somaUltimaColuna === 0) {
            setMelhorRendimento(true)
        } else {
            const percMelhorDesempenho = 100 - ((result.total / somaUltimaColuna) * 100)

            setPorcentualMelhorDesempenho('-' + percMelhorDesempenho.toFixed(2) + '%')
        }
        setSomaMelhor(somaUltimaColuna)
        setMediaMelhorMensal(somaUltimaColuna / diasUteis)
        setData(result)
        setLoading(false)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
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
                        <Box display='flex' flexWrap='wrap'>
                            <Box width='100%' m={1} display='flex' flexWrap='wrap' justifyContent='space-around'>
                                <Card sx={{ bgcolor: 'lightblue' }} width='300px'>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Meu rendimento
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {data.total} - Rendimento
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {mediaDiasPorMes.toFixed(2)} - Média por dias no mês
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {mediaDiaTrabalhado.toFixed(2)} - Média por dia trabalhado
                                        </Typography>


                                    </CardContent>
                                </Card>
                                <Card sx={{ bgcolor: 'lightcoral' }} width='300px'>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Melhor rendimento
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {somaMelhor} - Melhor rendimento
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {mediaMelhorMensal.toFixed(2)} Média melhor mensal
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {porcentalMelhorDesempenho} Relação ao melhor desempenho
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ bgcolor: 'whitesmoke' }} width='300px'>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Equipe
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {metaMensal} Meta mensal
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            🚧👷🏻‍♀️ - Média equipe
                                        </Typography>
                                        <Typography color="text.secondary">
                                            22 - Meta p/dia
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                            <Box component={Paper} p={1} width='100%' m={1}>
                                <Chart
                                    chartType="ColumnChart"
                                    data={data.arrComparativo}
                                    options={{
                                        title: 'Produção',
                                        vAxis: { title: 'Entrevistas' },
                                        hAxis: { title: 'Dias' },
                                    }}
                                    graph_id="ColumnChart"
                                    width={'100%'}
                                    height={'380px'}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Box display='flex' width='100%' flexWrap='wrap' mt={1} justifyContent='space-around'>
                                <Box width='45%' component={Paper} elevation={3} p={1}>
                                    <Chart
                                        chartType="PieChart"
                                        width="100%"
                                        height="400px"
                                        data={[
                                            ['Categoria', 'Quantidade'],
                                            ['Não houve divergencia', data.houveDivergencia],
                                            ['Houve divergencia', data.naoHouveDivergencia],
                                        ]}
                                        options={{
                                            title: 'Houve divergência'
                                        }}
                                    />
                                </Box>
                                <Box width='45%' component={Paper} elevation={3} p={1}>
                                    <Chart
                                        chartType="PieChart"
                                        width="100%"
                                        height="400px"
                                        data={[
                                            ['Categoria', 'Quantidade'],
                                            ['Agendado', data.agendadas],
                                            ['Não Agendado', data.naoAgendadas]
                                        ]}
                                        options={{ title: 'Agendados e não agendados' }}
                                    />
                                </Box>
                            </Box>
                            <Box>
                                <Box mt={2}>
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
                                        data={[
                                            ['Contato', 'Tentativas'],
                                            ['Primeiro Contato', data.primeiroContato],
                                            ['Segundo Contato', data.segundoContato],
                                            ['Terceiro Contato', data.terceiroContato]
                                        ]}
                                    />
                                </Box>
                            </Box>
                            <Box component={Paper} elevation={3} p={1}>
                                <Typography m={2} fontWeight='bold' fontSize='1 rem'>
                                    Total Rn mensal -
                                </Typography>
                                <Chart
                                    chartType="ColumnChart"
                                    width="100%"
                                    height="400px"
                                    data={data.producaoRn}
                                    options={options}
                                />
                            </Box>
                            <Box component={Paper} elevation={3} p={1}>
                                <Typography m={2} fontWeight='bold' fontSize='1 rem'>
                                    Total UE mensal -
                                </Typography>
                                <Chart
                                    chartType="ColumnChart"
                                    width="100%"
                                    height="400px"
                                    data={data.producaoUe}
                                    options={options}
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
        </>
    )
}

export default MyProductionTele
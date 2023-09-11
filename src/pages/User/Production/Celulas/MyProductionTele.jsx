import { Box, Paper, Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import Chart from "react-google-charts"
import { getRendimentoMensalIndividualTele } from "../../../../_services/teleEntrevista.service";
import moment from "moment";
import { useParams } from "react-router-dom";

const options = {
    title: 'Produção',
    vAxis: { title: 'Entrevistas' },
    hAxis: { title: 'Dias' },
    isStacked: true,
    seriesType: 'bars',
    series: { 5: { type: 'line' } },
    colors: ["#43a047", "#0288d1", "#673ab7", "#ff9800", "#d50000"]
};


const MyProductionTele = ({ mes = moment().format('YYYY-MM') }) => {

    const { name } = useParams()
    const [data, setData] = useState({})

    const fetchData = async () => {

        console.log(mes, name);
        const result = await getRendimentoMensalIndividualTele(mes, name)

        setData(result)

        console.log(result);

    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <Box display='flex'>
                <Box component={Paper} p={1} width='60%' m={1}>
                    <Chart
                        chartType="ColumnChart"
                        data={data.arrPrazo}
                        options={options}
                        graph_id="ColumnChart"
                        width={'100%'}
                        height={'380px'}
                    />
                </Box>
                <Box width='30%' m={1} height={'400px'} display='flex' flexDirection='column' justifyContent='space-around'>
                    <Card sx={{ bgcolor: 'lightgreen' }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Meu rendimento
                            </Typography>
                            <Typography variant="h5" component="div">
                                320 - Rendimento
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                14% Relação a média
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                10% Relação ao melhor desempenho
                            </Typography>
                            <Typography color="text.secondary">
                                1% Relação a meta
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card >
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Melhor rendimento
                            </Typography>
                            <Typography variant="h5" component="div">
                                400 - Melhor rendimento
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                370 - Média
                            </Typography>
                            <Typography color="text.secondary">
                                370 - Meta
                            </Typography>
                        </CardContent>
                    </Card>
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
    )
}

export default MyProductionTele
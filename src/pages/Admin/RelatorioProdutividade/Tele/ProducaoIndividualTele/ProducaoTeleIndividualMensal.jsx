import { Box, Typography, Paper } from "@mui/material"
import Chart from "react-google-charts"

const ProducaoTeleIndividualMensal = ({
    producaoMensal,
    totalMensal,
    houveDivergencia,
    naoHouveDivergencia,
    agendado,
    naoAgendado,
    primeiroContato,
    segundoContato,
    terceiroContato,
    producaoRn,
    totalRn,
    producaoUe,
    totalUe
}) => {

    // Opções de configuração do gráfico
    const options = {
        title: 'Produção mensal',
        hAxis: { title: 'Dias' },
        vAxis: { title: 'Entrevistas' },
        legend: 'none',
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
                Produção mensal
            </Typography>
            <Box component={Paper} elevation={3} p={1}>
                <Typography m={2} fontWeight='bold' fontSize='1 rem'>
                    Total mensal - {totalMensal}
                </Typography>
                <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="400px"
                    data={producaoMensal}
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
                        title: 'Tentaivas de Contato',
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
        </Box>
    )
}

export default ProducaoTeleIndividualMensal
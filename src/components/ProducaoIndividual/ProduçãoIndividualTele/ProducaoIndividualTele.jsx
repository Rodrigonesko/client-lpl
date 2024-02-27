import { Box, Chip, CircularProgress, Tooltip, Typography } from "@mui/material";
import { amber, green, grey, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { useParams } from "react-router-dom";
import { getComparativoProducao, getEntrevistasPorMes, getProducaoIndividualEntrevistas, getQuantidadeDivergencias } from "../../../_services/teleEntrevista.service";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { TrendingDown } from "@mui/icons-material";
import { producaoIndividualAgendamentos } from "../../../_services/teleEntrevistaExterna.service";
import { getProducaoMensalRn } from "../../../_services/rn.service";
import { getProducaoMensalUrgenciaEmergencia } from "../../../_services/urgenciaEmergencia.service";

const ProducaoIndividualTele = ({ mes, analista }) => {

    const { name } = useParams()
    const [loadingChart, setLoadingChart] = useState(false)
    const [qtdDiaUtil, setQtdDiaUtil] = useState(0)
    const [dataCard, setDataCard] = useState({
        minhasEntrevistas: 0,
        analistaComMelhorDesempenho: [],
        minhasEntrevistasMesPassado: 0,
    })
    const [totalEntrevistas, setTotalEntrevistas] = useState({
        totalConcluidas: 0,
        totalCanceladas: 0,
        totalConcluidasMesPassado: 0,
    })
    const [chartData, setChartData] = useState()
    const [divergencias, setDivergencias] = useState({
        totalDivergenciaAnalista: 0,
        totalSemDivergenciaAnalista: 0,
    })
    const [dataAgendamento, setDataAgendamento] = useState({})
    const [dataRns, setDataRns] = useState({
        totalRns: 0,
        totalRnsMesPassado: 0,
        totalRnsAnalista: 0,
        totalRnsCanceladas: 0,
        totalRnsCanceladasMesPassado: 0,
        totalRnsConcluidas: 0,
        totalRnsConcluidasMesPassado: 0,
        series: [],
        dates: []
    })
    const [dataUe, setDataUe] = useState({
        dates: [],
        series: [],
        totalUe: 0,
        totalUeMesPassado: 0,
        totalUeAnalista: 0,
        totalUeConcluido: 0,
        totalUeConcluidoMesPassado: 0,
    })

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await getProducaoIndividualEntrevistas(mes, name || analista)
                setQtdDiaUtil(result.qtdDiaUtil)
                setDataCard(result)
            } catch (error) {
                console.log(error);
            }
        }

        const fetchTotal = async () => {
            try {
                const result = await getEntrevistasPorMes(mes)
                setTotalEntrevistas(result)
            } catch (error) {
                console.log(error);
            }
        }

        const fetchChart = async () => {
            setLoadingChart(true)
            try {
                const result = await getComparativoProducao(mes, name || analista)
                setChartData(result)
                setLoadingChart(false)
            } catch (error) {
                console.log(error);
                setLoadingChart(false)
            }
        }

        const fetchDivergencias = async () => {
            try {
                const result = await getQuantidadeDivergencias(mes, name || analista)
                setDivergencias(result)
            } catch (error) {
                console.log(error);
            }
        }

        const fetchDataAgendamento = async () => {
            try {
                const result = await producaoIndividualAgendamentos(mes, name || analista)
                setDataAgendamento(result)
            } catch (error) {
                console.log(error);
            }
        }

        const fetchProducaoRns = async () => {
            try {
                const result = await getProducaoMensalRn(mes, name || analista)
                setDataRns(result)
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchUe = async () => {
            try {
                const result = await getProducaoMensalUrgenciaEmergencia(mes, name || analista)
                setDataUe(result)
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }

        fetch()
        fetchTotal()
        fetchChart()
        fetchDivergencias()
        fetchDataAgendamento()
        fetchProducaoRns()
        fetchUe()
    }, [mes, analista, name])

    return (
        <Box>
            <Box display={'flex'} mb={2}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '30%',
                            height: '2px',
                            bottom: 0,
                            left: '0%',
                            backgroundColor: 'currentColor',
                            transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                        },
                        '&:hover::after': {
                            width: '100%',
                            left: '0%',
                        },
                    }}
                >
                    Produção Individual Tele-Entrevista
                </Typography>
            </Box>
            {
                dataCard.analistaComMelhorDesempenho.length !== 0 && dataCard.minhasEntrevistas === dataCard.analistaComMelhorDesempenho[0].total ? (
                    <>
                        <Chip label='Você é o colaborador com o melhor rendimento do mês' color='success' />
                    </>
                ) : (
                    <>
                    </>
                )
            }
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mt={2}
                gap={2}
                flexWrap={'wrap'}
            >
                <Box
                    bgcolor={grey[100]}
                    p={2}
                    borderRadius={2}
                    color={grey[800]}
                    width={'30%'}
                >
                    <Typography
                        variant={'body1'}
                    >
                        Meu Rendimento
                    </Typography>
                    <Tooltip title="Comparado ao mês passado">
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={1}
                        >
                            {
                                dataCard.minhasEntrevistas > dataCard.minhasEntrevistasMesPassado ? (
                                    <TrendingUpIcon sx={{ color: green[800] }} />
                                ) : (
                                    <TrendingDown sx={{ color: red[800] }} />
                                )
                            }
                            {
                                dataCard.minhasEntrevistas > dataCard.minhasEntrevistasMesPassado ? (
                                    `+${((dataCard.minhasEntrevistas - dataCard.minhasEntrevistasMesPassado) / dataCard.minhasEntrevistasMesPassado * 100).toFixed(2)}%`
                                ) : (
                                    `-${((dataCard.minhasEntrevistasMesPassado - dataCard.minhasEntrevistas) / dataCard.minhasEntrevistasMesPassado * 100).toFixed(2)}%`
                                )
                            }
                        </Box>
                    </Tooltip>
                    <Typography
                        variant={'h4'}
                    >
                        {dataCard.minhasEntrevistas}
                    </Typography>
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        gap={1}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            Média por dia trabalhado
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {
                                (dataCard.minhasEntrevistas / (chartData ? chartData.series[0].data.filter(quantidade => quantidade > 0).length : 1)).toFixed(2)
                            }
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        gap={1}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            Média por dia util
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {(dataCard.minhasEntrevistas / qtdDiaUtil).toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    bgcolor={grey[100]}
                    p={2}
                    borderRadius={2}
                    color={grey[800]}
                    width={'30%'}
                >
                    <Typography
                        variant={'body1'}
                    >
                        Melhor Rendimento
                    </Typography>
                    <Tooltip title="Comparado ao desempenho do melhor rendimento">
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={1}
                        >
                            {
                                dataCard.analistaComMelhorDesempenho.length > 0 ? (
                                    dataCard.analistaComMelhorDesempenho[0].total > dataCard.minhasEntrevistas ? (
                                        <TrendingDown sx={{ color: red[800] }} />
                                    ) : (
                                        <TrendingUpIcon sx={{ color: green[800] }} />
                                    )
                                ) : null
                            }
                            {
                                dataCard.analistaComMelhorDesempenho.length > 0 ? (
                                    dataCard.analistaComMelhorDesempenho[0].total > dataCard.minhasEntrevistas ? (
                                        `-${((dataCard.analistaComMelhorDesempenho[0].total - dataCard.minhasEntrevistas) / dataCard.analistaComMelhorDesempenho[0].total * 100).toFixed(2)}%`
                                    ) : (
                                        `+${((dataCard.minhasEntrevistas - dataCard.analistaComMelhorDesempenho[0].total) / dataCard.analistaComMelhorDesempenho[0].total * 100).toFixed(2)}%`
                                    )
                                ) : null
                            }
                        </Box>
                    </Tooltip>
                    <Typography
                        variant={'h4'}
                    >
                        {dataCard.analistaComMelhorDesempenho.length > 0 ? dataCard.analistaComMelhorDesempenho[0].total : 0}
                    </Typography>
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        gap={1}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            Média por dia trabalhado
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {
                                (dataCard.analistaComMelhorDesempenho.length > 0 && (dataCard.analistaComMelhorDesempenho[0].total / (chartData ? chartData.series[1].data.filter(quantidade => quantidade > 0).length : 1)).toFixed(2))
                            }
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        gap={1}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            Média por dia util
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {dataCard.analistaComMelhorDesempenho.length > 0 ? (dataCard.analistaComMelhorDesempenho[0].total / qtdDiaUtil).toFixed(2) : 0}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    bgcolor={grey[100]}
                    p={2}
                    borderRadius={2}
                    color={grey[800]}
                    width={'30%'}
                >
                    <Typography
                        variant={'body1'}
                    >
                        Total de Entrevistas
                    </Typography>
                    <Tooltip title="Comparado ao mês passado">
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={1}
                        >
                            {
                                totalEntrevistas.totalConcluidas > totalEntrevistas.totalConcluidasMesPassado ? (
                                    <TrendingUpIcon sx={{ color: green[800] }} />
                                ) : (
                                    <TrendingDown sx={{ color: red[800] }} />
                                )
                            }
                            {
                                totalEntrevistas.totalConcluidas > totalEntrevistas.totalConcluidasMesPassado ? (
                                    `+${((totalEntrevistas.totalConcluidas - totalEntrevistas.totalConcluidasMesPassado) / totalEntrevistas.totalConcluidasMesPassado * 100).toFixed(2)}%`
                                ) : (
                                    `-${((totalEntrevistas.totalConcluidasMesPassado - totalEntrevistas.totalConcluidas) / totalEntrevistas.totalConcluidasMesPassado * 100).toFixed(2)}%`
                                )
                            }
                        </Box>
                    </Tooltip>
                    <Typography
                        variant={'h4'}
                    >
                        {totalEntrevistas.totalConcluidas}
                    </Typography>
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        gap={1}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            meta para cada analista
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {qtdDiaUtil * 22}
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        gap={1}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            total de canceladas
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {totalEntrevistas.totalCanceladas}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                width={'100%'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mt={2}
            >
                <Box
                    width={'100%'}
                    bgcolor={grey[100]}
                    height={'400px'}
                    p={2}
                    borderRadius={2}
                    textAlign={'center'}
                >
                    {
                        loadingChart ? <CircularProgress sx={{ color: grey[800] }} /> : (
                            <Chart
                                options={{
                                    plotOptions: {
                                        bar: {
                                            distributed: false
                                        }
                                    },
                                    colors: [green[500], amber[500]],
                                    xaxis: {
                                        categories: chartData ? chartData.dates : ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
                                    }
                                }}
                                type={'bar'}
                                height={350}
                                series={[
                                    {
                                        name: chartData ? chartData.series[0].name : 'Analista',
                                        data: chartData ? chartData.series[0].data : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                                    },
                                    {
                                        name: 'Melhor',
                                        data: chartData ? chartData.series[1].data : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                                    }
                                ]}
                                width={'100%'}
                            />
                        )
                    }
                </Box>
            </Box>
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mt={2}
            >
                <Box
                    width={'48%'}
                    bgcolor={grey[100]}
                    height={'400px'}
                    p={2}
                    borderRadius={2}
                    textAlign={'center'}
                >
                    {
                        loadingChart ? <CircularProgress sx={{ color: grey[800] }} /> : (
                            <Chart
                                type='pie'
                                options={{
                                    labels: ['Agendado', 'Não agendado'],
                                    inverseColors: false,
                                }}
                                series={dataAgendamento ? [dataAgendamento.realizadaAgendada, dataAgendamento.realizadaNaoAgendada] : [0, 0]}
                                width={'100%'}
                                height={350}
                            />
                        )
                    }
                </Box>
                <Box
                    width={'48%'}
                    bgcolor={grey[100]}
                    height={'400px'}
                    p={2}
                    borderRadius={2}
                    textAlign={'center'}
                >
                    {
                        loadingChart ? <CircularProgress sx={{ color: grey[800] }} /> : (
                            <Chart
                                type='pie'
                                options={{
                                    labels: ['Houve divergencia', 'Não houve divergencia'],
                                    inverseColors: false,
                                }}
                                series={[divergencias.totalDivergenciaAnalista, divergencias.totalSemDivergenciaAnalista]}
                                width={'100%'}
                                height={350}
                            />
                        )
                    }
                </Box>
            </Box>
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mt={2}
            >
                <Box
                    width={'100%'}
                    bgcolor={grey[100]}
                    height={'400px'}
                    p={2}
                    borderRadius={2}
                    textAlign={'center'}
                >
                    <Typography
                        variant='body1'>
                        Quantidade de Tentativa de Contatos
                    </Typography>
                    {
                        loadingChart ? <CircularProgress sx={{ color: grey[800] }} /> : (
                            <Chart
                                type='bar'
                                options={{
                                    labels: ['1° Tentativa', '2° Tentativa', '3° Tentativa'],
                                    inverseColors: false,
                                    plotOptions: {
                                        bar: {
                                            horizontal: true
                                        }
                                    }
                                }}
                                series={
                                    [
                                        {
                                            name: 'Tentativas',
                                            data: dataAgendamento ? [dataAgendamento.quantidadePrimeiroContato, dataAgendamento.quantidadeSegundoContato, dataAgendamento.quantidadeTerceiroContato] : [10, 20, 30]
                                        }
                                    ]
                                }
                                width={'100%'}
                                height={350}
                            />
                        )
                    }
                </Box>
            </Box>
            <Box
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                gap={2}
                mt={2}
            >
                <Box
                    width={'49%'}
                    bgcolor={grey[100]}
                    p={2}
                    borderRadius={2}
                    height={'150px'}
                >
                    <Typography
                        variant='body1'>
                        Total de Rns Mensal
                    </Typography>
                    <Tooltip title="Comparado ao mês passado">
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={1}
                        >
                            {
                                dataRns.totalRns > dataRns.totalRnsMesPassado ? (
                                    <TrendingUpIcon sx={{ color: green[800] }} />
                                ) : (
                                    <TrendingDown sx={{ color: red[800] }} />
                                )
                            }
                            {
                                dataRns.totalRns > dataRns.totalRnsMesPassado ? (
                                    `+${((dataRns.totalRns - dataRns.totalRnsMesPassado) / dataRns.totalRnsMesPassado * 100).toFixed(2)}%`
                                ) : (
                                    `-${((dataRns.totalRnsMesPassado - dataRns.totalRns) / dataRns.totalRnsMesPassado * 100).toFixed(2)}%`
                                )
                            }
                        </Box>
                    </Tooltip>
                    <Typography
                        variant='h4'
                    >
                        {dataRns.totalRns}
                    </Typography>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Typography
                            variant='body2'
                        >
                            Rns Concluidas
                        </Typography>
                        <Typography
                            variant='body2'
                            fontWeight={'bold'}
                        >
                            {dataRns.totalRnsConcluidas}
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Typography
                            variant='body2'
                        >
                            Rns Canceladas
                        </Typography>
                        <Typography
                            variant='body2'
                            fontWeight={'bold'}
                        >
                            {dataRns.totalRnsCanceladas}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    width={'49%'}
                    bgcolor={grey[100]}
                    p={2}
                    borderRadius={2}
                    height={'150px'}
                >
                    <Typography
                        variant='body1'>
                        Meu rendimento
                    </Typography>
                    <Tooltip title="Comparado ao total">
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={1}
                        >
                            {
                                dataRns.totalRnsAnalista > dataRns.totalRns ? (
                                    <TrendingUpIcon sx={{ color: green[800] }} />
                                ) : (
                                    <TrendingDown sx={{ color: red[800] }} />
                                )
                            }
                            {
                                dataRns.totalRnsAnalista > dataRns.totalRns ? (
                                    `+${((dataRns.totalRnsAnalista - dataRns.totalRns) / dataRns.totalRns * 100).toFixed(2)}%`
                                ) : (
                                    `-${((dataRns.totalRns - dataRns.totalRnsAnalista) / dataRns.totalRns * 100).toFixed(2)}%`
                                )
                            }
                        </Box>
                    </Tooltip>
                    <Typography
                        variant='h4'
                    >
                        {dataRns.totalRnsAnalista}
                    </Typography>
                </Box>
            </Box>
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mt={2}
            >
                <Box
                    width={'100%'}
                    bgcolor={grey[100]}
                    height={'400px'}
                    p={2}
                    borderRadius={2}
                    textAlign={'center'}
                >
                    <Typography
                        variant='body1'>
                        Total RNs Mensal
                    </Typography>
                    {
                        loadingChart ? <CircularProgress sx={{ color: grey[800] }} /> : (
                            <Chart
                                type='bar'
                                options={{
                                    labels: ['Insira os dados'],
                                    inverseColors: false,
                                    colors: [green[500], amber[500]],
                                    xaxis: {
                                        categories: dataRns.dates
                                    }
                                }}
                                series={dataRns.series}
                                width={'100%'}
                                height={350}
                            />
                        )
                    }
                </Box>
            </Box>
            <Box
                gap={2}
                mt={2}
                bgcolor={grey[100]}
                p={2}
                borderRadius={2}
                width={'50%'}
            >
                <Typography>
                    Total de UEs Mensal
                </Typography>
                <Tooltip title="Comparado ao mês passado">
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        gap={1}
                    >
                        {
                            dataUe.totalUe > dataUe.totalUeMesPassado ? (
                                <TrendingUpIcon sx={{ color: green[800] }} />
                            ) : (
                                <TrendingDown sx={{ color: red[800] }} />
                            )
                        }
                        {
                            dataUe.totalUe > dataUe.totalUeMesPassado ? (
                                `+${((dataUe.totalUe - dataUe.totalUeMesPassado) / dataUe.totalUeMesPassado * 100).toFixed(2)}%`
                            ) : (
                                `-${((dataUe.totalUeMesPassado - dataUe.totalUe) / dataUe.totalUeMesPassado * 100).toFixed(2)}%`
                            )
                        }
                    </Box>
                </Tooltip>
                <Typography
                    variant={'h4'}
                >
                    {dataUe.totalUe}
                </Typography>
                <Box
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Typography
                        variant={'body2'}
                    >
                        UEs Concluidas
                    </Typography>
                    <Typography
                        variant={'body2'}
                        fontWeight={'bold'}
                    >
                        {dataUe.totalUeConcluido}
                    </Typography>
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Typography
                        variant={'body2'}
                    >
                        Minha Produção
                    </Typography>
                    <Typography
                        variant={'body2'}
                        fontWeight={'bold'}
                    >
                        {dataUe.totalUeAnalista}
                    </Typography>
                </Box>
            </Box>
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mt={2}
            >
                <Box
                    width={'100%'}
                    bgcolor={grey[100]}
                    height={'400px'}
                    p={2}
                    borderRadius={2}
                    textAlign={'center'}
                >
                    <Typography
                        variant='body1'>
                        Total UE Mensal
                    </Typography>
                    {
                        loadingChart ? <CircularProgress sx={{ color: grey[800] }} /> : (
                            <Chart
                                type='bar'
                                options={{
                                    labels: ['Insira os dados'],
                                    inverseColors: false,
                                    colors: [green[500], amber[500]],
                                    xaxis: {
                                        categories: dataUe.dates
                                    }
                                }}
                                series={dataUe.series}
                                width={'100%'}
                                height={350}
                            />
                        )
                    }
                </Box>
            </Box>
        </Box >
    )
}

export default ProducaoIndividualTele;
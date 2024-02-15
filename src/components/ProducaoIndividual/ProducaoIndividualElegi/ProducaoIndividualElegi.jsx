import { Box, Chip, CircularProgress, Tooltip, Typography } from "@mui/material";
import { amber, blue, deepPurple, green, grey, indigo, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { useParams } from "react-router-dom";
import { comparativoAgendamentos, producaoIndividualAgendamentos } from "../../../_services/teleEntrevistaExterna.service";
import { getEntrevistasPorMes, getProducaoIndividualAnexosPorMes } from "../../../_services/teleEntrevista.service";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { TrendingDown } from "@mui/icons-material";

const ProducaoIndividualElegi = ({ mes, analista }) => {

    const { name } = useParams()

    const [dataAgendamento, setDataAgendamento] = useState({
        totalPropostasMes: 0,
        totalAgendadas: 0,
        agendadasAnalista: 0,
        analistaQueMaisAgendou: [{ total: 0, nome: '' }],
        totalEntrevistas: 0
    })
    const [dataEntrevistas, setDataEntrevistas] = useState()
    const [chartDataAgendamentos, setChartDataAgendamentos] = useState()
    const [dataAnexos, setDataAnexos] = useState({
        analistaQueMaisAnexou: [{ total: 0, nome: '' }],
        analistaQueMaisImplantou: [{ total: 0, nome: '' }],
        analistaQueMaisMandouImplantacao: [{ total: 0, nome: '' }],
        anexos: 0,
        implantados: 0,
        mandouImplantacao: 0,
        totalAnexos: 0,
        totalImplantados: 0,
        totalMandouImplantacao: 0
    })
    const [loadingChart, setLoadingChart] = useState(true)
    const [loadingData, setLoadingData] = useState(true)
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
            setLoadingData(true)
            const result = await producaoIndividualAgendamentos(
                mes,
                name || analista
            )
            setDataAgendamento(result)
            const resultTotalEntrevistas = await getEntrevistasPorMes(mes)
            console.log(resultTotalEntrevistas);
            setDataEntrevistas(resultTotalEntrevistas)
            setLoadingData(false)
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            setLoadingChart(true)
            const result = await comparativoAgendamentos(
                mes,
                name || analista
            )
            setChartDataAgendamentos(result)
            setLoadingChart(false)
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            setLoadingData(true)
            const result = await getProducaoIndividualAnexosPorMes(
                mes,
                name || analista
            )
            setDataAnexos(result)
            setLoadingData(false)
        }
        fetch()

    }, [])

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
                    Produção Individual Elegibilidade
                </Typography>
            </Box>
            {
                dataAgendamento.agendadasAnalista.length !== 0 && dataAgendamento.agendadasAnalista === dataAgendamento.analistaQueMaisAgendou[0].total ? (
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
                        Quantidade total de Propostas PME
                    </Typography>
                    <Tooltip title="Comparado ao mês passado">
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={1}
                        >
                            {/* {
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
                            } */}
                        </Box>
                    </Tooltip>
                    <Typography
                        variant={'h4'}
                    >
                        {dataCard.minhasEntrevistas}
                    </Typography>
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
                        Propostas PMEs do mês atual
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
                                            distributed: false,
                                            horizontal: true
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
                                        name: chartData ? chartData.series[0].name : 'PME',
                                        data: chartData ? chartData.series[0].data : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                                    },

                                ]}
                                width={'100%'}
                            />
                        )
                    }
                </Box>
            </Box>
        </Box>
    )

}

export default ProducaoIndividualElegi
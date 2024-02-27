import { Box, Chip, CircularProgress, Tooltip, Typography } from "@mui/material";
import { amber, green, grey, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { useParams } from "react-router-dom";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { TrendingDown } from "@mui/icons-material";
import { getAnalaticoElegibilidadeMensal, getComparativoProducaoElegibilidade, getProducaoIndividualElegibilidade } from "../../../_services/elegibilidade.service";

const ProducaoIndividualElegi = ({ mes, analista }) => {

    const { name } = useParams()

    const [loadingChart, setLoadingChart] = useState(false)
    const [chartData, setChartData] = useState(null)
    const [cardData, setCardData] = useState({
        totalAnalista: 0,
        totalAnalistaMesPassado: 0,
        totalCancelados: 0,
        totalCanceladosMelhorAnalista: 0,
        totalLigacaoRealizada: 0,
        totalLigacaoRealizadaMelhorAnalista: 0,
        melhorAnalista: [
            { _id: '', quantidade: 0 }
        ]
    })
    const [dataGeral, setDataGeral] = useState({
        total: 0,
        totalMesPassado: 0,
        totalCanceladas: 0
    })

    useEffect(() => {
        const fetch = async () => {
            setLoadingChart(true)
            const result = await getProducaoIndividualElegibilidade(mes, analista || name)
            const resultGeral = await getAnalaticoElegibilidadeMensal(mes)
            setCardData(result)
            setDataGeral(resultGeral)
            const comparativoProducao = await getComparativoProducaoElegibilidade(mes, analista || name)
            setChartData(comparativoProducao)
            setLoadingChart(false)
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
                cardData.melhorAnalista[0].quantidade !== 0 && cardData.melhorAnalista[0].quantidade === cardData.totalAnalista ? (
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
                                cardData.totalAnalista > cardData.totalAnalistaMesPassado ? (
                                    <TrendingUpIcon sx={{ color: green[800] }} />
                                ) : (
                                    <TrendingDown sx={{ color: red[800] }} />
                                )
                            }
                            {
                                cardData.totalAnalista > cardData.totalAnalistaMesPassado ? (
                                    `+${((cardData.totalAnalista - cardData.totalAnalistaMesPassado) / cardData.totalAnalistaMesPassado * 100).toFixed(2)}%`
                                ) : (
                                    `-${((cardData.totalAnalistaMesPassado - cardData.totalAnalista) / cardData.totalAnalistaMesPassado * 100).toFixed(2)}%`
                                )
                            }
                        </Box>
                    </Tooltip>
                    <Typography
                        variant={'h4'}
                    >
                        {cardData.totalAnalista}
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
                            Média por dia util
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {
                                (cardData.totalAnalista / 22).toFixed(2)
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
                            Total Canceladas
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {cardData.totalCancelados}
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
                            Total Ligações Realizadas
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {cardData.totalLigacaoRealizada}
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
                        Analista com melhor desempenho
                    </Typography>
                    <Tooltip title="Comparado ao desempenho do melhor rendimento">
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={1}
                        >
                            {
                                cardData.melhorAnalista[0].quantidade > cardData.totalAnalista ? (
                                    <TrendingDown sx={{ color: red[800] }} />
                                ) : (
                                    <TrendingUpIcon sx={{ color: green[800] }} />
                                )
                            }
                            {
                                cardData.melhorAnalista[0].quantidade > cardData.totalAnalista ? (
                                    `-${((cardData.melhorAnalista[0].quantidade - cardData.totalAnalista) / cardData.melhorAnalista[0].quantidade * 100).toFixed(2)}%`
                                ) : (
                                    `+${((cardData.totalAnalista - cardData.melhorAnalista[0].quantidade) / cardData.melhorAnalista[0].quantidade * 100).toFixed(2)}%`
                                )
                            }
                        </Box>
                    </Tooltip>
                    <Typography
                        variant={'h4'}
                    >
                        {cardData.melhorAnalista[0].quantidade}
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
                            Média por dia útil
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {
                                (cardData.melhorAnalista[0].quantidade / 22).toFixed(2)
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
                            Total cancelados
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {
                                cardData.totalCanceladosMelhorAnalista
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
                            Total ligações realizadas
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {
                                cardData.totalLigacaoRealizadaMelhorAnalista
                            }
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
                        Total de Propostas
                    </Typography>
                    <Tooltip title="Comparado ao mês passado">
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={1}
                        >
                            {
                                dataGeral.totalMesPassado > dataGeral.total ? (
                                    <TrendingDown sx={{ color: red[800] }} />
                                ) : (
                                    <TrendingUpIcon sx={{ color: green[800] }} />
                                )
                            }
                            {
                                dataGeral.totalMesPassado > dataGeral.total ? (
                                    `-${((dataGeral.totalMesPassado - dataGeral.total) / dataGeral.totalMesPassado * 100).toFixed(2)}%`
                                ) : (
                                    `+${((dataGeral.total - dataGeral.totalMesPassado) / dataGeral.totalMesPassado * 100).toFixed(2)}%`
                                )
                            }
                        </Box>
                    </Tooltip>
                    <Typography
                        variant={'h4'}
                    >
                        {dataGeral.total}
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
                            {/* {22 * 22} */}
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
                            Canceladas
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {dataGeral.totalCanceladas}
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
                            Concluídas
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {dataGeral.totalConcluidas}
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
                                }}
                                type={'bar'}
                                height={350}
                                series={chartData || []}
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
                        {/* {dataCard.minhasEntrevistas} */}
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
                            {/* {
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
                            } */}
                        </Box>
                    </Tooltip>
                    <Typography
                        variant={'h4'}
                    >
                        {/* {dataCard.analistaComMelhorDesempenho.length > 0 ? dataCard.analistaComMelhorDesempenho[0].total : 0} */}
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
                    {/* {
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
                    } */}
                </Box>
            </Box>
        </Box>
    )

}

export default ProducaoIndividualElegi
import { Box, Chip, CircularProgress, Tooltip, Typography } from "@mui/material";
import { amber, blue, green, grey, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { useParams } from "react-router-dom";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { TrendingDown } from "@mui/icons-material";
import { getComparativoProducaoElegibilidade } from "../../../_services/elegibilidade.service";
import { getAnaliticoRsdMensal, getComparativoProducaoRsd, getProducaoIndividualRsd } from "../../../_services/rsd.service";

const ProducaoIndividual = ({ mes, analista }) => {

    const { name } = useParams()

    const [loadingChart, setLoadingChart] = useState(false)
    const [chartData, setChartData] = useState(null)
    const [cardData, setCardData] = useState({
        totalAnalista: 0,
        totalAnalistaMesPassado: 0,
        totalCancelados: 0,
        totalCanceladosMelhorAnalista: 0,
        totalConcluido: 0,
        totalIndeferido: 0,
        totalIndeferidosMelhorAnalista: 0,
        totalConcluidoMelhorAnalista: 0,
        melhorAnalista: [
            { _id: '', quantidade: 0 }
        ]
    })
    const [dataGeral, setDataGeral] = useState({
        total: 0,
        totalMesPassado: 0,
        totalCanceladas: 0,
        totalConcluidas: 0,
        totalIndeferidas: 0,
    })

    useEffect(() => {
        const fetch = async () => {
            setLoadingChart(true)
            const result = await getProducaoIndividualRsd(mes, analista || name)
            const resultGeral = await getAnaliticoRsdMensal(mes)
            setCardData(result)
            setDataGeral(resultGeral)
            console.log(resultGeral);
            const comparativoPedido = await getComparativoProducaoRsd(mes, analista || name)
            setChartData(comparativoPedido)
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
                    Produção Individual RSD
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
                            Total Indeferidas
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {cardData.totalIndeferido}
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
                            {(cardData.melhorAnalista[0].quantidade / 22).toFixed(2)}
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
                            Total Indeferidos
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {cardData.totalIndeferidosMelhorAnalista}
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
                            {cardData.totalCanceladosMelhorAnalista}
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
                        Total de Pedidos
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
                            Concluídas
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {dataGeral.totalConcluidas}
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
                            Indeferidas
                        </Typography>
                        <Typography
                            variant={'body2'}
                            fontWeight={'bold'}
                        >
                            {dataGeral.totalIndeferidas}
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
        </Box>
    )

}

export default ProducaoIndividual
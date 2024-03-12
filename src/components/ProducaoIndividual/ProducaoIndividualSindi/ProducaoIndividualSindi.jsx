import { Box, Chip, CircularProgress, Tooltip, Typography } from "@mui/material";
import { amber, green, grey, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { useParams } from "react-router-dom";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { TrendingDown } from "@mui/icons-material";
import { getProducaoIndividualSindi, getcomparativoProducaoSindi } from "../../../_services/sindicancia.service";

const ProducaoIndividualSindi = ({ mes, analista }) => {

    const { name } = useParams()

    const [loadingChart, setLoadingChart] = useState(false)
    const [chartData, setChartData] = useState([])
    const [dataGeral, setDataGeral] = useState({
        totalPacotesIndividual: 0,
        totalPacotesIndividualMesPassado: 0,
        totalPacotesMelhorAnalista: 0,
        totalDemandasGeral: 0,
        totalDemandasGeralMesPassado: 0,
    })

    useEffect(() => {
        const fetch = async () => {
            setLoadingChart(true)
            const resultGeral = await getProducaoIndividualSindi(mes, analista || name)
            setDataGeral(resultGeral)
            console.log(resultGeral);
            const comparativoPacote = await getcomparativoProducaoSindi(mes, analista || name)
            setChartData(comparativoPacote)
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
                    Produção Individual Sindicância
                </Typography>
            </Box>
            {
                dataGeral.totalPacotesMelhorAnalista[0]?.quantidade_pacote !== 0 && dataGeral.totalPacotesMelhorAnalista[0]?.quantidade_pacote === dataGeral.totalPacotesIndividual[0]?.quantidade_pacote ? (
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
                    {
                        loadingChart ? (
                            <CircularProgress size={70} />
                        ) : (
                            <>
                                <Tooltip title="Comparado ao mês passado">
                                    <Box
                                        display={'flex'}
                                        flexDirection={'row'}
                                        alignItems={'center'}
                                        gap={1}
                                    >
                                        {
                                            dataGeral.totalPacotesIndividual[0]?.quantidade_pacote > dataGeral.totalPacotesIndividualMesPassado[0]?.quantidade_pacote ? (
                                                <TrendingUpIcon sx={{ color: green[800] }} />
                                            ) : (
                                                <TrendingDown sx={{ color: red[800] }} />
                                            )
                                        }
                                        {
                                            dataGeral.totalPacotesIndividual[0]?.quantidade_pacote > dataGeral.totalPacotesIndividualMesPassado[0]?.quantidade_pacote ? (
                                                `+${((dataGeral.totalPacotesIndividual[0]?.quantidade_pacote - dataGeral.totalPacotesIndividualMesPassado[0]?.quantidade_pacote) / dataGeral.totalPacotesIndividualMesPassado[0]?.quantidade_pacote * 100).toFixed(2)}%`
                                            ) : (
                                                `-${((dataGeral.totalPacotesIndividualMesPassado[0]?.quantidade_pacote - dataGeral.totalPacotesIndividual[0]?.quantidade_pacote) / dataGeral.totalPacotesIndividualMesPassado[0]?.quantidade_pacote * 100).toFixed(2)}%`
                                            )
                                        }
                                    </Box>
                                </Tooltip>
                                <Typography
                                    variant={'h4'}
                                >
                                    {dataGeral.totalPacotesIndividual[0]?.quantidade_pacote}
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
                                            (dataGeral.totalPacotesIndividual[0]?.quantidade_pacote / 22).toFixed(2)
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
                                        Total Fraudes
                                    </Typography>
                                    <Typography
                                        variant={'body2'}
                                        fontWeight={'bold'}
                                    >
                                        {/* {cardData.totalIndeferido} */}
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
                                        Total Abertos
                                    </Typography>
                                    <Typography
                                        variant={'body2'}
                                        fontWeight={'bold'}
                                    >
                                        {/* {cardData.totalCancelados} */}
                                    </Typography>
                                </Box>
                            </>
                        )
                    }
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
                    {
                        loadingChart ? (
                            <CircularProgress size={70} />
                        ) : (
                            <>
                                <Tooltip title="Comparado ao desempenho do melhor rendimento">
                                    <Box
                                        display={'flex'}
                                        flexDirection={'row'}
                                        alignItems={'center'}
                                        gap={1}
                                    >
                                        {
                                            dataGeral.totalPacotesMelhorAnalista[0]?.quantidade_pacote > dataGeral.totalPacotesIndividual[0]?.quantidade_pacote ? (
                                                <TrendingDown sx={{ color: red[800] }} />
                                            ) : (
                                                <TrendingUpIcon sx={{ color: green[800] }} />
                                            )
                                        }
                                        {
                                            dataGeral.totalPacotesMelhorAnalista[0]?.quantidade_pacote > dataGeral.totalPacotesIndividual[0]?.quantidade_pacote ? (
                                                `-${((dataGeral.totalPacotesMelhorAnalista[0]?.quantidade_pacote - dataGeral.totalPacotesIndividual[0]?.quantidade_pacote) / dataGeral.totalPacotesMelhorAnalista[0]?.quantidade_pacote * 100).toFixed(2)}%`
                                            ) : (
                                                `+${((dataGeral.totalPacotesIndividual[0]?.quantidade_pacote - dataGeral.totalPacotesMelhorAnalista[0]?.quantidade_pacote) / dataGeral.totalPacotesMelhorAnalista[0]?.quantidade_pacote * 100).toFixed(2)}%`
                                            )
                                        }
                                    </Box>
                                </Tooltip>
                                <Typography
                                    variant={'h4'}
                                >
                                    {dataGeral.totalPacotesMelhorAnalista[0]?.quantidade_pacote}
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
                                        {(dataGeral.totalPacotesMelhorAnalista[0]?.quantidade_pacote / 22).toFixed(2)}
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
                                        Total Fraudes
                                    </Typography>
                                    <Typography
                                        variant={'body2'}
                                        fontWeight={'bold'}
                                    >
                                        {/* {cardData.totalIndeferidosMelhorAnalista} */}
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
                                        Total Abertos
                                    </Typography>
                                    <Typography
                                        variant={'body2'}
                                        fontWeight={'bold'}
                                    >
                                        {/* {cardData.totalCanceladosMelhorAnalista} */}
                                    </Typography>
                                </Box>
                            </>
                        )}
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
                        Total de Demandas
                    </Typography>
                    {
                        loadingChart ? (
                            <CircularProgress size={70} />
                        ) : (
                            <>
                                <Tooltip title="Comparado ao mês passado">
                                    <Box
                                        display={'flex'}
                                        flexDirection={'row'}
                                        alignItems={'center'}
                                        gap={1}
                                    >
                                        {
                                            dataGeral.totalDemandasGeralMesPassado[0]?.quantidade_demanda > dataGeral.totalDemandasGeral[0]?.quantidade_demanda ? (
                                                <TrendingDown sx={{ color: red[800] }} />
                                            ) : (
                                                <TrendingUpIcon sx={{ color: green[800] }} />
                                            )
                                        }
                                        {
                                            dataGeral.totalDemandasGeralMesPassado[0]?.quantidade_demanda > dataGeral.totalDemandasGeral[0]?.quantidade_demanda ? (
                                                `-${((dataGeral.totalDemandasGeralMesPassado[0]?.quantidade_demanda - dataGeral.totalDemandasGeral[0]?.quantidade_demanda) / dataGeral.totalDemandasGeralMesPassado[0]?.quantidade_demanda * 100).toFixed(2)}%`
                                            ) : (
                                                `+${((dataGeral.totalDemandasGeral[0]?.quantidade_demanda - dataGeral.totalDemandasGeralMesPassado[0]?.quantidade_demanda) / dataGeral.totalDemandasGeralMesPassado[0]?.quantidade_demanda * 100).toFixed(2)}%`
                                            )
                                        }
                                    </Box>
                                </Tooltip>
                                <Typography
                                    variant={'h4'}
                                >
                                    {dataGeral.totalDemandasGeral[0]?.quantidade_demanda}
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
                                        {/* {dataGeral.totalConcluidas} */}
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
                                        {/* {dataGeral.totalIndeferidas} */}
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
                                        {/* {dataGeral.totalCanceladas} */}
                                    </Typography>
                                </Box>
                            </>
                        )}
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
                        loadingChart ? (
                            <CircularProgress sx={{ color: grey[800] }} />
                        ) : (
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
                                series={chartData.series || []}
                                width={'100%'}
                            />
                        )
                    }

                </Box>
            </Box>
        </Box>
    )

}

export default ProducaoIndividualSindi
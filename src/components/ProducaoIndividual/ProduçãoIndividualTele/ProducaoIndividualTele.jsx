import { Box, CircularProgress, Tooltip, Typography } from "@mui/material";
import { amber, blue, green, grey, indigo, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { useParams } from "react-router-dom";
import { comparativoAgendamentos, producaoIndividualAgendamentos } from "../../../_services/teleEntrevistaExterna.service";
import { getEntrevistasPorMes, getProducaoIndividualAnexosPorMes, getProducaoIndividualEntrevistas } from "../../../_services/teleEntrevista.service";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { TrendingDown } from "@mui/icons-material";

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
        fetch()
        fetchTotal()
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
                            100
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
                            100
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
                                    labels: ['Agendados', 'Não agendados'],
                                    inverseColors: false,
                                }}
                                type={'bar'}
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
                                series={[45, 55]}
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
                                    labels: ['Não houve divergencia', 'Houve divergencia'],
                                    inverseColors: false,
                                }}
                                series={[70, 30]}
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
                                series={[20, 40, 40]}
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
                        Total RNs Mensal
                    </Typography>
                    {
                        loadingChart ? <CircularProgress sx={{ color: grey[800] }} /> : (
                            <Chart
                                type='bar'
                                options={{
                                    labels: ['Insira os dados'],
                                    inverseColors: false,
                                }}
                                series={[]}
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
                        Total UE Mensal
                    </Typography>
                    {
                        loadingChart ? <CircularProgress sx={{ color: grey[800] }} /> : (
                            <Chart
                                type='bar'
                                options={{
                                    labels: ['Insira os dados'],
                                    inverseColors: false,
                                }}
                                series={[]}
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
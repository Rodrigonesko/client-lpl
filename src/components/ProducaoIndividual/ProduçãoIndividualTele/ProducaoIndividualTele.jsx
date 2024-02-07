import { Box, CircularProgress, Typography } from "@mui/material";
import { amber, blue, green, grey, indigo } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { useParams } from "react-router-dom";
import { comparativoAgendamentos, producaoIndividualAgendamentos } from "../../../_services/teleEntrevistaExterna.service";
import { getEntrevistasPorMes, getProducaoIndividualAnexosPorMes } from "../../../_services/teleEntrevista.service";

const ProducaoIndividualTele = ({ mes }) => {

    const { name } = useParams()

    const [dataAgendamento, setDataAgendamento] = useState({
        totalPropostasMes: 0,
        totalAgendadas: 0,
        agendadasAnalista: 0,
        analistaQueMaisAgendou: [{ total: 0, nome: '' }],
        totalEntrevistas: 0
    })
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


    useEffect(() => {
        const fetch = async () => {
            setLoadingData(true)
            const result = await producaoIndividualAgendamentos(
                mes,
                name
            )
            setDataAgendamento(result)
            const resultTotalEntrevistas = await getEntrevistasPorMes(mes)
            setDataAgendamento(prevState => ({
                ...prevState,
                totalEntrevistas: resultTotalEntrevistas
            }))
            setLoadingData(false)
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            setLoadingChart(true)
            const result = await comparativoAgendamentos(
                mes,
                name
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
                name
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
                    bgcolor={blue[100]}
                    p={2}
                    borderRadius={2}
                    color={blue[800]}
                    width={'350px'}
                >
                    <Typography
                        variant={'body1'}
                    >
                        Meu rendimento
                    </Typography>
                    <Typography
                        variant={'h4'}
                    >
                        {!loadingData ? dataAgendamento?.totalPropostasMes : <CircularProgress size={'40px'} sx={{ color: blue[800] }} />}
                    </Typography>
                </Box>
                <Box
                    bgcolor={amber[100]}
                    p={2}
                    borderRadius={2}
                    color={amber[800]}
                    width={'350px'}
                >
                    <Typography
                        variant={'body1'}
                    >
                        Melhor rendimento
                    </Typography>
                    <Typography
                        variant={'h4'}
                    >
                        {!loadingData ? dataAgendamento?.totalEntrevistas : <CircularProgress size={'40px'} sx={{ color: amber[800] }} />}
                    </Typography>
                </Box>
                <Box
                    bgcolor={indigo[100]}
                    p={2}
                    borderRadius={2}
                    color={indigo[800]}
                    width={'350px'}
                >
                    <Typography
                        variant={'body1'}
                    >
                        Meta mensal da equipe
                    </Typography>
                    <Typography
                        variant={'h4'}
                    >
                        {!loadingData ? dataAgendamento?.totalAgendadas : <CircularProgress size={'40px'} sx={{ color: indigo[800] }} />}
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
                    width={'58%'}
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
                                    chart: {
                                        id: 'basic-bar'
                                    },
                                    plotOptions: {
                                        bar: {
                                            distributed: false, // Altere para false
                                        }
                                    },
                                    colors: [green[500], amber[500]], xaxis: {
                                        categories: chartDataAgendamentos !== undefined ? chartDataAgendamentos?.dates : ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
                                    }
                                }}
                                series={[
                                    {
                                        name: chartDataAgendamentos !== undefined ? chartDataAgendamentos.series[0]?.name : 'Agendamentos',
                                        data: chartDataAgendamentos !== undefined ? chartDataAgendamentos.series[0]?.data : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // Adicione seus próprios dados aqui
                                    },
                                    {
                                        name: 'Melhor',
                                        data: chartDataAgendamentos !== undefined ? chartDataAgendamentos?.series[1]?.data : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // Adicione seus próprios dados aqui
                                    }
                                ]}
                                type={'bar'}
                                height={350}
                            />
                        )
                    }
                </Box>
                <Box
                    width={'38%'}
                    bgcolor={grey[100]}
                    height={'400px'}
                    p={2}
                    borderRadius={2}
                >
                    <Typography
                        variant="body1"
                    >
                        Média de agendamentos por dia
                        <Typography
                            variant={'body2'}
                            sx={{
                                color: green[800]
                            }}
                        >
                            100
                        </Typography>
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        Média de agendamentos por dia útil
                        <Typography
                            variant={'body2'}
                            sx={{
                                color: green[800]
                            }}
                        >
                            {dataAgendamento?.agendadasAnalista > 0 ? (dataAgendamento?.agendadasAnalista / 22).toFixed(2) : 0}
                        </Typography>
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        Comparação com o total de agendamentos
                        <Typography
                            variant={'body2'}
                            sx={{
                                color: green[800]
                            }}
                        >
                            {dataAgendamento?.totalAgendadas > 0 ? ((dataAgendamento?.agendadasAnalista / dataAgendamento?.totalAgendadas) * 100).toFixed(2) : 0}%
                        </Typography>
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        Comparação com o analista com mais agendamentos
                        <Typography
                            variant={'body2'}
                            sx={{
                                color: green[800]
                            }}
                        >
                            {dataAgendamento?.analistaQueMaisAgendou[0]?.total > 0 ? ((dataAgendamento?.agendadasAnalista / dataAgendamento?.analistaQueMaisAgendou[0]?.total) * 100).toFixed(2) : 0}%
                        </Typography>
                    </Typography>
                </Box>
                <Box>

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
        </Box >
    )

}

export default ProducaoIndividualTele;
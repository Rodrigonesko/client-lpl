import { Box, CircularProgress, Typography } from "@mui/material";
import { amber, blue, deepPurple, green, grey, indigo, yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { comparativoAgendamentos, producaoIndividualAgendamentos } from "../../_services/teleEntrevistaExterna.service";
import { useParams } from "react-router-dom";

const ProducaoIndividualAgendamento = ({
    mes
}) => {

    const { name } = useParams()

    const [dataAgendamento, setDataAgendamento] = useState({
        totalPropostasMes: 0,
        totalAgendadas: 0,
        agendadasAnalista: 0,
        analistaQueMaisAgendou: [{ total: 0, nome: '' }]
    })
    const [chartDataAgendamentos, setChartDataAgendamentos] = useState()
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
                    Produção Individual Agendamento
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
                    width={'200px'}
                >
                    <Typography
                        variant={'body1'}
                    >
                        Propostas
                    </Typography>
                    <Typography
                        variant={'h4'}
                    >
                        {!loadingData ? dataAgendamento?.totalPropostasMes : <CircularProgress size={'40px'} sx={{ color: blue[800] }} />}
                    </Typography>
                </Box>
                <Box
                    bgcolor={indigo[100]}
                    p={2}
                    borderRadius={2}
                    color={indigo[800]}
                    width={'200px'}
                >
                    <Typography
                        variant={'body1'}
                    >
                        Agendadas
                    </Typography>
                    <Typography
                        variant={'h4'}
                    >
                        {!loadingData ? dataAgendamento?.totalAgendadas : <CircularProgress size={'40px'} sx={{ color: indigo[800] }} />}
                    </Typography>
                </Box>
                <Box
                    bgcolor={green[100]}
                    p={2}
                    borderRadius={2}
                    color={green[800]}
                    width={'200px'}
                >
                    <Typography
                        variant={'body1'}
                    >
                        Meus agendamentos
                    </Typography>
                    <Typography
                        variant={'h4'}
                    >
                        {!loadingData ? dataAgendamento?.agendadasAnalista : <CircularProgress size={'40px'} sx={{ color: green[800] }} />}
                    </Typography>
                </Box>
                <Box
                    bgcolor={deepPurple[100]}
                    p={2}
                    borderRadius={2}
                    color={deepPurple[800]}
                    width={'200px'}
                >
                    <Typography
                        variant={'body1'}
                    >
                        Mais agendamentos
                    </Typography>
                    <Typography
                        variant={'h4'}
                    >
                        {!loadingData ? dataAgendamento?.analistaQueMaisAgendou[0]?.total : <CircularProgress size={'40px'} sx={{ color: deepPurple[800] }} />}
                    </Typography>
                </Box>
                <Box
                    bgcolor={amber[100]}
                    p={2}
                    borderRadius={2}
                    color={amber[800]}
                    width={'200px'}
                >
                    <Typography
                        variant={'body1'}
                    >
                        Média
                    </Typography>
                    <Typography
                        variant={'h4'}
                    >
                        ...
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
                    width={'60%'}
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
                    width={'35%'}
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
                gap={2}
                flexWrap={'wrap'}
            >
                <Box
                    bgcolor={blue[100]}
                    p={2}
                    borderRadius={2}
                    color={blue[800]}
                    width={'30%'}
                >
                    <Typography
                        variant={'h4'}
                    >
                        5000
                    </Typography>
                    <Typography
                        variant={'body1'}
                    >
                        Entrevistas realizadas
                    </Typography>
                </Box>
                <Box
                    bgcolor={grey[100]}
                    p={2}
                    borderRadius={2}
                    width={'30%'}
                >
                    <Typography
                        sx={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Total Propostas Anexadas
                    </Typography>
                    <Typography
                        variant={'h4'}
                    >
                        5000
                    </Typography>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body1'}
                            color={grey[600]}
                        >
                            Eu
                        </Typography>
                        <Typography
                            variant={'body1'}
                        >
                            1000
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body1'}
                            color={grey[600]}
                        >
                            Melhor
                        </Typography>
                        <Typography
                            variant={'body1'}
                        >
                            2000
                        </Typography>
                    </Box>
                </Box>
                <Box
                    bgcolor={grey[100]}
                    p={2}
                    borderRadius={2}
                    width={'30%'}
                >
                    <Typography
                        sx={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Total Implantação
                    </Typography>
                    <Typography
                        variant={'h4'}
                    >
                        5000
                    </Typography>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body1'}
                            color={grey[600]}
                        >
                            Eu
                        </Typography>
                        <Typography
                            variant={'body1'}
                        >
                            1000
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body1'}
                            color={grey[600]}
                        >
                            Melhor
                        </Typography>
                        <Typography
                            variant={'body1'}
                        >
                            2000
                        </Typography>
                    </Box>
                </Box>
                <Box
                    bgcolor={deepPurple[100]}
                    p={2}
                    borderRadius={2}
                    color={deepPurple[800]}
                    width={'30%'}
                >
                    <Typography
                        variant={'body1'}
                    >
                        Implantadas
                    </Typography>
                    <Typography
                        variant={'h4'}
                    >
                        5000
                    </Typography>
                </Box>
                <Box
                    bgcolor={amber[100]}
                    p={2}
                    borderRadius={2}
                    color={amber[800]}
                    width={'30%'}
                >
                    <Typography
                        variant={'body1'}
                    >
                        Média
                    </Typography>
                    <Typography
                        variant={'h4'}
                    >
                        ...
                    </Typography>
                </Box>
            </Box>
        </Box>
    )

}

export default ProducaoIndividualAgendamento;
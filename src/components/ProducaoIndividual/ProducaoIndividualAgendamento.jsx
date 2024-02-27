import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import { amber, blue, deepPurple, green, grey, indigo, yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { comparativoAgendamentos, producaoIndividualAgendamentos } from "../../_services/teleEntrevistaExterna.service";
import { useParams } from "react-router-dom";
import { getEntrevistasPorMes, getProducaoIndividualAnexosPorMes } from "../../_services/teleEntrevista.service";

const ProducaoIndividualAgendamento = ({
    mes,
    analista
}) => {

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
        totalMandouImplantacao: 0,
        quantidadadeCanceladoHumanizado: 0,
        quantidadeHumanizado: 0,
        quantidadeJanela: 0,
        quantidadeSemWhats: 0,

    })
    const [loadingChart, setLoadingChart] = useState(true)
    const [loadingData, setLoadingData] = useState(true)


    useEffect(() => {
        const fetch = async () => {
            setLoadingData(true)
            const result = await producaoIndividualAgendamentos(
                mes,
                name || analista
            )
            console.log(result);
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
                    Produção Individual Agendamento
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
                    width={'48%'}
                >
                    <Typography
                        sx={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Meus Agendamentos
                    </Typography>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'h4'}
                        >
                            {!loadingData ? dataAgendamento?.agendadasAnalista : ''}
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            Total Humanizado
                        </Typography>
                        <Typography
                            variant={'body2'}
                        >
                            {!loadingData ? dataAgendamento?.quantidadeHumanizado : ''}
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            Total Janela
                        </Typography>
                        <Typography
                            variant={'body2'}
                        >
                            {!loadingData ? dataAgendamento?.quantidadeJanela : ''}
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            Total Sem Whats
                        </Typography>
                        <Typography
                            variant={'body2'}
                        >
                            {!loadingData ? dataAgendamento?.quantidadeSemWhats : ''}
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            Total Cancelado Humanizado
                        </Typography>
                        <Typography
                            variant={'body2'}
                        >
                            {!loadingData ? dataAgendamento?.quantidadadeCanceladoHumanizado : ''}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    bgcolor={grey[100]}
                    p={2}
                    borderRadius={2}
                    width={'48%'}
                >
                    <Typography
                        sx={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Total Agendadas
                    </Typography>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'h4'}
                        >
                            {!loadingData ? dataAgendamento?.totalAgendadas : ''}
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            Total Recebidas
                        </Typography>
                        <Typography
                            variant={'body2'}
                        >
                            {!loadingData ? dataAgendamento?.totalPropostasMes : ''}
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            Entrevistas Realizadas
                        </Typography>
                        <Typography
                            variant={'body2'}
                        >
                            {!loadingData ? dataEntrevistas?.totalConcluidas : ''}
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            Total Canceladas
                        </Typography>
                        <Typography
                            variant={'body2'}
                        >
                            {!loadingData ? dataEntrevistas?.totalCanceladas : ''}
                        </Typography>
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            SUA Média de agendamentos por dia útil
                        </Typography>
                        <Typography
                            variant={'body2'}
                        >
                            {dataAgendamento?.agendadasAnalista > 0 ? (dataAgendamento?.agendadasAnalista / 22).toFixed(2) : 0}
                        </Typography>
                    </Box>
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
                        {!loadingData ? dataAnexos?.totalAnexos : ''}
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
                            {!loadingData ? dataAnexos?.anexos : ''}
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
                            {!loadingData ? dataAnexos?.analistaQueMaisAnexou[0]?.total : ''}
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
                        {!loadingData ? dataAnexos?.totalMandouImplantacao : ''}
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
                            {!loadingData ? dataAnexos?.mandouImplantacao : ''}
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
                            {!loadingData ? dataAnexos?.analistaQueMaisMandouImplantacao[0]?.total : ''}
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
                        Total Implatadas
                    </Typography>
                    <Typography
                        variant={'h4'}
                    >
                        {!loadingData ? dataAnexos?.totalImplantados : ''}
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
                            {!loadingData ? dataAnexos?.implantados : ''}
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
                            {!loadingData ? dataAnexos?.analistaQueMaisImplantou[0]?.total : ''}
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
                        Soma Implantação + Anexadas
                    </Typography>
                    <Typography
                        variant={'h4'}
                    >
                        {!loadingData ? dataAnexos?.totalAnexos + dataAnexos?.totalImplantados : ''}
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
                            {!loadingData ? dataAnexos?.anexos + dataAnexos?.implantados : ''}
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
                            {!loadingData ? dataAnexos?.analistaQueMaisAnexou[0]?.total + dataAnexos?.analistaQueMaisImplantou[0]?.total : ''}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )

}

export default ProducaoIndividualAgendamento;
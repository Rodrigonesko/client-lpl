import { Chip, CircularProgress, Divider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { blue, green, grey, red } from "@mui/material/colors"
import { getGraficoPropostasAgendadas } from "../../../../../_services/teleEntrevistaExterna.service"

const RsdChart = ({ mes }) => {

    const [loadingGrafico, setLoadingGrafico] = useState(false)
    const [graficoData, setGraficoData] = useState([])

    const [loadingChart, setLoadingChart] = useState(false)
    const [dataAgendamento, setDataAgendamento] = useState({})
    const [divergencias, setDivergencias] = useState({
        totalDivergenciaAnalista: 0,
        totalSemDivergenciaAnalista: 0,
    })

    useEffect(() => {
        const fetch = async () => {
            setLoadingGrafico(true)
            const result = await getGraficoPropostasAgendadas(mes)
            console.log(result);
            setGraficoData([
                {
                    name: 'Agendadas',
                    data: result,
                    color: blue[500],
                    type: 'pie'
                }
            ])
            setLoadingGrafico(false)

        }

        fetch()

    }, [])

    return (
        <>
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mt={2}
            >
                <Box
                    width={'49%'}
                    bgcolor={grey[100]}
                    height={'400px'}
                    p={2}
                    borderRadius={2}
                    textAlign={'center'}
                >
                    <Typography>
                        Finalizações
                    </Typography>
                    {
                        loadingChart ? <CircularProgress sx={{ color: grey[800] }} /> : (
                            <Chart
                                type='pie'
                                options={{
                                    labels: ['Sem Contato',
                                        'Comprovante Não Recebido',
                                        'Comprovante Correto',
                                        'Pagamento Não Realizado',
                                        'Pago pela Amil sem Comprovante',
                                        'Fracionamento de Nota Fiscal'],
                                    inverseColors: false,
                                }}
                                series={[2, 10, 12, 14, 15, 16]}
                                // width={'100%'}
                                height={350}
                            />
                        )
                    }
                </Box>
                <Box
                    width={'49%'}
                    bgcolor={grey[100]}
                    height={'400px'}
                    p={2}
                    borderRadius={2}
                    textAlign={'center'}
                >
                    <Typography>
                        Formas de Pagamento
                    </Typography>
                    {
                        loadingChart ? <CircularProgress sx={{ color: grey[800] }} /> : (
                            <Chart
                                type='pie'
                                options={{
                                    labels: ['Cartão de Crédito',
                                        'Cartão de Débito',
                                        'Trans./Depósito',
                                        'Cheque',
                                        'Dinheiro',
                                        'Boleto',
                                        'Não Informado',
                                        'Pagamento não realizado',
                                        'Fracionamento de Nota Fiscal',
                                        'Comprovante com Indicio de Fraude'],
                                    inverseColors: false,
                                }}
                                series={[12, 54, 10, 10, 10, 10, 10, 10, 10, 23]}
                                // width={'100%'}
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
                    width={'49%'}
                    bgcolor={grey[100]}
                    height={'400px'}
                    p={2}
                    borderRadius={2}
                    textAlign={'center'}
                >
                    <Divider size='small'  >
                        <Chip label='Relação entre Status Gerenciais' color='primary' sx={{ fontSize: '20px', p: 2 }} />
                    </Divider>
                    <Typography
                        variant="body1"
                    >
                        Aguardando Comprovante
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
                        Aguardando Retorno Contato
                        <Typography
                            variant={'body2'}
                            sx={{
                                color: green[800]
                            }}
                        >
                            1
                        </Typography>
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        Comprovante Correto
                        <Typography
                            variant={'body2'}
                            sx={{
                                color: green[800]
                            }}
                        >
                            1
                        </Typography>
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        Devolvido Amil
                        <Typography
                            variant={'body2'}
                            sx={{
                                color: green[800]
                            }}
                        >
                            1
                        </Typography>
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        Pagamento Não Realizado
                        <Typography
                            variant={'body2'}
                            sx={{
                                color: green[800]
                            }}
                        >
                            1
                        </Typography>
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        Pago pela Amil sem Comprovante
                        <Typography
                            variant={'body2'}
                            sx={{
                                color: green[800]
                            }}
                        >
                            1
                        </Typography>
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        Protocolo Cancelado
                        <Typography
                            variant={'body2'}
                            sx={{
                                color: green[800]
                            }}
                        >
                            1
                        </Typography>
                    </Typography>
                    {/* {
                        loadingChart ? <CircularProgress sx={{ color: grey[800] }} /> : (
                            <Chart
                                type='pie'
                                options={{
                                    labels: ['Aguardando Comprovante',
                                        'Aguardando Retorno Contato',
                                        'Comprovante Correto',
                                        'Devolvido Amil',
                                        'Pagamento Não Realizado',
                                        'Pago pela Amil sem Comprovante',
                                        'Protocolo Cancelado'],
                                    inverseColors: false,
                                }}
                                series={[2, 10, 12, 14, 15, 16]}
                                // width={'100%'}
                                height={350}
                            />
                        )
                    } */}
                </Box>
                <Box
                    width={'49%'}
                    bgcolor={grey[100]}
                    height={'400px'}
                    p={2}
                    borderRadius={2}
                    textAlign={'center'}
                >
                    <Divider size='small'  >
                        <Chip label='Relação entre os Status Amil' color='primary' sx={{ fontSize: '20px', p: 2 }} />
                    </Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }} >
                        <Typography
                            variant="body1"
                        >
                            A Iniciar - 100

                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            AGD - Em ligação beneficiaria afirma ter pago em dinheiro, solicitando declaração de quitação - 1
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            AGD - Em ligação beneficiaria afirma ter pago, solicitando comprovante - 1
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            CANCELAMENTO - Comprovante não Recebido - 1
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            CANCELAMENTO - Não reconheçe Procedimento/Consulta - 1
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            CANCELAMENTO - Sem retorno pós 5 dias úteis - 1
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            Devolvido Amil - 1
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            E-MAIL - Sem sucesso de contrato pós 3 tentativas, solicitado retorno - 1
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            INDEFERIR - Em contato beneficiário confirma que não realizou pagamento - 1
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            INDEFERIR - Em contato beneficiário foi confirmado fracionamento de Nota Fiscal -  1
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            PAGAMENTO LIBERADO - 1
                        </Typography>
                    </Box>
                    {/* {
                        loadingChart ? <CircularProgress sx={{ color: grey[800] }} /> : (
                            <Chart
                                type='pie'
                                options={{
                                    labels: ['A Iniciar',
                                        'AGD - Em ligação beneficiaria afirma ter pago em dinheiro, solicitando declaração de quitação',
                                        'AGD - Em ligação beneficiaria afirma ter pago, solicitando comprovante',
                                        'CANCELAMENTO - Comprovante não Recebido',
                                        'CANCELAMENTO - Não reconheçe Procedimento/Consulta',
                                        'CANCELAMENTO - Sem retorno pós 5 dias úteis',
                                        'Devolvido Amil',
                                        'E-MAIL - Sem sucesso de contrato pós 3 tentativas, solicitado retorno',
                                        'INDEFERIR - Em contato beneficiário confirma que não realizou pagamento',
                                        'INDEFERIR - Em contato beneficiário foi confirmado fracionamento de Nota Fiscal',
                                        'PAGAMENTO LIBERADO'],
                                    inverseColors: false,
                                }}
                                series={[12, 54, 10, 10, 10, 10, 10, 10, 10, 23, 175]}
                                // width={'100%'}
                                height={350}
                            />
                        )
                    } */}
                </Box>
            </Box >
        </>
    )
}

export default RsdChart
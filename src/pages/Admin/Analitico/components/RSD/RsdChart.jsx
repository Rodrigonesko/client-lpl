import { Chip, CircularProgress, Divider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { blue, green, grey, red } from "@mui/material/colors"
import { getQuantidadePagamentosRsd, getQuantidadeStatusAmil, getQuantidadeStatusGerenciais } from "../../../../../_services/rsd.service"

const RsdChart = ({ mes }) => {

    const [loadingGrafico, setLoadingGrafico] = useState(false)
    const [graficoData, setGraficoData] = useState([])

    const [pagamentosData, setPagamentosData] = useState({
        cartaoDeCredito: 0,
        cartaoDeDebito: 0,
        transfDepósito: 0,
        cheque: 0,
        dinheiro: 0,
        boleto: 0,
        naoInformado: 0,
        pagamentoNaoRealizado: 0,
        fracionamentoDeNotaFiscal: 0,
        comprovanteComIndicioDeFraude: 0,
    })

    const [statusGerencial, setStatusGerencial] = useState({
        aguardandoComprovante: 0,
        aguardandoRetornoContato: 0,
        comprovanteCorreto: 0,
        devolvidoAmil: 0,
        pagamentoNaoRealizado: 0,
        pagoPelaAmilSemComprovante: 0,
        protocoloCancelado: 0,
    })

    const [statusAmil, setStatusAmil] = useState({
        aIniciar: 0,
        AGD1: 0,
        AGD2: 0,
        cancelamento1: 0,
        cancelamento2: 0,
        cancelamento3: 0,
        devolvidoAmil: 0,
        email: 0,
        indeferir1: 0,
        indeferir2: 0,
        pagamentoLiberado: 0,
    })

    useEffect(() => {
        const fetch = async () => {
            setLoadingGrafico(true)
            const result = await getQuantidadePagamentosRsd(mes)
            // console.log(result);
            setGraficoData([
                {
                    name: 'Agendadas',
                    data: result,
                    color: blue[500],
                    type: 'pie'
                }
            ])
            setPagamentosData(result)
            setLoadingGrafico(false)
        }

        const gerencial = async () => {
            setLoadingGrafico(true)
            const result = await getQuantidadeStatusGerenciais(mes)
            // console.log(result);
            setStatusGerencial(result)
            setLoadingGrafico(false)
        }

        const amil = async () => {
            setLoadingGrafico(true)
            const result = await getQuantidadeStatusAmil(mes)
            // console.log(result);
            setStatusAmil(result)
            setLoadingGrafico(false)
        }
        fetch()
        gerencial()
        amil()
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
                    width={'100%'}
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
                        loadingGrafico ? <CircularProgress sx={{ color: grey[800] }} /> : (
                            <Chart
                                type='pie'
                                options={{
                                    labels: [
                                        'Cartão de Crédito: ' + pagamentosData.cartaoDeCredito,
                                        'Cartão de Débito: ' + pagamentosData.cartaoDeDebito,
                                        'Trans./Depósito: ' + pagamentosData.transfDepósito,
                                        'Cheque: ' + pagamentosData.cheque,
                                        'Dinheiro: ' + pagamentosData.dinheiro,
                                        'Boleto: ' + pagamentosData.boleto,
                                        'Não Informado: ' + pagamentosData.naoInformado,
                                        'Pagamento não realizado: ' + pagamentosData.pagamentoNaoRealizado,
                                        'Fracionamento de Nota Fiscal: ' + pagamentosData.fracionamentoDeNotaFiscal,
                                        'Comprovante com Indicio de Fraude: ' + pagamentosData.comprovanteComIndicioDeFraude],
                                    inverseColors: false,
                                }}
                                series={[
                                    pagamentosData.cartaoDeCredito,
                                    pagamentosData.cartaoDeDebito,
                                    pagamentosData.transfDepósito,
                                    pagamentosData.cheque,
                                    pagamentosData.dinheiro,
                                    pagamentosData.boleto,
                                    pagamentosData.naoInformado,
                                    pagamentosData.pagamentoNaoRealizado,
                                    pagamentosData.fracionamentoDeNotaFiscal,
                                    pagamentosData.comprovanteComIndicioDeFraude
                                ]}
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
                            {statusGerencial.aguardandoComprovante}
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
                            {statusGerencial.aguardandoRetornoContato}
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
                            {statusGerencial.comprovanteCorreto}
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
                            {statusGerencial.devolvidoAmil}
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
                            {statusGerencial.pagamentoNaoRealizado}
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
                            {statusGerencial.pagoPelaAmilSemComprovante}
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
                            {statusGerencial.protocoloCancelado}
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
                    <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                        <Typography
                            variant="body1"
                        >
                            A Iniciar - {statusAmil.aIniciar}

                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            AGD - Em ligação beneficiaria afirma ter pago em dinheiro, solicitando declaração de quitação - {statusAmil.AGD1}
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            AGD - Em ligação beneficiaria afirma ter pago, solicitando comprovante - {statusAmil.AGD2}
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            CANCELAMENTO - Comprovante não Recebido - {statusAmil.cancelamento1}
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            CANCELAMENTO - Não reconheçe Procedimento/Consulta - {statusAmil.cancelamento2}
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            CANCELAMENTO - Sem retorno pós 5 dias úteis - {statusAmil.cancelamento3}
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            Devolvido Amil - {statusAmil.devolvidoAmil}
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            E-MAIL - Sem sucesso de contrato pós 3 tentativas, solicitado retorno - {statusAmil.email}
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            INDEFERIR - Em contato beneficiário confirma que não realizou pagamento - {statusAmil.indeferir1}
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            INDEFERIR - Em contato beneficiário foi confirmado fracionamento de Nota Fiscal -  {statusAmil.indeferir2}
                        </Typography>
                        <Typography
                            variant="body1"
                        >
                            PAGAMENTO LIBERADO - {statusAmil.pagamentoLiberado}
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
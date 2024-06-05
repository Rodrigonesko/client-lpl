import { Box, Button, CircularProgress, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { AlignHorizontalLeft, Cancel, Done, Search } from "@mui/icons-material";
import { blue, deepOrange, deepPurple, green, grey, red } from "@mui/material/colors";
import Chart from 'react-apexcharts';
import { useEffect, useState } from "react";
import moment from "moment";
import { useTheme } from '@mui/material/styles';
import { getBeneficiariosComMensagem, getEstatisticasRespostasByDate, getPedidosComMaiorValor, getPedidosPorDiaByDate, getQtdPedidoByDate, getQtdPrestadoresByUf, getSomaPrestadoresByDate, getTentaivasDeContato } from "../../../../_services/sulAmerica.service";
import CardDashboardSulAmerica from "../../../../components/Card/CardDashboardSulAmerica";
import TablePrestadores from "./TablePrestadores";
import { valueToBRL } from "../../Pedidos/utils/types";

const Dashboard = () => {

    const theme = useTheme()

    const [dataInicio, setDataInicio] = useState(moment().subtract(30, 'days').format('YYYY-MM-DD'));
    const [dataFim, setDataFim] = useState(moment().format('YYYY-MM-DD'));
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({
        concluidos: 0,
        cancelados: 0,
        total: 0,
        realizados: 0,
        falecidos: 0,
        recusados: 0,
        parciais: 0,
        divergentes: 0,
        tresTentativas: 0,
        tresTentativasWhatsapp: 0,
    })
    const [estatisticasRespostas, setEstatisticasRespostas] = useState([])
    const [prestadores, setPrestadores] = useState([{}])
    const [clinicas, setClinicas] = useState([])
    const [pedidosPorDia, setPedidosPorDia] = useState([])
    const [pedidosComMaiorValor, setPedidosComMaiorValor] = useState([])
    const [tentativasDeContato, setTentativasDeContato] = useState([])

    const handleFilter = async () => {

        if (moment(dataInicio).isAfter(dataFim)) {
            console.log('Data início não pode ser maior que a data fim')
            return
        }

        if (dataInicio === '' || dataFim === '') {
            console.log('Preencha as datas')
            return
        }

        setLoading(true)

        try {
            const resultEstatisticasRespostas = await getEstatisticasRespostasByDate(dataInicio, dataFim)
            setEstatisticasRespostas(resultEstatisticasRespostas)
            const resultPrestadores = await getQtdPrestadoresByUf()
            setPrestadores(resultPrestadores)
            const result = await getQtdPedidoByDate(dataInicio, dataFim)
            setData(result)
            const resultClinicas = await getSomaPrestadoresByDate(dataInicio, dataFim)
            setClinicas(resultClinicas)
            const resultPedidosPorDia = await getPedidosPorDiaByDate(dataInicio, dataFim)
            setPedidosPorDia(resultPedidosPorDia)
            const resultPedidosComMaiorValor = await getPedidosComMaiorValor(dataInicio, dataFim)
            setPedidosComMaiorValor(resultPedidosComMaiorValor)
            const resultTentativasDeContato = await getTentaivasDeContato(dataInicio, dataFim)
            const resultTentativasPorWhatsapp = await getBeneficiariosComMensagem(dataInicio, dataFim)
            setTentativasDeContato([...resultTentativasDeContato, { tentativas: 'Whatsapp', quantidade: resultTentativasPorWhatsapp }])
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        if (dataInicio && dataFim) {
            handleFilter()
        }
    }, [])

    return (
        <Box m={1} mt={4}>
            <Box display={'flex'} gap={2} >
                <TextField
                    label='Data início'
                    size='small'
                    type='date'
                    InputLabelProps={{
                        shrink: true
                    }}
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                />
                <TextField
                    label='Data Fim'
                    size='small'
                    type='date'
                    InputLabelProps={{
                        shrink: true
                    }}
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                />
                <Button
                    variant="contained"
                    endIcon={loading ? <CircularProgress size={'20px'} /> : <Search />}
                    onClick={handleFilter}
                    disabled={loading}
                >
                    Filtrar
                </Button>
            </Box>
            <Grid container spacing={2} mt={1}>
                <CardDashboardSulAmerica title='Sucesso Contato' value={data.concluidos} icon={<Done color="success" />} />
                <CardDashboardSulAmerica title='Insucesso Contato' value={data.cancelados} icon={<Cancel color="error" />} />
                <CardDashboardSulAmerica title='Total' value={data.total} icon={<AlignHorizontalLeft color="warning" />} />
                <Grid item xs={12} sm={12} lg={4}
                >
                    <Box

                        sx={{
                            borderRadius: '10px',
                            bgcolor: grey[100],
                        }}
                    >
                        <Chart
                            type='donut'
                            width='100%'
                            height='300px'
                            series={[
                                data.concluidos,
                                data.cancelados,
                                data.aIniciar,
                                data.emAndamento,
                                data.agendados,
                            ]}
                            options={{
                                labels: [
                                    'Sucesso Contato',
                                    'Insucesso Contato',
                                    'A Iniciar',
                                    'Em Andamento',
                                    'Agendados',
                                ],
                                colors: [
                                    green[900],
                                    red[900],
                                    deepPurple[500],
                                    deepOrange[300],
                                    blue[200],
                                ]
                            }}
                        />
                    </Box>
                </Grid>
                <Grid
                    item xs={12} sm={12} lg={3}
                >
                    <Box

                        sx={{
                            borderRadius: '10px',
                            bgcolor: grey[100],
                            height: '300px'
                        }}
                    >
                        <Chart
                            type='bar'
                            width='100%'
                            height='300px'
                            series={[
                                {
                                    name: 'REALIZADOS',
                                    group: 'SUCESSO CONTATO',
                                    data: [data.realizados],
                                    color: green[500]
                                },
                                {
                                    name: 'RECUSADOS',
                                    group: 'SUCESSO CONTATO',
                                    data: [data.recusados],
                                    color: green[900]
                                },
                                {
                                    name: 'FALECIDOS',
                                    group: 'SUCESSO CONTATO',
                                    data: [data.falecidos],
                                    color: blue[300]
                                },
                                {
                                    name: 'PARCIAIS',
                                    group: 'SUCESSO CONTATO',
                                    data: [data.parciais],
                                    color: blue[500]
                                },
                                {
                                    name: 'DIVERGENTES',
                                    group: 'SUCESSO CONTATO',
                                    data: [data.divergentes],
                                    color: blue[900]
                                },
                                {
                                    name: '3 TENTATIVAS',
                                    group: 'INSUCESSO CONTATO',
                                    data: [data.tresTentativas],
                                    color: red[500]
                                },
                                {
                                    name: '3 TENTATIVAS WHATS',
                                    group: 'INSUCESSO CONTATO',
                                    data: [data.tresTentativasWhatsapp],
                                    color: red[900]
                                }
                            ]}
                            options={{
                                chart: {
                                    type: 'bar',
                                    height: 350,
                                    stacked: true,
                                },
                                xaxis: {
                                    categories: [
                                        '',
                                    ]
                                },
                                fill: {
                                    opacity: 1
                                },
                                legend: {
                                    position: 'right',
                                    horizontalAlign: 'right'
                                }
                            }}
                        />
                    </Box>
                </Grid>
                <Grid
                    item xs={12} sm={12} lg={5}
                >
                    <Box

                        sx={{
                            borderRadius: '10px',
                            bgcolor: grey[100],
                            height: '300px'
                        }}
                    >
                        <Chart
                            type='bar'
                            width='100%'
                            height='300px'
                            series={[
                                {
                                    name: 'Sucesso Contato',
                                    data: pedidosPorDia.map((pedido) => pedido.concluidos)
                                },
                                {
                                    name: 'Insucesso Contato',
                                    data: pedidosPorDia.map((pedido) => pedido.cancelados)
                                }
                            ]}
                            options={{
                                xaxis: {
                                    categories: pedidosPorDia.map((pedido) => moment(pedido.data).format('DD/MM/YYYY'))
                                },
                                colors: [blue[900], red[500]]
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} lg={5}>
                    <TablePrestadores prestadores={clinicas} />
                </Grid>
                <Grid item xs={12} sm={12} lg={3}>
                    <Box
                        sx={{
                            borderRadius: '10px',
                            bgcolor: grey[100],
                            minHeight: '400px',
                            [theme.breakpoints.down('md')]: {
                                minHeight: 'auto',
                            },
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2
                        }}
                    >
                        <Typography variant='h6'>Tentativas de Contato</Typography>
                        <Table
                            size="small"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tentativa</TableCell>
                                    <TableCell>Quantidade</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tentativasDeContato.map((prestador, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{prestador.tentativas}</TableCell>
                                            <TableCell>{prestador.quantidade}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} lg={4}>
                    <Box
                        sx={{
                            borderRadius: '10px',
                            bgcolor: grey[100],
                            minHeight: '400px',
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2,
                            [theme.breakpoints.down('md')]: {
                                minHeight: 'auto',
                            },
                        }}
                    >
                        <Typography variant='h6'>Maiores valores pagos</Typography>
                        <Table
                            size="small"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Valor</TableCell>
                                    <TableCell>Beneficiário</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    pedidosComMaiorValor.map((pedido, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{valueToBRL(pedido?.valorPago)}</TableCell>
                                            <TableCell>
                                                {pedido.beneficiario.nome}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} lg={4}>
                    <Box
                        sx={{
                            borderRadius: '10px',
                            bgcolor: grey[100],
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2
                        }}
                    >
                        <Typography variant='h6'>Prestadores por UF</Typography>
                        <Table
                            size="small"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>UF</TableCell>
                                    <TableCell>Quantidade</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    prestadores.map((prestador, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{prestador._id}</TableCell>
                                            <TableCell>{prestador.count}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} lg={8}>
                    <Box
                        sx={{
                            borderRadius: '10px',
                            bgcolor: grey[100],
                            minHeight: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            p: 2
                        }}
                    >
                        <Typography variant='h6'>Estatísticas das perguntas</Typography>
                        <Table
                            size="small"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Pergunta</TableCell>
                                    <TableCell>Sim</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>Não</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    estatisticasRespostas.map((estatistica, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{estatistica.pergunta}</TableCell>
                                            <TableCell>{estatistica.sim}</TableCell>
                                            <TableCell>
                                                <Typography
                                                    bgcolor={blue[100]}
                                                    color={blue[900]}
                                                    variant='caption'
                                                    padding={'4px'}
                                                    borderRadius={'5px'}
                                                    width={'10px'}
                                                    fontWeight={'bold'}
                                                >
                                                    {(estatistica.sim / (estatistica.sim + estatistica.nao) * 100).toFixed(1)}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{estatistica.nao}</TableCell>
                                            <TableCell>
                                                <Typography
                                                    bgcolor={red[100]}
                                                    color={red[900]}
                                                    variant='caption'
                                                    padding={'4px'}
                                                    borderRadius={'5px'}
                                                    width={'10px'}
                                                    fontWeight={'bold'}
                                                >
                                                    {(estatistica.nao / (estatistica.sim + estatistica.nao) * 100).toFixed(1)}%
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
}

export default Dashboard;
import { Chip, CircularProgress, Divider, Tooltip, Typography } from "@mui/material";
import { deepPurple, green, grey, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { TrendingDown } from "@mui/icons-material";
import { getQuantidadeProducaoRsd } from "../../../../../_services/rsd.service";

const RsdCards = ({ mes }) => {

    const [loading, setLoading] = useState(false)
    const [totalData, setTotalData] = useState({
        total: 0,
        totalMesPassado: 0,
        totalPedidosRsd: 0,
        totalPedidosMesPassadoRsd: 0,
        totalPedidosIndeferidos: 0,
        totalPedidosMesPassadoIndeferidos: 0,
        totalPedidosAltaFrequencia: 0,
        totalPedidosMesPassadoAltaFrequencia: 0,
        totalPedidosInativos: 0,
        totalPedidosMesPassadoInativos: 0,
        totalPedidosConcluidos: 0,
        totalPedidosMesPassadoConcluidos: 0,
        totalPedidosAIniciar: 0,
        totalPedidosMesPassadoAIniciar: 0,
        totalPedidosAgendados: 0,
        totalPedidosAguardandoContato: 0,
        totalPedidosAguardandoDocs: 0,
    })

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const result = await getQuantidadeProducaoRsd(mes)
            setTotalData(result)
            // console.log(result);
            setLoading(false)
        }

        fetch()
    }, [mes])

    return (
        <>
            <Divider sx={{ mt: 2 }}><Chip size='small' color='primary' label='Status tipo Pedido' sx={{ fontSize: '15px', p: 2 }} /></Divider>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2,
                }}
            >
                <Box sx={{
                    width: '24%',
                    height: 150,
                    mx: 1,
                    p: 2,
                    borderRadius: 4,
                    backgroundColor: grey[100],
                    color: grey[900],
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <Tooltip title="Comparado ao mês passado">
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={1}
                        >
                            {
                                totalData.totalMesPassado > totalData.total ? (
                                    <TrendingDown sx={{ color: red[800] }} />
                                ) : (
                                    <TrendingUpIcon sx={{ color: green[800] }} />
                                )
                            }
                            {
                                totalData.totalMesPassado > totalData.total ? (
                                    `-${((totalData.totalMesPassado - totalData.total) / totalData.totalMesPassado * 100).toFixed(2)}%`
                                ) : (
                                    `+${((totalData.total - totalData.totalMesPassado) / totalData.totalMesPassado * 100).toFixed(2)}%`
                                )
                            }
                        </Box>
                    </Tooltip>
                    <Typography variant="h4">
                        {!loading ? totalData.total : <CircularProgress size={20} />}
                    </Typography>
                    <Typography variant="body2" >
                        Total Pedidos Recebidos
                    </Typography>
                </Box>
                <Box sx={{
                    width: '24%',
                    height: 150,
                    mx: 1,
                    p: 2,
                    borderRadius: 4,
                    backgroundColor: grey[100],
                    color: grey[900],
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <Tooltip title="Comparado ao mês passado">
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={1}
                        >
                            {
                                totalData.totalPedidosMesPassadoRsd > totalData.totalPedidosRsd ? (
                                    <TrendingDown sx={{ color: red[800] }} />
                                ) : (
                                    <TrendingUpIcon sx={{ color: green[800] }} />
                                )
                            }
                            {
                                totalData.totalPedidosMesPassadoRsd > totalData.totalPedidosRsd ? (
                                    `-${((totalData.totalPedidosMesPassadoRsd - totalData.totalPedidosRsd) / totalData.totalPedidosMesPassadoRsd * 100).toFixed(2)}%`
                                ) : (
                                    `+${((totalData.totalPedidosRsd - totalData.totalPedidosMesPassadoRsd) / totalData.totalPedidosMesPassadoRsd * 100).toFixed(2)}%`
                                )
                            }
                        </Box>
                    </Tooltip>
                    <Typography variant="h4">
                        {!loading ? totalData.totalPedidosRsd : <CircularProgress size={20} sx={{
                            color: green[900]
                        }} />}
                    </Typography>
                    <Typography variant="body2" >
                        Total Pedidos RSD
                    </Typography>
                </Box>
                <Box sx={{
                    width: '24%',
                    height: 150,
                    mx: 1,
                    p: 2,
                    borderRadius: 4,
                    backgroundColor: grey[100],
                    color: grey[900],
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <Tooltip title="Comparado ao mês passado">
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={1}
                        >
                            {
                                totalData.totalPedidosMesPassadoIndeferidos > totalData.totalPedidosIndeferidos ? (
                                    <TrendingDown sx={{ color: red[800] }} />
                                ) : (
                                    <TrendingUpIcon sx={{ color: green[800] }} />
                                )
                            }
                            {
                                totalData.totalPedidosMesPassadoIndeferidos > totalData.totalPedidosIndeferidos ? (
                                    `-${((totalData.totalPedidosMesPassadoIndeferidos - totalData.totalPedidosIndeferidos) / totalData.totalPedidosMesPassadoIndeferidos * 100).toFixed(2)}%`
                                ) : (
                                    `+${((totalData.totalPedidosIndeferidos - totalData.totalPedidosMesPassadoIndeferidos) / totalData.totalPedidosMesPassadoIndeferidos * 100).toFixed(2)}%`
                                )
                            }
                        </Box>
                    </Tooltip>
                    <Typography variant="h4">
                        {!loading ? totalData.totalPedidosIndeferidos : <CircularProgress size={20} sx={{
                            color: deepPurple[900]
                        }} />}
                    </Typography>
                    <Typography variant="body2" >
                        Total Pedidos Indeferidos
                    </Typography>
                </Box>
                <Box sx={{
                    width: '24%',
                    height: 150,
                    mx: 1,
                    p: 2,
                    borderRadius: 4,
                    backgroundColor: grey[100],
                    color: grey[900],
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <Tooltip title="Comparado ao mês passado">
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={1}
                        >
                            {
                                totalData.totalPedidosMesPassadoAltaFrequencia > totalData.totalPedidosAltaFrequencia ? (
                                    <TrendingDown sx={{ color: red[800] }} />
                                ) : (
                                    <TrendingUpIcon sx={{ color: green[800] }} />
                                )
                            }
                            {
                                totalData.totalPedidosMesPassadoAltaFrequencia > totalData.totalPedidosAltaFrequencia ? (
                                    `-${((totalData.totalPedidosMesPassadoAltaFrequencia - totalData.totalPedidosAltaFrequencia) / totalData.totalPedidosMesPassadoAltaFrequencia * 100).toFixed(2)}%`
                                ) : (
                                    `+${((totalData.totalPedidosAltaFrequencia - totalData.totalPedidosMesPassadoAltaFrequencia) / totalData.totalPedidosMesPassadoAltaFrequencia * 100).toFixed(2)}%`
                                )
                            }
                        </Box>
                    </Tooltip>
                    <Typography variant="h4">
                        {!loading ? totalData.totalPedidosAltaFrequencia : <CircularProgress size={20} sx={{
                            color: grey[900]
                        }} />}
                    </Typography>
                    <Typography variant="body2" >
                        Total de Pedidos Alta Frequencia
                    </Typography>
                </Box>
                <Box sx={{
                    width: '24%',
                    height: 150,
                    mx: 1,
                    p: 2,
                    borderRadius: 4,
                    backgroundColor: grey[100],
                    color: grey[900],
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <Tooltip title="Comparado ao mês passado">
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={1}
                        >
                            {
                                totalData.totalPedidosMesPassadoInativos > totalData.totalPedidosInativos ? (
                                    <TrendingDown sx={{ color: red[800] }} />
                                ) : (
                                    <TrendingUpIcon sx={{ color: green[800] }} />
                                )
                            }
                            {
                                totalData.totalPedidosMesPassadoInativos > totalData.totalPedidosInativos ? (
                                    `-${((totalData.totalPedidosMesPassadoInativos - totalData.totalPedidosInativos) / totalData.totalPedidosMesPassadoInativos * 100).toFixed(2)}%`
                                ) : (
                                    `+${((totalData.totalPedidosInativos - totalData.totalPedidosMesPassadoInativos) / totalData.totalPedidosMesPassadoInativos * 100).toFixed(2)}%`
                                )
                            }
                        </Box>
                    </Tooltip>
                    <Typography variant="h4">
                        {!loading ? totalData.totalPedidosInativos : <CircularProgress size={20} sx={{
                            color: green[900]
                        }} />}
                    </Typography>
                    <Typography variant="body2" >
                        Total Pedidos Inativos
                    </Typography>
                </Box>
                <Box sx={{
                    width: '24%',
                    height: 150,
                    mx: 1,
                    p: 2,
                    borderRadius: 4,
                    backgroundColor: grey[100],
                    color: grey[900],
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <Tooltip title="Comparado ao mês passado">
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            gap={1}
                        >
                            {
                                totalData.totalPedidosMesPassadoConcluidos > totalData.totalPedidosConcluidos ? (
                                    <TrendingDown sx={{ color: red[800] }} />
                                ) : (
                                    <TrendingUpIcon sx={{ color: green[800] }} />
                                )
                            }
                            {
                                totalData.totalPedidosMesPassadoConcluidos > totalData.totalPedidosConcluidos ? (
                                    `-${((totalData.totalPedidosMesPassadoConcluidos - totalData.totalPedidosConcluidos) / totalData.totalPedidosMesPassadoConcluidos * 100).toFixed(2)}%`
                                ) : (
                                    `+${((totalData.totalPedidosConcluidos - totalData.totalPedidosMesPassadoConcluidos) / totalData.totalPedidosMesPassadoConcluidos * 100).toFixed(2)}%`
                                )
                            }
                        </Box>
                    </Tooltip>
                    <Typography variant="h4">
                        {!loading ? totalData.totalPedidosConcluidos : <CircularProgress size={20} sx={{
                            color: green[900]
                        }} />}
                    </Typography>
                    <Typography variant="body2" >
                        Total Pedidos Concluídos
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{ mt: 2 }}><Chip size='small' color='primary' label='Status andamento Pedido' sx={{ fontSize: '15px', p: 2 }} /></Divider>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2,
                }}
            >
                <Box sx={{
                    width: '24%',
                    height: 150,
                    mx: 1,
                    p: 2,
                    borderRadius: 4,
                    backgroundColor: grey[100],
                    color: grey[900],
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <Typography variant="h4">
                        {!loading ? totalData.totalPedidosAIniciar : <CircularProgress size={20} />}
                    </Typography>
                    <Typography variant="body2" >
                        Total Pedidos A Iniciar
                    </Typography>
                </Box>
                <Box sx={{
                    width: '24%',
                    height: 150,
                    mx: 1,
                    p: 2,
                    borderRadius: 4,
                    backgroundColor: grey[100],
                    color: grey[900],
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <Typography variant="h4">
                        {!loading ? totalData.totalPedidosAgendados : <CircularProgress size={20} sx={{
                            color: green[900]
                        }} />}
                    </Typography>
                    <Typography variant="body2" >
                        Total Pedidos Agendados
                    </Typography>
                </Box>
                <Box sx={{
                    width: '24%',
                    height: 150,
                    mx: 1,
                    p: 2,
                    borderRadius: 4,
                    backgroundColor: grey[100],
                    color: grey[900],
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <Typography variant="h4">
                        {!loading ? totalData.totalPedidosAguardandoContato : <CircularProgress size={20} sx={{
                            color: deepPurple[900]
                        }} />}
                    </Typography>
                    <Typography variant="body2" >
                        Total Pedidos Aguardando Contato
                    </Typography>
                </Box>
                <Box sx={{
                    width: '24%',
                    height: 150,
                    mx: 1,
                    p: 2,
                    borderRadius: 4,
                    backgroundColor: grey[100],
                    color: grey[900],
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}>
                    <Typography variant="h4">
                        {!loading ? totalData.totalPedidosAguardandoDocs : <CircularProgress size={20} sx={{
                            color: grey[900]
                        }} />}
                    </Typography>
                    <Typography variant="body2" >
                        Total de Pedidos Aguardando Doc
                    </Typography>
                </Box>
            </Box>
        </>
    )
}

export default RsdCards
import { CircularProgress, Tooltip, Typography } from "@mui/material";
import { deepPurple, green, grey, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { TrendingDown } from "@mui/icons-material";
import { getAnalaticoElegibilidadeMensal } from "../../../../../_services/elegibilidade.service";


const ElegibilidadeCards = ({ mes }) => {

    const [loading, setLoading] = useState(false)
    const [totalData, setTotalData] = useState({
        total: 0,
        totalMesPassado: 0,
        totalConcluidas: 0,
        totalConcluidasMesPassado: 0,
        totalCanceladas: 0,
        totalCanceladasMesPassado: 0,
        totalEmAnalise: 0
    })
    
    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const result = await getAnalaticoElegibilidadeMensal(mes)
            setTotalData(result)
            console.log(result);
            setLoading(false)
        }
        fetch()
    }, [mes])

    return (
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
                    Propostas Recebidas
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
                            totalData.totalConcluidasMesPassado > totalData.totalConcluidas ? (
                                <TrendingDown sx={{ color: red[800] }} />
                            ) : (
                                <TrendingUpIcon sx={{ color: green[800] }} />
                            )
                        }
                        {
                            totalData.totalConcluidasMesPassado > totalData.totalConcluidas ? (
                                `-${((totalData.totalConcluidasMesPassado - totalData.totalConcluidas) / totalData.totalConcluidasMesPassado * 100).toFixed(2)}%`
                            ) : (
                                `+${((totalData.totalConcluidas - totalData.totalConcluidasMesPassado) / totalData.totalConcluidasMesPassado * 100).toFixed(2)}%`
                            )
                        }
                    </Box>
                </Tooltip>
                <Typography variant="h4">
                    {!loading ? totalData.totalConcluidas : <CircularProgress size={20} sx={{
                        color: green[900]
                    }} />}
                </Typography>
                <Typography variant="body2" >
                    Propostas Realizadas
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
                            totalData.totalCanceladasMesPassado > totalData.totalCanceladas ? (
                                <TrendingDown sx={{ color: red[800] }} />
                            ) : (
                                <TrendingUpIcon sx={{ color: green[800] }} />
                            )
                        }
                        {
                            totalData.totalCanceladasMesPassado > totalData.totalCanceladas ? (
                                `-${((totalData.totalCanceladasMesPassado - totalData.totalCanceladas) / totalData.totalCanceladasMesPassado * 100).toFixed(2)}%`
                            ) : (
                                `+${((totalData.totalCanceladas - totalData.totalCanceladasMesPassado) / totalData.totalCanceladasMesPassado * 100).toFixed(2)}%`
                            )
                        }
                    </Box>
                </Tooltip>
                <Typography variant="h4">
                    {!loading ? totalData.totalCanceladas : <CircularProgress size={20} sx={{
                        color: deepPurple[900]
                    }} />}
                </Typography>
                <Typography variant="body2" >
                    Propostas Canceladas
                </Typography>
            </Box>
            <Box sx={{
                width: '24%',
                height: 150,
                mx: 1,
                p: 2,
                borderRadius: 4,
                backgroundColor: deepPurple[50],
                color: deepPurple[900],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <Typography variant="h4">
                    {!loading ? totalData.totalEmAnalise : <CircularProgress size={20} sx={{
                        color: deepPurple[900]
                    }} />}
                </Typography>
                <Typography variant="body2" >
                    Propostas a fazer
                </Typography>
            </Box>
        </Box>
    )
}

export default ElegibilidadeCards
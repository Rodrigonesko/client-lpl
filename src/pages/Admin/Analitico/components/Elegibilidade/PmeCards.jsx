import { CircularProgress, Tooltip, Typography } from "@mui/material";
import { deepPurple, green, grey, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { TrendingDown } from "@mui/icons-material";
import { analiticoPme } from "../../../../../_services/elegibilidadePme.service";

const PmeCards = ({ mes }) => {

    const [loading, setLoading] = useState(false)
    const [totalData, setTotalData] = useState({
        total: 0,
        totalMesPassado: 0,
        concluidas: 0,
        concluidasMesPassado: 0,
        devolvidas: 0,
        devolvidasMesPassado: 0,
    })

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const result = await analiticoPme(mes)
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
                width: '33%',
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
                    PMEs Recebidos
                </Typography>
            </Box>
            <Box sx={{
                width: '33%',
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
                            totalData.concluidasMesPassado > totalData.concluidas ? (
                                <TrendingDown sx={{ color: red[800] }} />
                            ) : (
                                <TrendingUpIcon sx={{ color: green[800] }} />
                            )
                        }
                        {
                            totalData.concluidasMesPassado > totalData.concluidas ? (
                                `-${((totalData.concluidasMesPassado - totalData.concluidas) / totalData.concluidasMesPassado * 100).toFixed(2)}%`
                            ) : (
                                `+${((totalData.concluidas - totalData.concluidasMesPassado) / totalData.concluidasMesPassado * 100).toFixed(2)}%`
                            )
                        }
                    </Box>
                </Tooltip>
                <Typography variant="h4">
                    {!loading ? totalData.concluidas : <CircularProgress size={20} sx={{
                        color: green[900]
                    }} />}
                </Typography>
                <Typography variant="body2" >
                    PMEs Concluidas
                </Typography>
            </Box>
            <Box sx={{
                width: '33%',
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
                            totalData.devolvidasMesPassado > totalData.devolvidas ? (
                                <TrendingDown sx={{ color: red[800] }} />
                            ) : (
                                <TrendingUpIcon sx={{ color: green[800] }} />
                            )
                        }
                        {
                            totalData.devolvidasMesPassado > totalData.devolvidas ? (
                                `-${((totalData.devolvidasMesPassado - totalData.devolvidas) / totalData.devolvidasMesPassado * 100).toFixed(2)}%`
                            ) : (
                                `+${((totalData.devolvidas - totalData.devolvidasMesPassado) / totalData.devolvidasMesPassado * 100).toFixed(2)}%`
                            )
                        }
                    </Box>
                </Tooltip>
                <Typography variant="h4">
                    {!loading ? totalData.devolvidas : <CircularProgress size={20} sx={{    
                        color: deepPurple[900]
                    }} />}
                </Typography>
                <Typography variant="body2" >
                    PMEs Devolvidos
                </Typography>
            </Box>
        </Box>
    )
}

export default PmeCards
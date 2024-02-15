import { CircularProgress, Typography } from "@mui/material";
import { blue, deepPurple, green, yellow } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useState } from "react";


const ElegibilidadeCards = ({ mes }) => {

    const [loading, setLoading] = useState(false)
    const [totalData, setTotalData] = useState({
        propostasRecebidas: 0,
        propostasAgendadas: 0,
        propostasNaoAgendadas: 0,
        propostasNaoAgendadasECanceladas: 0,
        propostasNaoAgendadasEConcluidas: 0,
    })

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
                backgroundColor: blue[50],
                color: blue[900],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <Typography variant="h4">
                    {!loading ? 5620 : <CircularProgress size={20} />}
                </Typography>
                <Typography variant="body2" >
                    Elegibilidades Recebidas
                </Typography>
            </Box>
            <Box sx={{
                width: '24%',
                height: 150,
                mx: 1,
                p: 2,
                borderRadius: 4,
                backgroundColor: green[50],
                color: green[900],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <Typography variant="h4">
                    {!loading ? 871 : <CircularProgress size={20} sx={{
                        color: green[900]
                    }} />}
                </Typography>
                <Typography variant="body2" >
                    Elegibilidades Realizadas
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
                    {!loading ? 156 : <CircularProgress size={20} sx={{
                        color: deepPurple[900]
                    }} />}
                </Typography>
                <Typography variant="body2" >
                    Elegibilidades a Fazer
                </Typography>
            </Box>
            <Box sx={{
                width: '24%',
                height: 150,
                mx: 1,
                p: 2,
                borderRadius: 4,
                backgroundColor: yellow[50],
                color: yellow[900],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <Typography variant="h4">
                    {!loading ? 200 : <CircularProgress size={20} sx={{
                        color: yellow[900]
                    }} />}
                </Typography>
                <Typography variant="body2" >
                    Elegibilidades em Aberto
                </Typography>
            </Box>
        </Box>
    )
}

export default ElegibilidadeCards
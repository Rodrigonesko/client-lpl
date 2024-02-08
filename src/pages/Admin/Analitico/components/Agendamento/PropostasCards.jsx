import { CircularProgress, Typography } from "@mui/material";
import { blue, deepPurple, green, red, yellow } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useState } from "react";


const PropostasCards = ({ mes, data }) => {

    const [loading, setLoading] = useState(false)
    const [totalData, setTotalData] = useState({
        total: 0,
        concluidos: 0,
        cancelados: 0,
        pendencias: 0,
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
                    {!loading ? totalData.data : <CircularProgress size={20} />}
                </Typography>
                <Typography variant="body2" >
                    Propostas Feitas
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
                    {!loading ? data.totalAnexos : <CircularProgress size={20} sx={{
                        color: green[900]
                    }} />}
                </Typography>
                <Typography variant="body2" >
                    Propostas Anexadas
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
                    {!loading ? data.totalEnviadosImplantacao : <CircularProgress size={20} sx={{
                        color: deepPurple[900]
                    }} />}
                </Typography>
                <Typography variant="body2" >
                    Propostas enviadas p/ Implantação
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
                    {!loading ? data.totalImplantados : <CircularProgress size={20} sx={{
                        color: yellow[900]
                    }} />}
                </Typography>
                <Typography variant="body2" >
                    Propostas Implantadas
                </Typography>
            </Box>
        </Box>
    )
}

export default PropostasCards;
import { CircularProgress, Typography } from "@mui/material";
import { blue, green, red, yellow } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { quantidadePropostasPorMesFiltradas } from "../../../../../_services/teleEntrevistaExterna.service";
import { getEntrevistasPorMes } from "../../../../../_services/teleEntrevista.service";

const TeleCards = ({ mes }) => {

    const [loading, setLoading] = useState(false)
    const [totalData, setTotalData] = useState({
        total: 0,
        concluidos: 0,
        cancelados: 0,
        pendencias: 0,
    })

    const fetchDataQuantidade = async () => {

        setLoading(true)

        try {
            const resultTotal = await quantidadePropostasPorMesFiltradas({
                dataRecebimento: { $regex: mes }
            })
            const resultConcluidos = await quantidadePropostasPorMesFiltradas({
                dataRecebimento: { $regex: mes },
                status: 'Concluído'
            })
            const resultCancelados = await quantidadePropostasPorMesFiltradas({
                dataRecebimento: { $regex: mes },
                status: 'Cancelado'
            })
            const resultPendencias = await quantidadePropostasPorMesFiltradas({
                dataRecebimento: { $regex: mes },
                status: { $nin: ['Concluído', 'Cancelado'] }
            })

            const resultEntrevistas = await getEntrevistasPorMes(mes)
            console.log(resultEntrevistas);

            setTotalData({
                total: resultTotal,
                concluidos: resultEntrevistas.totalConcluidas,
                cancelados: resultEntrevistas.totalCanceladas,
                pendencias: resultPendencias,
            })

            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDataQuantidade()
    }, [])

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
                borderRadius: 1,
                backgroundColor: blue[50],
                color: blue[900],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <Typography variant="h4">
                    {!loading ? totalData.total : <CircularProgress size={20} />}
                </Typography>
                <Typography variant="body2" >
                    Total
                </Typography>
            </Box>
            <Box sx={{
                width: '24%',
                height: 150,
                mx: 1,
                p: 2,
                borderRadius: 1,
                backgroundColor: green[50],
                color: green[900],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <Typography variant="h4">
                    {!loading ? totalData.concluidos : <CircularProgress size={20} sx={{
                        color: green[900]
                    }} />}
                </Typography>
                <Typography variant="body2" >
                    Concluídos
                </Typography>
            </Box>
            <Box sx={{
                width: '24%',
                height: 150,
                mx: 1,
                p: 2,
                borderRadius: 1,
                backgroundColor: red[50],
                color: red[900],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <Typography variant="h4">
                    {!loading ? totalData.cancelados : <CircularProgress size={20} sx={{
                        color: red[900]
                    }} />}
                </Typography>
                <Typography variant="body2" >
                    Cancelados
                </Typography>
            </Box>
            <Box sx={{
                width: '24%',
                height: 150,
                mx: 1,
                p: 2,
                borderRadius: 1,
                backgroundColor: yellow[50],
                color: yellow[900],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <Typography variant="h4">
                    {!loading ? totalData.pendencias : <CircularProgress size={20} sx={{
                        color: yellow[900]
                    }} />}
                </Typography>
                <Typography variant="body2" >
                    Pendências
                </Typography>
            </Box>
        </Box>
    )
}

export default TeleCards;
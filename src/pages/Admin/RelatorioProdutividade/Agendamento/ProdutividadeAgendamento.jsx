import { Box, Typography, Paper, CircularProgress, Card } from "@mui/material"
import { useEffect, useState } from "react";
import Chart from "react-google-charts"
import { getProducaoAgendamento } from "../../../../_services/teleEntrevista.service";
const ProdutividadeAgendamento = ({
    month,
    analista,
    hook,
    flushHook
}) => {

    const [loading, setLoading] = useState(false)
    const [totalAgendamentos, setTotalAgendamentos] = useState(0)

    const fetchData = async () => {

        setLoading(true)
        const result = await getProducaoAgendamento(analista, month)
        setTotalAgendamentos(result)
        setLoading(false)
    }

    useEffect(() => {
        if (analista !== '' && month !== '' && hook) {
            fetchData()
        }
    }, [analista, month, hook])

    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Agendamento
            </Typography>
            <Paper sx={{ p: 2, mt: 2 }}>
                {loading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </Box>
                    :
                    (
                        <Card sx={{ p: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Total de agendamentos: {totalAgendamentos}
                            </Typography>
                        </Card>
                    )
                }
            </Paper>
        </Box>
    )
}

export default ProdutividadeAgendamento
import { Box, TextField, Typography, CircularProgress } from "@mui/material"
import { blue, green, red, yellow } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { graficoPropostasPorMesFiltradas, quantidadePropostasPorMesFiltradas } from "../../../../_services/teleEntrevistaExterna.service"
import moment from "moment"
import Chart from "react-apexcharts"

const options = {
    chart: {
        type: 'bar'
    },
    stroke: {
        width: [5, 5, 3],
        curve: 'smooth'
    },
    plotOptions: {
        bar: {
            columnWidth: '50%'
        }
    },
    fill: {
        opacity: [0.50, 0.85, 0.85],
        gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
        }
    },

}

const AnaliticoTele = () => {

    const [loading, setLoading] = useState(false)
    const [loadingGrafico, setLoadingGrafico] = useState(false)
    const [flushHook, setFlushHook] = useState(false)
    const [totalData, setTotalData] = useState({
        total: 0,
        concluidos: 0,
        cancelados: 0,
        pendencias: 0,
    })
    const [graficoData, setGraficoData] = useState([])
    const [mes, setMes] = useState(moment().format('YYYY-MM'))

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

            setTotalData({
                total: resultTotal,
                concluidos: resultConcluidos,
                cancelados: resultCancelados,
                pendencias: resultPendencias,
            })

            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const fetchDataGrafico = async () => {
        setLoadingGrafico(true)
        try {
            const resultTotal = await graficoPropostasPorMesFiltradas({
                query: {
                    dataRecebimento: { $regex: mes }
                },
                key: 'dataRecebimento'
            })

            const resultConcluidas = await graficoPropostasPorMesFiltradas({
                query: {
                    dataConclusao: { $regex: mes },
                    status: 'Concluído'
                },
                key: 'dataConclusao'
            })

            const resultCanceladas = await graficoPropostasPorMesFiltradas({
                query: {
                    dataConclusao: { $regex: mes },
                    status: 'Cancelado'
                },
                key: 'dataConclusao'
            })

            const graficoData = [
                {
                    name: 'Concluídas',
                    data: resultConcluidas,
                    color: green[400],
                    type: 'area'
                },
                {
                    name: 'Canceladas',
                    data: resultCanceladas,
                    color: red[500],
                    type: 'line'
                },
                {
                    name: 'Recebidas',
                    data: resultTotal,
                    color: blue[500],
                    type: 'bar'
                }
            ]

            console.log(graficoData);

            setGraficoData(graficoData)
            setLoadingGrafico(false)

        } catch (error) {
            console.log(error)
            setLoadingGrafico(false)
        }
    }

    useEffect(() => {
        fetchDataQuantidade()
        fetchDataGrafico()
        setFlushHook(false)
    }, [flushHook])

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 2,
            }}>
                <TextField
                    label="Mês"
                    variant="outlined"
                    size="small"
                    type="month"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={mes}
                    onChange={(e) => {
                        setMes(e.target.value)
                        setFlushHook(true)
                    }}
                />
            </Box>
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
            <Box>
                <Box>
                    <Typography variant="h6" sx={{
                        mt: 2,
                        mb: 1,
                    }}>
                        Gráfico
                    </Typography>
                </Box>
                <Box
                    sx={{
                        textAlign: 'center',
                    }}

                >
                    {
                        loadingGrafico ? <CircularProgress size={'100px'} /> : (
                            <Chart
                                options={options}
                                series={graficoData}
                                width={'100%'}
                                height={500} />
                        )
                    }

                </Box>
            </Box>

        </Box>
    )
}

export default AnaliticoTele
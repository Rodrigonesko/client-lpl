import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material"
import moment from "moment"
import { useEffect, useState } from "react"
import SulAmericaCards from "./SulAmericaCards"
import { Search } from "@mui/icons-material"
import { getPedidosPorDiaByDate, getPedidosPorResponsavel, getQtdPedidoByDate } from "../../../../../_services/sulAmerica.service"
import Chart from 'react-apexcharts';
import { blue, grey, red } from "@mui/material/colors"
import SulAmericaTable from "./SulAmericaTable"

const AnaliticoSulAmerica = () => {

    const [dataInicio, setDataInicio] = useState(moment().subtract(30, 'days').format('YYYY-MM-DD'))
    const [dataFim, setDataFim] = useState(moment().format('YYYY-MM-DD'))
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({
        concluidos: 0,
        cancelados: 0,
        total: 0
    })
    const [pedidosPorDia, setPedidosPorDia] = useState([])
    const [pedidosPorResponsavel, setPedidosPorResponsavel] = useState([])

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
            const result = await getQtdPedidoByDate(dataInicio, dataFim)
            setData(result)
            const resultPedidosPorDia = await getPedidosPorDiaByDate(dataInicio, dataFim)
            setPedidosPorDia(resultPedidosPorDia)
            const resultPorColaborador = await getPedidosPorResponsavel(dataInicio, dataFim)
            setPedidosPorResponsavel(resultPorColaborador)
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
                    label='Data Início'
                    type='date'
                    size='small'
                    InputLabelProps={{
                        shrink: true
                    }}
                    value={dataInicio}
                    onChange={(e) => { setDataInicio(e.target.value) }}
                    sx={{ mr: 2 }}
                />
                <TextField
                    label='Data Fim'
                    type='date'
                    size='small'
                    InputLabelProps={{
                        shrink: true
                    }}
                    value={dataFim}
                    onChange={(e) => { setDataFim(e.target.value) }}
                    sx={{ mr: 2 }}
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
                <SulAmericaCards data={data} dataInicio={dataInicio} dataFim={dataFim} key={`card-${dataInicio}+${dataFim}`} />
            </Grid>
            <Grid
                item xs={12} sm={12} lg={8} mt={2}
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
                                name: 'Concluídos',
                                data: pedidosPorDia.map((pedido) => pedido.concluidos)
                            },
                            {
                                name: 'Cancelados',
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
            <SulAmericaTable dataInicio={dataInicio} dataFim={dataFim} />
        </Box >
    )
}

export default AnaliticoSulAmerica
import { Box, Chip, CircularProgress, Container, Divider, Grid, TextField, Typography } from "@mui/material"
import moment from "moment"
import { useEffect, useState } from "react"
import RsdBradescoCards from "../../Admin/Analitico/components/RSDBradesco/RsdBradescoCards"
import RsdBradescoCardsPedidos from "../../Admin/Analitico/components/RSDBradesco/RsdBradescoCardsPedidos"
import RsdBradescoCardsPareceres from "../../Admin/Analitico/components/RSDBradesco/RsdBradescoCardsParecer"
import { getQuantidadePacotes, getQuantidadePareceres, getQuantidadePedidos } from "../../../_services/rsdBradesco.service"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"


const Analitico = () => {

    const [dataInicio, setDataInicio] = useState(moment().subtract(30, 'days').format('YYYY-MM-DD'))
    const [dataFim, setDataFim] = useState(moment().format('YYYY-MM-DD'))
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({
        concluidos: 0,
        total: 0,
        aIniciar: 0,
        emAndamento: 0,
        agendados: 0,
    })

    const [pedidos, setPedidos] = useState({
        sucesso: 0,
        insucesso: 0,
        total: 0,
        aIniciar: 0,
        emAndamento: 0,
    })

    const [pareceres, setPareceres] = useState({
        total: 0,
        negarSinistro: 0,
        analiseEPagamento: 0,
        reembolsoSemDesembolso: 0,
        comprovanteDivergente: 0,
        falhaTentativaDeContato: 0,
    })

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
            const result = await getQuantidadePacotes(dataInicio, dataFim)
            setData(result)
            const pedido = await getQuantidadePedidos(dataInicio, dataFim)
            setPedidos(pedido)
            const parecer = await getQuantidadePareceres(dataInicio, dataFim)
            setPareceres(parecer)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        if (dataInicio && dataFim) {
            handleFilter()
        }
    }, [dataInicio, dataFim])

    return (
        <Sidebar>
            <Container maxWidth>
                <Title size={'medium'} sx={{ mb: 2 }} >Análitico</Title>
                <Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 2,
                    }}>
                        <TextField
                            label='Data Inicio'
                            type='date'
                            size='small'
                            value={dataInicio}
                            onChange={(e) => { setDataInicio(e.target.value) }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                            sx={{ mr: 1 }}
                        />
                        <TextField
                            label='Data Fim'
                            type='date'
                            size='small'
                            value={dataFim}
                            onChange={(e) => { setDataFim(e.target.value) }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                        />
                    </Box>
                    {
                        !loading ?
                            <>
                                <Divider sx={{ mt: 2 }}>
                                    <Chip label={<Typography variant='body1' fontWeight={'bold'}>Pacotes</Typography>} color='primary' />
                                </Divider>
                                <Grid container spacing={2} mt={1}>
                                    <RsdBradescoCards data={data} dataInicio={dataInicio} dataFim={dataFim} key={`card-${dataInicio}+${dataFim}`} />
                                </Grid>
                                <Divider sx={{ mt: 2 }}>
                                    <Chip label={<Typography variant='body1' fontWeight={'bold'}>Pedidos</Typography>} color='primary' />
                                </Divider>
                                <Grid container spacing={2} mt={1}>
                                    <RsdBradescoCardsPedidos data={pedidos} dataInicio={dataInicio} dataFim={dataFim} key={`cardPedidos-${dataInicio}+${dataFim}`} />
                                </Grid>
                                <Divider sx={{ mt: 2 }}>
                                    <Chip label={<Typography variant='body1' fontWeight={'bold'}>Pareceres</Typography>} color='primary' />
                                </Divider>
                                <Grid container spacing={2} mt={1}>
                                    <RsdBradescoCardsPareceres data={pareceres} dataInicio={dataInicio} dataFim={dataFim} key={`cardPareceres-${dataInicio}+${dataFim}`} />
                                </Grid>
                                {/* <RsdBradescoChart dataInicio={dataInicio} dataFim={dataFim} key={`chart-${dataInicio}+${dataFim}`} /> */}
                            </>
                            :
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                    }
                </Box>
            </Container>
        </Sidebar>
    )
}

export default Analitico
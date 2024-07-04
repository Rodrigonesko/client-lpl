import { AutorenewOutlined, Cancel, Done, KeyboardDoubleArrowUpOutlined, PlayCircleFilledOutlined } from "@mui/icons-material"
import CardDashboardRsdBradesco from "../../../../../components/Card/CardDashboardRsdBradesco"
import { Box, Grid, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

const RsdBradescoCardsPedidos = ({ data }) => {

    return (
        <>
            <CardDashboardRsdBradesco title='Sucesso Pedidos' value={data.sucesso} icon={<Done color="success" />} />
            <CardDashboardRsdBradesco title='Insucesso Pedidos' value={data.insucesso} icon={<Cancel color="error" />} />
            <CardDashboardRsdBradesco title='A Iniciar Pedidos' value={data.aIniciar} icon={<PlayCircleFilledOutlined color="warning" />} />
            <CardDashboardRsdBradesco title='Em Andamento Pedidos' value={data.emAndamento} icon={<AutorenewOutlined color="primary" />} />
            <Grid item xs={12} sm={6} lg={12}>
                <Box
                    p={2}
                    display='flex'
                    justifyContent={'space-between'}
                    sx={{
                        borderRadius: '10px',
                        bgcolor: grey[100],
                    }}
                    maxWidth
                >
                    <Box>
                        <Typography variant='body1' fontWeight={'bold'}>Total Pedidos</Typography>
                        <Typography variant='h4' fontWeight={'bold'}>{data.total}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 1
                        }}
                    >
                        {<KeyboardDoubleArrowUpOutlined color="secondary" />}
                    </Box>
                </Box>
            </Grid>
        </>
    )
}

export default RsdBradescoCardsPedidos
import { AlignHorizontalLeft, AutorenewOutlined, Done, KeyboardDoubleArrowUpOutlined, PlayCircleFilledOutlined } from "@mui/icons-material"
import CardDashboardRsdBradesco from "../../../../../components/Card/CardDashboardRsdBradesco"
import { Box, Grid, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

const RsdBradescoCards = ({ data }) => {

    return (
        <>
            <CardDashboardRsdBradesco title='Concluídos Pacotes' value={data.concluidos} icon={<Done color="success" />} />
            <CardDashboardRsdBradesco title='A Iniciar Pacotes' value={data.aIniciar} icon={<PlayCircleFilledOutlined color="inherit" />} />
            <CardDashboardRsdBradesco title='Em Andamento Pacotes' value={data.emAndamento} icon={<AutorenewOutlined color="primary" />} />
            <CardDashboardRsdBradesco title='Agendados Pacotes' value={data.agendados} icon={<AlignHorizontalLeft color="warning" />} />
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
                        <Typography variant='body1' fontWeight={'bold'}>Total Pacotes</Typography>
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

export default RsdBradescoCards
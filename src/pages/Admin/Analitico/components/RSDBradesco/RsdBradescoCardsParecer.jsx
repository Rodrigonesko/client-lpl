import { AlignHorizontalLeft, AutorenewOutlined, Cancel, Done, KeyboardDoubleArrowUpOutlined } from "@mui/icons-material"
import CardDashboardRsdBradesco from "../../../../../components/Card/CardDashboardRsdBradesco"
import { Box, Grid, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

const RsdBradescoCardsPareceres = ({ data }) => {

    return (
        <>
            <CardDashboardRsdBradesco title='Negar Sinistro' value={data.negarSinistro} icon={<Cancel color="error" />} />
            <CardDashboardRsdBradesco title='Proceder com Análise e Pagamento' value={data.analiseEPagamento} icon={<Done color="success" />} />
            <CardDashboardRsdBradesco title='Reembolso Sem Desembolso' value={data.reembolsoSemDesembolso} icon={<AlignHorizontalLeft color="warning" />} />
            <CardDashboardRsdBradesco title='Comprovante Divergente' value={data.comprovanteDivergente} icon={<AutorenewOutlined color="primary" />} />
            <Grid item xs={12} sm={6} lg={6}>
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
                        <Typography variant='body1' fontWeight={'bold'}>Falha na Tentativa de Contato</Typography>
                        <Typography variant='h4' fontWeight={'bold'}>{data.falhaTentativaDeContato}</Typography>
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
            <Grid item xs={12} sm={6} lg={6}>
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
                        <Typography variant='body1' fontWeight={'bold'}>Total</Typography>
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

export default RsdBradescoCardsPareceres
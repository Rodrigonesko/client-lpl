import { Box, Grid, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

const CardDashboardSulAmerica = ({ title, value, icon }) => {
    return (

        <Grid item xs={12} sm={6} lg={3}>
            <Box
                display='flex'
                justifyContent='space-between'
                p={2}
                sx={{
                    borderRadius: '10px',
                    bgcolor: grey[100],
                }}
            >
                <Box>
                    <Typography variant='body1' fontWeight={'bold'}>{title}</Typography>
                    <Typography variant='h4' fontWeight={'bold'}>{value}</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 1
                    }}
                >
                    {icon}
                </Box>
            </Box>
        </Grid>
    )
}

export default CardDashboardSulAmerica
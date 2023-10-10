import { Card, CardContent, Typography } from "@mui/material"
import { blue } from '@mui/material/colors'

const CardBancoHoras = () => {

    const color = { backgroundColor: blue[300] }

    return (
        <Card sx={{ minWidth: 275, mb: `20px`, backgroundColor: color, borderRadius: `10px` }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Banco de Horas de x dia
                </Typography>
                <Typography variant="h5" component="div">
                    XX:XX
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardBancoHoras
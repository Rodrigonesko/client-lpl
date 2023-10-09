import { Card, CardContent, Typography } from "@mui/material"

const CardBancoHoras = () => {
    return (
        <Card sx={{ minWidth: 275, mb: `20px` }}>
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
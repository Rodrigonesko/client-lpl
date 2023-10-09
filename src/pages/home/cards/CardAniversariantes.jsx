import { Card, CardContent, Typography } from "@mui/material"

const CardAniversariantes = () => {
    return (
        <Card sx={{ minWidth: 275, mb: `20px` }}>
            <CardContent>
                <Typography variant="h5" component="div">
                Aniversariante do mês!
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Nomes abaixo
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardAniversariantes
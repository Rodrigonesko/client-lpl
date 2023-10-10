import { Card, CardContent, Typography } from "@mui/material"
import { blue } from '@mui/material/colors'

const CardAniversariantes = () => {

    const color = { backgroundColor: blue[300] }

    return (
        <Card sx={{ minWidth: 275, mb: `20px`, backgroundColor: color, borderRadius: `10px` }}>
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
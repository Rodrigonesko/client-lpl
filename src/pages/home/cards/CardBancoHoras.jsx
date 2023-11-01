import { Card, CardContent, Typography } from "@mui/material"
import { grey } from '@mui/material/colors'
import moment from "moment"

const CardBancoHoras = ({ data }) => {

    const color = grey[300]

    return (
        <Card sx={{ minWidth: 275, mb: `20px`, bgcolor: color, borderRadius: `10px` }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {
                        data.horarioSaida && (
                            <>
                                Horario de saída para o dia {moment(data.horarioSaida).format(`DD/MM/YYYY`)}

                            </>
                        )
                    }
                </Typography>
                <Typography variant="h5" component="div">
                    {
                        data.horarioSaida && (
                            <>
                                {moment(data.horarioSaida).format('HH:mm')}
                            </>
                        )
                    }

                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardBancoHoras
import { Box, Paper } from "@mui/material"
import { blue } from "@mui/material/colors"

const CardMural = () => {

    const color = { backgroundColor: blue[300] }

    return (
        <Box component={Paper} width={'100%'} sx={{ backgroundColor: color, borderRadius: `10px` }}>
            Mural...
        </Box>
    )
}

export default CardMural
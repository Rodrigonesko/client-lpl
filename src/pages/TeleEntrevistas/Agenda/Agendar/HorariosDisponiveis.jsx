import { Box, Divider, Paper, Typography } from "@mui/material"
import ExpandirHorarios from "./ExpandirHorarios"


const HorariosDisponiveis = ({ horarios, analistasDisponiveis }) => {

    const somarHorarios = (data) => {
        const arrays = analistasDisponiveis[data];
        if (!arrays) {
          return 0
        }
        const total = arrays.reduce((acc, array) => acc + array.horarios.length, 0)
        return total
    }

    return (
        <Box mt={3}>
            <Typography variant="h5" m={2}>
                Horarios Disponíveis
            </Typography>
            {
                Object.keys(horarios).map(data => {
                    return (
                        <Box component={Paper} p={3} mb={1} elevation={3}>
                            <Typography fontSize={'22px'}><strong>{data}</strong> - {horarios[data].length} horários (total: {somarHorarios(data)})</Typography>
                            {
                                horarios[data].map(horario => {
                                    return (
                                        <span>{horario} - </span>
                                    )
                                })
                            }
                            <Divider sx={{ m: '20px' }} />
                            <ExpandirHorarios analistasDisponiveis={analistasDisponiveis} dia={data} />
                        </Box>
                    )
                })
            }

        </Box>
    )
}

export default HorariosDisponiveis
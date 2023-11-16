import { Box, Button, Divider, Paper, Tooltip, Typography } from "@mui/material"

import ScheduleIcon from '@mui/icons-material/Schedule';
import RestoreIcon from '@mui/icons-material/Restore';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import UndoIcon from '@mui/icons-material/Undo';

const CardAcoesTele = () => {
    return (
        <Box component={Paper} p={1} m={2}>
            <Typography m={2} variant="h5">
                Ações
            </Typography>
            <Divider />
            <Tooltip title='Agendar'>
                <Button variant="contained" size="small" sx={{ margin: '10px' }}>
                    <ScheduleIcon />
                </Button>
            </Tooltip>
            <Tooltip title='Reagendar'>
                <Button variant="outlined" size="small" sx={{ margin: '10px' }}>
                    <RestoreIcon />
                </Button>
            </Tooltip>
            <Tooltip title='Retroceder'>
                <Button color="secondary" variant="contained" size="small" sx={{ margin: '10px' }}>
                    <UndoIcon />
                </Button>
            </Tooltip>
            <Tooltip title='Enviar Humanizado'>
                <Button color="secondary" variant="outlined" size="small" sx={{ margin: '10px' }}>
                    <SendIcon />
                </Button>
            </Tooltip>
            <Tooltip title='Cancelar'>
                <Button color="error" variant="contained" size="small" sx={{ margin: '10px' }}>
                    <CancelIcon />
                </Button>
            </Tooltip>
            <Tooltip title='Excluir'>
                <Button color="error" variant="outlined" size="small" sx={{ margin: '10px' }}>
                    <DeleteForeverIcon />
                </Button>
            </Tooltip>

        </Box>
    )
}

export default CardAcoesTele
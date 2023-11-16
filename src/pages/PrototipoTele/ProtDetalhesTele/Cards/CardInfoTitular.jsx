import { Box, Button, Paper, Tooltip, Typography } from "@mui/material"
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { deepPurple } from "@mui/material/colors";
import moment from "moment";

const CardInfoTitular = ({ data }) => {
    return (
        <Box borderRadius={'10px'} color={'white'} bgcolor={deepPurple[500]} maxWidth={'50%'} width={'50%'} m={2} p={2} component={Paper}>
            <Typography variant="h5" fontWeight={'bold'}>
                <Typography variant="subtitle2">Proposta</Typography>
                {data.proposta} | {data.tipoContrato}
            </Typography>
            <Typography variant="h5" fontWeight={'bold'}>
                <Typography variant="subtitle2">Titular</Typography>
                {data.nome} | {data.cpf}
            </Typography>
            <Typography mt={1} variant="body2">
                Recebimento: {moment(data.dataRecebimento).format('DD/MM/YYYY')} | Vigência: {moment(data.vigencia).format('DD/MM/YYYY')}
                <Tooltip title='ALterar Vigência'>
                    <Button variant="contained" size="small" color="secondary" sx={{ ml: '20px' }}><ManageHistoryIcon /></Button>
                </Tooltip>
            </Typography>
        </Box>
    )
}

export default CardInfoTitular
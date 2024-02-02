import { Box, Typography, Button, Paper } from "@mui/material"

const MensagemSemSucessoContato = ({ hookMsg }) => {

    const handlerSemContato = async () => {
        try {

            hookMsg('Estamos tentando contato com o Sr (a) porém sem sucesso. A Sr (a) pode por favor ligar no número 11 4240-0422 e pedir para falar com a equipe médica.')

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} p={2} m={1}>
            <Typography>
                Mensagem sem sucesso de contato
            </Typography>
            <Box>
                <Button variant='contained' color='warning' onClick={handlerSemContato} >Gerar</Button>
            </Box>
        </Box>
    )
}

export default MensagemSemSucessoContato
import { Box, Typography, Button, Paper } from "@mui/material"

const MensagemSemSucessoContato = ({ hookMsg }) => {

    const handlerSemContato = async () => {
        try {

            hookMsg('Somos da Amil. Estamos tentando contato conforme agendamento realizado. O(a) Sr(a) pode falar no momento?')

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
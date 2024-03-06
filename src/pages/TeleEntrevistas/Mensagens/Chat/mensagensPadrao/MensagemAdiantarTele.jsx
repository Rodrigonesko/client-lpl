import { Box, Typography, Button, Paper } from "@mui/material"

const MensagemAdiantarTele = (props) => {

    const handlerAdiantarDiaAnterior = async () => {
        try {

            props.setLoading(true)

            let msg = `Prezado(a) Sr(a). A equipe médica esta disponível no momento, deseja adiantar a sua entrevista? Se sim, podemos entrar em contato neste momento? A Amil agradece e estamos disposição.`

            console.log(msg);

            props.setMensagem(msg)

            props.setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} p={2} m={1} >
            <Typography>
                Mensagem Adiantar Tele
            </Typography>
            <Box display='flex'>
                <Button variant='contained' color='success' onClick={handlerAdiantarDiaAnterior} >Gerar</Button>
            </Box>
        </Box>
    )
}

export default MensagemAdiantarTele
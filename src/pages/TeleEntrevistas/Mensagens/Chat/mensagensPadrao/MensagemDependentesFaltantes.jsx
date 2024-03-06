import { Box, Typography, Button, Paper } from "@mui/material"

const MensagemDependentesFaltantes = (props) => {

    const handlerDependentesFaltantes = async () => {
        try {

            props.setLoading(true)

            let msg = `Prezado(a) Sr(a) verificamos que a sua entrevista complementar foi realizada, ficando pendente do(s) seu(s) dependente(s), o sr(a) pode nos informar o telefone de contato para o agendamento por favor. A Amil agradece.`

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
                Mensagem Dependentes Faltantes
            </Typography>
            <Box display='flex'>
                <Button variant='contained' color='primary' onClick={handlerDependentesFaltantes} >Gerar</Button>
            </Box>
        </Box>
    )
}

export default MensagemDependentesFaltantes
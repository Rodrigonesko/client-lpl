import { Button, Tooltip } from "@mui/material"
import EscalatorWarningOutlinedIcon from '@mui/icons-material/EscalatorWarningOutlined';

const MensagemDependentesFaltantes = ({ setMessage }) => {

    const handlerDependentesFaltantes = async () => {
        try {
            setMessage(`Prezado(a) Sr(a) verificamos que a sua entrevista complementar foi realizada, ficando pendente do(s) seu(s) dependente(s), o sr(a) pode nos informar o telefone de contato para o agendamento por favor. A Amil agradece.`)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Tooltip title='Mensagem Dependentes Faltantes' >
            <Button onClick={handlerDependentesFaltantes} variant='contained' color='error' sx={{ marginLeft: '10px' }} size='small' ><EscalatorWarningOutlinedIcon /></Button>
        </Tooltip>
    )
}

export default MensagemDependentesFaltantes
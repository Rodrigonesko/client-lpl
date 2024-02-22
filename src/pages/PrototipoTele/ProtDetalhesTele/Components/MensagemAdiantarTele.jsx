import { Button, Tooltip } from "@mui/material"
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';

const MensagemAdiantarTele = ({ setMessage }) => {

    const handlerAdiantarTele = async () => {
        try {
            setMessage(`Prezado(a) Sr(a). A equipe médica esta disponível no momento, deseja adiantar a sua entrevista? Se sim, podemos entrar em contato neste momento? A Amil agradece e estamos disposição.`)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Tooltip title='Adiantar Tele-Entrevista'>
            <Button onClick={handlerAdiantarTele} variant='contained' color='success' sx={{ marginLeft: '10px' }} size='small' ><SupportAgentOutlinedIcon /></Button>
        </Tooltip>
    )
}

export default MensagemAdiantarTele
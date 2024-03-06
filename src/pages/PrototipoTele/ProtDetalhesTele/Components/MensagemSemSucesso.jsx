import { Button, Tooltip } from "@mui/material"
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';

const MensagemSemSucesso = ({ setMessage }) => {

    const handleClick = () => {
        setMessage('Estamos tentando contato com o Sr (a) porém sem sucesso. A Sr (a) pode por favor ligar no número 11 4240-0422 e pedir para falar com a equipe médica.')
    }

    return (
        <>
            <Tooltip title='Mensagem sem sucesso!'>
                <Button onClick={handleClick} variant="contained" size="small" color="warning">
                    <PhonelinkEraseIcon />
                </Button>
            </Tooltip>
        </>
    )
}

export default MensagemSemSucesso
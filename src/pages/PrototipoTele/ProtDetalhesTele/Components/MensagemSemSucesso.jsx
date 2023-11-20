import { Button, Tooltip } from "@mui/material"
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';

const MensagemSemSucesso = ({ setMessage }) => {

    const handleClick = () => {
        setMessage('Somos da Amil. Estamos tentando contato conforme agendamento realizado. O(a) Sr(a) pode falar no momento?')
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
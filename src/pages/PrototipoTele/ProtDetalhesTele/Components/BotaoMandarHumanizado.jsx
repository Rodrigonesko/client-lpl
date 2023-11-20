import { Button, Tooltip } from "@mui/material"
import PeopleIcon from '@mui/icons-material/People';
import { mandarParaAtendimentoHumanizado } from "../../../../_services/teleEntrevista.service";
import Toast from "../../../../components/Toast/Toast";
import { useState } from "react";

const BotaoMandarHumanizado = ({ _id }) => {

    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleClick = async () => {
        try {
            const result = await mandarParaAtendimentoHumanizado({
                id: _id
            })

            if (!result._id) {
                setMessage('Falha ao enviar para humanizado')
                setSeverity('error')
                setOpenToast(true)
                return
            }

            setMessage('Enviado para atendimento humanizado')
            setSeverity('success')
            setOpenToast(true)
        } catch (error) {
            setMessage('Falha ao enviar para humanizado')
            setSeverity('error')
            setOpenToast(true)
        }


    }

    return (
        <>
            <Tooltip title='Mandar para humanizado'>
                <Button onClick={handleClick} color="info" variant="contained" style={{ marginLeft: '10px' }} >
                    <PeopleIcon />
                </Button>
            </Tooltip>
            <Toast
                message={message}
                onClose={() => setOpenToast(false)}
                open={openToast}
                severity={severity}
            />
        </>

    )
}

export default BotaoMandarHumanizado
import { Button, Tooltip } from "@mui/material"
import Toast from "../../../../components/Toast/Toast"
import PanToolIcon from '@mui/icons-material/PanTool';
import { assumirAtendimentoTele } from "../../../../_services/teleEntrevistaExterna.service";
import { useState } from "react";
import { blueGrey } from "@mui/material/colors";
import { useContext } from "react";
import AuthContext from "../../../../context/AuthContext";

const BotaoAssumirAtendimento = ({ _id, setResponsavelAtendimento }) => {

    const { name } = useContext(AuthContext)

    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleClick = async () => {
        try {

            const result = await assumirAtendimentoTele({
                id: _id
            })

            if (!result._id) {
                setMessage('Falha ao assumir conversa')
                setSeverity('error')
                setOpenToast(true)
            }

            setMessage('Atendimento assumido com sucesso!')
            setSeverity('success')
            setOpenToast(true)
            setResponsavelAtendimento(name)

        } catch (error) {
            console.log(error);
            setMessage('Falha ao assumir conversa')
            setSeverity('error')
            setOpenToast(true)
        }
    }

    return (
        <>
            <Tooltip title='Assumir atendimento'>
                <Button onClick={handleClick} sx={{ bgcolor: blueGrey[500], ":hover": { bgcolor: blueGrey[400] } }} variant="contained" style={{ marginLeft: '10px' }} >
                    <PanToolIcon />
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

export default BotaoAssumirAtendimento
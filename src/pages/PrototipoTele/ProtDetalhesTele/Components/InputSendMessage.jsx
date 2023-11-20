import { Box, Button, CircularProgress, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { sendMessageTele } from "../../../../_services/teleEntrevistaExterna.service";
import Toast from "../../../../components/Toast/Toast";
import { useState } from "react";

const InputSendMessage = ({ message, setMessage, whatsapp, setFlushHook }) => {

    const [toastOpen, setToastOpen] = useState(false);
    const [severity, setSeverity] = useState('success')
    const [toastMessage, setToastMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSendMessage = async () => {

        setLoading(true)

        try {

            const result = await sendMessageTele({
                whatsapp,
                mensagem: message
            })

            console.log(result);

            setMessage('')
            setFlushHook(true)


        } catch (error) {
            console.log(error);
            setToastMessage('Não foi possivel enviar a mensagem')
            setSeverity('error')
            setToastOpen(true)
        }

        setLoading(false)


    }

    return (
        <Box display={'flex'} justifyContent={'space-between'} alignContent={'flex-end'} >
            <TextField maxRows={3} value={message} onChange={e => setMessage(e.target.value)} multiline placeholder='Mensagem' sx={{ width: '88%' }} size="small" />
            <Button disabled={loading} endIcon={loading && <CircularProgress size={'20px'} />} onClick={handleSendMessage} variant="contained" size="small"><SendIcon /></Button>

            <Toast
                open={toastOpen}
                message={toastMessage}
                severity={severity}
                duration={6000}
                onClose={() => setToastOpen(false)}
            />

        </Box>
    )
}

export default InputSendMessage;
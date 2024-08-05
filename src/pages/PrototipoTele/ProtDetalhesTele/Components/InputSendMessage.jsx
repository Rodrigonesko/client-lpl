import { Box, Button, CircularProgress, IconButton, TextField, Tooltip, Menu, MenuItem } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { sendMessageTele } from "../../../../_services/teleEntrevistaExterna.service";
import Toast from "../../../../components/Toast/Toast";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import templateMessages from "./template-message";
import ModalSendTemplateMessage from "../Modais/ModalSendTemplateMessage";

const InputSendMessage = ({ message, setMessage, whatsapp, setFlushHook }) => {

    const [toastOpen, setToastOpen] = useState(false);
    const [severity, setSeverity] = useState('success')
    const [toastMessage, setToastMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSendMessage = async () => {
        setLoading(true)
        try {
            const result = await sendMessageTele({
                whatsapp,
                mensagem: message
            })
            if (result.msg !== 'ok') {
                if (result.msg === 63024) {
                    setToastMessage('Esse número não tem whatsapp')
                    setSeverity('error')
                    setToastOpen(true)
                    setLoading(false)
                    return
                }
                if (result.msg === 63016) {
                    setToastMessage('Não foi possível enviar a mensagem pois, está fora da janela de 24 horas, por favor utilize um template pronto.')
                    setSeverity('error')
                    setToastOpen(true)
                    setLoading(false)
                    return
                }
                setToastMessage('Não foi possivel enviar a mensagem')
                setSeverity('error')
                setLoading(false)
                setToastOpen(true)
                return
            }
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
            <Tooltip title="Templates" arrow>
                <IconButton
                    onClick={handleClick}
                >
                    <Add />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {
                    templateMessages.map((item, index) => (
                        <ModalSendTemplateMessage
                            key={index}
                            nome={item.nome}
                            mensagem={item.mensagem}
                            templateSid={item.templateSid}
                            variaveis={item.variaveis}
                            handleClose={handleClose}
                            setToastOpen={setToastOpen}
                            setToastMessage={setToastMessage}
                            setSeverity={setSeverity}
                            setFlushHook={setFlushHook}
                            setLoading={setLoading}
                            whatsapp={whatsapp}
                        />
                    ))
                }
            </Menu>
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
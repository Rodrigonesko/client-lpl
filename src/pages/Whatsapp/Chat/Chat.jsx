import { Box, Typography, TextField } from "@mui/material";
import { grey, blue } from "@mui/material/colors";
import { Add, Send } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import TemplateMenu from "./TemplateMenu";
import { useContext, useEffect, useState } from "react";
import { getMessagesRsd, readMessagesRsd } from "../../../_services/whatsapp.service";
import { ChatContext } from "./ChatContext";
import moment from "moment";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_WHATSAPP_SERVICE)

const Chat = () => {

    const { whatsappReceiver, whatsappSender, setFlushHook } = useContext(ChatContext)

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    const sendMessage = async () => {
        try {

            if (message === '') return

            const result = await sendMessage({
                de: whatsappSender,
                para: whatsappReceiver.whatsapp,
                mensagem: message
            })

            setMessage('')

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await getMessagesRsd(whatsappReceiver.whatsapp)
            await readMessagesRsd(whatsappReceiver.whatsapp)
            setFlushHook((prev) => !prev)
            if (response.error) {
                setMessages([])
                return console.log(response.error)
            }
            setMessages(response?.mensagens)
        }

        fetchMessages()
    }, [whatsappReceiver])

    useEffect(() => {
        const chat = document.getElementById('chat')
        chat.scrollTop = chat.scrollHeight
    }, [messages])

    useEffect(() => {
        socket.on('messageReceived', (message) => {
            const lastMessage = message.mensagens[message.mensagens.length - 1]
            console.log(lastMessage);
            if (message.whatsapp === whatsappReceiver.whatsapp || lastMessage.de === whatsappSender) {
                setMessages(message.mensagens)
            }
            setFlushHook((prev) => !prev)
        })
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                height: '100%',
                p: 2,
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    height: '100%',
                    width: '100%',
                    maxHeight: 'calc(100% - 50px)', // Ajuste este valor para corresponder à altura do TextField
                    p: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        height: '100%',
                        p: 2,
                        overflowY: 'auto',
                        width: '100%',
                    }}
                    id="chat"
                >
                    {
                        messages.map(message => (
                            <Box
                                key={message.sid}
                                sx={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: message.de === whatsappSender ? 'flex-end' : 'flex-start',
                                    flexDirection: 'column',
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color={grey[500]}
                                >
                                    {message.de}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    bgcolor={message.de === whatsappSender ? blue[400] : '#f1f1f1'}
                                    sx={{
                                        borderRadius: message.de === whatsappSender ? '10px 0px 10px 10px' : '0 10px 10px 10px',
                                        p: 1,
                                        color: message.de === whatsappSender ? '#fff' : '#000',
                                    }}
                                >
                                    {message.mensagem}
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    fontSize={12}
                                >
                                    {moment(message.horario).format('DD/MM/YYYY HH:mm')}
                                </Typography>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    p: 2,
                    width: '100%',
                    backgroundColor: '#fff', // Adicione a cor de fundo desejada
                    height: '50px', // Ajuste este valor para corresponder à altura desejada do TextField
                }}
            >
                <TemplateMenu />
                <IconButton>
                    <Add />
                </IconButton>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Digite uma mensagem"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <IconButton
                    onClick={sendMessage}
                >
                    <Send />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Chat;
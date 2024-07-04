import { Box, Typography, TextField, CircularProgress, Link, Button } from "@mui/material";
import { grey, blue, green, red } from "@mui/material/colors";
import { Add, Send } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import TemplateMenu from "./TemplateMenu";
import { useContext, useEffect, useState } from "react";
import { assumirConversaRsd, getChatBradescoByNumber, getMessagesRsd, readMessagesRsd, sendMessage, sendMessageBradesco } from "../../../_services/whatsapp.service";
import { ChatContext } from "./ChatContext";
import moment from "moment";
import { io } from "socket.io-client";
import AuthContext from "../../../context/AuthContext";
import ModalEnviarArquivo from "./ModalEnviarArquivo";
import { getBeneficiarioByWhatsapp, updateBeneficiario } from "../../../_services/sulAmerica.service";
import { getSeguradoById, updateSegurado } from "../../../_services/rsdBradesco.service";

const socket = io(process.env.REACT_APP_WHATSAPP_SERVICE)

const Chat = () => {

    const { whatsappReceiver, whatsappSender, setFlushHook } = useContext(ChatContext)
    const { name } = useContext(AuthContext)

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [loadingSend, setLoadingSend] = useState(false)

    const handleSendMessage = async () => {
        try {
            if (message === '') return
            setLoadingSend(true)
            if (whatsappSender !== 'whatsapp:+551150399889') {
                await sendMessage({
                    de: whatsappSender,
                    para: whatsappReceiver.whatsapp,
                    mensagem: message
                })
            } else {
                await sendMessageBradesco({
                    para: whatsappReceiver.whatsapp,
                    mensagem: message
                })
            }
            setMessage('')
            setLoadingSend(false)
        } catch (error) {
            console.log(error);
            setLoadingSend(false)
        }
    }

    const handleAssumirConversa = async () => {
        try {
            await assumirConversaRsd(whatsappReceiver)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchMessages = async () => {
            if (whatsappSender === 'whatsapp:+551150264875') {
                const response = await getMessagesRsd(whatsappReceiver.whatsapp)
                await readMessagesRsd(whatsappReceiver.whatsapp)
                setFlushHook((prev) => !prev)
                if (response.error) {
                    setMessages([])
                    return console.log(response.error)
                }
                setMessages(response?.mensagens)
            }
            if (whatsappSender === 'whatsapp:+551150268027') {
                const response = await getBeneficiarioByWhatsapp(whatsappReceiver.whatsapp)
                await updateBeneficiario(response._id, { quantidadeMensagens: 0 })
                setFlushHook((prev) => !prev)
                if (response.error) {
                    setMessages([])
                    return console.log(response.error)
                }
                setMessages(response?.mensagens)
            }
            if (whatsappSender === 'whatsapp:+551150397403') {
                const response = await getSeguradoById(whatsappReceiver._id)
                await updateSegurado(response._id, { quantidadeMensagens: 0 })
                setFlushHook((prev) => !prev)
                if (response.error) {
                    setMessages([])
                    return console.log(response.error)
                }
                setMessages(response?.mensagens)
                console.log(response);
            }
            if (whatsappSender === 'whatsapp:+551150399889') {
                const response = await getChatBradescoByNumber(whatsappReceiver.whatsapp)
                console.log(response);
                if (response.error) {
                    setMessages([])
                    return console.log(response.error)
                }
                setMessages(response)
            }
        }

        if (whatsappReceiver._id || whatsappReceiver.whatsapp) {
            fetchMessages()
        }
    }, [whatsappReceiver])

    useEffect(() => {
        const chat = document.getElementById('chat')
        chat.scrollTop = chat.scrollHeight
    }, [messages])

    useEffect(() => {
        socket.on('messageReceived', (message) => {
            const lastMessage = message.mensagens[message.mensagens.length - 1]
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
                }}
            >
                <Box
                    sx={{
                        bgcolor: blue[50], // Adicione a cor de fundo desejada
                        p: 2,
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box>
                        <Typography
                            variant="h6"
                        >
                            {whatsappReceiver.nome}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                        >
                            {whatsappReceiver.whatsapp}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        {
                            whatsappReceiver.responsavelConversa !== name ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAssumirConversa}
                                >
                                    Assumir
                                </Button>
                            ) : null
                        }
                        {whatsappReceiver.responsavelConversa}
                    </Box>
                </Box>
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
                                    {
                                        message.arquivo ? (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '10px',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Link href={message.arquivo} target="_blank" rel="noreferrer" color={blue[500]} underline="hover">
                                                    Arquivo
                                                </Link>
                                                <img
                                                    src={message.arquivo}
                                                    alt="Arquivo"
                                                    style={{
                                                        maxWidth: '300px',
                                                        maxHeight: '300px',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            </Box>

                                        ) : null
                                    }
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    fontSize={12}
                                >
                                    {moment(message.horario).format('DD/MM/YYYY HH:mm')}
                                    <Typography
                                        fontSize={10}
                                        sx={{
                                            color: message.status === 'read' ? green[500] : message.status === 'undelivered' || message.status === 'failed' ? red[500] : grey[500],
                                        }}
                                    >
                                        {message.status}
                                    </Typography>
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
                <ModalEnviarArquivo />
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Digite uma mensagem"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loadingSend}
                    multiline
                />
                <IconButton
                    onClick={handleSendMessage}
                    disabled={loadingSend}
                >
                    {
                        loadingSend ? <CircularProgress size={20} /> : <Send />
                    }
                </IconButton>
            </Box>
        </Box>
    )
}

export default Chat;
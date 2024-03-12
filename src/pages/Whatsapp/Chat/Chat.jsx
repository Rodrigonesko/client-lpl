import { Box, Typography, TextField } from "@mui/material";
import { grey, blue } from "@mui/material/colors";
import { Add, Send } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import TemplateMenu from "./TemplateMenu";
import { useEffect, useState } from "react";
import { getMessages } from "../../../_services/whatsapp.service";


const Chat = () => {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await getMessages('whatsapp:+5541997971794')
            console.log(response);
            setMessages(response)
        }

        //fetchMessages()
    }, [])

    useEffect(() =>{
        const chat = document.getElementById('chat')
        chat.scrollTop = chat.scrollHeight
    
    }, [messages])

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
                                    alignItems: 'flex-start',
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
                                    bgcolor={'#f0f0f0'}
                                    sx={{
                                        borderRadius: '0 10px 10px 10px',
                                        p: 1,
                                    }}
                                >
                                    {message.mensagem}
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    fontSize={12}
                                >
                                    {message.horario}
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
                <TextField fullWidth size="small" placeholder="Digite uma mensagem" />
                <IconButton>
                    <Send />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Chat;
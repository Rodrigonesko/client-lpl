import { Box, Container, Typography } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useState } from "react"
import { useEffect } from "react"
import CardMessage from "./Cards/CardMessage"
import CardPessoasGrupos from "./Cards/CardPessoasGrupos"
import { getChats } from "../../_services/chat.service"
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_CHAT_SERVICE);

const InternMessages = () => {

    const [flushHook, setFlushHook] = useState(false)
    const [receptor, setReceptor] = useState('')
    const [chatId, setChatId] = useState(null)
    const [chats, setChats] = useState([])

    const fetchData = async () => {
        const result = await getChats()
        console.log(result);
        setChats(result.chats)
        document.title = `LPL (${result.naoLidas})`
    }
    
    useEffect(() => {
        setFlushHook(false)
        fetchData()
    }, [flushHook])

    useEffect(() => {
        socket.on('receivedMessage', (message) => {
            //console.log('mensagem recebida', message);
            setFlushHook(true)
        })
    }, [])

    return (
        <>
            <Sidebar />
            <Container maxWidth>
                <Typography variant="h5" mt={1}>
                    Mensagens e Grupos
                </Typography>
                <Box display={'flex'} mt={2}>
                    <CardPessoasGrupos chats={chats} setChatId={setChatId} flushHook={flushHook} setFlushHook={setFlushHook} setReceptor={setReceptor} />
                    <Box width={'100%'} ml={2}>
                        {
                            receptor !== '' && (
                                <CardMessage nome={receptor} chatId={chatId} setFlushHook={setFlushHook} flushHook={flushHook} />
                            )
                        }
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default InternMessages
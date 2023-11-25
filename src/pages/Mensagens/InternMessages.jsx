import { Box, Container, Typography } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useState } from "react"
import { useEffect } from "react"
import CardMessage from "./Cards/CardMessage"
import CardPessoasGrupos from "./Cards/CardPessoasGrupos"
import { getChats } from "../../_services/chat.service"
import { io } from "socket.io-client";
import { useContext } from "react"
import AuthContext from "../../context/AuthContext"

let socket

const InternMessages = () => {

    const { name, } = useContext(AuthContext)
    const [flushHook, setFlushHook] = useState(false)
    const [receptor, setReceptor] = useState('')
    const [chatId, setChatId] = useState(null)
    const [chats, setChats] = useState([])
    const [chatIdSocket, setChatIdSocket] = useState(null)

    const fetchData = async () => {
        const result = await getChats()
        setChats(result.chats)
        document.title = `LPL (${result.naoLidas})`
    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()
    }, [flushHook])

    useEffect(() => {

        socket = io(`${process.env.REACT_APP_CHAT_SERVICE}`, {
            query: `name=${name}`
        })

        socket.on('receivedMessage', (message) => {
            setChatIdSocket(message.chatId)
            setFlushHook(true)
            console.log('oi');
        })
    }, [name])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Typography variant="h5" mt={1}>
                        Mensagens e Grupos
                    </Typography>
                    <Box display={'flex'} mt={2}>
                        <CardPessoasGrupos chats={chats} setChatId={setChatId} flushHook={flushHook} setFlushHook={setFlushHook} setReceptor={setReceptor} />
                        <Box width={'100%'} ml={2}>
                            {
                                receptor !== '' && (
                                    <CardMessage key={chatId} setChatIdSocket={setChatIdSocket} chatIdSocket={chatIdSocket} nome={receptor} chatId={chatId} setFlushHook={setFlushHook} flushHook={flushHook} />
                                )
                            }
                        </Box>
                    </Box>
                </Container>
            </Sidebar>

        </>
    )
}

export default InternMessages
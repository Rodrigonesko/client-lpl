import { Box, Container, Typography } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useState } from "react"
import { useEffect } from "react"
import CardMessage from "./Cards/CardMessage"
import CardPessoasGrupos from "./Cards/CardPessoasGrupos"
import { getChats } from "../../_services/chat.service"

const InternMessages = () => {

    const [flushHook, setFlushHook] = useState(false)
    const [receptor, setReceptor] = useState('')
    const [chatId, setChatId] = useState(null)
    const [chats, setChats] = useState([])

    const fetchData = async () => {
        const resut = await getChats()
        setChats(resut)
    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()
    }, [flushHook])

    return (
        <>
            <Sidebar />
            <Container maxWidth>
                <Typography variant="h5" mt={1}>
                    Mensagens e Grupos
                </Typography>
                <Box display={'flex'} mt={2}>
                    <CardPessoasGrupos chats={chats} setChatId={setChatId} flushHook={flushHook} setReceptor={setReceptor} />
                    <Box width={'100%'} ml={2}>
                        {
                            receptor !== '' && (
                                <CardMessage nome={receptor} chatId={chatId} />
                            )
                        }
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default InternMessages
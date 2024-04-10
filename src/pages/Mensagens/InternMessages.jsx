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
    const [copyChats, setCopyChats] = useState([])
    const [chatIdSocket, setChatIdSocket] = useState(null)
    const [pesquisa, setPesquisa] = useState('')

    const fetchData = async () => {
        const result = await getChats()
        setChats(result.chats)
        setCopyChats(result.chats)
        document.title = `LPL (${result.naoLidas || 0})`
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
        })
    }, [name])

    useEffect(() => {

        if (pesquisa === '') {
            setCopyChats(chats)
            return
        }

        const filteredChats = chats.filter(chat => {
            if (chat.tipo === 'Grupo') {
                if (chat.nome.toLowerCase().includes(pesquisa.toLowerCase())) {
                    return chat
                }
            } else {
                if (chat.participantes[0].toLowerCase().includes(pesquisa.toLowerCase()) || chat.participantes[1].toLowerCase().includes(pesquisa.toLowerCase())) {
                    return chat
                }
            }
        })

        setCopyChats(filteredChats)

    }, [pesquisa])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Box display={'flex'} mt={2}>
                        <CardPessoasGrupos
                            chats={copyChats}
                            setChatId={setChatId}
                            flushHook={flushHook}
                            setFlushHook={setFlushHook}
                            setReceptor={setReceptor}
                            pesquisa={pesquisa}
                            setPesquisa={setPesquisa}
                        />
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
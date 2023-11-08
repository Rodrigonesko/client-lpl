import { Alert, Box, Button, Card, CardContent, Container, Grow, Paper, Slide, TextField, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import { useContext, useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { getChatDataByIdOrName, getMessages, seeInternalMessage, sendMessageInterno } from "../../../_services/chat.service";
import AuthContext from "../../../context/AuthContext";
import IndividualMessage from "./IndividualMessage";
import ModalUploadArquivos from "../Modal/ModalUploadArquivos";
import ProfileBar from "./ProfileBar";
import GroupData from "./GroupData";
import ModalPasteImage from "../Modal/ModalPasteImage";

const CardMessage = ({ chatId, nome, setFlushHook, flushHook }) => {

    const color = grey[300]

    const chatContainerRef = useRef(null);
    const { name } = useContext(AuthContext)
    const [chat, setChat] = useState([])
    const [mensagem, setMensagem] = useState('')
    const [loading, setLoading] = useState(false)
    const [showOps, setShowOps] = useState(false)
    const [messageReplayed, setMessageReplayed] = useState({})
    const [data, setData] = useState({})
    const [showPastedImage, setShowPastedImage] = useState(false)
    const [pastedImage, setPastedImage] = useState(null)
    const [hookScroll, setHookScroll] = useState(false)
    const [AllMessages, setAllMessages] = useState([])

    const handlePaste = (e) => {
        const items = e.clipboardData.items

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile();
                setPastedImage(blob)
                setShowPastedImage(true)
            }
        }
    }

    const handleSend = async (e) => {
        e.preventDefault()

        if (mensagem === '') {
            return
        }

        await sendMessageInterno({
            receptor: nome,
            mensagem,
            chatId,
            resposta: messageReplayed
        })
        setFlushHook(true)
        setMensagem('')
        setMessageReplayed({})
    }

    const fetchData = async () => {
        const resultData = await getChatDataByIdOrName({ chatId, nome })
        const result = await getMessages({ chatId, nome, skip: 0 })

        await seeMessage()

        if (result.mensagens) {
            if (result.participantes.includes(name)) {
                if (result.mensagens) {
                    setChat(result.mensagens.slice(-7))
                    setAllMessages(result.mensagens)
                } else {
                    setChat([])
                }
            } else {
                setChat([])
            }
        } else {
            setChat([])
        }
        setHookScroll(true)
        setData(resultData)
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }

    const seeMessage = async () => {
        await seeInternalMessage({ chatId })
    }

    useEffect(() => {
        setFlushHook(false)
        setLoading(false)
        fetchData()
    }, [nome, flushHook])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [hookScroll, messageReplayed]);

    const loadMoreMessages = (e, skip = 7, forceLoading = false) => {

        if (e?.target?.scrollTop === 0 || forceLoading) {

            const loadedMessages = chat.length
            const aditionalMessages = skip
            let startIndex = AllMessages.length - loadedMessages - aditionalMessages
            const endIndex = startIndex + aditionalMessages

            if (startIndex < 0) {
                startIndex = 0
            }
            const messageToRender = AllMessages.slice(startIndex, endIndex).concat(chat)
            setChat(messageToRender)
        }
    }

    const loadSelectedRespondedMessage = (idMessage) => {

        console.log(idMessage);

        const findIndex = AllMessages.findIndex(message => message._id === idMessage)
        const findIndexRenderizado = chat.findIndex(message => message._id === idMessage)

        if (findIndexRenderizado !== -1) {
            const responseMessage = document.getElementById(`responseMessage_${idMessage}`);

            console.log(responseMessage);

            if (responseMessage) {
                responseMessage.scrollIntoView({
                    behavior: "smooth",
                });
            }
            return
        }
        if (findIndex !== -1) {
            loadMoreMessages(idMessage, AllMessages.length - findIndex, true)

            const responseMessage = document.getElementById(`responseMessage_${idMessage}`);

            console.log(responseMessage);

            if (responseMessage) {
                responseMessage.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }
    }

    return (
        <>
            <Box maxWidth={'1600px'}>
            <Card component={Paper} sx={{ bgcolor: color, borderRadius: `10px`, height: '90vh', display: 'flex' }}>
                <Box width={'100%'}>
                    <ProfileBar url={`${process.env.REACT_APP_CHAT_SERVICE}/media/${data.imageGroup}`} nome={nome} showOps={showOps} setShowOps={setShowOps} tipo={data.tipo} />
                    <CardContent >
                        <Box display='block' style={{ overflowY: 'auto' }} component={Paper} bgcolor='lightgray' height='74vh' ref={chatContainerRef} onScroll={loadMoreMessages} >
                            <Button onClick={loadMoreMessages}>
                                Load
                            </Button>
                            {
                                chat.map((e, index) => {
                                    return (
                                        <IndividualMessage loadSelectedRespondedMessage={loadSelectedRespondedMessage} item={e} index={index} key={index} name={name} setMessageReplayed={setMessageReplayed} />
                                    )
                                })
                            }
                            <Box >
                                {
                                    messageReplayed.mensagem && (
                                        <Slide direction="up" in={!!messageReplayed.mensagem} mountOnEnter unmountOnExit>
                                            <Alert severity="info" onClose={() => { setMessageReplayed({}) }}>
                                                <Typography >
                                                    {messageReplayed?.mensagem}
                                                </Typography>
                                            </Alert>
                                        </Slide>
                                    )
                                }
                            </Box>
                        </Box>

                        <Box >
                            <form action="" onSubmit={handleSend} method="post" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                                    <ModalUploadArquivos chatId={chatId} receptor={nome} setFlushHook={setFlushHook} />
                                </div>
                                <TextField value={mensagem} type='text' size='small' onChange={e => { setMensagem(e.target.value) }}
                                    onPaste={handlePaste} placeholder='Mensagem' style={{ flex: 5, margin: '0 3px', whiteSpace: 'pre-wrap' }} />
                                <Button disabled={loading} size='small' type='submit' variant='contained'><SendIcon /></Button>
                            </form>
                        </Box>
                    </CardContent>
                </Box>
                {
                    showOps && data.tipo === 'Grupo' && (
                        <GroupData chatId={chatId} />
                    )
                }
            </Card>
        </Box >
            <ModalPasteImage open={showPastedImage} setOpen={setShowPastedImage} image={pastedImage} setImage={setPastedImage} chatId={chatId} receptor={nome} />
        </>
    )
}

export default CardMessage
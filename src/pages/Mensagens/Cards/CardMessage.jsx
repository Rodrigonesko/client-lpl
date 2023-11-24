import { Alert, Box, Button, Card, CardContent, Chip, CircularProgress, IconButton, Paper, Slide, TextField, Typography } from "@mui/material"
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
import EmojiPicker from 'emoji-picker-react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import moment from "moment";
// import InfiniteScroll from 'react-infinite-scroll-component';

const CardMessage = ({ chatId, nome, setFlushHook, flushHook, chatIdSocket, setChatIdSocket }) => {

    const color = grey[300]

    const chatContainerRef = useRef(null);
    const textFieldRef = useRef(null);
    const { name } = useContext(AuthContext)
    const [chat, setChat] = useState([])
    const [mensagem, setMensagem] = useState('')
    const [showOps, setShowOps] = useState(false)
    const [messageReplayed, setMessageReplayed] = useState({})
    const [data, setData] = useState({})
    const [showPastedImage, setShowPastedImage] = useState(false)
    const [pastedImage, setPastedImage] = useState(null)
    const [hookScroll, setHookScroll] = useState(false)
    const [AllMessages, setAllMessages] = useState([])
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadedMessages, setLoadedMessages] = useState(0)
    const [messagesByDate, setMessagesByDate] = useState({})

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
                    setChat(result.mensagens.slice(-20))
                    let groupMessage = result.mensagens.slice(-20).reduce((groups, message) => {
                        const date = message.horario.split(' ')[0]; // assumindo que message.horario é uma string de data e hora
                        if (!groups[date]) {
                            groups[date] = [];
                        }
                        groups[date].push(message);
                        return groups;
                    }, {});
                    setMessagesByDate(groupMessage)
                    setAllMessages(result.mensagens)
                } else {
                    setChat([])
                    setMessagesByDate({})
                }
            } else {
                setChat([])
                setMessagesByDate({})
            }
        } else {
            setChat([])
            setMessagesByDate({})

        }
        setHookScroll(true)
        setData(resultData)
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        setLoading(false)
    }

    const seeMessage = async () => {
        await seeInternalMessage({ chatId })
    }

    useEffect(() => {
        if (chatIdSocket === chatId) {
            setFlushHook(true)
        }
        setFlushHook(false)
        fetchData()
    }, [nome, flushHook])

    useEffect(() => {
        setLoading(true)
        setMensagem('')
        setChatIdSocket(chatId)
    }, [chatId])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [hookScroll, messageReplayed]);

    const loadMoreMessages = (e, skip = 20, forceLoading = false) => {

        if (e?.target?.scrollTop === 0 || forceLoading) {

            const loadedMessages = chat.length
            const aditionalMessages = skip
            let startIndex = AllMessages.length - loadedMessages - aditionalMessages
            const endIndex = startIndex + aditionalMessages

            if (startIndex < 0) {
                startIndex = 0
            }
            const messageToRender = AllMessages.slice(startIndex, endIndex).concat(chat)
            let groupMessage = messageToRender.reduce((groups, message) => {
                const date = message.horario.split(' ')[0]; // assumindo que message.horario é uma string de data e hora
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(message);
                return groups;
            }, {});
            setChat(messageToRender)
            setMessagesByDate(groupMessage)
            setLoadedMessages(loadedMessages + 1)
        }
    }

    useEffect(() => {
        chatContainerRef.current.scrollTop = 100
    }, [loadedMessages])

    const loadSelectedRespondedMessage = (idMessage) => {
        const findIndex = AllMessages.findIndex(message => message._id === idMessage)
        const findIndexRenderizado = chat.findIndex(message => message._id === idMessage)

        if (findIndexRenderizado !== -1) {
            const responseMessage = document.getElementById(`responseMessage_${idMessage}`);
            if (responseMessage) {
                responseMessage.scrollIntoView({
                    behavior: "smooth",
                });
                responseMessage.classList.add('blink');
                setTimeout(() => {
                    responseMessage.classList.remove('blink');
                }, 1000);
            }
            return
        }
        if (findIndex !== -1) {
            loadMoreMessages(idMessage, AllMessages.length - findIndex, true)
            const responseMessage = document.getElementById(`responseMessage_${idMessage}`);
            if (responseMessage) {
                responseMessage.scrollIntoView({
                    behavior: "smooth",
                });
                responseMessage.classList.add('blink');
                setTimeout(() => {
                    responseMessage.classList.remove('blink');
                }, 1000);
            }
        }
    }

    useEffect(() => {
        console.log(messageReplayed);
        if (textFieldRef.current) {
            textFieldRef.current.focus()
        }
    }, [messageReplayed])

    return (
        <>
            <Box maxWidth={'1500px'}>
                <Card component={Paper} sx={{ bgcolor: color, borderRadius: `10px`, height: '90vh', display: 'flex' }}>
                    <Box width={'100%'}>
                        <ProfileBar url={`${process.env.REACT_APP_CHAT_SERVICE}/media/${data.imageGroup}`} nome={nome} showOps={showOps} setShowOps={setShowOps} tipo={data.tipo} />
                        <CardContent >
                            <Box display='block' style={{
                                overflowY: 'auto',
                                scrollbarWidth: 'thin', // para Firefox
                                scrollbarColor: '#888 #444', // para Firefox
                                '&::-webkit-scrollbar': { // para Chrome, Safari e Edge
                                    width: '12px',
                                },
                                '&::-webkit-scrollbar-track': { // para Chrome, Safari e Edge
                                    background: '#444',
                                },
                                '&::-webkit-scrollbar-thumb': { // para Chrome, Safari e Edge
                                    backgroundColor: '#888',
                                    borderRadius: '20px',
                                },
                                '&::-webkit-scrollbar-thumb:hover': { // para Chrome, Safari e Edge
                                    backgroundColor: '#555',
                                },
                            }} component={Paper} bgcolor='lightgray' height='74vh' ref={chatContainerRef} onScroll={loadMoreMessages} >

                                {
                                    !loading ? Object.entries(messagesByDate).map(([date, messages], index) => {
                                        return (
                                            <Box key={index}>
                                                <Typography textAlign={'center'}>
                                                    <Chip
                                                        label={moment(date).format('DD/MM/YYYY')}
                                                        variant="outlined"
                                                    />
                                                </Typography>
                                                {
                                                    messages.map((e, index) => {
                                                        return (
                                                            <IndividualMessage loadSelectedRespondedMessage={loadSelectedRespondedMessage} item={e} index={index} key={index} name={name} setMessageReplayed={setMessageReplayed} />
                                                        )
                                                    })
                                                }
                                            </Box>
                                        )
                                    }) : (
                                        <Box textAlign={'center'}>
                                            <CircularProgress />
                                        </Box>
                                    )
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
                                {
                                    showEmojiPicker && (
                                        <Box position={'fixed'} bottom={'12%'}>
                                            <EmojiPicker onEmojiClick={(e) => setMensagem((prev) => prev + e.emoji)} />
                                        </Box>
                                    )
                                }
                            </Box>
                            <Box>
                                <form action="" onSubmit={handleSend} method="post" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                                        <ModalUploadArquivos chatId={chatId} receptor={nome} setFlushHook={setFlushHook} />
                                    </div>
                                    <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                        <EmojiEmotionsIcon />
                                    </IconButton>
                                    <TextField value={mensagem}
                                        inputRef={textFieldRef}
                                        type='text'
                                        size='small'
                                        onChange={e => { setMensagem(e.target.value) }}
                                        onPaste={handlePaste}
                                        placeholder='Mensagem'
                                        multiline
                                        maxRows={4}
                                        style={{
                                            flex: 5,
                                            margin: '0 3px',
                                            whiteSpace: 'pre-wrap'
                                        }}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSend(e);
                                            }
                                        }}
                                    />
                                    <Button size='small' type='submit' variant='contained'><SendIcon /></Button>
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
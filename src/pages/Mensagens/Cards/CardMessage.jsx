import { Alert, Box, Button, Card, CardContent, Container, Grow, Paper, Slide, TextField, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import { useContext, useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { getMessages, seeInternalMessage, sendMessageInterno } from "../../../_services/chat.service";
import AuthContext from "../../../context/AuthContext";
import IndividualMessage from "./IndividualMessage";
import ModalUploadArquivos from "../Modal/ModalUploadArquivos";
import ProfileBar from "./ProfileBar";
import GroupData from "./GroupData";

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

    const handlePaste = (e) => {
        const clipboardData = e.clipboardData

        if (clipboardData && clipboardData.items) {
            for (let i = 0; i < clipboardData.items.length; i++) {
                const item = clipboardData.items[i];

                if (item.type.indexOf('image') !== -1) {
                    const file = item.getAsFile();
                    const imageUrl = URL.createObjectURL(file);

                    const imgTag = `<img src="${imageUrl}" alt="Imagem" />`;
                    setMensagem((mensagem) => mensagem + imgTag);
                }
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
        const result = await getMessages({ chatId, nome })

        await seeMessage()

        if (result.mensagens) {
            if (result.participantes.includes(name)) {
                if (result.mensagens) {
                    setChat(result.mensagens)
                } else {
                    setChat([])
                }
            } else {
                setChat([])
            }
        } else {
            setChat([])
        }

        console.log(result);

        setData(result)

        // if (result.mensagens) {
        //     setChat(result.mensagens)
        // } else {
        //     setChat([])
        // }
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
    }, [chat]);

    return (
        <>
            <Container maxWidth>
                <Box>
                    <Card component={Paper} sx={{ bgcolor: color, borderRadius: `10px`, height: '90vh', display: 'flex' }}>
                        <Box width={'100%'}>
                            <ProfileBar nome={nome} showOps={showOps} setShowOps={setShowOps} tipo={data.tipo} />
                            <CardContent >
                                <Box display='block' style={{ overflowY: 'auto' }} component={Paper} bgcolor='lightgray' height='75vh' ref={chatContainerRef}>
                                    {
                                        chat.map((e, index) => {
                                            return (
                                                <IndividualMessage item={e} index={index} key={index} name={name} setMessageReplayed={setMessageReplayed} />
                                            )
                                        })
                                    }
                                </Box>
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

                                    })
                                }
                            </Box>
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
                    </Card>
                </Box>
            </Container>
        </>
    )
}

export default CardMessage
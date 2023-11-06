import { Alert, Box, Button, Card, CardContent, Container, Paper, Slide, TextField, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import { useContext, useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { getMessages, seeInternalMessage, sendMessageInterno } from "../../../_services/chat.service";
import AuthContext from "../../../context/AuthContext";
import IndividualMessage from "./IndividualMessage";
import ModalUploadArquivos from "../Modal/ModalUploadArquivos";

const CardMessage = ({ chatId, nome, setFlushHook, flushHook }) => {

    const color = grey[300]

    const chatContainerRef = useRef(null);
    const { name } = useContext(AuthContext)
    const [chat, setChat] = useState([])
    const [mensagem, setMensagem] = useState('')
    const [loading, setLoading] = useState(false)
    const [messageReplayed, setMessageReplayed] = useState({})

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
            setChat(result.mensagens)
        } else {
            setChat([])
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
    }, [chat]);

    return (
        <>
            <Container maxWidth>
                <Box>
                    <Card component={Paper} sx={{ bgcolor: color, borderRadius: `10px`, height: '90vh' }}>
                        <Typography p={1} variant="h5" component="div" color='white' bgcolor={grey[500]}>
                            {nome}
                        </Typography>
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
                                }
                                <form action="" onSubmit={handleSend} method="post" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    {/* <SpeedDial ariaLabel="Anexar" icon={<SpeedDialIcon />}
                                        sx={{ marginRight: '3px', display: 'flex', alignItems: 'center' }} >
                                    </SpeedDial> */}
                                    <ModalUploadArquivos chatId={chatId} receptor={nome} setFlushHook={setFlushHook} />
                                    <TextField value={mensagem} type='text' size='small' onChange={e => { setMensagem(e.target.value) }}
                                        onPaste={handlePaste} placeholder='Mensagem' style={{ width: '87%', marginRight: '3px' }} />
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
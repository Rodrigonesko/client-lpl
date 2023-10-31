import { Box, Button, Card, CardContent, Container, Paper, SpeedDial, SpeedDialIcon, TextField, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { getMessages, sendMessageInterno } from "../../../_services/chat.service";
import AuthContext from "../../../context/AuthContext";


const CardMessage = ({ chatId, nome, setFlushHook, flushHook }) => {

    const color = grey[300]

    const chatContainerRef = useRef(null);
    const { name } = useContext(AuthContext)
    const [chat, setChat] = useState([])
    const [mensagem, setMensagem] = useState('')
    const [loading, setLoading] = useState(false)

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
        await sendMessageInterno({
            receptor: nome,
            mensagem,
            chatId
        })
        setFlushHook(true)
        setMensagem('')
    }

    const fetchData = async () => {
        console.log(nome);
        const result = await getMessages({ chatId, nome })
        console.log(result.participantes);
        if (result.mensagens) {
            setChat(result.mensagens)
        } else {
            setChat([])
        }
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
                            <Box display='block' style={{ overflowY: 'auto' }} component={Paper} bgcolor='lightgray' height='73vh' ref={chatContainerRef}>
                                {
                                    chat.map((e, index) => {
                                        return (
                                            <Box key={index} m={1} style={{ textAlign: e.remetente === name ? 'right' : 'left' }}>
                                                <Typography color='darkblue' fontSize='14px' >
                                                    {e.de}
                                                </Typography>
                                                <Typography color='GrayText' >{e.remetente}</Typography>
                                                {e.mensagem.includes('<img') ? (
                                                    <div dangerouslySetInnerHTML={{ __html: e.mensagem }} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                                ) : (
                                                    <Typography style={{ display: 'inline-block', backgroundColor: e.remetente === name ? '#42a5f5' : 'gray', color: 'white', padding: '10px', borderRadius: '10px', maxWidth: '80%' }}>{e.mensagem}</Typography>
                                                )}
                                                <Typography color='GrayText'>{moment(e.horario).format('HH:mm DD/MM/YYYY')}</Typography>
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                            <Box >
                                <form action="" onSubmit={handleSend} method="post" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <SpeedDial ariaLabel="Anexar" icon={<SpeedDialIcon />}
                                        sx={{ marginRight: '3px', display: 'flex', alignItems: 'center' }} >

                                    </SpeedDial>
                                    <TextField value={mensagem} type='text' size='small' onChange={e => { setMensagem(e.target.value) }}
                                        onPaste={handlePaste} placeholder='Mensagem' style={{ width: '87%', marginRight: '3px' }}></TextField>
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
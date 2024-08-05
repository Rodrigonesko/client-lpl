import { Box, Chip, Divider, IconButton, Paper, Slide, Tooltip, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useRef, useState } from "react";
import { useEffect } from "react";
import { getMessagesTele, visualizarMensagem } from "../../../../_services/teleEntrevistaExterna.service";
import moment from "moment";
import { blue } from "@mui/material/colors";
import MensagemPadrao from "../Components/MensagemPadrao";
import MensagemSemSucesso from "../Components/MensagemSemSucesso";
import MensagemHorarios from "../Components/MensagemHorarios";
import PopoverHistoricoWhatsapp from "../Components/PopoverHistoricoWhatsapp";
import InputWhatsapp from "../Components/InputWhatsapp";
import BotaoMandarHumanizado from "../Components/BotaoMandarHumanizado";
import BotaoAssumirAtendimento from "../Components/BotaoAssumirAtendimento";
import { mostrarPropostaPorId } from "../../../../_services/teleEntrevista.service";
import InputSendMessage from "../Components/InputSendMessage";
import PopoverAlterarNumeroEnvio from "../Components/PopoverAlterarNumeroEnvio";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { io } from "socket.io-client";
import MensagemDependentesFaltantes from "../Components/MensagemDependentesFaltantes";
import MensagemAdiantarTele from "../Components/MensagemAdiantarTele";

const socket = io(process.env.REACT_APP_API_TELE_KEY);
const socketLocaweb = io('http://200.234.207.26:5007');

const numeros = [
    'whatsapp:+551150394280',
    'whatsapp:+15674092338',
    'whatsapp:+15752234727',
    'whatsapp:+554140426114',
    'whatsapp:+551150396002',
    'whatsapp:+551150394558',
    'whatsapp:+551150392183'
]

const CardConversaTele = ({ open, setOpen, _id, nome, setNome, responsavelAtendimento, setResponsavelAtendimento, selectedWhatsapp, setSelectedWhatsapp, data, setData }) => {

    const chatRef = useRef(null)

    const [whatsapp, setWhatsapp] = useState(selectedWhatsapp)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [flushHook, setFlushHook] = useState(false)
    const [fullWidth, setFullWidth] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {

        const fetchData = async () => {

            const resultData = await mostrarPropostaPorId(data._id)
            setData(resultData)
            if (!selectedWhatsapp || selectedWhatsapp === 'whatsapp:+55undefinedundefined' || selectedWhatsapp === 'whatsapp:+55') {
                setMessages([])
                return
            }
            const result = await getMessagesTele(selectedWhatsapp)
            setMessages(result)
            await visualizarMensagem({
                whatsapp
            })
        }

        setWhatsapp(selectedWhatsapp)
        fetchData()
        setFlushHook(false)
    }, [selectedWhatsapp, flushHook, data._id])

    useEffect(() => {
        socket.on('receivedMessage', async (message) => {
            if (message.whatsapp === data.whatsapp) {
                setFlushHook(true)
            }
        });
        socket.on('statusMessage', async (data) => {
            const { From, To } = data
            if (To === data.whatsapp) {
                setFlushHook(true)
            }
        })
        socketLocaweb.on('messageReceived', async (message) => {
            if (message.whatsapp === data.whatsapp) {
                setFlushHook(true)
            }
        }
        )
    }, [data.whatsapp])

    useEffect(() => {
        const component = chatRef.current;
        if (component) {
            console.log(messages);
            component.scrollTop = component.scrollHeight;
        }

    }, [messages])

    return (
        <Slide direction="left" in={open} unmountOnExit mountOnEnter>
            <Box display={!open && 'none'} component={Paper} p={1} m={2} width={fullWidth ? '100%' : '80%'} height={'100%'} position={fullWidth && 'absolute'} >
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="h6" m={1}>
                        {
                            fullWidth ? (
                                <IconButton onClick={() => setFullWidth(!fullWidth)}>
                                    <CloseFullscreenIcon />
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => setFullWidth(!fullWidth)}>
                                    <OpenInFullIcon />
                                </IconButton>
                            )
                        }
                        {nome}
                        <Typography variant="body1">
                            {responsavelAtendimento}
                        </Typography>
                        <Typography variant="body2" color={'gray'}>
                            {selectedWhatsapp}
                        </Typography>
                    </Typography>
                    <IconButton sx={{ position: 'absolute', right: '30px' }} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                <Box m={1}>
                    <InputWhatsapp whatsapp={whatsapp} setWhatsapp={setWhatsapp} setSelectedWhatsapp={setSelectedWhatsapp} _id={data._id} setFlushHook={setFlushHook} />
                    <Box m={1}>
                        <BotaoMandarHumanizado _id={data._id} />
                        <BotaoAssumirAtendimento setResponsavelAtendimento={setResponsavelAtendimento} _id={data._id} />
                        <PopoverHistoricoWhatsapp setFlushHook={setFlushHook} data={data} setSelectedWhatsapp={setSelectedWhatsapp} setWhatsapp={setWhatsapp} />
                        <PopoverAlterarNumeroEnvio proposta={data} setFlushHook={setFlushHook} />
                    </Box>
                </Box>
                <Divider />
                <Box p={1} m={1} height={'50vh'} sx={{ overflowY: 'auto' }} ref={chatRef}>
                    {
                        messages.map(message => {
                            return (
                                <Box key={message._id} m={1} style={{ textAlign: numeros.includes(message.de) ? 'right' : 'left' }}>
                                    <Typography color='darkblue' fontSize='14px' >
                                        {message.de}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            display: 'inline-block',
                                            backgroundColor: numeros.includes(message.de) ? blue[500] : 'gray',
                                            color: 'white',
                                            padding: '10px',
                                            borderRadius: '10px',
                                            maxWidth: '80%'
                                        }}>
                                        {message.mensagem}
                                        {
                                            message.arquivo ? (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '10px',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <a href={message.arquivo} target="_blank" color={'primary'} underline="hover">
                                                        Arquivo
                                                    </a>
                                                    <img
                                                        src={message.arquivo}
                                                        alt="Arquivo"
                                                        style={{
                                                            maxWidth: '300px',
                                                            maxHeight: '300px',
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                </Box>

                                            ) : null
                                        }
                                    </Typography>
                                    <Typography color='GrayText'>{moment(message.horario).format('HH:mm DD/MM/YYYY')}</Typography>
                                    <Typography variant='body2' color='GrayText'>
                                        {
                                            message.status === 'failed' || message.status === 'undelivered' ? (
                                                <Chip label={`Erro ao enviar - ${message.errorCode || ''}`} color="error" />
                                            ) : (
                                                <>
                                                    {message.status === 'read' ? (
                                                        <Tooltip title={'Lida'} arrow>
                                                            <Chip label={'Lida'} color="success" />
                                                        </Tooltip>
                                                    ) : (
                                                        message.status
                                                    )
                                                    }
                                                </>
                                            )
                                        }
                                    </Typography>
                                </Box>
                            )
                        })
                    }
                </Box>
                <InputSendMessage message={message} setMessage={setMessage} setFlushHook={setFlushHook} whatsapp={whatsapp} />
                {/* <Box mt={1}>

                    <MensagemSemSucesso setMessage={setMessage} />
                    <MensagemPadrao setMessage={setMessage} nome={nome} />
                    <MensagemHorarios setMessage={setMessage} />
                    <MensagemDependentesFaltantes setMessage={setMessage} />
                    <MensagemAdiantarTele setMessage={setMessage} />
                </Box> */}
            </Box>
        </Slide >

    )
}

export default CardConversaTele
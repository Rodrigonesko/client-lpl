import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../../../../components/Sidebar/Sidebar'
import { useMediaQuery, Container, Box, Paper, Typography, TextField, Button, Alert, CircularProgress, Chip, Tooltip } from '@mui/material'
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import { getCookie } from 'react-use-cookie';
import moment from 'moment';
import PrimeiroContato from './mensagensPadrao/PrimeiroContato';
import MensagemSemSucessoContato from './mensagensPadrao/MensagemSemSucessoContato';
import MensagemDiaAnterior from './mensagensPadrao/MensagemDiaAnterior';
import { io } from "socket.io-client";
import MensagemAdiantarTele from './mensagensPadrao/MensagemAdiantarTele';
import MensagemDependentesFaltantes from './mensagensPadrao/MensagemDependentesFaltantes';
import MensagemPadraoAdesao from './mensagensPadrao/MensagemPadraoAdesao';

const socket = io(process.env.REACT_APP_API_TELE_KEY);

const Chat = () => {

    const inputRef = useRef(null)
    const chatRef = useRef(null)

    const { whatsapp } = useParams()
    const [chat, setChat] = useState([])
    const [mensagem, setMensagem] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [aux, setAux] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [beneficiario, setBeneficiario] = useState()

    const isSmallScreen = useMediaQuery('(max-width:800px)');

    const enviar = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            if (mensagem.trim() === '') {
                return
            }
            const result = await Axios.post(`${process.env.REACT_APP_API_TELE_KEY}/sendMessage`, {
                whatsapp,
                mensagem
            }, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            if (result.status === 200) {
                buscarMensagens()
                setError(false)
                setLoading(false)
            }
            setMensagem('')
            setAux(!aux)
            inputRef.current.value = '';
        } catch (error) {
            console.log(error);
            if (error.response.data.msg === 63024) {
                setErrorMessage('Esse número não tem whatsapp')
            } else if (error.response.data.msg === 63016) {
                setErrorMessage('Não foi possível enviar a mensagem pois, está fora da janela de 24 horas, por favor utilize um template pronto.')
            } else {
                setErrorMessage('Erro ao enviar mensagem')
            }
            setError(true)
            setLoading(false)
        }
    }

    const buscarMensagens = async () => {

        try {
            if (whatsapp === 'whatsapp:+55undefinedundefined' || whatsapp === 'whatsapp:+55') {
                return
            }
            const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/chat/${whatsapp}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem('token') || getCookie('token')}` }
            })
            setChat(result.data)
            await Axios.put(`${process.env.REACT_APP_API_TELE_KEY}/visualizarMensagem`, {
                whatsapp
            }, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem('token') || getCookie('token')}` }
            })
            const response = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/newProposta/whatsapp/${whatsapp}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem('token') || getCookie('token')}` }
            })
            setBeneficiario(response.data)
            setAux(true)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarMensagens()
        const component = chatRef.current;
        if (component) {
            component.scrollTop = component.scrollHeight;
        }
    }, [whatsapp, aux])

    useEffect(() => {
        socket.on('receivedMessage', async (message) => {
            if (message.whatsapp === whatsapp) {
                buscarMensagens()
                const component = chatRef.current;
                if (component) {
                    component.scrollTop = component.scrollHeight;
                }
            }
        });
        socket.on('statusMessage', async (result) => {
            if (result.To === whatsapp) {
                buscarMensagens()
                const component = chatRef.current;
                if (component) {
                    component.scrollTop = component.scrollHeight;
                }
            }
        })
    }, [])

    return (
        <>
            <Sidebar>
                <Container>
                    <Box display='flex' flexWrap={isSmallScreen ? 'wrap' : ''}  >
                        <Box>
                            <Box display='block' style={{ overflowY: 'auto' }} component={Paper} mt={3} bgcolor='lightgray' height='80vh' ref={chatRef} minWidth={'500px'}>
                                {
                                    chat.map(e => {
                                        return (
                                            <Box key={e._id} m={1} style={{ textAlign: e.de === 'whatsapp:+15674092338' || e.de === 'whatsapp:+554140426114' || e.de === 'whatsapp:+551150396002' || e.de === 'whatsapp:+551150394558' || e.de === 'whatsapp:+551150392183' || e.de === 'whatsapp:+551150394280' ? 'right' : 'left' }}>
                                                <Typography color='darkblue' fontSize='14px' >
                                                    {e.de}
                                                </Typography>
                                                <Typography
                                                    style={{
                                                        display: 'inline-block',
                                                        backgroundColor: e.de === 'whatsapp:+15674092338' || e.de === 'whatsapp:+554140426114' || e.de === 'whatsapp:+551150396002' || e.de === 'whatsapp:+551150394558' || e.de === 'whatsapp:+551150392183' || e.de === 'whatsapp:+551150394280' ? '#0066FF' : 'gray',
                                                        color: 'white',
                                                        padding: '10px',
                                                        borderRadius: '10px',
                                                        maxWidth: '80%',
                                                        wordWrap: 'break-word',
                                                    }}>
                                                    {e.mensagem.split('\n').map((item, key) => {
                                                        return <span key={key}>{item}<br /></span>
                                                    })}
                                                </Typography>
                                                <Typography color='GrayText'>{moment(e.horario).format('HH:mm DD/MM/YYYY')}</Typography>
                                                <Typography variant='body2' color='GrayText'>
                                                    {
                                                        e.status === 'failed' || e.status === 'undelivered' ? (
                                                            <Chip label={`Erro ao enviar - ${e.errorCode || ''}`} color="error" />
                                                        ) : (
                                                            <>
                                                                {e.status === 'read' ? (
                                                                    <Tooltip title={'Lida'} arrow>
                                                                        <Chip label={'Lida'} color="success" />
                                                                    </Tooltip>
                                                                ) : (
                                                                    e.status
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
                            <Box bgcolor='lightgray' border='1px solid gray' p={1}>
                                <form action="" onSubmit={enviar} method="post" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <TextField inputRef={inputRef} value={mensagem} multiline type='text' size='small' onChange={e => {
                                        setMensagem(e.target.value)

                                    }} placeholder='Mensagem' style={{ width: '90%', marginRight: '3px' }} />
                                    <Button size='small' type='submit' disabled={loading} variant='contained'>Enviar {loading ? (<CircularProgress style={{ marginLeft: '3px' }} size={15} color='inherit' />) : null} </Button>

                                </form>
                            </Box>
                            {
                                error ? (
                                    <Alert severity='error' >{errorMessage}</Alert>
                                ) : null
                            }
                        </Box>
                        <Box mt={2} ml={1}>
                            {/* <Box>
                                <TextField label='Numero de envio' value={whatsapp} disabled />
                                <Button variant='contained' sx={{ marginLeft: '10px' }}>Atualizar</Button>
                            </Box> */}
                            <MensagemDiaAnterior setLoading={setLoading} setMensagem={setMensagem} />
                            <MensagemAdiantarTele setLoading={setLoading} setMensagem={setMensagem} />
                            <MensagemDependentesFaltantes setLoading={setLoading} setMensagem={setMensagem} />
                            <MensagemSemSucessoContato hookMsg={setMensagem} />
                            {
                                beneficiario?.tipoContrato === 'ADESÃO' ? (
                                    <>
                                        <MensagemPadraoAdesao para={whatsapp} setFlushHook={setAux} />
                                    </>
                                ) : (
                                    <>
                                        <PrimeiroContato hookMsg={setMensagem} />
                                    </>
                                )
                            }
                        </Box>
                    </Box>
                </Container>
            </Sidebar >
        </>
    )
}

export default Chat
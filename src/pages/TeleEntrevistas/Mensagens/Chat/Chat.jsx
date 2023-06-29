import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../../../../components/Sidebar/Sidebar'
import { Container, Box, Paper, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material'
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import { getCookie } from 'react-use-cookie';
import moment from 'moment';
import { getHorariosDisponiveis } from '../../../../_services/teleEntrevista.service';

const Chat = () => {

    const inputRef = useRef(null)
    const chatRef = useRef(null)

    const { whatsapp } = useParams()
    const [chat, setChat] = useState([])
    const [mensagem, setMensagem] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dataDiaAnterior, setDataDiaAnterior] = useState('')
    const [aux, setAux] = useState(false)

    const handlerSemContato = async () => {
        try {

            setMensagem('Somos da Amil. Estamos tentando contato conforme agendamento realizado. O(a) Sr(a) pode falar no momento?')

        } catch (error) {
            console.log(error);
        }
    }

    const handlerSemContatoDiaAnterior = async () => {
        try {

            setLoading(true)

            const { obj } = await getHorariosDisponiveis()

            const dataFormatada = moment(dataDiaAnterior).format('DD/MM/YYYY')

            let msg = `Bom dia!
Tentamos contato contigo no horário agendado, porém sem sucesso. Sendo assim, teremos que reagendar. Vou te passar os horários disponíveis atualizados.
Horários disponíveis para o dia ${dataFormatada} -`

            if (obj.hasOwnProperty(dataFormatada)) {
                obj[dataFormatada].forEach(horario => {
                    msg += ` ${horario} -`
                })

            } else {

            }

            msg += ` ⚠️ Atenção: o preenchimento dos horários é feito em tempo real. Caso o horário informado não esteja mais disponível, apresentarei uma nova opção.`

            console.log(msg);

            setMensagem(msg)

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

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
                headers: { Authorization: `Bearer ${getCookie('token')}` }
            })

            console.log(result);

            if (result.status === 200) {
                buscarMensagens()
                setError(false)
                setLoading(false)
            }

            console.log(mensagem);
            setMensagem('')
            inputRef.current.value = '';
        } catch (error) {
            console.log(error);
            setError(true)
            setLoading(false)
        }
    }

    const buscarMensagens = async () => {

        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/chat/${whatsapp}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${getCookie('token')}` }
            })

            setChat(result.data)

            setAux(true)

            // await Axios.put(`${process.env.REACT_APP_API_TELE_KEY}/visualizarMensagem`, {
            //     whatsapp
            // }, {
            //     withCredentials: true,
            //     headers: { Authorization: `Bearer ${getCookie('token')}` }
            // })

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

    return (
        <>
            <Sidebar></Sidebar>
            <Container>
                <Box display='block' style={{ overflowY: 'auto' }} component={Paper} mt={3} bgcolor='lightgray' height='80vh' ref={chatRef}>
                    {
                        chat.map(e => {
                            return (
                                <Box key={e._id} m={1} style={{ textAlign: e.de === 'whatsapp:+15674092338' || e.de === 'whatsapp:+554140426114' ? 'right' : 'left' }}>
                                    <Typography style={{ display: 'inline-block', backgroundColor: e.de === 'whatsapp:+15674092338' || e.de === 'whatsapp:+554140426114' ? '#0066FF' : 'gray', color: 'white', padding: '10px', borderRadius: '10px', maxWidth: '80%' }}>{e.mensagem}</Typography>
                                    <Typography color='GrayText'>{moment(e.horario).format('HH:mm DD/MM/YYYY')}</Typography>
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
                        <Button size='small' type='submit' variant='contained'>Enviar {loading ? (<CircularProgress style={{ marginLeft: '3px' }} size={15} color='inherit' />) : null} </Button>

                    </form>
                </Box>
                {
                    error ? (
                        <Alert severity='error' >Erro ao enviar mensagem</Alert>
                    ) : null
                }
                <Box display='flex'>
                    <Box component={Paper} p={2} width='30%' >
                        <Typography>
                            Mensagem não atenderam dia anterior
                        </Typography>
                        <Box display='flex'>
                            <TextField type='date' size='small' style={{ marginRight: '10px' }} value={dataDiaAnterior} onChange={element => setDataDiaAnterior(element.target.value)} />
                            <Button variant='contained' color='secondary' onClick={handlerSemContatoDiaAnterior} >Gerar</Button>
                        </Box>
                    </Box>
                    <Box component={Paper} p={2} width='30%'>
                        <Typography>
                            Mensagem sem sucesso de contato
                        </Typography>
                        <Box>
                            <Button variant='contained' color='warning' onClick={handlerSemContato} >Gerar</Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Chat
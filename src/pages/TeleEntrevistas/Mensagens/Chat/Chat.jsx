import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../../../../components/Sidebar/Sidebar'
import { Container, Box, Paper, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material'
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import { getCookie } from 'react-use-cookie';
import moment from 'moment';

const Chat = () => {

    const inputRef = useRef(null)

    const { whatsapp } = useParams()
    const [chat, setChat] = useState([])
    const [mensagem, setMensagem] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

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

            await Axios.put(`${process.env.REACT_APP_API_TELE_KEY}/visualizarMensagem`, {
                whatsapp
            }, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${getCookie('token')}` }
            })

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        buscarMensagens()
    }, [whatsapp])

    return (
        <>
            <Sidebar></Sidebar>
            <Container>
                <Box display='block' style={{ overflowY: 'auto' }} component={Paper} mt={3} bgcolor='lightgray' height='80vh'>
                    {
                        chat.map(e => {
                            return (
                                <Box key={e._id} m={1} style={{ textAlign: e.de === 'whatsapp:+15674092338' ? 'right' : 'left' }}>
                                    <Typography style={{ display: 'inline-block', backgroundColor: e.de === 'whatsapp:+15674092338' ? '#0066FF' : 'gray', color: 'white', padding: '10px', borderRadius: '10px', maxWidth: '80%' }}>{e.mensagem}</Typography>
                                    <Typography color='GrayText'>{moment(e.horario).format('HH:mm DD/MM/YYYY')}</Typography>
                                </Box>
                            )
                        })
                    }

                </Box>
                <Box bgcolor='lightgray' border='1px solid gray' p={1}>
                    <form action="" onSubmit={enviar} method="post" style={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField inputRef={inputRef} type='text' size='small' onChange={e => {
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
            </Container>
        </>
    )
}

export default Chat
import React, { useState, useEffect } from 'react'
import Sidebar from '../../../../components/Sidebar/Sidebar'
import { Container, Box, Paper, Typography } from '@mui/material'
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import config from '../../../../config/axiosHeader';

const Chat = () => {

    const { whatsapp } = useParams()
    const [chat, setChat] = useState([])

    useEffect(() => {
        const buscarMensagens = async () => {

            try {
                const result = await Axios.get(`http://10.0.121.55:3002/chat/${whatsapp}`, {
                    withCredentials: true,
                    headers: config.headers
                })

                setChat(result.data)

            } catch (error) {
                console.log(error);
            }

        }

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
                                </Box>
                            )
                        })
                    }
                </Box>
            </Container>
        </>
    )
}

export default Chat
import React, { useContext, useEffect, useState } from 'react'
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Badge } from '@mui/material'
import { getContacts } from '../../../_services/whatsapp.service'
import { ChatContext } from './ChatContext'
import moment from 'moment'

const Contacts = () => {

    const { whatsappSender, whatsappReceiver, setWhatsappReceiver, flushHook } = useContext(ChatContext)

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await getContacts(whatsappSender)
                if (response.error) {
                    return
                }
                setContacts(response)
            } catch (error) {
                console.log(error);
                setContacts([])
            }
        }
        fetch()
    }, [whatsappSender, flushHook])

    return (
        <Box
            sx={{
                maxWidth: '400px',
                height: '100%',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555',
                }
            }}
        >
            <List>
                {
                    contacts.map(contact => (
                        <ListItemButton
                            sx={{
                                borderRadius: '10px',
                                p: 1,
                            }}
                            key={contact._id}
                            selected={whatsappReceiver.nome === contact.nome}
                            onClick={() => setWhatsappReceiver(contact)}
                        >
                            <ListItem
                                sx={{
                                    borderRadius: '10px',
                                    p: 1,
                                }}
                            >
                                <ListItemText
                                    primary={contact.nome ? contact.nome.substring(0, 25) : ''}
                                    secondary={contact.ultimaMensagem ? contact.ultimaMensagem.substring(0, 35) : ''}
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                    >
                                        {contact.horarioUltimaMensagem ? moment(contact.horarioUltimaMensagem).format('HH:mm') : ''}
                                    </Typography>
                                    <Badge sx={{ m: 1 }} badgeContent={contact.quantidadeMensagens} color="primary" />
                                </Box>
                            </ListItem>
                        </ListItemButton>
                    ))
                }
            </List>
        </Box>
    )
}

export default Contacts
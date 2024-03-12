import React, { useContext, useEffect, useState } from 'react'
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Badge } from '@mui/material'
import { getContacts } from '../../../_services/whatsapp.service'
import { ChatContext } from './ChatContext'
import moment from 'moment'

const Contacts = () => {

    const { whatsappSender } = useContext(ChatContext)

    const [contacts, setContacts] = useState([])

    useEffect(() => {

        const fetch = async () => {
            const response = await getContacts(whatsappSender)
            console.log(response);
            setContacts(response)
        }

        //fetch()

    }, [whatsappSender])

    return (
        <Box
            sx={{
                maxWidth: '400px',
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
                        >
                            <ListItem
                                sx={{
                                    borderRadius: '10px',
                                    p: 1,
                                }}
                            >
                                <ListItemText
                                    primary={contact.de}
                                    secondary={contact?.mensagem.substring(0, 35)}
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
                                        {moment(contact.horario).format('HH:mm')}
                                    </Typography>
                                    <Badge sx={{ m: 1 }} badgeContent={!contact.lida} color="primary" />
                                </Box>
                            </ListItem>
                        </ListItemButton>
                    ))
                }
                <ListItemButton
                    sx={{
                        borderRadius: '10px',
                        p: 1,
                    }}
                >
                    <ListItem
                        sx={{
                            borderRadius: '10px',
                            p: 1,
                        }}
                    >
                        <ListItemText primary="Primary" secondary="Secondary" />
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
                                10:00
                            </Typography>
                            <Badge sx={{ m: 1 }} badgeContent={4} color="primary" />
                        </Box>
                    </ListItem>
                </ListItemButton>
                <ListItemButton
                    sx={{
                        borderRadius: '10px',
                        p: 1,
                    }}
                >
                    <ListItem
                        sx={{
                            borderRadius: '10px',
                            p: 1,
                        }}
                    >
                        <ListItemText primary="Primary" secondary="Secondary" />
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
                                10:00
                            </Typography>
                            <Badge sx={{ m: 1 }} badgeContent={4} color="primary" />
                        </Box>
                    </ListItem>
                </ListItemButton>
            </List>
        </Box>
    )
}

export default Contacts
import React, { useContext, useEffect, useState } from 'react'
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Badge, TextField, IconButton } from '@mui/material'
import { getContacts, getFilterContactsRsd } from '../../../_services/whatsapp.service'
import { ChatContext } from './ChatContext'
import moment from 'moment'
import { Close, Search } from '@mui/icons-material'
import { getBeneficiarioByNameAndSortByLastMessage, getBeneficiarios } from '../../../_services/sulAmerica.service'

const Contacts = () => {

    const { whatsappSender, whatsappReceiver, setWhatsappReceiver, flushHook, setFlushHook, responsavel } = useContext(ChatContext)

    const [contacts, setContacts] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetch = async () => {
            try {
                if (whatsappSender === 'whatsapp:+551150264875') {
                    const response = await getContacts(whatsappSender, responsavel)
                    if (response.error) {
                        return
                    }
                    setContacts(response)
                }
                if (whatsappSender === 'whatsapp:+551150268027') {
                    const response = await getBeneficiarioByNameAndSortByLastMessage('')
                    console.log(response);
                    if (response.error) {
                        return
                    }
                    setContacts(response)
                }

            } catch (error) {
                console.log(error);
                setContacts([])
            }
        }
        fetch()
    }, [whatsappSender, flushHook, responsavel])

    useEffect(() => {

        const fetch = async () => {
            try {
                if (whatsappSender === 'whatsapp:+551150264875') {
                    const response = await getFilterContactsRsd(whatsappSender, search, responsavel)
                    if (response.error) {
                        return
                    }
                    setContacts(response)
                }
                if (whatsappSender === 'whatsapp:+551150268027') {
                    const response = await getBeneficiarioByNameAndSortByLastMessage(search)
                    if (response.error) {
                        return
                    }
                    setContacts(response)
                }
            } catch (error) {
                console.log(error);
                setContacts([])
            }
        }

        if (search) {
            fetch()
        } else {
            setFlushHook((prev) => !prev)
        }

    }, [search])

    return (
        <>
            <Box>
                <TextField
                    fullWidth
                    placeholder="Pesquisar"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <Search sx={{ mr: 1 }} />
                        ),
                        endAdornment: (

                            search && <IconButton
                                onClick={() => {
                                    setSearch('')
                                    setFlushHook((prev) => !prev)
                                }}
                            >
                                <Close />
                            </IconButton>
                        )
                    }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Box>
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
        </>

    )
}

export default Contacts
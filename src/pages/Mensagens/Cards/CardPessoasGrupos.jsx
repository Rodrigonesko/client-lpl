import React, { useContext, useState } from 'react';
import { Avatar, Badge, Card, CardContent, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material";
import { grey } from '@mui/material/colors';
import ModalCriarGrupo from '../Modal/ModalCriarGrupo';
import ModalIniciarConversa from '../Modal/ModalIniciarConversa';
import { Box } from '@mui/system';
import AuthContext from '../../../context/AuthContext';
import { seeInternalMessage } from '../../../_services/chat.service';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import moment from 'moment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const CardPessoasGrupos = ({
    setReceptor,
    chats,
    setChatId,
    setFlushHook,
    pesquisa,
    setPesquisa,
    flushHook
}) => {

    const { name } = useContext(AuthContext)
    const [selectedId, setSelectedId] = useState('')

    const verificarNome = (participantes) => {
        if (participantes[0] === name) {
            return participantes[1]
        } else {
            return participantes[0]
        }
    }

    const setChat = async (chat, index) => {
        if (chat.tipo === 'Grupo') {
            setReceptor(chat.nome)
        } else {
            setReceptor(verificarNome(chat.participantes))
        }
        await seeInternalMessage({ chatId: chat._id })
        setChatId(chat._id)
        setFlushHook(true)
        setSelectedId(chat._id)
    };

    const MAX_MESSAGE_LENGTH = 15;

    const truncateMessage = (message, maxLength) => {
        if (message.length > maxLength) {
            return `${message.substring(0, maxLength)}...`;
        }
        return message;
    };

    return (
        <Card sx={{ minWidth: 275, width: '360px', mb: `20px`, borderRadius: `10px`, height: `90vh`, padding: '0' }}>
            <CardContent sx={{ padding: '0' }} >
                <Box m={2} >
                    <ModalIniciarConversa setReceptor={setReceptor} setFlushHook={setFlushHook} setChatId={setChatId} />
                    <ModalCriarGrupo setReceptor={setReceptor} setFlushHook={setFlushHook} />
                </Box>
                <Box>
                    <TextField
                        placeholder="Pesquisar"
                        variant="standard"
                        sx={{ width: '90%', ml: '5%', mb: '10px' }}
                        InputProps={{
                            startAdornment: <SearchIcon position="start" sx={{ mr: 1 }} />,
                            endAdornment: <IconButton size='small' sx={{ mr: 1 }} onClick={() => setPesquisa('')} ><CloseIcon /></IconButton>,
                        }}
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                    />
                </Box>
                <List sx={{ width: '100%', maxWidth: 360, borderRadius: '15px', overflowY: 'auto', display: 'block', height: '80vh', padding: '0' }}>
                    {!!name && chats.map((item, index) => {
                        const findindex = item.ultimasVisualizacoes.findIndex(e => e.nome === name)
                        let showBadge = true
                        if (findindex !== -1) {
                            if (findindex !== -1 && item.ultimasVisualizacoes[findindex]?.quantidade === 0) {
                                showBadge = false
                            }
                        }
                        const truncatedMessage = truncateMessage(item.ultimaMensagem, MAX_MESSAGE_LENGTH)
                        return (
                            <>
                                <ListItemButton selected={selectedId === item._id} key={item._id} sx={{ p: 0 }} onClick={() => setChat(item, index)}>
                                    <ListItem alignItems="flex-start"
                                        secondaryAction={
                                            showBadge && (
                                                <Badge color="info" badgeContent={
                                                    item.ultimasVisualizacoes[findindex]?.quantidade
                                                } />
                                            )
                                        }
                                    >
                                        <ListItemAvatar>
                                            {
                                                item.tipo === 'Grupo' ? (
                                                    <Avatar alt={item.nome} src={`${process.env.REACT_APP_CHAT_SERVICE}/media/${item.imageGroup}`} />
                                                ) : (
                                                    <Badge
                                                        overlap="circular"
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'right',
                                                        }}
                                                        invisible={true}
                                                        variant="dot"
                                                        color={item.online ? 'success' : 'error'}
                                                    >
                                                        <Avatar alt={(verificarNome(item.participantes))} src={`${process.env.REACT_APP_API_KEY}/media/profilePic/${(verificarNome(item.participantes)).split(' ').join('%20')}.jpg`} />
                                                    </Badge>
                                                )
                                            }
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.tipo === 'Grupo' ? item.nome : (verificarNome(item.participantes))}
                                            secondary={
                                                item.quemEnviouUltimaMensagem === name ? (
                                                    <>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <DoneAllIcon sx={{ color: item.visualizado ? 'green' : 'gray', width: '14px' }} />
                                                                <Box>{truncatedMessage}</Box>
                                                            </Box>
                                                            <Box sx={{ ml: 1, fontSize: '12px' }}>{moment(item.horarioUltimaMensagem).format('HH:mm')}</Box>
                                                        </Box>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Box >{truncatedMessage}</Box>
                                                            </Box>
                                                            <Box sx={{ ml: 1, fontSize: '12px' }}>{moment(item.horarioUltimaMensagem).format('HH:mm')}</Box>
                                                        </Box>
                                                    </>
                                                )

                                            }
                                        />
                                    </ListItem>
                                </ListItemButton>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                                    <Divider sx={{ bgcolor: grey[300], width: '90%' }} />
                                </Box>
                            </>
                        )
                    })}
                </List>
            </CardContent>
        </Card>
    );
}

export default CardPessoasGrupos;

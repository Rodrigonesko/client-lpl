import React, { useContext } from 'react';
import { Avatar, Badge, Card, CardContent, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { grey } from '@mui/material/colors';
import ModalCriarGrupo from '../Modal/ModalCriarGrupo';
import ModalIniciarConversa from '../Modal/ModalIniciarConversa';
import { Box } from '@mui/system';
import AuthContext from '../../../context/AuthContext';
import { seeInternalMessage } from '../../../_services/chat.service';

const CardPessoasGrupos = ({ setReceptor, chats, setChatId, setFlushHook }) => {

    const { name } = useContext(AuthContext)

    const color = grey[300];
    const color1 = grey[400];

    const verificarNome = (participantes) => {
        if (participantes[0] === name) {
            return participantes[1]
        } else {
            return participantes[0]
        }
    }

    const setChat = async (chat) => {
        if (chat.tipo === 'Grupo') {
            setReceptor(chat.nome)
        } else {
            setReceptor(verificarNome(chat.participantes))
        }
        await seeInternalMessage({ chatId: chat._id })
        setChatId(chat._id)
        setFlushHook(true)
    };

    return (
        <Card sx={{ minWidth: 275, width: '360px', mb: `20px`, bgcolor: color, borderRadius: `10px`, height: `90vh` }}>
            <CardContent>
                <Box mb={1} >
                    <ModalIniciarConversa setReceptor={setReceptor} setFlushHook={setFlushHook} setChatId={setChatId} />
                    <ModalCriarGrupo setReceptor={setReceptor} setFlushHook={setFlushHook} />
                </Box>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: color1, borderRadius: '15px' }}>
                    {!!name && chats.map((item) => {
                        const index = item.ultimasVisualizacoes.findIndex(e => e.nome === name)
                        let showBadge = true
                        if (item.ultimasVisualizacoes[index].quantidade === 0) {
                            showBadge = false
                        }
                        return (
                            <ListItemButton key={item._id} sx={{ p: 0 }} onClick={() => setChat(item)}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar src={`${process.env.REACT_APP_CHAT_SERVICE}/media/${item.imageGroup}`} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.tipo === 'Grupo' ? item.nome : (verificarNome(item.participantes))}
                                        secondary={item.ultimaMensagem}
                                    />
                                </ListItem>
                                {
                                    showBadge && (
                                        <Badge color="info" badgeContent={item.ultimasVisualizacoes[index].quantidade} />
                                    )
                                }
                                <Divider />
                            </ListItemButton>
                        )
                    })}
                </List>
            </CardContent>
        </Card>
    );
}

export default CardPessoasGrupos;

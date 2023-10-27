import React, { useContext } from 'react';
import { Avatar, Card, CardContent, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import ModalCriarGrupo from '../Modal/ModalCriarGrupo';
import ModalIniciarConversa from '../Modal/ModalIniciarConversa';
import { Box } from '@mui/system';
import AuthContext from '../../../context/AuthContext';


const CardPessoasGrupos = ({ flushHook, receptor, setReceptor, chats, setChatId }) => {

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

    const setChat = (chat) => {
        if (chat.tipo === 'grupo') {
            setReceptor(chat.nome)
        } else {
            setReceptor(verificarNome(chat.participantes))
        }

        setChatId(chat._id)
    }

    return (
        <Card sx={{ minWidth: 275, width: '360px', mb: `20px`, bgcolor: color, borderRadius: `10px`, height: `90vh` }}>
            <CardContent>
                <Box mb={1} >
                    <ModalIniciarConversa setReceptor={setReceptor} />
                    <ModalCriarGrupo />
                </Box>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: color1, borderRadius: '15px' }}>
                    {!!name && chats.map((item) => (
                        <ListItemButton sx={{ p: 0 }} onClick={() => setChat(item)}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="R" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.tipo === 'grupo' ? item.nome : (verificarNome(item.participantes))}
                                    secondary={item.ultimaMensagem}
                                />
                            </ListItem>
                            <Divider />
                        </ListItemButton>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}

export default CardPessoasGrupos;

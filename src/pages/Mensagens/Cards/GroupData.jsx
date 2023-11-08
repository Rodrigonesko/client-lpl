import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tooltip, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect, useState } from "react";
import { getMessages } from "../../../_services/chat.service";
import ModalRemoverPessoaDoGrupo from "../Modal/ModalRemoverPessoaDoGrupo";
import ModalAdicionarPessoaNoGrupo from "../Modal/ModalAdicionarPessoaNoGrupo";
import ModalSairDoGrupo from "../Modal/ModalSairDoGrupo";
import ModalAdicionarAdmin from "../Modal/ModalAdicionarAdmin";
import AuthContext from "../../../context/AuthContext";
import ModalAlterarImagemGrupo from "../Modal/ModalAlterarImagemGrupo";

const GroupData = ({ chatId }) => {

    const [data, setData] = useState({})
    const [flushHook, setFlushHook] = useState(false)
    const { name } = useContext(AuthContext)

    const fetchData = async () => {
        const result = await getMessages({ chatId, nome: null })
        console.log(result);
        setData(result)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [chatId, flushHook])

    return (
        <Box width={'40%'}>
            <Typography p={2} component="div" bgcolor={grey[500]} color='white'>
                Dados do grupo
            </Typography>
            <Box textAlign={"center"} mt={2}>
                {
                    !!data._id && (<ModalAlterarImagemGrupo setFlushHook={setFlushHook} chatId={data._id} groupImage={`${process.env.REACT_APP_CHAT_SERVICE}/media/${data.imageGroup}`} />)
                }
                <Typography>
                    {data.nome}
                    <Tooltip title='Editar'>
                        <IconButton size="small">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </Typography>
            </Box>
            <Divider sx={{ mt: '10px', mb: '10px' }} />
            <Box>
                <List dense sx={{ width: '100%', display: 'block', overflowY: 'auto', maxHeight: '400px' }}>
                    {!!data.participantes && data.participantes.map((participante) => {
                        return (
                            <ListItem
                                key={participante}
                                secondaryAction={!!data.administradores && data.administradores.includes(name) && (<>
                                    <ModalRemoverPessoaDoGrupo setFlushHook={setFlushHook} participante={participante} chatId={chatId} />
                                    <ModalAdicionarAdmin setFlushHook={setFlushHook} participante={participante} chatId={chatId} />
                                </>)
                                }
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`${participante}`}
                                            src={`/static/images/avatar/${participante + 1}.jpg`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary={participante} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
            <Box>
                {
                    !!data.administradores && data.administradores.includes(name) && (
                        <ModalAdicionarPessoaNoGrupo membros={data.participantes} chatId={chatId} setFlushHook={setFlushHook} />
                    )
                }
                <ModalSairDoGrupo chatId={chatId} setFlushHook={setFlushHook} />
            </Box>
        </Box>
    )
}

export default GroupData
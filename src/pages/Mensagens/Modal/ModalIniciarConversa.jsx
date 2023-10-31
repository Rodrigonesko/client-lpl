import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tooltip } from "@mui/material"
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useState } from "react";
import { getUsers } from "../../../_services/user.service";
const ModalIniciarConversa = ({ setReceptor, setFlushHook, setChatId }) => {

    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
        fetchData()
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        const result = await getUsers()
        setUsers(result)
    }

    const initChat = (nome) => {
        setReceptor(nome)
        setChatId(null) 
        setFlushHook(true)
        handleClose()
    }

    return (
        <>
            <Tooltip title='Iniciar Conversa'>
                <Button onClick={handleClickOpen} variant="outlined" size="small" sx={{ mr: '4px' }}><AddCommentIcon /></Button>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"iniciar conversa"}
                </DialogTitle>
                <DialogContent>
                    {
                        users.map(user => {
                            return (
                                <ListItemButton onClick={() => initChat(user.name)}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="R" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            secondary={user.name}
                                        />
                                    </ListItem>
                                    <Divider />
                                </ListItemButton>
                            )
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default ModalIniciarConversa
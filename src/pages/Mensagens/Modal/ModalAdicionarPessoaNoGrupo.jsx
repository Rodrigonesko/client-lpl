import { Avatar, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState } from "react";
import { getUsers } from "../../../_services/user.service";
import { addPartipants } from "../../../_services/chat.service";

const ModalAdicionarPessoaNoGrupo = ({ membros, chatId, setFlushHook }) => {

    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([])
    const [checked, setChecked] = useState([0]);

    const handleClickOpen = () => {
        fetchData()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUsers([])
        setChecked([0]);
    };

    const fetchData = async () => {
        const result = await getUsers();
        const filter = result.filter(user => !membros.includes(user.name))
        setUsers(filter);
    }

    const handleUserSelection = (user) => {
        const isUserSelected = selectedUsers.includes(user);

        if (isUserSelected) {
            setSelectedUsers(selectedUsers.filter((u) => u !== user));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }

        const newChecked = [...checked];
        if (isUserSelected) {
            newChecked.splice(newChecked.indexOf(user), 1);
        } else {
            newChecked.push(user);
        }
        setChecked(newChecked);
    }

    const handleAddParticipant = async () => {
        try {

            const result = await addPartipants({
                chatId,
                participantes: selectedUsers
            })

            console.log(result);
            setFlushHook(true)
            handleClose()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Tooltip title='Adicionar membro'>
                <Button variant="outlined" onClick={handleClickOpen}>
                    <PersonAddIcon />
                </Button>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {"Adicionar participante"}
                </DialogTitle>
                <DialogContent>
                    {users.map(user => {
                        return (
                            <ListItemButton key={user._id} onClick={() => handleUserSelection(user.name)}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="R" />
                                    </ListItemAvatar>
                                    <ListItemText secondary={user.name} />
                                </ListItem>
                                <ListItemButton role={undefined} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(user.name) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': user.name }}
                                        />
                                    </ListItemIcon>
                                </ListItemButton>
                                <Divider />
                            </ListItemButton>
                        );
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="inherit" >Fechar</Button>
                    <Button onClick={handleAddParticipant} color="info" variant="contained" autoFocus>
                        Adicionar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalAdicionarPessoaNoGrupo
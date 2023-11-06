import { useState, useEffect } from 'react';
import { Dialog, Button, DialogTitle, DialogContent, ListItemButton, ListItemAvatar, Avatar, ListItemText, Checkbox, ListItemIcon, Divider, DialogActions, ListItem } from '@mui/material';
import { getUsers } from '../../../_services/user.service';

const ModalEditarNomeGrupo = ({ groupId, finishEditName }) => {

    const [flushHook, setFlushHook] = useState(false);
    const [open, setopen] = useState(false);
    const [checked, setchecked] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleClose = () => {
        finishEditName();
    }

    const handleSave = () => {

    }

    const handleClickOpen = () => {
        setopen(true);
        setNewGroupName('')
        fetchData();
    }

    const fetchData = async () => {
        const result = await getUsers();
        setUsers(result);
    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()
    }, [flushHook])

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
        setchecked(newChecked);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Qual o Nome Novo do Grupo"}
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
                <Button onClick={handleClose}>Fechar</Button>
                <Button onClick={handleClickOpen}>Adicionar Nome ao Grupo</Button>
            </DialogActions>
        </Dialog >
    )
}

export default ModalEditarNomeGrupo
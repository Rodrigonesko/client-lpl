import { Avatar, Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, TextField, Tooltip } from "@mui/material"
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useContext, useState } from "react";
import { getUsers } from "../../../_services/user.service";
import { createGroupChat } from "../../../_services/chat.service";
import { useEffect } from "react";
import AuthContext from "../../../context/AuthContext";

const ModalCriarGrupo = ({ setFlushHook, flushHook }) => {

    const [open, setOpen] = useState(false);
    const [openNome, setOpenNome] = useState(false);
    const [users, setUsers] = useState([]);
    const { name } = useContext(AuthContext)

    const [userAux, setUserAux] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [checked, setChecked] = useState([0]);

    const handleClickOpen = () => {
        setOpen(true);
        setGroupName('')
        setChecked([0])
        fetchData();
    };

    const handleClickOpenNome = () => {
        setOpenNome(true);
        fetchData();
    };

    const handleClose = () => {
        setOpen(false);
        setOpenNome(false);
    };

    const fetchData = async () => {
        let result = await getUsers();
        result = result.filter(e => (e.name !== name))
        setUsers(result);
        setUserAux(result);

    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()
    }, [flushHook])

    const createGroup = async () => {
        await createGroupChat({
            nome: groupName,
            participantes: selectedUsers
        })

        setFlushHook(true)
        setGroupName('')
        setSelectedUsers([])
        setChecked([0])
        handleClose();
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

    const handleChange = async (event) => {
        let arrayAux = users.filter(e => (e.name.toLowerCase().includes(event.target.value.toLowerCase())))
        setUserAux(arrayAux)

    }


    return (
        <>
            <Tooltip title='Criar Grupo'>
                <Button onClick={handleClickOpen} variant="outlined" size="small"><GroupAddIcon /></Button>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Criar Grupo"}
                </DialogTitle>
                <Divider sx={{ mt: '10px', mb: '10px' }} />
                <DialogContent>
                    <form action="">
                        <TextField type='text' onChange={handleChange} label='Buscar Pessoas' size='small' sx={{ paddingRight: '3px', width: '24vw' }} />
                    </form>
                    <Box>
                        {selectedUsers.map((user) => (
                            <Chip
                                key={user}
                                label={user}
                                onDelete={() => handleUserSelection(user)}
                                sx={{ m: 0.5 }}
                            />
                        ))}
                    </Box>
                    {userAux.map(user => {
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
                    <Button onClick={handleClickOpenNome}>Adicionar Nome ao Grupo</Button>
                </DialogActions>
            </Dialog >
            <Dialog
                open={openNome}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Criar Grupo"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        type="text"
                        label="Nome do grupo"
                        margin="normal"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={() => createGroup(selectedUsers)}>Criar Grupo</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalCriarGrupo;

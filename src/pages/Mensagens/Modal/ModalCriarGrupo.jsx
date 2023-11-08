import { Alert, Avatar, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Snackbar, TextField, Tooltip } from "@mui/material"
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useState } from "react";
import { getUsers } from "../../../_services/user.service";
import { createGroupChat } from "../../../_services/chat.service";
import { useEffect } from "react";
import axios from "axios";

const ModalCriarGrupo = ({ setFlushHook, flushHook }) => {

    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [openNome, setOpenNome] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [checked, setChecked] = useState([0]);

    const [solicitacoes, setSolicitacoes] = useState([])
    const [alerta, setAlerta] = useState(false)

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
        const result = await getUsers();
        setUsers(result);
    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()
    }, [flushHook])

    const createGroup = async () => {
        const newGroup = await createGroupChat({
            nome: groupName,
            participantes: selectedUsers
        })

        setFlushHook(true)
        console.log("Novo Grupo:", newGroup);
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

    const handleFilter = async (event) => {
        event.preventDefault()

        if (nome.length > 2) {
            const result = await axios.get(`${process.env.REACT_APP_API_KEY}/internMessage/filter?nome=${nome}`, {
                withCredentials: true
            })
            console.log(result)
            setSolicitacoes(result.participantes)
        } else {
            setAlerta(true)
            return
        }
    }

    const handleCloseInput = () => {
        setAlerta(false)
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
                    <form action=''>
                        <TextField type='text' onChange={(e) => { setNome(e.target.value) }} label='Buscar Pessoas' size='small' sx={{ paddingRight: '3px', width: '17vw' }} />
                        <Button variant='contained' onClick={handleFilter} >Pesquisar</Button>
                    </form>
                    <Snackbar open={alerta} autoHideDuration={6000} onClose={handleCloseInput}>
                        <Alert variant="filled" onClose={handleCloseInput} severity="warning" sx={{ width: '100%' }}>
                            Digite no minimo 3 caracteres!
                        </Alert>
                    </Snackbar>
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

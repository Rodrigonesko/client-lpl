import { PersonOutlineOutlined } from "@mui/icons-material"
import { Avatar, Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, TextField, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { filterUsers } from "../../../../_services/user.service"
import { addColaboradoresManual } from "../../../../_services/treinamento.service"

const ModalAddUserTreinamentos = ({ nome, nomeUsuarios, id, setFlushHook, flushHook }) => {

    const [openAddUser, setOpenAddUser] = useState(false)

    const [selectedUsers, setSelectedUsers] = useState([])
    const [checked, setChecked] = useState([0]);
    const [userAux, setUserAux] = useState([]);
    const [users, setUsers] = useState([]);

    const handleClickOpen = () => {
        setOpenAddUser(true)
        setChecked([0])
        handleSeeColaborador()
    }
    const handleClose = () => {
        setOpenAddUser(false)
    }

    const handleSeeColaborador = async () => {
        try {
            let see = await filterUsers({
                inativo: { $ne: true }
            })

            see = see.filter(user => {
                const index = nomeUsuarios.findIndex(nomeUsuarios => nomeUsuarios.nome === user.name)
                return index === -1;
            })
            setUsers(see)
            setUserAux(see)
        } catch (error) {
            console.log(error);
        }
    }

    const addColaborador = async () => {
        try {
            for (const users of selectedUsers) {
                const add = await addColaboradoresManual({
                    nome: users.name,
                    _id: users._id,
                },
                    id
                )
                console.log(users);
            }
            setFlushHook(true)
            setSelectedUsers([])
            setChecked([0])
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleUserSelection = async (user) => {
        const isUserSelected = selectedUsers.findIndex((item) => item._id === user._id);

        if (isUserSelected !== -1) {
            setSelectedUsers(selectedUsers.filter((item) => item._id !== user._id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }

        const newChecked = [...checked];
        if (isUserSelected !== -1) {
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

    useEffect(() => {
        setFlushHook(false)
        handleSeeColaborador()
    }, [flushHook])

    return (
        <>
            <Tooltip title='Adicionar Usuário'>
                <Button onClick={handleClickOpen} variant='contained' color="primary" ><PersonOutlineOutlined /></Button>
            </Tooltip>
            <Dialog
                open={openAddUser}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {`Treinamento: ${nome}`}
                </DialogTitle>
                <Divider sx={{ mt: '10px', mb: '10px' }} />
                <DialogContent>
                    <form action="">
                        <TextField type='text' onChange={handleChange} label='Buscar Pessoas' size='small' sx={{ paddingRight: '3px', width: '24vw', mb: 2 }} />
                    </form>
                    <Box>
                        {selectedUsers.map((user) => (
                            <Chip
                                key={user._id}
                                label={user.name}
                                onDelete={() => handleUserSelection(user)}
                                sx={{ m: 0.5 }}
                            />
                        ))}
                    </Box>
                    {userAux.map(user => (
                        <ListItemButton key={user._id} onClick={() => handleUserSelection(user)}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={user.name} src={`${process.env.REACT_APP_API_KEY}/media/profilePic/${user.name?.split(' ').join('%20')}.jpg`} />
                                </ListItemAvatar>
                                <ListItemText secondary={user.name} />
                            </ListItem>
                            <Divider />
                        </ListItemButton>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error' >Fechar</Button>
                    <Button onClick={addColaborador} color='success' >Adicionar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalAddUserTreinamentos
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField, Tooltip } from "@mui/material"
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useContext, useState } from "react";
import { getUsers } from "../../../_services/user.service";
import AuthContext from "../../../context/AuthContext";

const ModalIniciarConversa = ({ setReceptor, setFlushHook, setChatId }) => {

    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([])
    const [userAux, setUserAux] = useState([]);
    const { name } = useContext(AuthContext)

    const handleChange = async (event) => {
        //Preciso pesquisar no users independente de maiusculo ou minusculo
        let arrayAux = users.filter(e => (e.name.toLowerCase().includes(event.target.value.toLowerCase())))
        setUserAux(arrayAux)
    }

    const handleClickOpen = () => {
        setOpen(true);
        fetchData()
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        let result = await getUsers()
        result = result.filter(e => (e.name !== name))
        setUsers(result)
        setUserAux(result)
    }

    const initChat = (nome) => {
        setReceptor(nome)
        setChatId('')
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
                <Divider sx={{ mt: '10px', mb: '10px' }} />
                <DialogContent>
                    <form action="">
                        <TextField type='text' onChange={handleChange} label='Buscar Pessoa' size='small' sx={{ paddingRight: '3px', width: '19vw' }} />
                    </form>
                    {userAux.map(user => {
                        return (
                            <ListItemButton onClick={() => initChat(user.name)}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={user.name} src={`${process.env.REACT_APP_API_KEY}/media/profilePic/${user.name.split(' ').join('%20')}.jpg`} />
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
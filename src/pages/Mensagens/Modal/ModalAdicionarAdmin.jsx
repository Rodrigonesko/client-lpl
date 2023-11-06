import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from "@mui/material"
import { useState } from "react";
import { addAdmin } from "../../../_services/chat.service";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
const ModalAdicionarAdmin = ({ participante, setFlushHook, chatId }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoverParticipante = async () => {
        try {
            const result = await addAdmin({ chatId, participante })
            setFlushHook(true)
            console.log(result);
            handleClose()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Tooltip title='Tornar Admin'>
                <IconButton onClick={handleClickOpen} color="info">
                    <AdminPanelSettingsIcon />
                </IconButton>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {"Tornar Admin"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        Tem certeza que deseja tornar o participante {participante} como administrador?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="inherit" >Fechar</Button>
                    <Button onClick={handleRemoverParticipante} color="info" variant="contained" autoFocus>
                        Adicionar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalAdicionarAdmin
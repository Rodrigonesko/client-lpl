import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { deleteParticipant } from "../../../_services/chat.service";

const ModalRemoverPessoaDoGrupo = ({ participante, setFlushHook, chatId }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoverParticipante = async () => {
        try {

            const result = await deleteParticipant({ chatId, participante })
            setFlushHook(true)
            console.log(result);
            handleClose()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Tooltip title='Remover'>
                <IconButton onClick={handleClickOpen} color="error">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {"Remover participante"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        Tem certeza que deseja remover o participante {participante}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="inherit" >Fechar</Button>
                    <Button onClick={handleRemoverParticipante} color="error" variant="contained" autoFocus>
                        Remover
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalRemoverPessoaDoGrupo
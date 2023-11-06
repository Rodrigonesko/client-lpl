import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material';
import { useState } from 'react';
import { leaveChat } from '../../../_services/chat.service';

const ModalSairDoGrupo = ({ chatId, setFlushHook }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLeave = async () => {
        try {
            const result = await leaveChat({ chatId })
            setFlushHook(true)
            console.log(result);
            handleClose()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Tooltip title='Sair'>
                <Button sx={{ml: '20px'}} variant='outlined' onClick={handleClickOpen} color="error">
                    <ExitToAppIcon />
                </Button>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {"Sair do grupo"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        Tem certeza que deseja sair do grupo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="inherit" >Fechar</Button>
                    <Button onClick={handleLeave} color="error" variant="contained" autoFocus>
                        Sair
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalSairDoGrupo
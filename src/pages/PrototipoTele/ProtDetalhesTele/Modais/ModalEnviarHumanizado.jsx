import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";

const ModalEnviarHumanizado = ({ objects }) => {

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Tooltip title='Mandar humanizado'>
                <Button onClick={handleClickOpen} color="secondary" variant="outlined" size="small" sx={{ margin: '10px' }}>
                    <SendIcon />
                </Button>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Mandar Humanizado</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja realmente mandar para o atendimento humanizado as propostas abaixo?
                    </DialogContentText>
                    <DialogContentText>
                        {objects.map((obj, index) => {
                            return (
                                <DialogContentText key={index}>
                                    {obj.nome}
                                </DialogContentText>
                            )
                        })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button color="secondary" onClick={handleClose}>Mandar</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default ModalEnviarHumanizado
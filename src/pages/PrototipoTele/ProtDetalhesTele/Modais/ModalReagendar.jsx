import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material"
import RestoreIcon from '@mui/icons-material/Restore';
import { useState } from "react";

const ModalReagendar = ({ objects }) => {

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Tooltip title='Reagendar'>
                <Button onClick={handleClickOpen} color="primary" variant="outlined" size="small" sx={{ margin: '10px' }}>
                    <RestoreIcon />
                </Button>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reagendar</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja realmente regendar as propostas abaixo?
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
                    <Button color="primary" onClick={handleClose}>Reagendar</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default ModalReagendar
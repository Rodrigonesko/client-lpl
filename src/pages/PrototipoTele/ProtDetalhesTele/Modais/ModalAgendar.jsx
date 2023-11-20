import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material"
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useState } from "react";

const ModalAgendar = ({ objects }) => {

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Tooltip title='Agendar'>
                <Button onClick={handleClickOpen} color="primary" variant="contained" size="small" sx={{ margin: '10px' }}>
                    <ScheduleIcon />
                </Button>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agendar</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Agendamento das propostas abaixo
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
                    <Button color="primary" onClick={handleClose}>Agendar</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default ModalAgendar
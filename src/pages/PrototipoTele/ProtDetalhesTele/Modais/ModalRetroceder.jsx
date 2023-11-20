import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material"
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from "react";

const ModalRetroceder = ({ objects }) => {

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Tooltip title='Retroceder'>
                <Button onClick={handleClickOpen} color="secondary" variant="contained" size="small" sx={{ margin: '10px' }}>
                    <UndoIcon />
                </Button>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Retroceder</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja realmente retroceder as propostas abaixo?
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
                    <Button color="secondary" onClick={handleClose}>Retroceder</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default ModalRetroceder
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";

const ModalCancelar = ({ objects }) => {

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Tooltip title='Cancelar'>
                <Button onClick={handleClickOpen} color="error" variant="contained" size="small" sx={{ margin: '10px' }}>
                    <CancelIcon />
                </Button>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cancelar</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja realmente Cancelar as propostas abaixo?
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
                    <Button color="error" onClick={handleClose}>Excluir</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default ModalCancelar
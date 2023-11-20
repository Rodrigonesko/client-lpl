import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";

const ModalDeletar = ({ objects }) => {

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Tooltip title='Excluir'>
                <Button onClick={handleClickOpen} color="error" variant="outlined" size="small" sx={{ margin: '10px' }}>
                    <DeleteForeverIcon />
                </Button>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Excluir</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja realmente excluir as propostas abaixo?
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

export default ModalDeletar
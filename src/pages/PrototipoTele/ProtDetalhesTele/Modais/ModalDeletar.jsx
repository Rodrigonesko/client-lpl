import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import Toast from "../../../../components/Toast/Toast";

const ModalDeletar = ({ objects, setFlushHook }) => {

    const [open, setOpen] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')


    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleDeletar = async () => {
        try {

            setSeverity('success')
            setMessage('Deletado com sucesso')
            setOpenToast(true)
            handleClose()
            setFlushHook(true)

        } catch (error) {
            setSeverity('error')
            setMessage('Algo deu errado')
            setOpenToast(true)
            console.log(error);
        }
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
                    <Button color="error" onClick={handleDeletar}>Excluir</Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                severity={severity}
                message={message}
            />

        </>
    )
}

export default ModalDeletar
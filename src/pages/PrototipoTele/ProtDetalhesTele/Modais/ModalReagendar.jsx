import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material"
import RestoreIcon from '@mui/icons-material/Restore';
import { useState } from "react";
import Toast from "../../../../components/Toast/Toast";
import { reagendarEntrevista } from "../../../../_services/teleEntrevista.service";

const ModalReagendar = ({ objects, setFlushHook }) => {

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

    const handleReagendar = async () => {
        try {

            for (const item of objects) {
                await reagendarEntrevista({ id: item._id })
            }

            setSeverity('success')
            setMessage('Reagendado com sucesso')
            setOpenToast(true)
            setFlushHook(true)
            handleClose()

        } catch (error) {
            setSeverity('error')
            setMessage('Algo deu errado')
            setOpenToast(true)
            console.log(error);
        }
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
                    <Button color="primary" onClick={handleReagendar}>Reagendar</Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                severity={severity}
                message={message}
                onClose={() => setOpenToast(false)}
            />
        </>
    )
}

export default ModalReagendar
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material"
import UndoIcon from '@mui/icons-material/Undo';
import { useContext, useState } from "react";
import Toast from "../../../../components/Toast/Toast";
import { retrocederEntrevista } from "../../../../_services/teleEntrevista.service";
import { PropostaService } from "../../../../_services/teleEntrevistaV2.service";
import AuthContext from "../../../../context/AuthContext";
const propostaService = new PropostaService()

const ModalRetroceder = ({ objects, setFlushHook }) => {

    const { name } = useContext(AuthContext)

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

    const handleRetroceder = async () => {
        try {

            for (const item of objects) {
                await propostaService.update({
                    _id: item._id,
                    $push: {
                        logs: {
                            responsavel: name,
                            acao: 'Retrocedeu entrevista',
                        }
                    }
                })
                const result = await retrocederEntrevista({ id: item._id })
                console.log(result);
            }

            setSeverity('success')
            setMessage('Retrocedido com sucesso')
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
                        {objects.filter((obj) => obj.newStatus === 'Cancelado').map((obj, index) => {
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
                    <Button color="secondary" onClick={handleRetroceder}>Retroceder</Button>
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

export default ModalRetroceder
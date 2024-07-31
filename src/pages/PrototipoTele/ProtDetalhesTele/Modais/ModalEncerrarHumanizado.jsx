import { Tooltip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Toast from "../../../../components/Toast/Toast"
import { useContext, useState } from "react"
import { encerrarAtendimentoHumanizado } from "../../../../_services/teleEntrevistaExterna.service"
import AuthContext from "../../../../context/AuthContext"
import { PropostaService } from "../../../../_services/teleEntrevistaV2.service"
const propostaService = new PropostaService()


const ModalEncerrarHumanizado = ({ objects, setFlushHook }) => {

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

    const handleEncerrarHumanizado = async () => {
        try {

            for (const item of objects) {
                await propostaService.update({
                    _id: item._id,
                    $push: {
                        logs: {
                            responsavel: name,
                            acao: 'Encerrou atendimento humanizado',
                        }
                    }
                })
                await encerrarAtendimentoHumanizado({
                    id: item._id,
                })
            }

            setSeverity('success')
            setMessage('Encerrado com sucesso')
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
            <Tooltip title='Encerrar Humanizado'>
                <Button onClick={handleClickOpen} color="warning" variant="outlined" size="small" sx={{ margin: '10px' }}>
                    <CheckCircleOutlineIcon />
                </Button>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Encerrar Humanizado</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja realmente encerrar humanizado as propostas abaixo?
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
                    <Button onClick={handleEncerrarHumanizado} autoFocus>Encerrar</Button>
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

export default ModalEncerrarHumanizado
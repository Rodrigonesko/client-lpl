import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { useContext, useState } from "react";
import Toast from "../../../../components/Toast/Toast";
import { mandarParaAtendimentoHumanizado } from "../../../../_services/teleEntrevista.service";
import { PropostaService } from "../../../../_services/teleEntrevistaV2.service";
import AuthContext from "../../../../context/AuthContext";
import moment from "moment";

const propostaService = new PropostaService()

const ModalEnviarHumanizado = ({ objects, setFlushHook }) => {

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

    const handleEnviarHumanizado = async () => {
        try {

            for (const item of objects) {
                await propostaService.update({
                    _id: item._id,
                    $push: {
                        logs: {
                            responsavel: name,
                            acao: 'Mandou para atendimento humanizado',
                            data: moment().format('YYYY-MM-DD HH:mm:ss')
                        }
                    }
                })
                await mandarParaAtendimentoHumanizado({ id: item._id })
            }

            setSeverity('success')
            setMessage('Enviado com sucesso')
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
                    <Button color="secondary" onClick={handleEnviarHumanizado}>Mandar</Button>
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

export default ModalEnviarHumanizado
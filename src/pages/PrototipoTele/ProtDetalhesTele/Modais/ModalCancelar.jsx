import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, Tooltip, Typography } from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext, useState } from "react";
import Toast from "../../../../components/Toast/Toast";
import AuthContext from "../../../../context/AuthContext";
import { PropostaService } from "../../../../_services/teleEntrevistaV2.service";
import moment from "moment";
const propostaService = new PropostaService()

const ModalCancelar = ({ objects, setFlushHook }) => {

    const { name } = useContext(AuthContext)

    const [open, setOpen] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')
    const [motivo, setMotivo] = useState('Sem Sucesso de Contato!')

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCancelar = async () => {
        try {
            for (const item of objects) {
                if(item.newStatus === 'Cancelado' || item.newStatus === 'Concluído') continue
                await propostaService.update({
                    _id: item._id,
                    $push: {
                        logs: {
                            responsavel: name,
                            acao: 'Cancelou entrevista',
                            data: moment().format('YYYY-MM-DD HH:mm:ss')
                        }
                    }
                })
                await propostaService.cancelar({
                    id: item._id,
                    motivo
                })
            }
            setSeverity('success')
            setMessage('Cancelado com sucesso')
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
                    <DialogContentText sx={{ m: 1 }}>
                        {objects.filter(obj => obj.newStatus !== 'Cancelado' && obj.newStatus !== 'Concluído').map((obj, index) => {
                            return (
                                <DialogContentText key={index}>
                                    {obj.nome}
                                </DialogContentText>
                            )
                        })}
                    </DialogContentText>
                    <FormControl component="fieldset" >
                        <Typography variant="body2">Motivo Cancelamento</Typography>
                        <RadioGroup
                            aria-label="canal"
                            defaultValue="Sem Sucesso de Contato!"
                            name="radio-buttons-group"
                            row
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                        >
                            <FormControlLabel value="Sem Sucesso de Contato!" control={<Radio />} label="Sem Sucesso de Contato!" />
                            <FormControlLabel value="Beneficiario Solicitou o Cancelamento" control={<Radio />} label="Beneficiario Solicitou o Cancelamento" />
                            <FormControlLabel value={"Não encontrado no Sistema"} control={<Radio />} label={"Não encontrado no Sistema"} />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button color="error" onClick={handleCancelar}>Cancelar</Button>
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

export default ModalCancelar
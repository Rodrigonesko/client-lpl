import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useContext, useState } from "react"
import Toast from "../../../../components/Toast/Toast"
import { PropostaService } from "../../../../_services/teleEntrevistaV2.service"
import moment from "moment"
import AuthContext from "../../../../context/AuthContext"
import { Cancel } from "@mui/icons-material"
const propostaService = new PropostaService()

const ModalEnviarCancelamento = ({
    propostas,
    setFlushHook
}) => {

    const { name } = useContext(AuthContext)

    const [open, setOpen] = useState(false)
    const [motivo, setMotivo] = useState('')
    const [loading, setLoading] = useState(false)
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const handleSendCancel = async () => {
        setLoading(true)
        try {
            for (const proposta of propostas) {
                await propostaService.update({
                    _id: proposta._id,
                    status: 'Cancelar',
                    newStatus: 'Cancelar',
                    cancelamento: {
                        motivo,
                        data: moment().format('YYYY-MM-DD HH:mm:ss'),
                        responsavel: name
                    },
                    $push: {
                        logs: {
                            data: moment().format('YYYY-MM-DD HH:mm:ss'),
                            responsavel: name,
                            acao: 'Mandou para o cancemamento',
                        }
                    }
                })
            }
            setFlushHook(true)
            setToastMessage('Cancelamento enviado com sucesso')
            setSeverity('success')
            setToastOpen(true)
            setOpen(false)
            setLoading(false)
        } catch (error) {
            setToastMessage('Não foi possível enviar o cancelamento')
            setSeverity('error')
            setToastOpen(true)
            setLoading(false)
        }
    }

    return (
        <>
            <Button
                variant="contained"
                onClick={() => setOpen(true)}
                color="error"
                endIcon={<Cancel />}
            >
                Mandar para Cancelamento
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Enviar Cancelamento</DialogTitle>
                <DialogContent>
                    <Box m={2}>
                        <Box display={'flex'} m={1} gap={1} flexDirection={'column'}>
                            {
                                propostas.map((proposta, index) => (
                                    <Box key={index}>
                                        {proposta.nome}
                                    </Box>
                                ))
                            }
                        </Box>
                        <TextField
                            label="motivo"
                            variant="outlined"
                            size="small"
                            value={motivo}
                            onChange={event => setMotivo(event.target.value)}
                            fullWidth
                            multiline
                            rows={4}
                            disabled={loading}
                        />
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        variant="contained"
                        color="inherit"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSendCancel}
                        disabled={loading}
                    >
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={toastOpen}
                onClose={() => setToastOpen(false)}
                message={toastMessage}
                severity={severity}
            />
        </>
    )
}

export default ModalEnviarCancelamento
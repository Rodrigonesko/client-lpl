import { Add } from "@mui/icons-material"
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"
import { createPacoteAPartiDoPedido } from "../../../../_services/rsdBradesco.service"
import Toast from "../../../../components/Toast/Toast"
import { useNavigate } from "react-router-dom"

const ModalNovoPacote = ({
    pedido
}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleCreatePacote = async () => {
        try {
            setLoading(true)
            const pacote = await createPacoteAPartiDoPedido(pedido._id)
            setLoading(false)
            setOpenToast(true)
            setMessage('Pacote criado com sucesso')
            setSeverity('success')
            navigate(`/bradesco/protocolos/${pacote._id}`)

        } catch (error) {
            console.log(error);
            setLoading(false)
            setOpenToast(true)
            setMessage('Erro ao criar pacote')
            setSeverity('error')
        }
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                variant='contained'
                color="secondary"
                endIcon={<Add />}
            >
                Mover sinistro
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle>
                    Mover sinistro
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja criar outro pacote para o sinistro {pedido.sinistro}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        variant="contained"
                        color="inherit"
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleCreatePacote}
                        variant="contained"
                        color="secondary"
                        disabled={loading}
                        endIcon={loading && <CircularProgress size={20} />}
                    >
                        Criar
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                message={message}
                severity={severity}
            />
        </>
    )
}

export default ModalNovoPacote
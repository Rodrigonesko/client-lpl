import { Add } from "@mui/icons-material";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, CircularProgress } from "@mui/material"
import moment from "moment";
import { useState } from "react";
import Toast from "../../../../components/Toast/Toast";
import { createPacote } from "../../../../_services/rsdBradesco.service";

const ModalCriarPacote = ({
    titular,
    setFlushHook
}) => {

    const [open, setOpen] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [loading, setLoading] = useState(false)

    const handleOpenModal = () => {
        setOpen(true);
    }

    const handleCreate = async () => {
        setLoading(true)
        try {
            await createPacote(titular)
            setMessage('Pacote criado com sucesso')
            setSeverity('success')
            setOpenToast(true)
            setFlushHook(prev => !prev)
            setOpen(false)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setMessage('Erro ao criar pacote')
            setSeverity('error')
            setOpenToast(true)
            setLoading(false)
        }
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
                endIcon={<Add />}
            >
                Novo Pacote
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    Criar Pacote
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Criar pacote {moment().format('YYYYMMDD')}{titular?.codigo}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        color="inherit"
                        variant="contained"
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleCreate}
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

export default ModalCriarPacote;
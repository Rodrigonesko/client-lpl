import { Send } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress } from "@mui/material";
import { useState } from "react";

const ModalEnviarMensagens = ({
    propostas,
    enviarMensagem
}) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)

    const enviar = async () => {
        setLoading(true)
        for (let i = 0; i < propostas.length; i++) {
            await enviarMensagem(propostas[i])
            setProgress((i + 1) / propostas.length * 100)
        }
        setLoading(false)
        setOpen(false)
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                endIcon={<Send />}
                onClick={() => setOpen(true)}
            >
                Enviar Todas
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Enviar Mensagens</DialogTitle>
                <DialogContent>
                    {
                        loading ? (
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                            />
                        ) : (
                            <p>
                                Deseja enviar {propostas.length} mensagens?
                            </p>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={enviar}
                    >
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalEnviarMensagens;
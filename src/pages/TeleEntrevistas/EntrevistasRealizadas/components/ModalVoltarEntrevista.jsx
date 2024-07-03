import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material"
import { useState } from "react"
import { voltarEntrevista } from "../../../../_services/teleEntrevistaV2.service"
import Toast from "../../../../components/Toast/Toast"

const ModalVoltarEntrevista = ({ entrevista }) => {

    const [open, setOpen] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    return (
        <>
            <Button color="warning" variant="contained" onClick={() => setOpen(true)}>
                Voltar
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Voltar Entrevista</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja realmente voltar a entrevista do beneficiario {entrevista?.nome}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        color="inherit"
                        variant="contained"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={async () => {
                            try {
                                await voltarEntrevista(entrevista._id)
                                setOpen(false)
                                setOpenToast(true)
                                setMessage('Entrevista voltada com sucesso')
                                setSeverity('success')
                            } catch (error) {
                                console.log(error);
                                setOpenToast(true)
                                setMessage('Erro ao voltar entrevista')
                                setSeverity('error')
                            }
                        }
                        }
                        color="warning"
                        variant="contained"
                    >
                        Voltar
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

export default ModalVoltarEntrevista
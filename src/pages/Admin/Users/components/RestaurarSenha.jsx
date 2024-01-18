import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useState } from "react"
import Toast from "../../../../components/Toast/Toast"
import { restaurarSenha } from "../../../../_services/user.service"

const RestaurarSenha = ({
    user
}) => {

    const [open, setOpen] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleRestaurarSenha = async () => {
        try {
            await restaurarSenha({ email: user.email })
            setMessage('Senha restaurada com sucesso!')
            setSeverity("success")
            setOpenToast(true)
            setOpen(false)
        } catch (error) {
            setMessage('Erro!')
            setSeverity("error")
            setOpenToast(true)
        }
    }

    return (
        <>
            <Button
                type='button'
                variant='contained'
                onClick={() => setOpen(true)}
                sx={{
                    bgcolor: 'orange',
                    color: 'white',
                    '&:hover': {
                        opacity: 0.8,
                        bgcolor: 'orange',
                    },
                    transition: 'opacity 0.3s'
                }}
            >
                Restaurar Senha
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    Restaurar Senha
                </DialogTitle>
                <DialogContent>
                    <p>
                        Deseja realmente restaurar a senha do usuário?
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        sx={{
                            color: 'gray',
                            '&:hover': {
                                opacity: 0.8,
                                color: 'gray',
                            },
                            transition: 'opacity 0.3s'
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant='contained'
                        sx={{
                            bgcolor: 'orange',
                            color: 'white',
                            '&:hover': {
                                opacity: 0.8,
                                bgcolor: 'orange',
                            },
                            transition: 'opacity 0.3s'
                        }}
                        onClick={handleRestaurarSenha}
                    >
                        Confirmar
                    </Button>
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

export default RestaurarSenha
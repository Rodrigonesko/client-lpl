import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from "@mui/material"
import { green, grey } from "@mui/material/colors"
import { useState } from "react"
import { implantarProposta } from "../../../../../_services/teleEntrevista.service"
import Toast from "../../../../../components/Toast/Toast"

const ModalImplantar = ({
    proposta,
    setFlushHook
}) => {

    const [open, setOpen] = useState(false)
    const [toast, setToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleConcluir = async () => {
        await implantarProposta({ id: proposta._id })
        setFlushHook(true)
        setOpen(false)
        setMessage('Proposta implantada com sucesso!')
        setSeverity('success')
        setToast(true)
    }

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    bgcolor: green[100],
                    color: green[800],
                    '&:hover': {
                        bgcolor: green[200],
                        opacity: 0.8,
                    },
                }}
                onClick={handleClickOpen}
            >
                Concluir
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '30%',
                                    height: '2px',
                                    bottom: 0,
                                    left: '0%',
                                    backgroundColor: green[800],
                                    transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                                },
                                '&:hover::after': {
                                    width: '100%',
                                    left: '0%',
                                },
                            }}
                        >
                            Concluir
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Divider />
                    <Typography
                        variant="body1"
                    >
                        Gostaria de concluir a proposta {proposta.proposta} do beneficiario {proposta.nome}?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        sx={{
                            bgcolor: grey[100],
                            color: grey[800],
                            '&:hover': {
                                bgcolor: grey[500],
                                opacity: 0.8,
                            },
                        }}
                    >
                        Fechar
                    </Button>
                    <Button
                        onClick={handleConcluir}
                        variant="contained"
                        sx={{
                            bgcolor: green[100],
                            color: green[800],
                            '&:hover': {
                                bgcolor: green[500],
                                opacity: 0.8,
                            },
                        }}
                    >
                        Concluir
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={toast}
                onClose={() => setToast(false)}
                severity={severity}
                message={message}
            />
        </>
    )
}

export default ModalImplantar
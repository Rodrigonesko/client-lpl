import { Undo } from "@mui/icons-material"
import { Box, MenuItem, Dialog, DialogContent, DialogTitle, DialogActions, Button, DialogContentText, CircularProgress } from "@mui/material"
import { useState } from "react"
import { HorarioService } from "../../../../../_services/teleEntrevistaV2.service"
import moment from "moment"
import Toast from "../../../../../components/Toast/Toast"

const horarioService = new HorarioService()

const ModalReagendar = ({ proposta, setRefresh }) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleReagendar = async () => {
        try {
            setLoading(true)
            const response = await horarioService.reagendar(proposta._id, {
                enfermeiro: proposta.enfermeiro,
                dia: moment(proposta.dataEntrevista).format('YYYY-MM-DD'),
                horario: moment(proposta.dataEntrevista).format('HH:mm')
            })
            console.log(response);
            setRefresh(true)
            setLoading(false)
            setOpen(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            setOpenToast(true)
            setMessage('Erro ao reagendar')
            setSeverity('error')
        }
    }

    return (
        <>
            <MenuItem
                onClick={() => setOpen(true)}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={"space-between"}
                    gap={1}
                    width={'100%'}
                >
                    Reagendar <Undo />
                </Box>
            </MenuItem>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Reagendar Entrevista</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Tem certeza que deseja reagendar a propsota {proposta.proposta}?
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
                        onClick={handleReagendar}
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        endIcon={loading && <CircularProgress size={20} />}
                    >
                        Reagendar
                    </Button>
                </DialogActions>
                <Toast
                open={openToast}
                message={message}
                severity={severity}
                onClose={() => setOpenToast(false)}
            />
            </Dialog>
        </>
    )
}

export default ModalReagendar
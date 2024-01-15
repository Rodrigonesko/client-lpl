import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useState } from "react";
import Toast from "../../../../../components/Toast/Toast";
import { gerarHorariosEntrevistas } from "../../../../../_services/teleEntrevista.service";

const GerarHorarios = () => {

    const [open, setOpen] = useState(false)
    const [data, setData] = useState('')
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleGerarHorarios = async () => {
        try {
            if (data === '') {
                setMessage('Por favor selecione uma data')
                setSeverity("error")
                setOpenToast(true)
                return
            }
            await gerarHorariosEntrevistas({ dataGerar: data })
            setMessage('Horario gerados com sucesso!')
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
                    bgcolor: blueGrey[100],
                    color: blueGrey[900],
                    '&:hover': {
                        bgcolor: blueGrey[200],
                        color: blueGrey[900],
                    },
                }}
            >
                Gerar Horarios
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    Gerar Horarios
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            m: 2
                        }}
                    >
                        <TextField
                            label='Gerar horarios'
                            size='small'
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={data}
                            onChange={e => setData(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        onClick={handleGerarHorarios}
                        sx={{
                            bgcolor: blueGrey[100],
                            color: blueGrey[900],
                            '&:hover': {
                                bgcolor: blueGrey[200],
                                color: blueGrey[900],
                            },
                        }}
                    >
                        Gerar
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                message={message}
                severity={severity}
                onClose={() => setOpenToast(false)}
            />
        </>
    )
}

export default GerarHorarios;
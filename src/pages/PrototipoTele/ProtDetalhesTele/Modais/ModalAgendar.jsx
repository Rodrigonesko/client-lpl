import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Tooltip, Typography } from "@mui/material"
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useState } from "react";
import Agendamento from "../Components/Agendamento";
import { Delete } from "@mui/icons-material";
import Toast from "../../../../components/Toast/Toast";
import { agendarEntrevista } from "../../../../_services/teleEntrevista.service";

const ModalAgendar = ({ objects, setFlushHook }) => {

    const [open, setOpen] = useState(false)
    const [agendamentos, setAgendamentos] = useState([])
    const [canal, setCanal] = useState('')
    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')

    const handleAgendar = (analista, data, horario, pessoa, _id) => {
        if (analista === '' || data === '' || horario === '' || pessoa === '' || _id === '') {
            return
        }
        const agendamento = agendamentos.find(agendamento => {
            return agendamento.pessoa === pessoa
        })
        if (agendamento) {
            const index = agendamentos.indexOf(agendamento)
            setAgendamentos(prevAgendamentos => {
                prevAgendamentos[index] = { analista, data, horario, pessoa, _id }
                return [...prevAgendamentos]
            })
            return
        }
        setAgendamentos(prevAgendamentos => [...prevAgendamentos, { analista, data, horario, pessoa, _id }]);
    }

    const handleDelete = (pessoa) => {
        const agendamento = agendamentos.find(agendamento => {
            return agendamento.pessoa === pessoa
        })
        const index = agendamentos.indexOf(agendamento)
        setAgendamentos(prevAgendamentos => {
            prevAgendamentos.splice(index, 1)
            return [...prevAgendamentos]
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setAgendamentos([])
    }

    const handleRealizarAgendamento = async () => {
        if (agendamentos.length === 0) {
            setSeverity('error')
            setMessage('Nenhum agendamento realizado')
            setOpenToast(true)
            return
        }
        if (canal === '') {
            setSeverity('error')
            setMessage('Selecione um canal')
            setOpenToast(true)
            return
        }
        try {
            for (const item of agendamentos) {
                const result = await agendarEntrevista({
                    id: item._id,
                    responsavel: item.analista,
                    data: item.data, horario:
                        item.horario,
                    canal
                })
                console.log(result);
            }
            setSeverity('success')
            setMessage('Agendamento realizado com sucesso')
            setOpenToast(true)
            setFlushHook(true)
            handleClose()
        } catch (error) {
            console.log(error);
            setSeverity('error')
            setMessage('Erro ao realizar agendamento')
            setOpenToast(true)
        }
    }

    return (
        <>
            <Tooltip title='Agendar'>
                <Button onClick={handleClickOpen} color="primary" variant="contained" size="small" sx={{ margin: '10px' }}>
                    <ScheduleIcon />
                </Button>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agendar</DialogTitle>
                <DialogContent>
                    {/**/}
                    {objects.filter((item) => {
                        return item.newStatus !== 'Agendado' && item.newStatus !== 'Cancelado' && item.newStatus !== 'Concluído'
                    }).map((obj, index) => {
                        return (

                            <Agendamento onAgendar={handleAgendar} obj={obj} />

                        )
                    })
                    }
                    <Box m={1}>
                        <Typography>Agendamentos</Typography>
                        {agendamentos.map((agendamento, index) => {
                            return (
                                <Box>
                                    <Typography variant="body2" key={index}>
                                        {agendamento.analista} - {agendamento.data} - {agendamento.horario} - {agendamento.pessoa}
                                        <Tooltip title='Excluir'>
                                            <IconButton onClick={() => handleDelete(agendamento.pessoa)} color="error" variant="contained" size="small" sx={{ marginLeft: '10px' }}>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </Typography>
                                    <Divider />
                                </Box>
                            )
                        })}
                    </Box>
                    <Box>
                        <FormControl component="fieldset" >
                            <Typography variant="body2">Canal</Typography>
                            <RadioGroup
                                aria-label="canal"
                                defaultValue="telefone"
                                name="radio-buttons-group"
                                row
                                value={canal}
                                onChange={(e) => setCanal(e.target.value)}
                            >
                                <FormControlLabel value="Telefone" control={<Radio />} label="Telefone" />
                                <FormControlLabel value="Whatsapp" control={<Radio />} label="Whatsapp" />
                                <FormControlLabel value="0800" control={<Radio />} label="0800" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button color="success" variant="contained" onClick={handleRealizarAgendamento}>Agendar</Button>
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

export default ModalAgendar
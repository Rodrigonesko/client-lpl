
// Dependencias
import { useState } from 'react';
import { Box, Button, IconButton, Popover, TextField, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Toast from "../../../../components/Toast/Toast";
import { changeWhatsappSender } from '../../../../_services/teleEntrevistaExterna.service';

const PopoverAlterarNumeroEnvio = ({ proposta, setFlushHook }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [newTelefone, setNewTelefone] = useState(proposta.whatsappSender)
    const [toastOpen, setToastOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeNumero = async () => {
        try {
            // await changeWhatsappSender({ whatsapp: proposta.whatsapp, whatsappSender: newTelefone })
            // handleClose()
            // setToastOpen(true)
            // setSeverity('success')
            // setMessage('Telefone alterado com sucesso!')
            // setFlushHook(true)
        } catch (error) {
            setToastOpen(true)
            setSeverity('error')
            setMessage('Algo deu errado')
            console.log(error);
        }


        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        return (
            <>
                <Tooltip title='Editar Telefone'>
                    <Button onClick={handleClick} sx={{ ml: '10px' }}>
                        <EditIcon />
                    </Button>
                </Tooltip>

                <Popover open={open} id={id} onClose={handleClose} anchorEl={anchorEl} anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}>
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            label="Telefone"
                            variant="outlined"
                            value={newTelefone}
                            onChange={(e) => setNewTelefone(e.target.value)}
                            sx={{ width: '100%', mb: '10px' }}
                        />
                        <Button variant="contained" onClick={() => handleChangeNumero(newTelefone)}>Alterar</Button>
                    </Box>
                </Popover>

                <Toast open={toastOpen} message={message} severity={severity} duration={6000} onClose={() => setToastOpen(false)} />
            </>
        )
    }
}
export default PopoverAlterarNumeroEnvio;
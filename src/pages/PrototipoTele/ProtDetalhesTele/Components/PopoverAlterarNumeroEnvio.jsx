
// Dependencias
import { useState } from 'react';
import { Box, Button, FormControl, InputLabel, Popover, Select, MenuItem, TextField, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Toast from "../../../../components/Toast/Toast";
import { changeWhatsappSender } from '../../../../_services/teleEntrevistaExterna.service';
import { deepPurple } from '@mui/material/colors';

const PopoverAlterarNumeroEnvio = ({ proposta, setFlushHook }) => {

    console.log(proposta);

    const [anchorEl, setAnchorEl] = useState(null);
    const [newTelefone, setNewTelefone] = useState(proposta.wppSender)
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
            const result = await changeWhatsappSender({ whatsapp: proposta.whatsapp, wppSender: newTelefone })
            console.log(result);
            handleClose()
            setToastOpen(true)
            setSeverity('success')
            setMessage('Telefone alterado com sucesso!')
            setFlushHook(true)
        } catch (error) {
            setToastOpen(true)
            setSeverity('error')
            setMessage('Algo deu errado')
            console.log(error);
        }
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Tooltip title='Editar Telefone'>
                <Button onClick={handleClick} sx={{
                    ml: '10px', backgroundColor: deepPurple[300], color: 'white', ":hover": {
                        backgroundColor: deepPurple[400],
                        color: 'white'
                    }
                }}>
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
                        sx={{ width: '100%', mb: '10px' }}
                        disabled
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Numero</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={newTelefone}
                            label="Numero"
                            onChange={e => setNewTelefone(e.target.value)}
                        >
                            <MenuItem value={'whatsapp:+554140426114'}>whatsapp:+554140426114</MenuItem>
                            <MenuItem value={'whatsapp:+551150396002'}>whatsapp:+551150396002</MenuItem>
                            <MenuItem value={'whatsapp:+551150394558'}>whatsapp:+551150394558</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={() => handleChangeNumero(newTelefone)}>Alterar</Button>
                </Box>
            </Popover>

            <Toast open={toastOpen} message={message} severity={severity} duration={6000} onClose={() => setToastOpen(false)} />
        </>
    )
}
export default PopoverAlterarNumeroEnvio;
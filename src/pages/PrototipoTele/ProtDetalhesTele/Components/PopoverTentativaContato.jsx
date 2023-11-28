import { Box, Button, FormControl, FormControlLabel, FormGroup, FormLabel, Popover, Radio, RadioGroup } from "@mui/material"
import Toast from "../../../../components/Toast/Toast";
import { useState } from "react";
import { tentativaContatoEntrevista } from "../../../../_services/teleEntrevista.service";

const PopoverTentativaContato = ({ children, tentativa, _id, setFlushHook }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [toastOpen, setToastOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [tipo, setTipo] = useState('telefone')

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleChangeTipo = (event) => {
        setTipo(event.target.value)
    }

    const handleSalvar = async () => {
        try {
            await tentativaContatoEntrevista({ id: _id, tentativa, tipo })
            setAnchorEl(null);
            setToastOpen(true)
            setSeverity('success')
            setMessage('Tentativa de contato salva com sucesso!')
            setFlushHook(true)
        } catch (error) {
            setToastOpen(true)
            setSeverity('error')
            setMessage('Algo deu errado')
            console.log(error);
        }
    }

    return (
        <>
            <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleClick}
            >
                {children}
            </Button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ p: 2 }} display={'flex'} flexDirection={'column'}>
                    <FormControl>
                        <FormLabel component="legend">Tipo de Contato</FormLabel>
                        <RadioGroup
                            value={tipo}
                            onChange={handleChangeTipo}
                        >
                            <FormControlLabel value="telefone" control={<Radio />} label="Telefone" />
                            <FormControlLabel value="whatsapp" control={<Radio />} label="Whatsapp" />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mt: 2 }}
                        onClick={handleSalvar}
                    >
                        Salvar
                    </Button>
                </Box>
            </Popover>

            <Toast
                open={toastOpen}
                severity={severity}
                message={message}
                onClose={() => setToastOpen(false)}
            />

        </>
    )
}

export default PopoverTentativaContato

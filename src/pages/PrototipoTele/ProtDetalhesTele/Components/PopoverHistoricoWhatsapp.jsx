import { Box, Button, List, ListItem, ListItemButton, ListItemText, Popover, Tooltip } from "@mui/material"
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { useState } from "react";
import { alterarWhatsapp } from "../../../../_services/teleEntrevista.service";
import Toast from "../../../../components/Toast/Toast";

const PopoverHistoricoWhatsapp = ({ data, setFlushHook, setWhatsapp, setSelectedWhatsapp }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [numerosAnteriores, setNumerosAnteriores] = useState(data.whatsappsAnteriores || [])
    const [toastOpen, setToastOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeNumero = async (numero) => {

        try {
            const result = await alterarWhatsapp({
                _id: data._id,
                whatsapp: numero
            })

            if (result.msg !== 'ok') {
                setMessage('Não foi possivel alterar o numero de whatsapp')
                setSeverity('error')
                setToastOpen(true)
                return
            }

            setMessage('Whatsapp atualizado com sucesso!')
            setSeverity('success')
            setToastOpen(true)
            handleClose()
            setSelectedWhatsapp(numero)
            setWhatsapp(numero)
            setFlushHook(true)

        } catch (error) {
            console.log(error);
            setMessage('Não foi possivel alterar o numero de whatsapp')
            setSeverity('error')
            setToastOpen(true)
        }
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Tooltip title='Historico de numeros'>
                <Button sx={{ ml: '10px' }} variant="outlined" onClick={handleClick}>
                    <ManageHistoryIcon />
                </Button>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box p={1} display={'flex'} flexDirection={'column'} width={'300px'}>
                    <List>

                        {
                            numerosAnteriores.map(item => {
                                return (
                                    <ListItem disablePadding>
                                        <Tooltip title='Voltar a usar esse numero'>
                                            <ListItemButton onClick={e => handleChangeNumero(item)}>
                                                <ListItemText primary={item} />
                                            </ListItemButton>
                                        </Tooltip>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Box>
            </Popover>
            <Toast
                open={toastOpen}
                message={message}
                severity={severity}
                duration={6000}
                onClose={() => setToastOpen(false)}
            />
        </>
    )
}

export default PopoverHistoricoWhatsapp
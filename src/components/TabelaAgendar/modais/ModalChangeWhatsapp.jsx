import { IconButton, Tooltip, Popover, TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineCheck } from 'react-icons/ai'
import { BiConversation } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { alterarWhatsapp, mandarParaAtendimentoHumanizado } from "../../../_services/teleEntrevista.service";
import HistoricoWhatsapp from "./HistoricoWhatsapp";
const iconButtonStyle = {
    marginLeft: '10px',
    transition: 'background-color 0.3s', // Define a transição para a propriedade backgroundColor
    '&:hover': {
        backgroundColor: 'green', // Define a cor de fundo ao passar o mouse
    },
};

const ModalChangeWhatsapp = (props) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [openSnack, setOpenSnack] = useState(false)
    const [errorSnack, setErrorSnack] = useState(false)
    const [whatsapp, setWhatsapp] = useState(props.whatsapp)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSave = async () => {
        try {
            if (whatsapp.length !== 23) {
                setErrorMessage('Verifique o número de whatsapp, o mesmo deve conter 24 caracteres. ex: whatsapp:+5541912345678')
                setOpenSnack(true)
                setErrorSnack(true)
                return
            }

            await alterarWhatsapp({
                _id: props._id,
                whatsapp
            })

            setSuccessMessage('Whatsapp atualizado com sucesso!')
            setErrorSnack(false)
            setOpenSnack(true)
        } catch (error) {
            setErrorMessage('Erro ao salvar')
            setOpenSnack(true)
            setErrorSnack(true)
            console.log(error);
        }
    }

    const handleSendHumanized = async () => {

        await mandarParaAtendimentoHumanizado({
            id: props._id
        })

        setSuccessMessage('Enviado para o humanziado com sucesso!')
        setErrorSnack(false)
        setOpenSnack(true)
    }

    console.log(props.whatsappsAnteriores);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Tooltip title='Whatsapp'>
                <IconButton style={iconButtonStyle} color='success' onClick={handleClick}>
                    <FaWhatsapp />
                </IconButton>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box p={2} bgcolor='lightgray' display='flex' >
                    <TextField size="small" value={whatsapp} onChange={element => setWhatsapp(element.target.value)} />
                    <Tooltip title='Salvar'>
                        <Button color="success" variant="contained" onClick={handleSave} style={{ marginLeft: '10px' }} ><AiOutlineCheck /></Button>
                    </Tooltip>
                    <Tooltip title='Conversar'>
                        <Button href={`/entrevistas/chat/${whatsapp}`} target='_blank' variant="contained" style={{ marginLeft: '10px' }} ><BiConversation /></Button>
                    </Tooltip>
                    <Tooltip title='Mandar para atendimento humanizado'>
                        <Button color="info" variant="contained" onClick={handleSendHumanized} style={{ marginLeft: '10px' }} ><BsPeople /></Button>
                    </Tooltip>
                    <HistoricoWhatsapp historico={props.whatsappsAnteriores} />
                </Box>
            </Popover>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => { setOpenSnack(false) }}>
                {
                    errorSnack ? (
                        <Alert variant='filled' onClose={() => { setOpenSnack(false) }} severity="error" sx={{ width: '100%' }}>
                            {errorMessage}
                        </Alert>
                    ) : (
                        <Alert variant="filled" onClose={() => { setOpenSnack(false) }} severity="success" sx={{ width: '100%' }}>
                            {successMessage}
                        </Alert>
                    )
                }
            </Snackbar >
        </>
    )
}

export default ModalChangeWhatsapp
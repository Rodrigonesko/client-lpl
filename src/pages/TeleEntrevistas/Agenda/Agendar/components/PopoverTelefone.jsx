import { Check, Edit } from "@mui/icons-material"
import { Box, Button, IconButton, Popover, TextField, Tooltip } from "@mui/material"
import { useState } from "react"
import { updatePropostaEntrevista } from "../../../../../_services/teleEntrevistaV2.service"
import HistoricoWhatsapp from "../../../../../components/TabelaAgendar/modais/HistoricoWhatsapp"
import { BsPeople } from "react-icons/bs"
import { BiConversation } from "react-icons/bi"
import { AiOutlineCheck } from "react-icons/ai"

const PopoverTelefone = ({ proposta, setProposta, setOpenToast, setMessage, setSeverity }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const [telefone, setTelefone] = useState(proposta.telefone)
    const [whatsapp, setWhatsapp] = useState(proposta.whatsapp)

    const erro = () => {
        setOpenToast(true)
        setMessage('Erro ao salvar')
        setSeverity('error')
    }

    const sucesso = () => {
        setOpenToast(true)
        setMessage('Proposta atualizada com sucesso')
        setSeverity('success')
        handleClose()
    }

    const handleSave = async () => {
        try {
            await updatePropostaEntrevista({
                _id: proposta._id,
                telefone
            })
            setProposta({
                ...proposta,
                telefone
            })
            sucesso()
        } catch (error) {
            console.log(error);
            erro()
        }
    }

    const handleSaveWhatsapp = async () => {

        if (whatsapp.length !== 23) {
            erro()
            setMessage('Verifique o número de whatsapp, o mesmo deve conter 24 caracteres. ex: whatsapp:+5541912345678')
            return
        }

        try {
            await updatePropostaEntrevista({
                _id: proposta._id,
                whatsapp,
                whatsappsAnteriores: [...proposta.whatsappsAnteriores, proposta.whatsapp]
            })
            setProposta({
                ...proposta,
                whatsapp,
                whatsappsAnteriores: [...proposta.whatsappsAnteriores, proposta.whatsapp]
            })
            sucesso()
        } catch (error) {
            console.log(error);
            erro()
        }
    }

    const handleSendHumanized = async () => {
        try {
            await updatePropostaEntrevista({
                _id: proposta._id,
                atendimentoHumanizado: true
            })
            setProposta({
                ...proposta,
                atendimentoHumanizado: true
            })
            sucesso()
        }
        catch (error) {
            console.log(error);
            erro()
        }
    }

    return (
        <>
            <IconButton
                aria-describedby={id}
                onClick={handleClick}
                size="small"
            >
                <Edit fontSize="5px" />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box
                    p={2}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    width={500}
                >
                    <TextField
                        label="Telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        fullWidth
                        size="small"
                    />
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        size="small"
                        color="success"
                    >
                        <Check />
                    </Button>
                </Box>
                <Box>
                    <Box p={2} display='flex' >
                        <TextField size="small" value={whatsapp} onChange={element => setWhatsapp(element.target.value)} />
                        <Tooltip title='Salvar'>
                            <Button color="success" variant="contained" onClick={handleSaveWhatsapp} style={{ marginLeft: '10px' }} ><AiOutlineCheck /></Button>
                        </Tooltip>
                        <Tooltip title='Conversar'>
                            <Button href={`/entrevistas/chat/${whatsapp}`} target='_blank' variant="contained" style={{ marginLeft: '10px' }} ><BiConversation /></Button>
                        </Tooltip>
                        <Tooltip title='Mandar para atendimento humanizado'>
                            <Button color="info" variant="contained" onClick={handleSendHumanized} style={{ marginLeft: '10px' }} ><BsPeople /></Button>
                        </Tooltip>
                        <HistoricoWhatsapp historico={proposta.whatsappsAnteriores} />
                    </Box>
                </Box>
            </Popover>
        </>
    )
}

export default PopoverTelefone
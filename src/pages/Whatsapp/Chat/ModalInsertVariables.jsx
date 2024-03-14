import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { sendTemplateMessage } from "../../../_services/whatsapp.service"
import Toast from "../../../components/Toast/Toast"
import { ChatContext } from "./ChatContext"

const ModalInsertVariables = ({ template }) => {

    const { whatsappReceiver, whatsappSender } = useContext(ChatContext)

    const [open, setOpen] = useState(false)
    const [templateMessage, setTemplateMessage] = useState(template?.message || '')
    const [variables, setVariables] = useState([])
    const [loading, setLoading] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [messageToast, setMessageToast] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = async () => {
        setLoading(true)
        const message = template.contentVariables.reduce((acc, variable, index) => {
            const value = variables.find(v => v.name === variable)?.value
            return acc.replace(`{{${index + 1}}}`, value)
        }, template.message)

        try {

            await sendTemplateMessage({
                de: whatsappSender,
                para: whatsappReceiver.whatsapp,
                mensagem: message,
                contentSid: template.contentSid,
                contentVariables: variables,
                messagingServiceSid: template.messagingServiceSid
            })

            setLoading(false)
            setOpen(false)
            setOpenToast(true)
            setMessageToast('Mensagem enviada com sucesso')
            setSeverity('success')

        } catch (error) {
            console.log(error);
            setLoading(false)
            setOpenToast(true)
            setMessageToast('Erro ao enviar mensagem')
            setSeverity('error')

        }
    }

    useEffect(() => {
        const message = template.contentVariables.reduce((acc, variable, index) => {
            const value = variables.find(v => v.name === variable)?.value
            return acc.replace(`{{${index + 1}}}`, value)
        }, template.message)
        setTemplateMessage(message)
    }, [variables])

    return (
        <>
            <MenuItem
                key={template.sid}
                onClick={handleOpen}
            >
                {template.name}
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {template.name}
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <Typography
                            variant="h6"
                            mb={2}
                        >
                            Variáveis
                        </Typography>
                        {
                            template.contentVariables.map(variable => (
                                <Box
                                    key={variable}
                                    sx={{
                                        display: 'flex',
                                        gap: '10px',
                                        alignItems: 'center',
                                    }}
                                >
                                    <TextField
                                        label={variable}
                                        fullWidth
                                        size="small"
                                        value={variables.find(v => v.name === variable)?.value}
                                        onChange={(e) => {
                                            const newVariables = variables.map(v => {
                                                if (v.name === variable) {
                                                    return {
                                                        ...v,
                                                        value: e.target.value
                                                    }
                                                }
                                                return v
                                            })
                                            if (!variables.find(v => v.name === variable)) {
                                                newVariables.push({
                                                    name: variable,
                                                    value: e.target.value
                                                })
                                            }
                                            setVariables(newVariables)
                                        }}
                                    />
                                </Box>
                            ))
                        }
                    </Box>
                    <Divider sx={{
                        my: 2
                    }} />
                    <Typography>
                        {templateMessage}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={loading}
                        endIcon={loading && <CircularProgress size={20} />}
                    >
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>

            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                message={messageToast}
                severity={severity}
            />
        </>
    )

}

export default ModalInsertVariables
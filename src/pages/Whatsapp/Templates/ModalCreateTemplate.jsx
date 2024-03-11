import { Add } from "@mui/icons-material"
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { blue } from "@mui/material/colors"
import { Box } from "@mui/system"
import { useState } from "react"
import Toast from "../../../components/Toast/Toast"
import { createTemplate } from "../../../_services/whatsapp.service"

const ModalCreateTemplates = ({ setFlushHook }) => {

    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [contentSid, setContentSid] = useState('')
    const [messagingServiceSid, setMessagingServiceSid] = useState('')
    const [contentVariable, setContentVariable] = useState('')
    const [contentVariables, setContentVariables] = useState([])
    const [openToast, setOpenToast] = useState(false)
    const [messageToast, setMessageToast] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleCreateTemplate = async () => {
        try {

            await createTemplate({
                name,
                message,
                contentSid,
                messagingServiceSid,
                contentVariables
            })

            setMessageToast('Template criado com sucesso')
            setSeverity('success')
            setOpenToast(true)
            setOpen(false)
            setName('')
            setMessage('')
            setContentSid('')
            setMessagingServiceSid('')
            setContentVariable('')
            setContentVariables([])
            setFlushHook((prev) => !prev)

        } catch (error) {
            setMessageToast('Erro ao criar template')
            setSeverity('error')
            setOpenToast(true)
        }

    }
    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                endIcon={<Add />}
                variant="contained"
                sx={{
                    backgroundColor: blue[500],
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: blue[700],
                    }
                }}
            >
                Adicionar Template
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
            >
                <DialogTitle>
                    Adicionar Template
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            m: 2
                        }}
                    >
                        <TextField
                            label="Nome do Template"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Mensagem"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <TextField
                            label="Content Sid"
                            value={contentSid}
                            onChange={(e) => setContentSid(e.target.value)}
                        />
                        <TextField
                            label="Messaging Service Sid"
                            value={messagingServiceSid}
                            onChange={(e) => setMessagingServiceSid(e.target.value)}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2
                            }}
                        >
                            <TextField
                                label="Variáveis de Conteúdo"
                                variant="outlined"
                                value={contentVariable}
                                onChange={(e) => setContentVariable(e.target.value)}
                            />
                            <Button
                                onClick={() => {
                                    if (contentVariable !== '' && !contentVariables.includes(contentVariable)) {
                                        setContentVariables([...contentVariables, contentVariable])
                                        setContentVariable('')
                                    }
                                }}
                                variant="contained"
                            >
                                <Add />
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2
                            }}
                        >
                            {
                                contentVariables.map((content, index) => (
                                    <Chip
                                        key={index}
                                        label={content}
                                        onDelete={() => setContentVariables(contentVariables.filter((_, i) => i !== index))}
                                    />
                                ))
                            }
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        variant="contained"
                        color="inherit"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleCreateTemplate}
                        variant="contained"
                        sx={{
                            backgroundColor: blue[500],
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: blue[700],
                            }
                        }}
                    >
                        Adicionar
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                message={messageToast}
                severity={severity}
                onClose={() => setOpenToast(false)}
            />
        </>
    )
}

export default ModalCreateTemplates
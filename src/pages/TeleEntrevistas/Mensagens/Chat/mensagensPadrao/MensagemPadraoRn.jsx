import { Button, Typography, Dialog, DialogActions, DialogTitle, DialogContent, Box, TextField } from "@mui/material"
import { useState } from "react"
import { WhatsappService } from "../../../../../_services/teleEntrevistaV2.service"
import { useParams } from "react-router-dom"
import moment from "moment"
import Toast from "../../../../../components/Toast/Toast"

const NUMERO = 'whatsapp:+15752234727'
const TEMPLATE = 'HXd3f5e2a084ba040fa6d5737b0d63bf31'
const MESSAGE_SERVICE_SID = 'MG3b384472f4d9839eaa31b758842628fe'
const whatsappService = new WhatsappService()


const MensagemPadraoRn = ({ pedido, setRefresh }) => {

    const { whatsapp } = useParams()

    const [open, setOpen] = useState(false)
    const [nome, setNome] = useState(pedido.nomeAssociado)
    const [data, setData] = useState('')
    const [toast, setToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [loading, setLoading] = useState(false)

    const sendMessage = async () => {
        if (!data || !nome) {
            setToast(true)
            setMessage('Preencha todos os campos')
            setSeverity('error')
            return
        }
        setLoading(true)
        try {
            await whatsappService.sendTemplateMessage({
                de: NUMERO,
                para: whatsapp,
                template: TEMPLATE,
                variaveis: {
                    '1': nome,
                    '4': moment(data).format('DD/MM/YYYY')
                },
                messagingServiceSid: MESSAGE_SERVICE_SID,
                mensagem: `
                    Prezado Sr.(a) ${nome},
                    Somos da Área Médica da Amil e para concluirmos a sua solicitação precisamos confirmar alguns dados médicos.
                    Por gentileza, escolha o *NÚMERO* referente a janela de horários para entrarmos em contato com o Sr.(a)
                    *${moment(data).format('DD/MM/YYYY')}*
                    1. Das 08:00 às 10:00
                    2. Das 10:00 às 12:00
                    3. Das 12:00 às 14:00
                    4. Das 14:00 às 16:00
                    5. Das 16:00 às 18:00
                `
            })
            setToast(true)
            setMessage('Mensagem enviada com sucesso')
            setSeverity('success')
            setLoading(false)
            setRefresh()
            setOpen(false)
        } catch (error) {
            console.log(error);
            setToast(true)
            setMessage('Erro ao enviar mensagem')
            setSeverity('error')
            setLoading(false)
        }
    }

    return (
        <Box>
            <Typography>
                Mensagem Padrão RN
            </Typography>
            <Button
                onClick={() => setOpen(true)}
            >
                Gerar
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    Mensagem Padrão RN
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            m: 1
                        }}
                    >
                        <TextField
                            onChange={event => setNome(event.target.value)}
                            value={nome}
                            label='Nome'
                            size="small"
                        />
                        <TextField
                            onChange={event => setData(event.target.value)}
                            value={data}
                            type="date"
                            label='Data'
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                        />
                    </Box>
                    <Typography>
                        Prezado Sr.(a) {nome},
                        <br />
                        Somos da Área Médica da Amil e para concluirmos a sua solicitação precisamos confirmar alguns dados médicos.
                        <br />
                        Por gentileza, escolha o *NÚMERO* referente a janela de horários para entrarmos em contato com o Sr.(a)
                        <br />
                        *{data}*
                        <br />
                        1. Das 08:00 às 10:00
                        <br />
                        2. Das 10:00 às 12:00
                        <br />
                        3. Das 12:00 às 14:00
                        <br />
                        4. Das 14:00 às 16:00
                        <br />
                        5. Das 16:00 às 18:00
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        color="inherit"
                        variant="contained"
                    >
                        Fechar
                    </Button>
                    <Button
                        onClick={sendMessage}
                        color="primary"
                        variant="contained"
                        disabled={loading}
                    >
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={toast}
                onClose={() => setToast(false)}
                message={message}
                severity={severity}
            />
        </Box>
    )
}

export default MensagemPadraoRn
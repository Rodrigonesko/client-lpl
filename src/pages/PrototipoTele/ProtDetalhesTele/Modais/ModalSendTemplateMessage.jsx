import { MenuItem, Dialog, DialogContent, DialogActions, DialogTitle, Button, Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { WhatsappService } from "../../../../_services/teleEntrevistaV2.service";
import { PropostaService } from "../../../../_services/teleEntrevistaV2.service";
const whatsappService = new WhatsappService()
const propostaService = new PropostaService()

const MESSAGE_SERVICE_SID = 'MG98a557e6366c2149d2770bf6bd5c4803'

const ModalSendTemplateMessage = ({
    nome,
    mensagem,
    templateSid,
    variaveis,
    whatsapp,
    setFlushHook,
    setToastOpen,
    setToastMessage,
    setSeverity,
    setLoading
}) => {

    const [open, setOpen] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [newVariaveis, setNewVariaveis] = useState(variaveis)
    const [proposta, setProposta] = useState()

    const handleSendMessage = async () => {
        setLoading(true)
        setLoadingModal(true)
        try {
            const proposta = await propostaService.findByWhatsapp(whatsapp)
            const variaveis = Object.keys(newVariaveis).reduce((acc, key, index) => {
                acc[index + 1] = newVariaveis[key]
                return acc
            }, {})
            console.log(proposta);
            await whatsappService.sendTemplateMessage({
                de: proposta.wppSender,
                para: whatsapp,
                template: templateSid,
                variaveis,
                messagingServiceSid: MESSAGE_SERVICE_SID,
                mensagem: substituirVariaveis(mensagem, variaveis)
            })
            setFlushHook(true)
            setToastMessage('Mensagem enviada com sucesso')
            setSeverity('success')
            setLoading(false)
            setToastOpen(true)
            setOpen(false)
            setLoadingModal(false)
        } catch (error) {
            console.log(error);
            setToastMessage('Não foi possivel enviar a mensagem')
            setSeverity('error')
            setLoading(false)
            setToastOpen(true)
            setLoadingModal(false)
        }
    }

    const handleOpen = async () => {
        setOpen(true)
        const prop = await propostaService.findByWhatsapp(whatsapp)
        setProposta(prop)
    }

    const substituirVariaveis = (mensagem, variaveis) => {
        return mensagem.replace(/{{(\d+)}}/g, (match, number) => {
            return typeof variaveis[number] !== 'undefined' ? variaveis[number] : match;
        });
    }

    useEffect(() => {
        if (!proposta) return
        Object.keys(variaveis).map(key => {
            if (key === 'link') {
                setNewVariaveis({
                    ...newVariaveis,
                    [key]: `https://wa.me/${proposta?.wppSender?.replace(
                        /\D/g,
                        ''
                    )}?text=Olá,%20gostaria%20de%20agendar%20meu%20horário%20para%20a%20entrevista.`
                })
            }
            if (key === 'nome') {
                console.log(proposta.nome);
                setNewVariaveis({
                    ...newVariaveis,
                    [key]: proposta.nome
                })
            }
            if (key === 'telefone') {
                setNewVariaveis({
                    ...newVariaveis,
                    [key]: proposta.tipoContrato === 'ADESÃO' ? '11 42401232' : '11 42403554'
                })
            }
        })
    }, [proposta])

    return (
        <>
            <MenuItem onClick={handleOpen}>{nome}</MenuItem>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Enviar mensagem</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}
                    >
                        <Typography>
                            Variáveis
                        </Typography>
                        {
                            Object.keys(newVariaveis).map((key, index) => (
                                <TextField
                                    key={index}
                                    label={key}
                                    variant="outlined"
                                    size="small"
                                    value={newVariaveis[key]}
                                    onChange={event => setNewVariaveis({
                                        ...newVariaveis,
                                        [key]: event.target.value
                                    })}
                                    fullWidth
                                />
                            ))
                        }
                    </Box>
                    <p>{mensagem}</p>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        disabled={loadingModal}
                        variant="contained"
                        color="inherit"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSendMessage}
                        disabled={loadingModal}
                        variant="contained"
                    >
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ModalSendTemplateMessage;
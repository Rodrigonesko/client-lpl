import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Paper, TextField, FormControl, InputLabel, MenuItem, Select, Typography, CircularProgress } from "@mui/material"
import moment from "moment"
import { useState } from "react"
import Toast from "../../../../../components/Toast/Toast"
import { Send } from "@mui/icons-material"
import Axios from 'axios'
import { getCookie } from "react-use-cookie"

const MensagemPadraoAdesao = ({ para, setFlushHook }) => {

    const [open, setOpen] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [loading, setLoading] = useState(false)

    const [nome, setNome] = useState('')
    const [data1, setData1] = useState()
    const [data2, setData2] = useState()
    const opcoesJanela = [
        [
            `1. Das 12:00 às 14:00 2. Das 14:00 às 16:00 3. Das 16:00 às 18:00`,
            `4. Das 08:00 às 10:00 5. Das 10:00 às 12:00 6. Das 12:00 às 14:00 7. Das 14:00 às 16:00 8. Das 16:00 às 18:00`,
            'HX6014b8da5c14a917f9c7c9e2fde0f3ba'
        ],
        [
            `1. Das 08:00 às 10:00 2. Das 10:00 às 12:00 3. Das 12:00 às 14:00 4. Das 14:00 às 16:00 5. Das 16:00 às 18:00`,
            `6. Das 08:00 às 10:00 7. Das 10:00 às 12:00 8. Das 12:00 às 14:00 9. Das 14:00 às 16:00 10. Das 16:00 às 18:00`,
            'HX6014b8da5c14a917f9c7c9e2fde0f3ba'
        ]
    ]
    const numero = '(11) 4240-1232'
    const [opcaoJanelas, setOpcaoJanelas] = useState(0)

    const handleSendMessage = async () => {
        if (nome === '' || data1 === '' || data2 === '') {
            setOpenToast(true)
            setMessage('Preencha todos os campos')
            setSeverity('error')
            return
        }
        try {
            setLoading(true)
            await Axios.post(`${process.env.REACT_APP_API_TELE_KEY}/newWhatsapp/sendTemplateMessage`, {
                de: 'whatsapp:+551150394280',
                para,
                template: opcaoJanelas === 0 ? opcoesJanela[0][2] : opcoesJanela[1][2],
                variaveis: [
                    nome,
                    opcoesJanela[opcaoJanelas][0],
                    moment(data1).format('DD/MM/YYYY'),
                    opcoesJanela[opcaoJanelas][1],
                    moment(data2).format('DD/MM/YYYY'),
                    numero
                ]
            }, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem('token') || getCookie('token')}` }
            })
            setOpenToast(true)
            setMessage('Mensagem enviada com sucesso')
            setSeverity('success')
            setLoading(false)
            setOpen(false)
            setFlushHook((prev) => (!prev))
        } catch (error) {
            setOpenToast(true)
            setMessage('Erro ao enviar mensagem')
            setSeverity('error')
            setLoading(false)
        }
    }

    return (
        <Box component={Paper} m={1} elevation={3} p={2}
        >
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
            >
                Janelas
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Mensagem janelas</DialogTitle>
                <DialogContent>
                    <Box>
                        <Box>
                            <Box display='flex' flexDirection='column'>
                                <TextField
                                    onChange={event => setNome(event.target.value)}
                                    value={nome}
                                    label='Nome'
                                    sx={{ mt: 2 }}
                                />
                                <TextField
                                    onChange={event => setData1(event.target.value)}
                                    value={data1}
                                    type="date"
                                    label='Data 1'
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    sx={{ mt: 2 }}
                                />
                                <TextField
                                    onChange={event => setData2(event.target.value)}
                                    value={data2}
                                    type="date"
                                    label='Data 2'
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    sx={{ mt: 2 }}
                                />
                                <FormControl sx={{ mt: 2 }} fullWidth size="small">
                                    <InputLabel>Janelas</InputLabel>
                                    <Select
                                        label='Janelas'
                                        value={opcaoJanelas}
                                        onChange={e => {
                                            setOpcaoJanelas(e.target.value)
                                        }}
                                    >
                                        <MenuItem>
                                            <em>Janelas</em>
                                        </MenuItem>
                                        <MenuItem value={0} >Janelas 1</MenuItem>
                                        <MenuItem value={1} >Janelas 2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box>
                            <Typography>
                                Prezado Sr.(a) {nome},
                            </Typography>
                            <Typography>
                                Somos da Área de Implantação da Amil e para concluirmos a contratação do Plano de Saúde do Sr.(a), e dos seus dependentes (caso tenha) precisamos confirmar alguns dados médicos.
                            </Typography>
                            <Typography>
                                Por gentileza, escolha o *NÚMERO* referente a janela de horários para entrarmos em contato com o Sr.(a)
                            </Typography>
                            <Typography>
                                *{moment(data1).format('DD/MM/YYYY')}*
                            </Typography>
                            <Typography>
                                {opcoesJanela[opcaoJanelas][0]}
                            </Typography>
                            <Typography>
                                *{moment(data2).format('DD/MM/YYYY')}*
                            </Typography>
                            <Typography>
                                {opcoesJanela[opcaoJanelas][1]}
                            </Typography>
                            <Typography>
                                Informamos que vamos ligar dos números {numero}, pedimos tirar do spam para evitar bloqueio da ligação. Desde já agradecemos.
                            </Typography>
                            <Typography>
                                Atenção: o preenchimento dos horários é feito em tempo real. Caso o horário informado não esteja mais disponível, apresentarei uma nova opção.
                            </Typography>
                            <Typography>
                                Lembrando que em caso de menor de idade a entrevista será realizada com o responsável legal, não necessitando da presença do menor no momento da ligação.
                            </Typography>

                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        color="primary"
                    >
                        Fechar
                    </Button>
                    <Button
                        onClick={handleSendMessage}
                        color="primary"
                        variant="contained"
                        endIcon={loading ? <CircularProgress size={20} /> : <Send />}
                        disabled={loading}
                    >
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                message={message}
                severity={severity}
                onClose={() => setOpenToast(false)}
            />
        </Box>
    )
}

export default MensagemPadraoAdesao
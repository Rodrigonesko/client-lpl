import { Button, Typography, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material"
import { useState } from "react"

const MensagemPadraoUe = () => {

    const [open, setOpen] = useState(false)
    const [nome, setNome] = useState('')
    const [dataInternacao, setDataInternacao] = useState('')
    const [hospital, setHospital] = useState('')
    const [data, setData] = useState('')

    return (
        <Box>
            <Typography>
                Mensagem Padrão UE
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
                    Mensagem Padrão UE
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <TextField
                            onChange={event => setNome(event.target.value)}
                            value={nome}
                            label='Nome'
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            onChange={event => setDataInternacao(event.target.value)}
                            value={dataInternacao}
                            type="date"
                            label='Data Internação'
                            InputLabelProps={{
                                shrink: true
                            }}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            onChange={event => setHospital(event.target.value)}
                            value={hospital}
                            label='Hospital'
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            onChange={event => setData(event.target.value)}
                            value={data}
                            type="date"
                            label='Data'
                            InputLabelProps={{
                                shrink: true
                            }}
                            sx={{ mt: 2 }}
                        />
                    </Box>
                    <Typography>
                        Prezado Sr.(a) {nome},
                        <br />
                        Somos da Área Médica da Amil precisamos confirmar alguns dados médico referente ao seu atendimento de emergência e/ou pedido de “Internação” em {dataInternacao} para o Hospital {hospital}.
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
                    >
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default MensagemPadraoUe
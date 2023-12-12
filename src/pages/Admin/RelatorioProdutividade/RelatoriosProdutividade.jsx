import { Box, Button, CircularProgress, Dialog, DialogActions, DialogTitle, Paper, TextField } from "@mui/material"
import { relatorioProdutividade } from "../../../_services/elegibilidade.service"
import { relatorioProducaoMensal, relatorioProducaoRsd } from "../../../_services/rsd.service"
import { relatorioProducaoTele } from "../../../_services/teleEntrevista.service"
import { useState } from "react"
import Toast from "../../../components/Toast/Toast"

const RelatoriosProdutividade = () => {

    const handlerRelatorioElegi = async () => {

        if (!mes) {
            setOpenToast(true)
            setMessage('Selecione um mês')
            setSeverity('error')
            return
        }

        setLoading(true)

        const data = await relatorioProdutividade()

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Analista</th>"
        xls += "<th>Data</th>"
        xls += "<th>Qtd analise</th>"
        xls += "<th>Qtd ligações</th>"
        xls += "</tr>"
        xls += "</thead>"
        xls += "<tbody>"

        for (const item of Object.values(data)) {
            xls += "<tr>"
            xls += `<td>${item.analista}</td>`
            xls += `<td>${item.data}</td>`
            xls += `<td>${item.quantidade}</td>`
            xls += `<td>${item.ligacao}</td>`
            xls += "</tr>"
        }


        xls += "</tbody></table>"
        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = 'relatorio producao elegi.xls'
        a.click()

        setLoading(false)
    }

    const handlerRelatorioRsd = async () => {

        if (!mes) {
            setOpenToast(true)
            setMessage('Selecione um mês')
            setSeverity('error')
            return
        }

        setLoading(true)

        const data = await relatorioProducaoMensal(mes)

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Analista</th>"
        xls += "<th>Data</th>"
        xls += "<th>Quantidade</th>"
        xls += "<th>Indeferidos</th>"
        xls += "<th>Não Indefiridos</th>"
        xls += "<th>Cancelados</th>"
        xls += "<th>Não Cancelados</th>"
        xls += "</tr>"
        xls += "</thead>"
        xls += "<tbody>"

        for (const item of Object.values(data)) {
            xls += "<tr>"
            xls += `<td>${item.analista}</td>`
            xls += `<td>${item.data}</td>`
            xls += `<td>${item.quantidade}</td>`
            xls += `<td>${item.indeferidos}</td>`
            xls += `<td>${item.naoIndeferidos}</td>`
            xls += `<td>${item.cancelados}</td>`
            xls += `<td>${item.naoCancelados}</td>`
            xls += "</tr>"
        }

        xls += "</tbody></table>"
        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = `relatorio producao rsd - ${mes}.xls`
        a.click()
        setLoading(false)
    }

    const handlerRelatorioTele = async () => {

        if (!mes) {
            setOpenToast(true)
            setMessage('Selecione um mês')
            setSeverity('error')
            return
        }

        setLoading(true)

        const data = await relatorioProducaoTele()

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Analista</th>"
        xls += "<th>Data</th>"
        xls += "<th>Tele</th>"
        xls += "<th>Agendadas</th>"
        xls += "<th>Não Agendadas</th>"
        xls += "<th>1° Tentativa</th>"
        xls += "<th>2° Tentativa</th>"
        xls += "<th>3° Tentativa</th>"
        xls += "<th>Rn</th>"
        xls += "<th>Urgencia Emergencia</th>"
        xls += "</tr>"
        xls += "</thead>"
        xls += "<tbody>"

        for (const item of Object.values(data)) {
            xls += "<tr>"
            xls += `<td>${item.analista}</td>`
            xls += `<td>${item.data}</td>`
            xls += `<td>${item.tele}</td>`
            xls += `<td>${item.agendado}</td>`
            xls += `<td>${item.naoAgendado}</td>`
            xls += `<td>${item.tentativa1}</td>`
            xls += `<td>${item.tentativa2}</td>`
            xls += `<td>${item.tentativa3}</td>`
            xls += `<td>${item.rn}</td>`
            xls += `<td>${item.ue}</td>`
            xls += "</tr>"
        }

        xls += "</tbody></table>"
        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = 'relatorio producao tele.xls'
        a.click()

        setLoading(false)
    }

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [celula, setCelula] = useState('')
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [mes, setMes] = useState('')

    return (
        <Box component={Paper} p={1} elevation={3}>
            <Button variant="contained" style={{ marginRight: '10px' }} onClick={() => {
                setOpen(true)
                setCelula('Elegibilidade')
            }} >Elegibilidade</Button>
            <Button variant="contained" style={{ marginRight: '10px' }} onClick={() => {
                setOpen(true)
                setCelula('RSD')
            }} >RSD</Button>
            <Button variant="contained" style={{ marginRight: '10px' }} onClick={() => {
                setOpen(true)
                setCelula('Teles')
            }} >Teles</Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle
                    sx={{ textAlign: 'center' }}
                >
                    {celula}
                </DialogTitle>

                <Box p={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <TextField
                            type="month"
                            label="Mês"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={mes}
                            onChange={(e) => {
                                setMes(e.target.value)
                            }}
                        />
                    </Box>
                </Box>
                <DialogActions>
                    <Button color="inherit" onClick={() => setOpen(false)}>Fechar</Button>
                    <Button onClick={() => {
                        if (celula === 'Elegibilidade') handlerRelatorioElegi()
                        if (celula === 'RSD') handlerRelatorioRsd()
                        if (celula === 'Teles') handlerRelatorioTele()
                    }}
                        disabled={loading}
                        endIcon={loading && <CircularProgress size={20} />}
                        variant="contained" color="primary"
                    >Gerar</Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                message={message}
                severity={severity}
            />
        </Box>
    )
}

export default RelatoriosProdutividade
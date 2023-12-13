import { Box, Button, CircularProgress, Dialog, DialogActions, DialogTitle, Paper, TextField } from "@mui/material"
import { getRelatorioProducaoMensal, relatorioProdutividade } from "../../../_services/elegibilidade.service"
import { relatorioProducaoMensal, relatorioProducaoRsd } from "../../../_services/rsd.service"
import { getRelatoiroRnUePorMes, getRelatorioPropostasPorMesTeleEntrevista, relatorioProducaoTele } from "../../../_services/teleEntrevista.service"
import { useState } from "react"
import Toast from "../../../components/Toast/Toast"
import { getRelatorioProducaoMensalPme } from "../../../_services/elegibilidadePme.service"

const RelatoriosProdutividade = () => {

    const handlerRelatorioElegi = async () => {

        if (!mes) {
            setOpenToast(true)
            setMessage('Selecione um mês')
            setSeverity('error')
            return
        }

        setLoading(true)

        try {
            const data = await getRelatorioProducaoMensal(mes)

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Analista</th>"
            xls += "<th>Data</th>"
            xls += "<th>Quantidade</th>"
            xls += "<th>Ligadas</th>"
            xls += "<th>Não Ligadas</th>"
            xls += "<th>Canceladas</th>"
            xls += "<th>Não Canceladas</th>"
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"

            for (const item of Object.values(data)) {
                xls += "<tr>"
                xls += `<td>${item.analista}</td>`
                xls += `<td>${item.data}</td>`
                xls += `<td>${item.quantidade}</td>`
                xls += `<td>${item.ligadas}</td>`
                xls += `<td>${item.naoLigadas}</td>`
                xls += `<td>${item.canceladas}</td>`
                xls += `<td>${item.naoCanceladas}</td>`
                xls += "</tr>"
            }


            xls += "</tbody></table>"
            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = `relatorio producao elegi ${mes}.xls`
            a.click()

            setLoading(false)
        } catch (error) {
            console.log(error)
            setOpenToast(true)
            setMessage('Erro ao gerar relatório')
            setSeverity('error')
            setLoading(false)
        }
    }

    const handlerRelatorioElegiPme = async () => {

        if (!mes) {
            setOpenToast(true)
            setMessage('Selecione um mês')
            setSeverity('error')
            return
        }

        setLoading(true)

        try {

            const data = await getRelatorioProducaoMensalPme(mes)

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Analista</th>"
            xls += "<th>Data</th>"
            xls += "<th>Quantidade</th>"
            xls += "<th>Devolvidas</th>"
            xls += "<th>Não Devolvidas</th>"
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"

            for (const item of Object.values(data)) {
                xls += "<tr>"
                xls += `<td>${item.analista}</td>`
                xls += `<td>${item.data}</td>`
                xls += `<td>${item.quantidade}</td>`
                xls += `<td>${item.devolvidas}</td>`
                xls += `<td>${item.naoDevolvidas}</td>`
                xls += "</tr>"
            }

            xls += "</tbody></table>"
            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = `relatorio producao elegi pme - ${mes}.xls`
            a.click()

            setLoading(false)

        } catch (error) {
            console.log(error)
            setOpenToast(true)
            setMessage('Erro ao gerar relatório')
            setSeverity('error')
            setLoading(false)
        }

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

        try {
            setLoading(true)

            const data = await getRelatorioPropostasPorMesTeleEntrevista(mes)

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Analista</th>"
            xls += "<th>Data</th>"
            xls += "<th>Quantidade</th>"
            xls += "<th>Houve Divergencia</th>"
            xls += "<th>Não Houve Divergnecia</th>"
            xls += "<th>Agendado</th>"
            xls += "<th>Não Agendado</th>"
            xls += "<th>1° Tentativa</th>"
            xls += "<th>2° Tentativa</th>"
            xls += "<th>3° Tentativa</th>"
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"

            for (const item of Object.values(data)) {
                xls += "<tr>"
                xls += `<td>${item.analista}</td>`
                xls += `<td>${item.data}</td>`
                xls += `<td>${item.quantidade}</td>`
                xls += `<td>${item.houveDivergencia}</td>`
                xls += `<td>${item.naoHouveDivergencia}</td>`
                xls += `<td>${item.agendado}</td>`
                xls += `<td>${item.naoAgendado}</td>`
                xls += `<td>${item.tentativa1}</td>`
                xls += `<td>${item.tentativa2}</td>`
                xls += `<td>${item.tentativa3}</td>`
                xls += "</tr>"
            }

            xls += "</tbody></table>"
            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = `relatorio producao tele - ${mes}.xls`
            a.click()

            setLoading(false)
        } catch (error) {
            console.log(error)
            setOpenToast(true)
            setMessage('Erro ao gerar relatório')
            setSeverity('error')
            setLoading(false)
        }
    }

    const handlerRelatorioRnUe = async () => {

        try {

            setLoading(true)

            const result = await getRelatoiroRnUePorMes(mes)

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Analista</th>"
            xls += "<th>Data</th>"
            xls += "<th>Quantidade Rn</th>"
            xls += "<th>Quantidade Ue</th>"
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"
            for (const item of Object.values(result)) {
                xls += "<tr>"
                xls += `<td>${item.analista}</td>`
                xls += `<td>${item.data}</td>`
                xls += `<td>${item.quantidadeRn}</td>`
                xls += `<td>${item.quantidadeUe}</td>`
                xls += "</tr>"
            }

            xls += "</tbody></table>"
            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = `relatorio producao tele - ${mes}.xls`
            a.click()

            setLoading(false)
        } catch (error) {
            console.log(error)
            setOpenToast(true)
            setMessage('Erro ao gerar relatório')
            setSeverity('error')
            setLoading(false)
        }

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
            <Button
                variant="contained"
                style={{ marginRight: '10px' }}
                onClick={() => {
                    setOpen(true)
                    setCelula('ElegibilidadePme')
                }}
            >
                Elegibilidade Pme
            </Button>
            <Button variant="contained" style={{ marginRight: '10px' }} onClick={() => {
                setOpen(true)
                setCelula('RSD')
            }} >RSD</Button>
            <Button variant="contained" style={{ marginRight: '10px' }} onClick={() => {
                setOpen(true)
                setCelula('Teles')
            }} >Teles</Button>
            <Button
                variant="contained"
                style={{ marginRight: '10px' }}
                onClick={() => {
                    setOpen(true)
                    setCelula('Rn e UE')
                }}
            >
                Rn e UE
            </Button>
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
                        if (celula === 'ElegibilidadePme') handlerRelatorioElegiPme()
                        if (celula === 'Rn e UE') handlerRelatorioRnUe()
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
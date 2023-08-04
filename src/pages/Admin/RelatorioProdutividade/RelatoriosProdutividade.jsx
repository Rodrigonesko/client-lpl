import { Box, Button, CircularProgress, Paper } from "@mui/material"
import { relatorioProdutividade } from "../../../_services/elegibilidade.service"
import { relatorioProducaoRsd } from "../../../_services/rsd.service"
import { relatorioProducaoTele } from "../../../_services/teleEntrevista.service"
import { useState } from "react"

const RelatoriosProdutividade = () => {

    const handlerRelatorioElegi = async () => {
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
        setLoading(true)

        const data = await relatorioProducaoRsd()

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Analista</th>"
        xls += "<th>Data</th>"
        xls += "<th>Quantidade</th>"
        xls += "<th>Indeferidos</th>"
        xls += "<th>Cancelados</th>"
        xls += "</tr>"
        xls += "</thead>"
        xls += "<tbody>"

        for (const item of Object.values(data)) {
            xls += "<tr>"
            xls += `<td>${item.analista}</td>`
            xls += `<td>${item.data}</td>`
            xls += `<td>${item.quantidade}</td>`
            xls += `<td>${item.indeferidos}</td>`
            xls += `<td>${item.cancelados}</td>`
            xls += "</tr>"
        }

        xls += "</tbody></table>"
        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = 'relatorio producao rsd.xls'
        a.click()

        setLoading(false)
    }

    const handlerRelatorioTele = async () => {
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

    return (
        <Box component={Paper} p={1} elevation={3}>
            <Button startIcon={loading ? <CircularProgress size='20px' /> : null} disabled={loading} variant="contained" style={{ marginRight: '10px' }} onClick={handlerRelatorioElegi} >Elegibilidade</Button>
            <Button startIcon={loading ? <CircularProgress size='20px' /> : null} disabled={loading} variant="contained" style={{ marginRight: '10px' }} onClick={handlerRelatorioRsd} >RSD</Button>
            <Button startIcon={loading ? <CircularProgress size='20px' /> : null} disabled={loading} variant="contained" style={{ marginRight: '10px' }} onClick={handlerRelatorioTele} >Teles</Button>
        </Box>
    )
}

export default RelatoriosProdutividade
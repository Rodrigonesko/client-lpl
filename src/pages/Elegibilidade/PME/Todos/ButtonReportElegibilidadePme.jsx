import { Button, CircularProgress, Tooltip } from "@mui/material"
import { useState } from "react"
import { FaRegFileExcel } from 'react-icons/fa'
import { getPropostasElegibilidadePme } from "../../../../_services/elegibilidadePme.service"

const ButtonReportElegibilidadePme = () => {

    const [loading, setLoading] = useState(false)

    const handleReport = async () => {
        setLoading(true)
        const result = await getPropostasElegibilidadePme()

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Porte</th>"
        xls += "<th>Linha de Produto</th>"
        xls += "<th>Grupo</th>"
        xls += "<th>CNPJ Empresa</th>"
        xls += "<th>Proposta</th>"
        xls += "<th>Vidas</th>"
        xls += "<th>Colaborador</th>"
        xls += "<th>Situação</th>"
        xls += "<th>Data Protocolo</th>"
        xls += "<th>Data em Análise</th>"
        xls += "<th>Observações</th>"
        xls += "<th>Motor</th>"
        xls += "<th>Grupo</th>"
        xls += "<th>Analitsa</th>"
        xls += "<th>Status</th>"
        xls += "<th>Data Recebimento</th>"
        xls += "<th>Data Conclusão</th>"
        xls += "</tr>"
        xls += "</thead>"
        xls += "<tbody>"

        for (const proposta of result) {
            xls += "<tr>"
            xls += `<td>${proposta.porte}</td>`
            xls += `<td>${proposta.linhaDeProduto}</td>`
            xls += `<td>${proposta.grupo}</td>`
            xls += `<td>${proposta.cnpj}</td>`
            xls += `<td>${proposta.proposta}</td>`
            xls += `<td>${proposta.vidas}</td>`
            xls += `<td>${proposta.colaborador}</td>`
            xls += `<td>${proposta.situacao}</td>`
            xls += `<td>${proposta.dataProtocolo || ''}</td>`
            xls += `<td>${proposta.dataAnalise || ''}</td>`
            xls += `<td>${proposta.observacoes || ''}</td>`
            xls += `<td>${proposta.motor}</td>`
            xls += `<td>${proposta.gestor}</td>`
            xls += `<td>${proposta.analista}</td>`
            xls += `<td>${proposta.status}</td>`
            xls += `<td>${proposta.dataRecebimento}</td>`
            xls += `<td>${proposta.dataConclusao || ''}</td>`
            xls += `</tr>`
        }


        xls += "</tbody></table>"

        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = 'Relatório Propostas.xls'
        a.click()
        
        setLoading(false)

    }

    return (
        <Tooltip title='Report'>
            <Button onClick={handleReport} startIcon={loading ? <CircularProgress color='success' size='22px' /> : null} variant="contained" color="success" disabled={loading}><FaRegFileExcel size='22px' /></Button>
        </Tooltip>
    )
}

export default ButtonReportElegibilidadePme
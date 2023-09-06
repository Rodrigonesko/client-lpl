import { Box, Button, TextField } from "@mui/material"
import React, { useState } from "react"
import { getRelatorioAnexos } from "../../../../_services/teleEntrevista.service"

const RelatorioAnexos = () => {

    const [date, setDate] = useState('')

    const handleChange = (event) => {
        setDate(event.target.value)
    }

    const handleGenerate = async () => {
        const data = await getRelatorioAnexos(date)

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Proposta</th>"
        xls += "<th>Nome</th>"
        xls += "<th>Vigencia</th>"
        xls += "<th>Tipo de Contrato</th>"
        xls += "<th>houve Divergencia</th>"
        xls += "<th>Cids</th>"
        xls += "<th>Data Anexado</th>"
        xls += "<th>Quem Anexou</th>"
        xls += "<th>Data mandou implantação</th>"
        xls += "<th>Quem mandou implantação</th>"
        xls += "</tr></thead><tbody>"

        data.forEach(item => {
            xls += `<tr>`
            xls += `<td>${item.proposta || ''}</td>`
            xls += `<td>${item.nome || ''}</td>`
            xls += `<td>${item.vigencia || ''}</td>`
            xls += `<td>${item.tipoContrato || ''}</td>`
            xls += `<td>${item.houveDivergencia || ''}</td>`
            xls += `<td>${item.cids || ''}</td>`
            xls += `<td>${item.dataAnexado || ''}</td>`
            xls += `<td>${item.quemAnexou || ''}</td>`
            xls += `<td>${item.dataMandouImplantacao || ''}</td>`
            xls += `<td>${item.quemMandouImplantacao || ''}</td>`
        })

        xls += "</tbody></table>"

        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = `Relatorio Anexos ${date}.xls`
        a.click()

    }

    return (
        <Box display='flex' mr='20px' >
            <TextField value={date} onChange={handleChange} size="small" type="date" sx={{ mr: '10px' }} />
            <Button onClick={handleGenerate} size="small" variant="contained">Gerar Relatório</Button>
        </Box>
    )
}

export default RelatorioAnexos
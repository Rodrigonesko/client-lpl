import { Button, CircularProgress, TextField } from "@mui/material"
import { deepPurple } from "@mui/material/colors"
import { Box } from "@mui/system"
import { useState } from "react"
import { getRelatorioAnexos } from "../../../../../_services/teleEntrevista.service"

const RelatorioAnexos = () => {

    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        setDate(event.target.value)
    }

    const handleGenerate = async () => {
        setLoading(true)

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

        setLoading(false)

    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <TextField
                label="Data Inicio"
                variant="outlined"
                size="small"
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{
                    mr: 1,
                }}
                value={date}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                sx={{
                    bgcolor: deepPurple[100],
                    color: deepPurple[800],
                    '&:hover': {
                        bgcolor: deepPurple[500],
                        opacity: 0.8,
                    },
                }}
                onClick={handleGenerate}
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} color="secondary" />}
            >
                Gerar Relatório
            </Button>
        </Box>
    )
}

export default RelatorioAnexos
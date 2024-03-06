import { CircularProgress, IconButton, Tooltip } from "@mui/material"
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { filterQueryDadosEntrevista } from "../../../../../_services/teleEntrevista.service";
import { useState } from "react";

const Relatorio = () => {

    const [loading, setLoading] = useState(false)

    const handleGerarRelatorio = async () => {
        setLoading(true)
        const result = await filterQueryDadosEntrevista({
            query: {
                implantado: { $ne: 'Sim' },
                implantacao: 'Sim'
            }
        })
        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Id</th>"
        xls += "<th>anexo</th>"
        xls += "<th>implantado</th>"
        xls += "<th>implantacao</th>"
        xls += "<th>Ano Ref</th>"
        xls += "<th>Mês Ref</th>"
        xls += "<th>Data Conclusão</th>"
        xls += "<th>Porte</th>"
        xls += "<th>Proposta</th>"
        xls += "<th>Nome</th>"
        xls += "<th>CPF</th>"
        xls += "<th>Data Nascimento</th>"
        xls += "<th>UF</th>"
        xls += "<th>Administradora</th>"
        xls += "<th>Status Final</th>"
        xls += "<th>Divergência DS</th>"
        xls += "<th>Observações</th>"
        xls += "<th>TEA</th>"
        xls += "<th>Cids</th>"
        xls += "</tr></thead><tbody>"
        result.result.forEach(e => {
            xls += "<tr>"
            xls += `<td>${e._id}</td>`
            xls += `<td>${e.anexadoSisAmil || ''}</td>`
            xls += `<td>${e.implantacao || ''}</td>`
            xls += `<td>${e.implantado || ''}</td>`
            xls += `<td>${e.anoRef || ''}</td>`
            xls += `<td>${e.mesRef || ''}</td>`
            xls += `<td>${e.dataConclusao || ''}</td>`
            xls += `<td>${e.porte || ''}</td>`
            xls += `<td>${e.proposta || ''}</td>`
            xls += `<td>${e.nome || ''}</td>`
            xls += `<td>${e.cpf || ''}</td>`
            xls += `<td>${e.dataNascimento || ''}</td>`
            xls += `<td>${e.uf || ''}</td>`
            xls += `<td>${e.administradora || ''}</td>`
            xls += `<td>${e.statusFinal || ''}</td>`
            xls += `<td>${e.divergenciaDs || ''}</td>`
            xls += `<td>${e.observacoes || ''}</td>`
            xls += `<td>${e.tea || ''}</td>`
            xls += `<td>${e.cids || ''}</td>`
            xls += "</tr>"
        }
        )
        xls += "</tbody></table>"
        const blob = new Blob([xls], { type: 'application/vnd.ms-excel' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'relatorio-implantacao.xls'
        a.click()
        setLoading(false)
    }

    return (
        <>
            <Tooltip title='Downalod'>
                <IconButton
                    onClick={handleGerarRelatorio}
                    disabled={loading}
                >
                    {
                        loading ? (
                            <CircularProgress size={20} />
                        ) : (
                            <FileDownloadIcon />
                        )
                    }
                </IconButton>
            </Tooltip>
        </>
    )
}

export default Relatorio
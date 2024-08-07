import { Button, CircularProgress } from "@mui/material"
import { useState } from "react"
import { getPropostasNaoRealizadasTele } from "../../../../../_services/teleEntrevista.service"
import moment from "moment"
import { blue } from "@mui/material/colors"

const RelatorioNaoRealizadas = () => {

    const [loading, setLoading] = useState(false)


    const relatorioNaoRealizadas = async () => {
        try {

            setLoading(true)

            const { propostas } = await getPropostasNaoRealizadasTele()

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<td>ID</td>"
            xls += "<td>Data Recebimento</td>"
            xls += "<td>Data Vigência</td>"
            xls += "<td>Proposta</td>"
            xls += "<td>Nome</td>"
            xls += "<td>CPF</td>"
            xls += "<td>Agendado</td>"
            xls += "<td>Data Entrevista</td>"
            xls += "<td>Responsável</td>"
            xls += "<td>Tipo de Contrato</td>"
            xls += "<th>1° Contato</th>"
            xls += "<th>Responsavel 1° Contato</th>"
            xls += "<th>2° Contato</th>"
            xls += "<th>Responsavel 2° Contato</th>"
            xls += "<th>3° Contato</th>"
            xls += "<th>Responsavel 3° Contato</th>"
            xls += "<td>"
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"

            propostas.forEach(e => {
                xls += "<tr>"
                xls += `<td>${e._id}</td>`
                xls += `<td>${moment(e.dataRecebimento).format('DD/MM/YYYY')}</td>`
                xls += `<td>${moment(e.vigencia).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.proposta}</td>`
                xls += `<td>${e.nome}</td>`
                xls += `<td>${e.cpf}</td>`
                xls += `<td>${e.agendado}</td>`
                xls += `<td>${e.dataEntrevista}</td>`
                xls += `<td>${e.enfermeiro}</td>`
                xls += `<td>${e.tipoContrato}</td>`
                e.contato1 ? (
                    xls += `<td>${e.contato1}</td>`
                ) : (
                    xls += `<td></td>`
                )
                e.responsavelContato1 ? (
                    xls += `<td>${e.responsavelContato1}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.contato2 ? (
                    xls += `<td>${e.contato2}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.responsavelContato2 ? (
                    xls += `<td>${e.responsavelContato2}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.contato3 ? (
                    xls += `<td>${e.contato3}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.responsavelContato3 ? (
                    xls += `<td>${e.responsavelContato2}</td>`
                ) : (
                    xls += `<td></td>`
                )
                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatório Não Realizadas.xls'
            a.click()

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button
            variant="contained"
            size="small"
            sx={{
                ml: 1,
                backgroundColor: blue[700],
                color: 'white',
                '&:hover': {
                    backgroundColor: blue[700],
                    opacity: 0.8
                }
            }}
            onClick={relatorioNaoRealizadas}
            disabled={loading}
            endIcon={loading && <CircularProgress color="error" size={20} />}
        >
            Relatório Não Realizadas
        </Button>
    )
}

export default RelatorioNaoRealizadas
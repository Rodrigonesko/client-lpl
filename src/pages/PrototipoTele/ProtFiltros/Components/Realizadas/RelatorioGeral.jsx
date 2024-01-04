import { Button, CircularProgress } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import moment from "moment"

const RelatorioGeral = () => {

    const [loading, setLoading] = useState(false)

    const gerarRelatorio = async () => {
        try {
            setLoading(true)

            const result = await axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/dadosEntrevista`, { withCredentials: true })

            //console.log(dataInicio, dataFim);

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Id</th>"
            xls += "<th>Proposta</th>"
            xls += "<th>Tipo Contrato</th>"
            xls += "<th>Data Entrevista</th>"
            xls += "<th>Nome</th>"
            xls += "<th>Cpf</th>"
            xls += "<th>Data Nascimento</th>"
            xls += "<th>Idade</th>"
            xls += "<th>Feito Por</th>"
            xls += "<th>Divergencia</th>"
            xls += "<th>Qual</th>"
            xls += "<th>Data Recebimento</th>"
            xls += "<th>Entrevista qualidade</th>"
            xls += "<th>Cids</th>"
            xls += "</tr></thead><tbody>"

            result.data.entrevistas.forEach(e => {
                xls += "<tr>"
                xls += `<td>${e._id}</td>`
                xls += `<td>${e.proposta || ''}</td>`
                xls += `<td>${e.tipoContrato || ''}</td>`
                xls += `<td>${e.dataEntrevista || ''}</td>`
                xls += `<td>${e.nome || ''}</td>`
                xls += `<td>${e.cpf || ''}</td>`
                xls += `<td>${e.dataNascimento || ''}</td>`
                xls += `<td>${e.idade || ''}</td>`
                xls += `<td>${e.responsavel || ''}</td>`
                xls += `<td>${e.houveDivergencia || ''}</td>`
                xls += `<td>${e.divergencia ? e.divergencia : ''}</td>`
                xls += `<td>${moment(e.dataRecebimento).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.entrevistaQualidade ? 'Sim' : ''}</td>`
                // xls += `<td>${e.cids}</td>`
                if (e.cids) {
                    const arrCids = e.codigosCids.split('-')
                    arrCids.forEach(cid => {
                        xls += `<td>${cid}</td>`
                    })
                } else {
                    xls += `<td></td>`
                }
                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatorio Propostas.xls'
            a.click()

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    bgcolor: 'black',
                    color: 'white',
                    '&:hover': {
                        bgcolor: 'black',
                        opacity: 0.8,
                    },
                }}
                onClick={gerarRelatorio}
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} color="primary" />}
            >
                Relatorio Geral
            </Button>
        </>
    )
}

export default RelatorioGeral
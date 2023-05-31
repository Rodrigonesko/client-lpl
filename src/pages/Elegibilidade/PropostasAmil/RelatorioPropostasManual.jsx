import React, { useState } from "react";
import Axios from 'axios'
import { Button, Box, CircularProgress } from "@mui/material";

const RelatorioPropostasManuaisElegibilidade = () => {

    const [loading, setLoading] = useState()

    const relatorio = async () => {
        try {
            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/show/propostasManual`, {
                withCredentials: true
            })


            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Id</th>"
            xls += "<th>Data</th>"
            xls += "<th>Proposta</th>"
            xls += "<th>Beneficiario</th>"
            xls += "<th>Confirmação</th>"
            xls += "<th>Meio de Solicitação</th>"
            xls += "<th>Meio de Confirmação</th>"
            xls += "<th>Resultado</th>"
            xls += "<th>Responsavel</th>"
            xls += "<th>Observações</th>"
            xls += "</tr>"

            result.data.forEach(proposta => {
                xls += "<tr>"
                xls += `<td>${proposta._id}</td>`
                xls += `<td>${proposta.data}</td>`
                xls += `<td>${proposta.proposta}</td>`
                xls += `<td>${proposta.beneficiario}</td>`
                xls += proposta.confirmacao ? `<td>${proposta.confirmacao}</td>` : `<td></td>`
                xls += proposta.meioSolicitacao ? `<td>${proposta.meioSolicitacao}</td>` : `<td></td>`
                xls += proposta.meioConfirmacao ? `<td>${proposta.meioConfirmacao}</td>` : `<td></td>`
                xls += proposta.resultado ? `<td>${proposta.resultado}</td>` : `<td></td>`
                xls += proposta.responsavel ? `<td>${proposta.responsavel}</td>` : `<td></td>`
                xls += proposta.observacoes ? `<td>${proposta.observacoes}</td>` : `<td></td>`
                xls += "</tr>"
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'relatorio elegibilidade.xls'
            a.click()

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box mt={2}>
            <Button variant="contained" onClick={relatorio} disabled={loading}>Report {loading ? <CircularProgress style={{ width: '20px', height: '20px', marginLeft: '10px' }} /> : null}</Button>
        </Box>
    )

}

export default RelatorioPropostasManuaisElegibilidade
import React, { useState } from "react";
import Axios from 'axios'
import { Button, Box, CircularProgress } from "@mui/material";
import moment from "moment";

const RelatorioElegibilidade = () => {

    const [loading, setLoading] = useState()

    const relatorio = async () => {
        try {     
            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/show`, {
                withCredentials: true
            })


            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Proposta</th>"
            xls += "<th>Data Importação</th>"
            xls += "<th>Inicio da Vigência</th>"
            xls += "<th>Status Motor</th>"
            xls += "<th>Motivo do Cancelamento Amil</th>"
            xls += "<th>Status Proposta</th>"
            xls += "<th>Status 1° Analise</th>"
            xls += "<th>Status 2° Analise</th>"
            xls += "<th>Status 3° Analise</th>"
            xls += "<th>Plano</th>"
            xls += "<th>Segmentação</th>"
            xls += "<th>UF</th>"
            xls += "<th>Administradora</th>"
            xls += "<th>Cód. Corretor</th>"
            xls += "<th>Corretor</th>"
            xls += "<th>Entidade</th>"
            xls += "<th>Tipo Vinculo</th>"
            xls += "<th>Nome Titular</th>"
            xls += "<th>Idade Beneficiário</th>"
            xls += "<th>N° de Vidas</th>"
            xls += "<th>Vigencia</th>"
            xls += "<th>Mês Implantação</th>"
            xls += "<th>Ano Implantação</th>"
            xls += "<th>Valor Médico</th>"
            xls += "<th>Valor Dental</th>"
            xls += "<th>Valor Total</th>"
            xls += "<th>1° Devolução</th>"
            xls += "<th>1° Devolução</th>"
            xls += "<th>1° Devolução</th>"
            xls += "<th>1° Devolução</th>"
            xls += "<th>Reprotocolo</th>"
            xls += "<th>Reprotocolo</th>"
            xls += "<th>Reprotocolo 3</th>"
            xls += "<th>2° Reprotocolo</th>"
            xls += "<th>2° Reprotocolo</th>"
            xls += "<th>2° Reprotocolo</th>"
            xls += "<th>Saving Estimado PI</th>"
            xls += "<th>Ligação Gravada</th>"
            xls += "<th>Observação</th>"
            xls += "<th>Tipo de evidência</th>"
            xls += "<th>Situação Especial</th>"
            xls += "<th>?</th>"
            xls += "<th>Motivo do Cancelamento</th>"
            xls += "<th>Data Finalizacao</th>"
            xls += "<th>Analista Resp</th>"
            xls += "<th>Data Finalizacao Pre</th>"
            xls += "<th>Analista Pre</th>"

            result.data.forEach(proposta => {
                xls += "<tr>"
                xls += `<td>${proposta.proposta}</td>`
                xls += `<td>${proposta.dataImportacao}</td>`
                xls += `<td>${proposta.vigencia}</td>`
                xls += `<td>${proposta.statusMotor}</td>`
                xls += `<td>${proposta.categoriaCancelamento}</td>`
                xls += `<td>${proposta.status}</td>`
                xls += `<td>${proposta.status1Analise}</td>`
                xls += `<td>${proposta.status2Analise}</td>`
                xls += `<td>${proposta.status3Analise}</td>`
                xls += `<td>${proposta.planoAmil}</td>`
                xls += `<td></td>`
                xls += `<td>${proposta.uf}</td>`
                xls += `<td>${proposta.administradora}</td>`
                xls += `<td>${proposta.codCorretor}</td>`
                xls += `<td>${proposta.nomeCorretor}</td>`
                xls += `<td>${proposta.entidade}</td>`
                xls += `<td>${proposta.tipoVinculo}</td>`
                xls += `<td>${proposta.nome}</td>`
                xls += `<td>${proposta.idade}</td>`
                xls += `<td>${proposta.numeroVidas}</td>`
                xls += `<td>${proposta.vigencia}</td>`
                xls += `<td>${moment(proposta.dataImportacao).format('MM/YYYY')}</td>`
                xls += `<td>${moment(proposta.dataImportacao).format('YYYY')}</td>`
                xls += `<td>${proposta.valorMedico}</td>`
                xls += `<td>${proposta.valorDental}</td>`
                xls += `<td>${proposta.valorTotal}</td>`
                xls += `<td>${proposta.primeiraDevolucao1}</td>`
                xls += `<td>${proposta.primeiraDevolucao2}</td>`
                xls += `<td>${proposta.primeiraDevolucao3}</td>`
                xls += `<td>${proposta.primeiraDevolucao4}</td>`
                xls += `<td>${proposta.reprotocolo1}</td>`
                xls += `<td>${proposta.reprotocolo2}</td>`
                xls += `<td>${proposta.reprotocolo3}</td>`
                xls += `<td>${proposta.segundoReprotocolo1}</td>`
                xls += `<td>${proposta.segundoReprotocolo2}</td>`
                xls += `<td>${proposta.segundoReprotocolo3}</td>`
                xls += `<td>${proposta.observacoesDevolucao}</td>`
                xls += `<td></td>`
                xls += `<td>${proposta.ligacao}</td>`
                xls += `<td>${proposta.segundoReprotocolo4}</td>`
                xls += `<td>${proposta.evidenciaFraude}</td>`
                xls += `<td></td>`
                xls += `<td></td>`
                xls += `<td>${proposta.motivoCancelamento}</td>`
                xls += `<td>${proposta.dataConclusao}</td>`
                xls += `<td>${proposta.analista}</td>`
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

export default RelatorioElegibilidade
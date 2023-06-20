import React, { useState } from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import moment from "moment";
import { showPropostas } from "../../../_services/elegibilidade.service";

const RelatorioElegibilidade = () => {

    const [loading, setLoading] = useState()

    const relatorio = async () => {
        try {
            setLoading(true)

            const result = await showPropostas()

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
            xls += "<th>Produtor</th>"
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
            xls += "<th></th>"
            xls += "<th>Motivo do Cancelamento</th>"
            xls += "<th>Data Finalizacao</th>"
            xls += "<th>Analista Resp</th>"
            xls += "</tr>"

            result.forEach(proposta => {
                xls += "<tr>"
                xls += `<td>${proposta.proposta}</td>`
                xls += `<td>${proposta.dataImportacao}</td>`
                xls += `<td>${proposta.vigencia}</td>`
                xls += proposta.statusMotor ? `<td>${proposta.statusMotor}</td>` : `<td></td>`
                xls += `<td>${proposta.categoriaCancelamento}</td>`
                xls += `<td>${proposta.status}</td>`
                xls += proposta.status1Analise ? `<td>${proposta.status1Analise}</td>` : `<td></td>`
                xls += proposta.status2Analise ? `<td>${proposta.status2Analise}</td>` : `<td></td>`
                xls += proposta.status3Analise ? `<td>${proposta.status3Analise}</td>` : `<td></td>`
                xls += proposta.planoAmil ? `<td>${proposta.planoAmil}</td>` : `<td></td>`
                xls += `<td></td>`
                xls += `<td>${proposta.produtor}</td>`
                xls += `<td>${proposta.uf}</td>`
                xls += `<td>${proposta.administradora}</td>`
                xls += `<td>${proposta.codCorretor}</td>`
                xls += proposta.nomeCorretor ? `<td>${proposta.nomeCorretor}</td>` : `<td></td>`
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
                xls += proposta.primeiraDevolucao1 ? `<td>${proposta.primeiraDevolucao1}</td>` : `<td></td>`
                xls += proposta.primeiraDevolucao2 ? `<td>${proposta.primeiraDevolucao2}</td>` : `<td></td>`
                xls += proposta.primeiraDevolucao3 ? `<td>${proposta.primeiraDevolucao3}</td>` : `<td></td>`
                xls += proposta.primeiraDevolucao4 ? `<td>${proposta.primeiraDevolucao4}</td>` : `<td></td>`
                xls += proposta.reprotocolo1 ? `<td>${proposta.reprotocolo1}</td>` : `<td></td>`
                xls += proposta.reprotocolo2 ? `<td>${proposta.reprotocolo2}</td>` : `<td></td>`
                xls += proposta.reprotocolo3 ? `<td>${proposta.reprotocolo3}</td>` : `<td></td>`
                xls += proposta.segundoReprotocolo1 ? `<td>${proposta.segundoReprotocolo1}</td>` : `<td></td>`
                xls += proposta.segundoReprotocolo2 ? `<td>${proposta.segundoReprotocolo2}</td>` : `<td></td>`
                xls += proposta.segundoReprotocolo3 ? `<td>${proposta.segundoReprotocolo3}</td>` : `<td></td>`
                xls += `<td></td>`
                xls += proposta.ligacao ? `<td>${proposta.ligacao}</td>` : `<td></td>`
                xls += proposta.observacoesDevolucao ? `<td>${proposta.observacoesDevolucao}</td>` : `<td></td>`
                xls += proposta.evidenciaFraude ? `<td>${proposta.evidenciaFraude}</td>` : `<td></td>`
                xls += `<td></td>`
                xls += `<td></td>`
                xls += proposta.motivoCancelamento ? `<td>${proposta.motivoCancelamento}</td>` : `<td></td>`
                xls += proposta.dataConclusao ? `<td>${proposta.dataConclusao}</td>` : `<td></td>`
                xls += proposta.analista ? `<td>${proposta.analista}</td>` : `<td></td>`
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
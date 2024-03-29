import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Container, Box, Typography, Button } from '@mui/material'
import TabelaCelulas from './TabelaCelulas'
import { getAtividadesEmAndamento, getAtividadeAtual, getReport } from '../../_services/controleAtividade.service'

const ControleAtividades = () => {

    const [report, setReport] = useState([])
    const [atividadeAtual, setAtividadeAtual] = useState('')

    const fetchAtividadesEmAndamento = async () => {
        try {
            const result = await getAtividadesEmAndamento()

            const resultAtividadeAtual = await getAtividadeAtual()

            setReport(result.report)
            setAtividadeAtual(resultAtividadeAtual.atividade)

        } catch (error) {
            console.log(error);
        }
    }

    const relatorio = async () => {
        try {

            const result = await getReport()

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Analista</th>"
            xls += "<th>Data</th>"
            xls += "<th>Atividade</th>"
            xls += "<th>Quantidade Horas</th>"
            xls += "<th>Horario Inicio</th>"
            xls += "<th>Horario Fim</th>"
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"

            result.report.forEach(e => {
                xls += "<tr>"
                xls += `<td>${e.analista}</td>`
                xls += `<td>${e.data}</td>`
                xls += `<td>${e.atividade}</td>`
                xls += `<td>${e.totalHoras}</td>`
                xls += `<td>${e.horarioInicio}</td>`
                xls += `<td>${e.horarioFim}</td>`
                xls += "</tr>"
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'report controle de atividade.xls'
            a.click()

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAtividadesEmAndamento()
    }, [])

    return (
        <>
            <Sidebar>
                <Container>
                    <Box m={2}>
                        <Button onClick={relatorio} variant='contained' size='small'>Report</Button>
                    </Box>
                    <Box m={2}>
                        <Typography variant='h5'>
                            {/* Atividade Principal: Elegibilidade */}
                        </Typography>
                    </Box>
                    <br />
                    <TabelaCelulas report={report} atividadeAtual={atividadeAtual} />
                </Container>
            </Sidebar>
        </>
    )
}

export default ControleAtividades

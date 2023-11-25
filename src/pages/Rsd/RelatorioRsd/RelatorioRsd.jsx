import React, { useState } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import moment from "moment/moment";
import { Container, Box, Paper, Divider, Button, TextField, CircularProgress, Typography } from "@mui/material";
import { getRelatorio, getTodosOsPedidos } from "../../../_services/rsd.service";

const RelatorioRsd = () => {

    const [msg, setMsg] = useState('')
    const [aPartir, setAPartir] = useState('')
    const [ate, setAte] = useState('')
    const [loading, setLoading] = useState(false)

    const gerarRelatorio = async () => {
        try {

            setLoading(true)

            let result

            if (aPartir === '' && ate === '') {
                //result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedidos/todos`, { withCredentials: true })
                result = await getTodosOsPedidos()
            }

            if (aPartir === '' && ate !== '') {
                //result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/relatorio/${moment(new Date()).format('YYYY-MM-DD')}/${ate}`, { withCredentials: true })

                result = await getRelatorio(moment(new Date()).format('YYYY-MM-DD'), ate)

            }

            if (aPartir !== '' && ate === '') {
                //result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/relatorio/${aPartir}/${moment(new Date()).format('YYYY-MM-DD')}`, { withCredentials: true })

                result = await getRelatorio(aPartir, moment(new Date()).format('YYYY-MM-DD'))
            }

            if (aPartir !== '' && ate !== '') {
                result = await getRelatorio(aPartir, ate)
            }

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Código</th>"
            xls += "<th>Fase</th>"
            xls += "<th>Status Amil</th>"
            xls += "<th>Status Gerencial</th>"
            xls += "<th>Mes Inclusão</th>"
            xls += "<th>Data Inclusão</th>"
            xls += "<th>Data Conclusão</th>"
            xls += "<th>Operadora Beneficiário</th>"
            xls += "<th>Número Protocolo</th>"
            xls += "<th>Número Pedido</th>"
            xls += "<th>Marca Ótica</th>"
            xls += "<th>Beneficiário</th>"
            xls += "<th>Data Solicitação</th>"
            xls += "<th>Valor Apresentado</th>"
            xls += "<th>CNPJ</th>"
            xls += "<th>Clínica</th>"
            xls += "<th>Contrato Empresa</th>"
            xls += "<th>Data Selo</th>"
            xls += "<th>Forma Pagamento</th>"
            xls += "<th>Marcação para Dossie</th>"
            xls += "<th>Número Nota Fiscal</th>"
            xls += "<th>Data Conclusão Pedido</th>"
            xls += "<th>Responsável</th>"
            xls += "<th>Quem anexou</th>"
            xls += "<th>Fila</th>"
            xls += '<th>Motivo inativo</th>'
            xls += '<th>ID</th>'
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"

            setMsg('Gerando Arquivo')

            result.pedidos.forEach(e => {

                let valorApresentado = e.valorApresentado - 0

                xls += "<tr>"
                xls += `<td>${e.pacote}</td>`
                xls += `<td>${e.fase}</td>`
                xls += `<td>${e.statusPadraoAmil}</td>`
                xls += `<td>${e.statusGerencial}</td>`
                xls += `<td>${moment(e.createdAt).format('MM/YYYY')}</td>`
                xls += `<td>${moment(e.createdAt).format('DD/MM/YYYY')}</td>`
                if (e.dataConclusao === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
                }

                xls += `<td>${e.operador}</td>`
                xls += `<td>${e.protocolo}'</td>`
                xls += `<td>${e.numero}</td>`
                xls += `<td>${e.mo}</td>`
                xls += `<td>${e.pessoa}</td>`
                xls += `<td>${moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>`
                if (isNaN(valorApresentado)) {
                    xls += `<td>${e.valorApresentado}</td>`
                } else {
                    xls += `<td>${valorApresentado?.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</td>`
                }

                xls += `<td>${e.cnpj}</td>`
                xls += `<td>${e.clinica}</td>`
                xls += `<td>${e.contratoEmpresa}</td>`
                if (e.dataSelo === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${moment(e.dataSelo).format('DD/MM/YYYY')}</td>`
                }
                xls += `<td>${e.formaPagamento}</td>`
                xls += `<td>${e.prioridadeDossie}</td>`
                xls += `<td>${e.nf}</td>`

                if (e.dataConclusao === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
                }
                xls += `<td>${e.analista}</td>`
                xls += `<td>${e.quemAnexou}</td>`
                xls += `<td>${e.fila}</td>`
                xls += `<td>${e.motivoInativo}</td>`
                xls += `<td>${e._id}</td>`

                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'relatorio rsd.xls'
            a.click()

            setLoading(false)


        } catch (error) {
            console.log(error);
            setMsg('Algo deu errado')
            setLoading(false)

        }
    }

    return (
        <>
            <Sidebar>
                <Container style={{ display: 'flex', justifyContent: 'center' }}>
                    <Box component={Paper} maxHeight='300px' width='600px' elevation={3} p={2} mt={2}>
                        <Typography variant="h6" mt={1}>
                            Relatório RSD
                        </Typography>
                        <Divider />
                        <Box display='flex' flexDirection='column' p={1} m={1} >
                            <TextField type="date" value={aPartir} onChange={e => setAPartir(e.target.value)} size="small" focused label='A partir de' style={{ maxWidth: '210px', margin: '10px' }} />
                            <TextField type="date" value={ate} onChange={e => setAte(e.target.value)} size="small" focused label='Até' style={{ maxWidth: '210px', margin: '10px' }} />
                        </Box>
                        <Box m={1} p={1}>
                            <Button disabled={loading} variant='contained' startIcon={loading ? <CircularProgress color='inherit' style={{ width: '20px', height: '20px' }} /> : null} onClick={gerarRelatorio} >Gerar Relatório</Button>
                        </Box>
                    </Box>
                </Container>
            </Sidebar>
        </>
    )
}

export default RelatorioRsd
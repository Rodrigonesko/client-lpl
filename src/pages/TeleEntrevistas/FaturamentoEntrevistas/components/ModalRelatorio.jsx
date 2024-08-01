import { useState } from "react"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import Toast from "../../../../components/Toast/Toast"
import Axios from 'axios'
import moment from 'moment'
import { DadosEntrevistaService } from "../../../../_services/teleEntrevistaV2.service"
const dadosEntrevistaService = new DadosEntrevistaService()

const ModalRelatorio = () => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')

    const gerarRelatorio = async () => {

        setLoading(true)

        const result = await dadosEntrevistaService.findByFilter({
            dataInicio,
            dataFim,
            page: 1,
            limit: 20000
        })

        console.log(result);

        const reusltRn = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/concluidas`, {
            withCredentials: true,
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        const resultUe = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/concluidas?limit=0&page=0`, {
            withCredentials: true,
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Id</th>"
        xls += "<th>Analista</th>"
        xls += "<th>Tipo</th>"
        xls += "<th>Proposta</th>"
        xls += "<th>Nome</th>"
        xls += "<th>Data Entrevista</th>"
        xls += "<th>Faturado</th>"
        xls += "<th>Nota Fiscal</th>"
        xls += "<th>Data Faturamento</th>"
        xls += "</tr></thead><tbody>"

        result.entrevistas.forEach(e => {
            xls += "<tr>"
            xls += `<td>${e._id}</td>`
            xls += `<td>${e.cancelado ? e.divergencia : e.responsavel}</td>`
            xls += `<td>Tele</td>`
            xls += `<td>${e.proposta}</td>`
            xls += `<td>${e.nome}</td>`
            xls += `<td>${moment(e.dataEntrevista).format('DD/MM/YYYY')}</td>`
            xls += `<td>${e.faturado}</td>`
            if (e.nf === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${e.nf}</td>`
            }
            if (e.dataFaturamento === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${moment(e.dataFaturamento).format('DD/MM/YYYY')}</td>`
            }
            xls += `</tr>`
        })

        reusltRn.data.result.forEach(e => {
            xls += "<tr>"
            xls += `<td>${e._id}</td>`
            xls += `<td>${e.responsavel}</td>`
            xls += `<td>Rn</td>`
            xls += `<td>${e.proposta}</td>`
            xls += `<td>${e.beneficiario}</td>`
            xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
            xls += `<td>${e.faturado}</td>`
            if (e.nf === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${e.nf}</td>`
            }
            if (e.dataFaturamento === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${moment(e.dataFaturamento).format('DD/MM/YYYY')}</td>`
            }
            xls += `</tr>`
        })

        resultUe.data.propostas.forEach(e => {
            xls += "<tr>"
            xls += `<td>${e._id}</td>`
            xls += `<td>${e.retorno === 'Sem sucesso de contato' ? 'Sem Sucesso de Contato!' : e.analista}</td>`
            xls += `<td>UE</td>`
            xls += `<td>${e.pedido}</td>`
            xls += `<td>${e.nomeAssociado}</td>`
            xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
            xls += `<td>${e.faturado}</td>`
            if (e.nf === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${e.nf}</td>`
            }
            if (e.dataFaturamento === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${moment(e.dataFaturamento).format('DD/MM/YYYY')}</td>`
            }
            xls += `</tr>`
        })

        xls += "</tbody></table>"

        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = 'Relatorio Faturamento.xls'
        a.click()

        setLoading(false)
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
            >
                Relatório
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Relatório</DialogTitle>
                <DialogContent>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        p={2}
                    >
                        <TextField
                            label="Data Início"
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <TextField
                            label="Data Fim"
                            type="date"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={gerarRelatorio}
                    >
                        Gerar
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                severity={severity}
                message={message}
            />
        </>
    )
}

export default ModalRelatorio
import { useState } from "react"
import { getEntrevistasEntreDatas, getEntrevistasEntreDatasAdesao } from "../../../../../_services/teleEntrevista.service"
import { blue, deepPurple } from "@mui/material/colors"
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField } from "@mui/material"
import moment from "moment"

const RelatorioAdesao = () => {
    const [open, setOpen] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [loading, setLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)

    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleGenerate = async () => {
        try {
            if (startDate === '' && endDate === '') {
                return
            }
            setLoading(true)
            const result = await getEntrevistasEntreDatasAdesao(startDate, endDate)
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
            xls += "<th>Responsável</th>"
            xls += "<th>Status Final</th>"
            xls += "<th>Divergência DS</th>"
            xls += "<th>Observações</th>"
            xls += "<th>TEA</th>"
            xls += "<th>Cids</th>"
            xls += "<th>Cids Adesão</th>"
            xls += "</tr></thead><tbody>"

            result.forEach(e => {
                xls += "<tr>"
                xls += `<td>${e._id}</td>`
                xls += `<td>${e.anexadoSisAmil || ''}</td>`
                xls += `<td>${e.implantacao || ''}</td>`
                xls += `<td>${e.implantado || ''}</td>`
                xls += `<td>${moment(e.dataEntrevista).format('YYYY')}</td>`
                xls += `<td>${moment(e.dataEntrevista).format('MM')}</td>`
                xls += `<td>${e.dataEntrevista || ''}</td>`
                xls += `<td>${e.tipoContrato || ''}</td>`
                xls += `<td>${e.proposta || ''}</td>`
                xls += `<td>${e.nome || ''}</td>`
                xls += `<td>${e.cpf || ''}</td>`
                xls += `<td>${e.dataNascimento || ''}</td>`
                xls += `<td>${e.filial || ''}</td>`
                xls += `<td>${e.administradora || ''}</td>`
                xls += `<td>${e.responsavel || ''}</td>`
                xls += `<td>${e.cancelado ? 'INCIDÊNCIA' : 'ENTREVISTA DISPONIBILIZADA'}</td>`
                xls += `<td>${e.houveDivergencia}</td>`
                xls += `<td>${e.divergencia || ''}</td>`
                xls += `<td>${e.tea || ''}</td>`
                xls += `<td>${e.cidsAjustados.map(cid => `${cid.codigo} (${cid.descricao}) : ${cid.ano},`)}</td>`
                xls += `<td>${e?.cidsDs?.map(cid => `${cid.codigo} (${cid.descricao}) : ${cid.ano},`)}</td>`
                // if (e.cids) {
                //     const arrCids = e.codigosCids.split('-')
                //     arrCids.forEach(cid => {
                //         xls += `<td>${cid}</td>`
                //     })
                // } else {
                //     xls += `<td></td>`
                // }
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
                    bgcolor: blue[100],
                    color: blue[800],
                    '&:hover': {
                        bgcolor: blue[500],
                        opacity: 0.8,
                    },
                }}
                onClick={handleClickOpen}
            >
                Relatorio Adesão
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Relatorio Mensal das Entrevistas
                </DialogTitle>
                <DialogContent>
                    <Box component={Paper} p={1}>
                        <Box display='flex' flexDirection='column'>
                            <TextField
                                onChange={event => setStartDate(event.target.value)}
                                value={startDate}
                                type="date"
                                label='Data Inicio'
                                focused
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                onChange={event => setEndDate(event.target.value)}
                                value={endDate}
                                type="date"
                                label='Data FIm'
                                focused
                                sx={{ mt: 2 }}
                            />
                        </Box>
                        <Box mt={2} textAlign='center'>
                            <Button
                                disabled={loading}
                                startIcon={loading && <CircularProgress />}
                                onClick={handleGenerate}
                                variant="contained"
                                sx={{
                                    bgcolor: blue[100],
                                    color: blue[800],
                                    '&:hover': {
                                        bgcolor: blue[500],
                                        opacity: 0.8,
                                    },

                                }}
                            >Gerar Relatorio</Button>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color='inherit' onClick={handleClose}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RelatorioAdesao
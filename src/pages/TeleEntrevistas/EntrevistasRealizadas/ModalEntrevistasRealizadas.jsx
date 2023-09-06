import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Box, TextField, Paper, CircularProgress } from "@mui/material"
import { useState } from "react"
import moment from "moment"
import { getEntrevistasEntreDatas } from "../../../_services/teleEntrevista.service"

const ModalEntrevistasRealizadas = () => {

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

            const result = await getEntrevistasEntreDatas(startDate, endDate)

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Id</th>"
            xls += "<th>Ano Ref</th>"
            xls += "<th>Mês Ref</th>"
            xls += "<th>Data Conclusão</th>"
            xls += "<th>Porte</th>"
            xls += "<th>Proposta</th>"
            xls += "<th>Nome</th>"
            xls += "<th>CPF</th>"
            xls += "<th>Idade</th>"
            xls += "<th>UF</th>"
            xls += "<th>Status Final</th>"
            xls += "<th>Divergência DS</th>"
            xls += "<th>Observações</th>"
            xls += "<th>Cids</th>"
            xls += "</tr></thead><tbody>"

            result.forEach(e => {
                xls += "<tr>"
                xls += `<td>${e._id}</td>`
                xls += `<td>${moment(e.dataEntrevista).format('YYYY')}</td>`
                xls += `<td>${moment(e.dataEntrevista).format('MM')}</td>`
                xls += `<td>${e.dataEntrevista || ''}</td>`
                xls += `<td>${e.tipoContrato || ''}</td>`
                xls += `<td>${e.proposta || ''}</td>`
                xls += `<td>${e.nome || ''}</td>`
                xls += `<td>${e.cpf || ''}</td>`
                xls += `<td>${e.idade || ''}</td>`
                xls += `<td>${e.filial || ''}</td>`
                xls += `<td>${e.cancelado ? 'INCIDÊNCIA' : 'ENTREVISTA DISPONIBILIZADA'}</td>`
                xls += `<td>${e.houveDivergencia}</td>`
                xls += `<td>${e.divergencia || ''}</td>`
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
            <Button onClick={handleClickOpen} style={{ marginLeft: '4px' }} color='secondary' size='small' variant="contained">Relatório Mensal</Button>

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
                            <TextField onChange={event => setStartDate(event.target.value)} value={startDate} type="date" label='Data Inicio' focused sx={{ mt: 2 }} />
                            <TextField onChange={event => setEndDate(event.target.value)} value={endDate} type="date" label='Data FIm' focused sx={{ mt: 2 }} />
                        </Box>
                        <Box mt={2} textAlign='center'>
                            <Button disabled={loading} startIcon={loading && <CircularProgress />} onClick={handleGenerate} variant="contained">Gerar Relatorio</Button>
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

export default ModalEntrevistasRealizadas
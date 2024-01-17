import { Button, Dialog, DialogTitle, DialogActions, DialogContent, Paper, Box, TextField, CircularProgress, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useState } from "react";
// import RelatorioPorData from "../../RelatorioPorData/RelatorioPorData";
import { getPropostasEntreDatas } from "../../../_services/teleEntrevista.service";
import moment from "moment/moment";
import { calcularDiasUteis } from "../../../functions/functions";

const feriados = [
    moment('2022-01-01'),
    moment('2022-04-21'),
    moment('2022-05-01'),
    moment('2022-09-07'),
    moment('2022-10-12'),
    moment('2022-11-02'),
    moment('2022-11-15'),
    moment('2022-12-25'),
    moment('2023-01-01'),
    moment('2023-02-20'),
    moment('2023-02-21'),
    moment('2023-02-22'),
    moment('2023-04-07'),
    moment('2023-04-21'),
    moment('2023-05-01'),
    moment('2023-06-08'),
    moment('2023-09-07'),
    moment('2023-10-12'),
    moment('2023-11-02'),
    moment('2023-11-15'),
    moment('2023-12-25')
];

const ModalRelatorioPropostas = () => {

    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [tipoRelatorio, setTipoRelatorio] = useState('Data Conclusão')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGenerate = async () => {

        if (startDate === '' && endDate === '') {
            return
        }

        setLoading(true)

        const result = await getPropostasEntreDatas(startDate, endDate, tipoRelatorio)

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Data Recebimento</th>"
        xls += "<th>Data Vigencia</th>"
        xls += "<th>Proposta</th>"
        xls += "<th>Nome</th>"
        xls += "<th>Cpf</th>"
        xls += "<th>Data Nascimento</th>"
        xls += "<th>Administrador</th>"
        xls += "<th>Risco</th>"
        xls += "<th>Sinistralidade</th>"
        xls += "<th>Divergencia</th>"
        xls += "<th>Cid Irregularidade</th>"
        xls += "<th>Status</th>"
        xls += "<th>Cid Identificado</th>"
        xls += "<th>Data Entrevista</th>"
        xls += "<th>Idade</th>"
        xls += "<th>Sexo</th>"
        xls += "<th>Telefone</th>"
        xls += "<th>DS 1</th>"
        xls += "<th>DS 2</th>"
        xls += "<th>DS 3</th>"
        xls += "<th>DS 4</th>"
        xls += "<th>DS 5</th>"
        xls += "<th>DS 6</th>"
        xls += "<th>DS 7</th>"
        xls += "<th>DS 8</th>"
        xls += "<th>DS 9</th>"
        xls += "<th>Status</th>"
        xls += "<th>Data Conclusão</th>"
        xls += "<th>Tipo Contrato</th>"
        xls += "<th>1° Contato</th>"
        xls += "<th>Responsavel 1° Contato</th>"
        xls += "<th>2° Contato</th>"
        xls += "<th>Responsavel 2° Contato</th>"
        xls += "<th>3° Contato</th>"
        xls += "<th>Responsavel 3° Contato</th>"
        xls += "<th>Dias uteis</th>"
        xls += "<th>Ret</th>"
        xls += "<th>Nome Operadora</th>"
        xls += "<th>Filial</th>"
        xls += "<th>Responsavel</th>"
        xls += "</tr>"
        xls += "</thead>"
        xls += "<tbody>"

        result.forEach(e => {

            xls += "<tr>"
            xls += `<td>${moment(e.dataRecebimento).format('DD/MM/YYYY')}</td>`
            xls += `<td>${moment(e.vigencia).format('DD/MM/YYYY')}</td>`
            xls += `<td>${e.proposta || ''}</td>`
            xls += `<td>${e.nome || ''}</td>`
            xls += `<td>${e.cpf || ''}</td>`
            xls += `<td>${e.dataNascimento || ''}</td>`
            xls += `<td>${e.administradora || ''}</td>`
            xls += `<td>${e.riscoImc || ''}</td>`
            xls += `<td>${e.sinistral || ''}</td>`
            xls += `<td>${e.divergencia || ''}</td>`
            xls += `<td>${e.cid || ''}</td>`
            xls += `<td>${e.status || ''}</td>`
            xls += `<td>${e.cids || ''}</td>`
            xls += `<td>${e.dataEntrevista || ''}</td>`
            xls += `<td>${e.idade || ''}</td>`
            xls += `<td>${e.sexo || ''}</td>`
            xls += `<td>${e.telefone || ''}</td>`
            xls += `<td>${e.d1?.replaceAll('#', ' ') || ''}</td>`
            xls += `<td>${e.d2?.replaceAll('#', ' ') || ''}</td>`
            xls += `<td>${e.d3?.replaceAll('#', ' ') || ''}</td>`
            xls += `<td>${e.d4?.replaceAll('#', ' ') || ''}</td>`
            xls += `<td>${e.d5?.replaceAll('#', ' ') || ''}</td>`
            xls += `<td>${e.d6?.replaceAll('#', ' ') || ''}</td>`
            xls += `<td>${e.d7?.replaceAll('#', ' ') || ''}</td>`
            xls += `<td>${e.d8?.replaceAll('#', ' ') || ''}</td>`
            xls += `<td>${e.d9?.replaceAll('#', ' ') || ''}</td>`
            xls += `<td>${e.status || ''}</td>`
            xls += `<td>${e.dataConclusao ? moment(e.dataConclusao).format('DD/MM/YYYY') : ''}</td>`
            xls += `<td>${e.tipoContrato || ''}</td>`
            xls += `<td>${e.contato1 || ''}</td>`
            xls += `<td>${e.responsavelContato1 || ''}</td>`
            xls += `<td>${e.contato2 || ''}</td>`
            xls += `<td>${e.responsavelContato2 || ''}</td>`
            xls += `<td>${e.contato3 || ''}</td>`
            xls += `<td>${e.responsavelContato3 || ''}</td>`

            let diasUteis = calcularDiasUteis(moment(e.dataRecebimento), moment(e.dataConclusao), feriados)
            if (!e.dataConclusao) {
                diasUteis = ''
            }
            xls += `<td>${diasUteis}</td>`
            xls += `<td>${e.retrocedido || ''}</td>`
            xls += `<td>${e.nomeOperadora || ''}</td>`
            xls += `<td>${e.filail || ''}</td>`
            xls += `<td>${e.enfermeiro || ''}</td>`


            xls += `</tr>`
        })

        xls += "</tbody></table>"

        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = 'Relatório Propostas.xls'
        a.click()

        setLoading(false)
    }

    return (
        <>
            <Button onClick={handleClickOpen} variant="contained" >Relatório Propostas</Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Relatório de Propostas Recebidas"}
                </DialogTitle>
                <DialogContent>
                    <Box component={Paper} p={1}>
                        <FormControl fullWidth size="small" >
                            <InputLabel id="demo-simple-select-label">Tipo Relatorio</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Tipo Relatorio"
                                value={tipoRelatorio}
                                onChange={(e) => {
                                    setTipoRelatorio(e.target.value)
                                }}
                            >
                                <MenuItem value={'Data Recebido'}>Data Recebido</MenuItem>
                                <MenuItem value={'Data Conclusão'}>Data Conclusão</MenuItem>
                            </Select>
                        </FormControl>
                        <Box display='flex' flexDirection='column'>
                            <TextField onChange={event => setStartDate(event.target.value)} value={startDate} type="date" label='Data Inicio' focused sx={{ mt: 2 }} />
                            <TextField onChange={event => setEndDate(event.target.value)} value={endDate} type="date" label='Data Fim' focused sx={{ mt: 2 }} />
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

export default ModalRelatorioPropostas
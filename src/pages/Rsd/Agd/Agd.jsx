import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { Container, Box, Button, Typography, Paper, TextField, LinearProgress, Alert } from "@mui/material";
import moment from "moment";

const Agd = () => {

    const CHUNK_SIZE = 5242880;
    const [file, setFile] = useState()
    const [progressValue, setProgressValue] = useState(0)
    const [loading, setLoading] = useState(false)

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleFileUpload = async () => {

        if (!file) {
            alert('Selecione um arquivo para fazer upload');
            return;
        }
        let start = 0;
        let end = CHUNK_SIZE;

        let count = 0

        console.log(file.size);

        let totalProgress = (file.size / CHUNK_SIZE)

        while (start < file.size) {
            count++
            const slice = file.slice(start, end);

            const formData = new FormData();
            formData.append('file', slice);

            await Axios.post(`${process.env.REACT_APP_API_KEY}/amil/upload`, formData, { headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` }, withCredentials: true });

            setProgressValue((count / totalProgress) * 100)

            start = end;
            end = Math.min(start + CHUNK_SIZE, file.size);
        }


    }

    const gerarAGD = async () => {
        try {
            setLoading(true)
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/amil/AGD`, { withCredentials: true })

            console.log(result);
            setLoading(false)

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Código</th>"
            xls += "<th>Fase</th>"
            xls += "<th>Status Amil</th>"
            xls += "<th>LPL x Amil</th>"
            xls += "<th>Status Gerencial</th>"
            xls += "<th>Mes Inclusão</th>"
            xls += "<th>Data Inclusão</th>"
            xls += "<th>Data Conclusão</th>"
            xls += "<th>Operadora Beneficiário</th>"
            xls += "<th>Número Protocolo</th>"
            xls += "<th>Número Pedido</th>"
            xls += "<th>Situação Amil</th>"
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

            result.data.forEach(e => {
                let valorApresentado = e.valorApresentado - 0

                xls += "<tr>"
                xls += `<td>${e.pacote}</td>`
                xls += `<td>${e.fase}</td>`
                xls += `<td>${e.statusPadraoAmil}</td>`
                xls += `<td>${e.lplXamil}</td>`
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
                xls += `<td>${e.situacao}</td>`
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

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'AGD.xls'
            a.click()


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar />
            <Container style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Box component={Paper} p={3} elevation={3} minWidth='500px'>
                    <Typography variant="h5">
                        Upload de arquivo AGD
                    </Typography>
                    <Box display='flex' marginTop={3}>
                        <TextField type='file' onChange={handleFileChange} />
                        <Button variant="contained" onClick={handleFileUpload} disabled={!loading ? false : true}>Enviar</Button>
                    </Box>
                    <Box mt={3}>
                        <LinearProgress variant="determinate" value={progressValue} />
                        {
                            progressValue >= 100 ? (
                                <Alert>Arquivo enviado com sucesso!</Alert>
                            ) : null
                        }
                    </Box>
                </Box>
                <Box component={Paper} p={3} elevation={3} minWidth='500px' mt={2}>
                    <Typography variant="h5">
                        Gerar arquivo AGD
                    </Typography>
                    <Box mt={3}>
                        <Box>
                            <Button onClick={gerarAGD} disabled={!loading ? false : true} variant="contained" color='secondary' >Gerar</Button>
                        </Box>
                        <Box mt={3}>
                            <LinearProgress variant={!loading ? 'determinate' : 'indeterminate'} color='secondary' value={!loading ? '100' : '0'} />
                        </Box>

                    </Box>
                </Box>
            </Container>
        </>

    )
}

export default Agd
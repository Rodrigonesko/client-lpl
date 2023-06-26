import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Container, Box, Paper, Button, LinearProgress, Typography, TextField, Alert } from "@mui/material";
import { uploadDivergencia } from "../../../_services/elegibilidade.service";

const Divergencias = () => {

    const [file, setFile] = useState()
    const [status, setStatus] = useState('')
    const [qtd, setQtd] = useState(0)
    // const [propostas, setPropostas] = useState([])

    const send = async e => {
        e.preventDefault()

        try {

            let formData = new FormData()

            formData.append('file', file, file.name)

            setStatus('Enviando')

            const result = await uploadDivergencia(formData)

            console.log(result);

            setStatus('Concluido')

            setQtd(result.propostas.length)
            downloadArquivo(result.propostas)


        } catch (error) {
            console.log(error);
            setStatus('Erro')
        }
    }

    const downloadArquivo = (propostas) => {

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Base Amil</th>"
        xls += "<th>Base Lpl</th>"
        xls += "<th>Houve Divergencia</th>"
        xls += "<th>Proposta</th>"
        xls += "</tr>"

        propostas.forEach(item => {
            xls += `<tr>`
            xls += `<td>${item.statusAmil}</td>`
            xls += `<td>${item.statusBanco}</td>`
            xls += `<td>Houve Divergência</td>`
            xls += `<td>${item.proposta}</td>`
            xls += `</tr>`
        })

        xls += "</tbody></table>"

        let a = document.createElement('a');
        let data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = 'relatorio divergencias.xls'
        a.click()

    }

    return (
        <>
            <Sidebar />
            <Container style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <form action="" method="post">
                    <Box p={3} display='flex' justifyContent='center' flexDirection='column' alignItems='center' component={Paper} elevation={4}>

                        <Typography variant="h5">
                            Upload Divergencias
                        </Typography>
                        <Box m={1}>
                            <TextField type="file" onChange={e => setFile(e.target.files[0])} />
                        </Box>
                        <Box m={2}>
                            <Button variant='contained' onClick={send} >Enviar</Button>
                        </Box>
                        {
                            status === 'Enviando' ? (
                                <LinearProgress style={{ width: '100%' }} />
                            ) : null
                        }
                        {
                            status === 'Concluido' ? (
                                <Alert severity="success">
                                    {qtd} divergencias
                                </Alert>
                            ) : null
                        }
                        {
                            status === 'Erro' ? (
                                <Alert severity="error">
                                    Algo deu errado
                                </Alert>
                            ) : null
                        }

                    </Box>
                </form>

            </Container>
        </>

    )
}

export default Divergencias
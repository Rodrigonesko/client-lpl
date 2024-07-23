import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import * as XLSX from 'xlsx';
import { Alert, Box, Button, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Input, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { uploadPropostas } from "../../../_services/teleEntrevista.service";
import { PropostaService } from "../../../_services/teleEntrevistaV2.service";

const propostaService = new PropostaService()

const UploadRn = () => {

    const [file, setFile] = useState()
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [tipoContrato, setTipoContrato] = useState('')
    const [loading, setLoading] = useState(false)


    const send = async e => {
        e.preventDefault()

        if (tipoContrato === '') {
            setMessage('Selecione o tipo de contrato')
            setSeverity('error')
            return
        }

        if (!file) {
            setMessage('Selecione um arquivo')
            setSeverity('error')
            return
        }
        setLoading(true)
        const data = await file.arrayBuffer()
        const workbook = XLSX.read(data, { type: 'array' })
        const firsSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firsSheetName]
        let result = XLSX.utils.sheet_to_json(worksheet)
        console.log(result);

        try {
            if (tipoContrato === 'PME') {
                const send = await uploadPropostas({ result })
                setMessage(send.message)
                setSeverity('success')
            }
            if (tipoContrato === 'ADESÃO') {
                result = result.map(item => {
                    const newItem = {};
                    Object.keys(item).forEach(key => {
                        const trimmedKey = key.trim(); // Remove espaços antes e depois
                        newItem[trimmedKey] = item[key];
                    });
                    return newItem;
                });
                const send = await propostaService.uploadAdesao(result)
                setMessage(`Foram enviados ${send} propostas`)
                setSeverity('success')
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            setMessage('Algo deu errado')
            setSeverity('error')
            setLoading(false)
        }
    }
    return (

        <Sidebar>
            <Container
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        padding: '20px',
                    }}
                    component={Paper}
                    elevation={1}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        Upload de Tele Entrevista
                    </Typography>
                    <Box>
                        <FormControl>
                            <FormLabel>Tipo de Contrato</FormLabel>
                            <RadioGroup
                                value={tipoContrato}
                                onChange={e => setTipoContrato(e.target.value)}
                            >
                                <FormControlLabel control={<Radio />} label='PME' value={'PME'} />
                                <FormControlLabel control={<Radio />} label='ADESÃO' value={'ADESÃO'} />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}
                    >
                        <Input type="file" onChange={e => setFile(e.target.files[0])} />
                        <Button disabled={loading} endIcon={loading && <CircularProgress size={20} />} variant="contained" onClick={send}>Enviar</Button>
                    </Box>
                    {
                        message && (
                            <Alert
                                severity={severity}
                                variant="filled"
                            >
                                {message}
                            </Alert>
                        )
                    }
                </Box>
                {/* <div className="upload-container">
                    <form action="" method="post">
                        <div className="title">
                            <h2>Upload Tele Entrevista</h2>
                        </div>
                        <div>
                            <label htmlFor="file-rn">Arquivo: </label>
                            <input type="file" name="file-rn" id="file-rn" onChange={e => setFile(e.target.files[0])} />
                        </div>
                        <div className="container-btns">
                            <button className="btn" onClick={send} >Enviar</button>
                        </div>
                    </form>
                </div> */}
            </Container>
        </Sidebar>


    )
}

export default UploadRn
import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { Container, Box, Button, Typography, Paper, TextField } from "@mui/material";

const Agd = () => {

    const CHUNK_SIZE = 5242880;
    const [file, setFile] = useState()

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
        const url = 'http://localhost:3000/upload'; // substitua pela URL da sua API
        const config = {
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment; filename=${file.name}`,
            },
        };

        while (start < file.size) {
            const slice = file.slice(start, end);
            const reader = new FileReader();
            reader.readAsArrayBuffer(slice);
            const buffer = await new Promise((resolve) => {
                reader.onload = (event) => {
                    resolve(event.target.result);
                };
            });

            const chunk = new Uint8Array(buffer);
            const formData = new FormData();
            formData.append('file', chunk);

            console.log(formData);

            //await Axios.post(url, formData, config);

            start = end;
            end = Math.min(start + CHUNK_SIZE, file.size);
        }

        alert('Arquivo enviado com sucesso!');
    };

    return (
        <>
            <Sidebar />
            <Container style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box component={Paper} p={3} elevation={3}>
                    <Typography variant="h5">
                        Upload de arquivo AGD
                    </Typography>
                    <Box display='flex' marginTop={3}>
                        <TextField type='file' onChange={handleFileChange} />
                        <Button variant="contained" onClick={handleFileUpload}>Enviar</Button>
                    </Box>
                </Box>
            </Container>
        </>

    )
}

export default Agd
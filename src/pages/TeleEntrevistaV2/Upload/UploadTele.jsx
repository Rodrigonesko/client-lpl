import { Box, Button, Input, Typography, Alert } from '@mui/material';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { createPropostasEntrevistas } from '../../../_services/teleEntrevistaV2.service';
import { blue } from '@mui/material/colors';

const UploadTele = () => {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        text: '',
        severity: 'info'
    });

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        setLoading(true);
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(sheet);
                const result = await createPropostasEntrevistas(rows);
                console.log(result);
                setMessage({
                    text: 'Arquivo enviado com sucesso - ' + result + ' propostas criadas',
                    severity: 'success'
                });
            } catch (error) {
                console.log('Erro ao enviar arquivo');
                console.log(error);
                setMessage({
                    text: `Erro ao enviar arquivo: ${error.message}, erro na linha ${error.response?.data?.count} da planilha`,
                    severity: 'error'
                });
            } finally {
                setLoading(false);
            }
        };
        reader.onerror = (error) => {
            console.log('Erro ao ler arquivo');
            console.log(error);
            setMessage({
                text: 'Erro ao ler arquivo' + error.message,
                severity: 'error'
            });
            setLoading(false);
        };
    };

    return (
        <Box
            sx={{
                bgcolor: blue[500],
                maxHeight: '80%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
                color: 'white',
                borderRadius: '10px',
                width: '450px'
            }}
        >
            <Typography variant="h4" gutterBottom>
                Upload Tele
            </Typography>
            <Input
                type="file"
                onChange={onFileChange}
                sx={{
                    cursor: 'pointer',
                    padding: '6px 12px',
                    color: 'white',
                    bgcolor: 'primary.main',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    },
                    borderRadius: '4px',
                    border: 'none',
                    transition: 'all 0.3s ease-in-out',
                    fontSize: '14px',
                }}
                disabled={loading}
            />

            <Button
                onClick={onFileUpload}
                variant="contained"
                sx={{
                    bgcolor: 'primary.main',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    },
                    transition: 'all 0.3s ease-in-out',
                }}
                disabled={loading}
            >
                {
                    loading ? 'Enviando...' : 'Enviar'
                }
            </Button>
            {message?.text && <Alert severity={message?.severity}>{message?.text}</Alert>}
        </Box>
    )
}

export default UploadTele;
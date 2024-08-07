import { Alert, Box, Button, Dialog, DialogActions, DialogContent, Input, Typography } from "@mui/material"
import { blue, grey } from "@mui/material/colors"
import { useState } from "react";
import * as XLSX from 'xlsx';
import { uploadUrgenciaEmergencia } from "../../../_services/urgenciaEmergenciaNew.service";

const Upload = ({ setRefresh }) => {

    const [open, setOpen] = useState(false)

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        text: '',
        severity: 'info'
    });

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

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
                let rows = XLSX.utils.sheet_to_json(sheet);
                rows = rows.map(row => {
                    return {
                        ...row,
                    }
                });
                const result = await uploadUrgenciaEmergencia(rows)
                console.log(result);
                setMessage({
                    text: 'Arquivo enviado com sucesso - ' + result.length + ' propostas criadas',
                    severity: 'success'
                });
                setRefresh(prev => !prev);
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
        <>
            <Button type="button" variant='contained' onClick={handleOpen} sx={{ borderRadius: '10px' }}>Upload Urgência Emergência</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: grey[100],
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
                                width: '450px',
                                borderBottom: `10px solid ${blue[600]}`
                            }}
                        >
                            <Typography variant="h3" color={blue[600]} align="center">
                                Urgência Emergência
                            </Typography>
                            <Input
                                type="file"
                                onChange={onFileChange}
                                sx={{
                                    cursor: 'pointer',
                                    padding: '6px 12px',
                                    color: 'white',
                                    bgcolor: blue[600],
                                    '&:hover': {
                                        bgcolor: blue[800],
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
                                    bgcolor: blue[600],
                                    '&:hover': {
                                        bgcolor: blue[800],
                                    },
                                    transition: 'all 0.3s ease-in-out',
                                }}
                                disabled={loading}
                            >
                                {
                                    loading ? 'Enviando...' : 'Enviar'
                                }
                            </Button>
                            {message?.text && <Alert variant="filled" severity={message?.severity}>{message?.text}</Alert>}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Fechar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Upload
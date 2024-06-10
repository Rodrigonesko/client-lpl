import { Alert, Box, Button, Input, Paper, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { blue, grey } from "@mui/material/colors"
import { useState } from "react"
import { ajustarCpf } from "../../../functions/functions"
import * as XLSX from 'xlsx';
import { uploadPedidos } from "../../../_services/rsdBradesco.service"

import bradesco from "../../../imgs/bradesco.png"

const RsdBradesco = () => {

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
                let rows = XLSX.utils.sheet_to_json(sheet);
                // rows = rows.map(row => {
                //     return {
                //         ...row,
                //         "CPF Segurado": ajustarCpf(row["CPF Segurado"]),
                //     }});
                const result = await uploadPedidos(rows); // Modificar esse create
                console.log(result);
                setMessage({
                    text: <Box>
                        <Typography>{result.countPedido} pedidos criados</Typography>
                        <Typography>{result.countProtocolo} protocolos criados</Typography>
                        <Typography>{result.countPacote} pacotes criados</Typography>
                        <Typography>{result.countSegurado} novos beneficiários</Typography>
                        <Typography>{result.countPrestador} novos prestadores</Typography>
                    </Box>,
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
        <>
            <Sidebar>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}
                >
                    <Box
                        component={Paper}
                        elevation={5}
                        sx={{
                            bgcolor: grey[200],
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
                            borderBottom: `10px solid ${'black'}`
                        }}
                    >
                        <img src={bradesco} alt='LogoBradesco' />
                        <Input
                            type="file"
                            onChange={onFileChange}
                            sx={{
                                cursor: 'pointer',
                                padding: '6px 12px',
                                color: 'white',
                                bgcolor: blue[900],
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
                                bgcolor: blue[900],
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
            </Sidebar>
        </>
    )
}

export default RsdBradesco 
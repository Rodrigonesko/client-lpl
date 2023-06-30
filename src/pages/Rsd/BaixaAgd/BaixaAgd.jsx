import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Container, Typography, Box, Paper, TextField, Button, LinearProgress, Alert } from "@mui/material";
import { baixaAgd } from "../../../_services/rsd.service";

const BaixaAgd = () => {

    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleFileChange = (event) => {

        setFile(event.target.files[0])

    }

    const handleFileUpload = async () => {

        try {
            setLoading(true)

            const formData = new FormData()
            formData.append('file', file, file.name)

            await baixaAgd({ formData })
            setLoading(false)

            setSuccess(true)
        } catch (error) {
            setLoading(false)
        }



    }

    return (
        <>
            <Sidebar />

            <Container style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="h6" m={2}>
                    Baixa AGD

                </Typography>

                {
                    success ? (
                        <Alert severity='success'>
                            Baixas realizadas com sucesso!
                        </Alert>
                    ) : null
                }

                <Box component={Paper} display='flex' p={3} elevation={3}>
                    <TextField type="file" onChange={handleFileChange} />
                    <Button variant="contained" onClick={handleFileUpload} disabled={loading}>Enviar</Button>
                </Box>
                {
                    loading ? (
                        <Typography width='40%'>
                            <LinearProgress />
                        </Typography>
                    ) : null
                }


            </Container>
        </>
    )
}

export default BaixaAgd
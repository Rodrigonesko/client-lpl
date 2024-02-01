import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Container, Box, Paper, Button, LinearProgress, Typography, TextField, Alert } from "@mui/material";
import { uploadPropostas } from "../../../_services/elegibilidade.service";

const UploadElegibilidade = () => {

    const [file, setFile] = useState()
    const [status, setStatus] = useState('')
    const [qtd, setQtd] = useState(0)

    const send = async e => {
        e.preventDefault()

        try {

            let formData = new FormData()

            formData.append('file', file, file.name)

            setStatus('Enviando')

            const result = await uploadPropostas(formData)

            setStatus('Concluido')
            setQtd(result.qtd)


        } catch (error) {
            console.log(error);
            setStatus('Erro')
        }

    }



    return (
        <>
            <Sidebar>
                <Container style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <form action="" method="post">
                        <Box p={3} display='flex' justifyContent='center' flexDirection='column' alignItems='center' component={Paper} elevation={4}>

                            <Typography variant="h5">
                                Upload Elegibilidade
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
                                        Foram inseridas {qtd} propostas novas
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
            </Sidebar>
        </>

    )
}

export default UploadElegibilidade
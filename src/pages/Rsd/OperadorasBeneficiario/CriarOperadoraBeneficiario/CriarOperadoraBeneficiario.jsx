import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Container, Box, TextField, Button, Paper, Typography, Alert, Snackbar } from "@mui/material";
import { criarOperadora } from "../../../../_services/rsd.service";

const CriarOperadoraBeneficiario = () => {

    const navigate = useNavigate()

    const [descricao, setDescricao] = useState('')
    const [sla, setSla] = useState('')
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState('')

    const handleClose = () => {
        setOpen(false)
    }

    const cadastrar = async () => {
        try {

            if (descricao === '' || sla === '') {
                setError(true)
                setMsg('Descrição e Sla obrigatórios')
                setOpen(true)
                return
            }
            await criarOperadora({
                descricao,
                sla
            })

            setError(false)
            setMsg('Criado com sucesso')
            setOpen(true)

            setTimeout(() => {
                navigate('/rsd/OperadoraBeneficiario')
            }, '1000')

            // if (result.status === 200) {
            // }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar>
                <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <Box component={Paper} elevation={3} p={2} display='flex' flexDirection='column' >
                        <Typography variant="h6">
                            Nova Operadora Beneficiário
                        </Typography>
                        <TextField style={{ margin: '10px' }} label="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} size="small" />
                        <TextField style={{ margin: '10px' }} label='Sla em dias' value={sla} onChange={e => setSla(e.target.value)} size="small" type="number" />
                        <Button variant="contained" onClick={cadastrar} className="cadastrar-operadora">Cadastrar</Button>
                    </Box>
                </Container>
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert variant='filled' onClose={handleClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            </Sidebar>

        </>
    )
}

export default CriarOperadoraBeneficiario
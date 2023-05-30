import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Container, Box, Paper, TextField, Button, Typography, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Snackbar, Alert } from "@mui/material";

const PropostasAmil = () => {

    const [data, setData] = useState('')
    const [proposta, setProposta] = useState('')
    const [beneficiario, setBeneficiario] = useState('')
    const [confirmacao, setConfirmacao] = useState('')
    const [meioConfirmacao, setMeioConfirmacao] = useState('')
    const [meioSolicitacao, setMeioSolicitacao] = useState('')
    const [resultado, setResultado] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [observacoes, setObservacoes] = useState('')

    const [openSnack, setOpenSnack] = useState(false)

    const registrar = async () => {
        try {

            const obj = {
                data,
                proposta,
                beneficiario,
                confirmacao,
                meioConfirmacao,
                meioSolicitacao,
                resultado,
                responsavel,
                observacoes
            }

            console.log(obj);

            setData('')
            setProposta('')
            setBeneficiario('')
            setConfirmacao('')
            setMeioConfirmacao('')
            setMeioSolicitacao('')
            setResultado('')
            setResponsavel('')
            setObservacoes('')

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar />
            <Container>
                <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => { setOpenSnack(false) }} >
                    <Alert onClose={() => { setOpenSnack(false) }} severity="success" sx={{ width: '100%' }}>
                        This is a success message!
                    </Alert>
                </Snackbar>
                <Box component={Paper} elevation={3} p={2}>
                    <Typography variant="h6" mb={2}>
                        Registro
                    </Typography>

                    <Grid container display='flex' justifyContent='space-around' alignItems='center' >
                        <Grid xs={12} sm={5}>
                            <TextField label="Data" variant="outlined" type="date" focused fullWidth size="small" style={{ marginBottom: '15px' }} value={data} onChange={e => {
                                setData(e.target.value)
                            }} />
                            <TextField label="Proposta" variant="outlined" type="text" fullWidth size="small" style={{ marginBottom: '15px' }} value={proposta} onChange={e => {
                                setProposta(e.target.value)
                            }} />
                            <TextField label="Beneficiário" variant="outlined" type="text" fullWidth size="small" style={{ marginBottom: '15px' }} value={beneficiario} onChange={e => {
                                setBeneficiario(e.target.value)
                            }} />
                            <TextField label="Confirmação" variant="outlined" type="text" fullWidth size="small" style={{ marginBottom: '15px' }} value={confirmacao} onChange={e => {
                                setConfirmacao(e.target.value)
                            }} />
                        </Grid >
                        <Grid xs={12} sm={5} >
                            <TextField label="Meio de confirmação" variant="outlined" type="text" fullWidth size="small" style={{ marginBottom: '15px' }} value={meioConfirmacao} onChange={e => {
                                setMeioConfirmacao(e.target.value)
                            }} />
                            <TextField label="Meio de solicitação" variant="outlined" type="text" fullWidth size="small" style={{ marginBottom: '15px' }} value={meioSolicitacao} onChange={e => {
                                setMeioSolicitacao(e.target.value)
                            }} />
                            <TextField label="Resultado" variant="outlined" type="text" fullWidth size="small" style={{ marginBottom: '15px' }} value={resultado} onChange={e => {
                                setResultado(e.target.value)
                            }} />
                            <TextField label="Responsável" variant="outlined" type="text" fullWidth size="small" style={{ marginBottom: '15px' }} value={responsavel} onChange={e => {
                                setResponsavel(e.target.value)
                            }} />
                        </Grid >
                    </Grid>
                    <Box display='flex' justifyContent='center'>
                        <TextField label="Observações" variant="outlined" type="text" style={{ width: '90%' }} size="small" multiline rows={3} value={observacoes} onChange={e => {
                            setObservacoes(e.target.value)
                        }} />
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' mt={2}>
                        <Button variant="contained" style={{ marginBottom: '20px' }} onClick={registrar}>Registrar</Button>
                        <Button variant="contained" color="info">Report</Button>
                    </Box>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Data</TableCell>
                                <TableCell>Proposta</TableCell>
                                <TableCell>Beneficiário</TableCell>
                                <TableCell>Confirmação</TableCell>
                                <TableCell>Responsável</TableCell>
                                <TableCell>Informações</TableCell>
                                <TableCell>Concluir</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export default PropostasAmil
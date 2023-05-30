import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Container, Box, Paper, TextField, Button, Typography, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Snackbar, Alert } from "@mui/material";
import Axios from 'axios'
import moment from "moment";
import RelatorioPropostasManuaisElegibilidade from "./RelatorioPropostasManual";

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
    const [loading, setLoading] = useState(false)
    const [propostas, setPropostas] = useState([])

    const [severitySnack, setSeveritySnack] = useState('success')
    const [msgSnack, setMsgSnack] = useState('')
    const [openSnack, setOpenSnack] = useState(false)

    const registrar = async () => {
        try {

            setLoading(true)

            const obj = {
                data,
                proposta,
                beneficiario,
                confirmacao,
                meioConfirmacao,
                meioSolicitacao,
                resultado,
                responsavel,
                observacoes,
                status: 'Em andamento'
            }

            let todosVazios = true;

            for (let prop in obj) {
                if (obj.hasOwnProperty(prop) && obj[prop] !== '') {
                    todosVazios = false;
                    break;
                }
            }

            if (todosVazios) {
                setSeveritySnack('error')
                setMsgSnack('Campos vazios, por favor preencha-os')
                setOpenSnack(true)
                return
            }

            console.log(obj);

            await Axios.post(`${process.env.REACT_APP_API_KEY}/elegibilidade/registrar/proposta`, {
                dadosProposta: obj
            }, {
                withCredentials: true
            })


            setSeveritySnack('success')
            setMsgSnack('Proposta adicionada com sucesso!')
            setOpenSnack(true)

            setData('')
            setProposta('')
            setBeneficiario('')
            setConfirmacao('')
            setMeioConfirmacao('')
            setMeioSolicitacao('')
            setResultado('')
            setResponsavel('')
            setObservacoes('')

            setLoading(false)

        } catch (error) {
            console.log(error);
            setSeveritySnack('error')
            setMsgSnack('Algo deu errado')
            setOpenSnack(true)
            setLoading(false)
        }
    }

    const buscarPropostas = async () => {
        try {

            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/show/propostaManual/andamento`, {
                withCredentials: true
            })

            console.log(result.data);

            setPropostas(result.data)


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        buscarPropostas()

    }, [])

    return (
        <>
            <Sidebar />
            <Container>
                <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => { setOpenSnack(false) }} >
                    <Alert onClose={() => { setOpenSnack(false) }} severity={severitySnack} sx={{ width: '100%' }}>
                        {msgSnack}
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
                        <RelatorioPropostasManuaisElegibilidade />
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
                            {
                                propostas.map(proposta => {
                                    return (
                                        <TableRow key={proposta._id}>
                                            <TableCell>{moment(proposta.data).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{proposta.proposta}</TableCell>
                                            <TableCell>{proposta.beneficiario}</TableCell>
                                            <TableCell>{proposta.confirmacao}</TableCell>
                                            <TableCell>{proposta.responsavel}</TableCell>
                                            <TableCell><Button variant="contained" color='info' >Info</Button></TableCell>
                                            <TableCell><Button variant="contained" color='success' >Concluir</Button></TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export default PropostasAmil
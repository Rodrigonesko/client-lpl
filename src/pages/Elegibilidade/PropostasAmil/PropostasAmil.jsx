import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Container, Box, Paper, TextField, Button, Typography, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Snackbar, Alert, Modal, CircularProgress } from "@mui/material";
import moment from "moment";
import RelatorioPropostasManuaisElegibilidade from "./RelatorioPropostasManual";
import { atualizarObservacoes, concluirPropostaManual, getPropostasManuais, getPropostasManuaisEmAndamento, registrarProposta } from "../../../_services/elegibilidade.service";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


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
    const [openModal, setOpenModal] = useState(false)
    const [openModalConcluir, setOpenModalConcluir] = useState(false)

    const [modalMeioSolicitacao, setModalMeioSolicitacao] = useState('')
    const [modalMeioDeConfirmacao, setModalMeioConfirmacao] = useState('')
    const [modalResultado, setModalResultado] = useState('')
    const [modalObservacoes, setModalObservacoes] = useState('')
    const [modalId, setModalId] = useState('')

    const [total, setTotal] = useState([])

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

            await registrarProposta({ dadosProposta: obj })


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

            const result = await getPropostasManuaisEmAndamento()

            setPropostas(result)

            const resultData = await getPropostasManuais()

            setTotal(resultData)

            setLoading(false)


        } catch (error) {
            console.log(error);
        }
    }

    const handlerAtualizarObservacoes = async () => {
        try {

            await atualizarObservacoes({
                observacoes: modalObservacoes,
                id: modalId
            })

            setOpenSnack(true)
            setMsgSnack('Observações atualizadas')
            setOpenModal(false)
            buscarPropostas()

        } catch (error) {
            console.log(error);
        }
    }

    const concluir = async () => {
        try {

            await concluirPropostaManual({
                id: modalId
            })

            setOpenSnack(true)
            setMsgSnack('Proposta Concluída com sucesso')
            buscarPropostas()
            setOpenModalConcluir(false)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        buscarPropostas()

    }, [])

    return (
        <>
            <Sidebar>
                <Container>
                    {
                        loading ? (
                            <CircularProgress className="loading" />
                        ) : null
                    }
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => {
                        setOpenSnack(false)
                        setMsgSnack('')
                    }} >
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
                                                <TableCell><Button variant="contained" color='info' onClick={() => {
                                                    setOpenModal(true)
                                                    setModalMeioSolicitacao(proposta.meioSolicitacao)
                                                    setModalMeioConfirmacao(proposta.meioConfirmacao)
                                                    setModalResultado(proposta.resultado)
                                                    setModalObservacoes(proposta.observacoes)
                                                    setModalId(proposta._id)
                                                }} >Info</Button></TableCell>
                                                <TableCell><Button variant="contained" color='success' onClick={() => {
                                                    setModalId(proposta._id)
                                                    setOpenModalConcluir(true)
                                                }} >Concluir</Button></TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' mt={3}>
                        <Box component={Paper} p={2} elevation={3}>
                            <Typography>
                                Total de propostas amil: <strong>{total.length}</strong>
                            </Typography>
                            <Typography>
                                Total Concluídos: <strong>{total.length - propostas.length}</strong>
                            </Typography>
                            <Typography>
                                Total em andamento: <strong>{propostas.length}</strong>
                            </Typography>
                        </Box>

                    </Box>

                </Container>
                <Modal
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false)
                        setModalMeioConfirmacao('')
                        setModalMeioSolicitacao('')
                        setModalResultado('')
                        setModalObservacoes('')
                    }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Informações
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <TextField label='Meio de Solicitação' fullWidth style={{ margin: '10px' }} InputProps={{
                                readOnly: true,
                            }} value={modalMeioSolicitacao} />
                            <TextField label='Meio de Confirmação' fullWidth style={{ margin: '10px' }} InputProps={{
                                readOnly: true,
                            }} value={modalMeioDeConfirmacao} />
                            <TextField label='Resultado' fullWidth style={{ margin: '10px' }} InputProps={{
                                readOnly: true,
                            }} value={modalResultado} />
                            <TextField label='Observações' fullWidth style={{ margin: '10px' }} rows={2} multiline value={modalObservacoes} onChange={e => setModalObservacoes(e.target.value)} />
                        </Typography>
                        <Box display='flex' justifyContent='space-around' mt={2}>
                            <Button color='inherit' variant="contained" onClick={() => {
                                setOpenModal(false)
                                setModalMeioConfirmacao('')
                                setModalMeioSolicitacao('')
                                setModalResultado('')
                                setModalObservacoes('')
                            }}>Fechar</Button>
                            <Button variant="contained" onClick={handlerAtualizarObservacoes} >Salvar</Button>
                        </Box>
                    </Box>
                </Modal>
                <Modal
                    open={openModalConcluir}
                    onClose={() => setOpenModalConcluir(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Concluir
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} display='flex' justifyContent='space-around'>
                            <Button variant="contained" color='inherit' onClick={() => { setOpenModalConcluir(false) }} >Fechar</Button>
                            <Button color="success" variant="contained" onClick={concluir} >Concluir</Button>
                        </Typography>
                    </Box>
                </Modal>
            </Sidebar>
        </>
    )
}

export default PropostasAmil
import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Container, Typography, Box, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Modal, LinearProgress, Alert, AlertTitle } from "@mui/material";
import Axios from 'axios'
import config from "../../../../config/axiosHeader";

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


const NaoEnviados = () => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)
    const [stateModal, setStateModal] = useState(false)
    const [progressValue, setProgressValue] = useState(0)
    const [error, setError] = useState(false)

    const enviarMensagens = async () => {
        try {

            let count = 0

            for (const item of propostas) {
                count++
                const result = await Axios.put(`${process.env.REACT_APP_API_TELE_KEY}/enviarMensagem`, {
                    proposta: item
                }, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${document.cookie.split('=')[1]}` }
                })
                console.log(result);
                setProgressValue((count / propostas.length) * 100)
                buscarPropostas()
            }

        } catch (error) {
            console.log(error);
            setError(true)
        }
    }

    const buscarPropostas = async () => {
        try {
            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/naoEnviadas`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${document.cookie.split('=')[1]}` }
            })

            setPropostas(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {

        buscarPropostas()
    }, [])

    return (
        <>
            <Sidebar />
            <Container>
                <Box m={2}>
                    <Typography variant="h5">
                        Contatos não Enviados: {propostas.length}
                    </Typography>
                    <Button variant="contained" style={{ position: 'fixed', right: '150px' }} onClick={() => setStateModal(true)}>Enviar</Button>
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', right: '50%' }}></CircularProgress>
                        ) : null
                    }
                </Box>
                <Box>
                    <TableContainer>
                        <Table className="table">
                            <TableHead className="table-header">
                                <TableRow>
                                    <TableCell>Proposta</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Cpf</TableCell>
                                    <TableCell>Cpf Titular</TableCell>
                                    <TableCell>Tipo Associado</TableCell>
                                    <TableCell>DDD</TableCell>
                                    <TableCell>Celular</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    propostas.map(e => {
                                        return (
                                            <TableRow key={e._id}>
                                                <TableCell>{e.proposta}</TableCell>
                                                <TableCell>{e.nome}</TableCell>
                                                <TableCell>{e.cpf}</TableCell>
                                                <TableCell>{e.cpfTitular}</TableCell>
                                                <TableCell>{e.tipoAssociado}</TableCell>
                                                <TableCell>{e.ddd}</TableCell>
                                                <TableCell>{e.celular}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Modal
                    open={stateModal}
                    onClose={() => setStateModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Clique abaixo para enviar as mensagens
                        </Typography>
                        <Box m={2}>
                            <LinearProgress variant="determinate" value={progressValue}></LinearProgress>
                        </Box>
                        {
                            progressValue === 100 ? (
                                <Alert severity="success">
                                    <AlertTitle>Sucesso!</AlertTitle>
                                    Todas as mensagens foram enviadas com sucesso!
                                </Alert>
                            ) : null
                        }
                        {
                            error ? (
                                <Alert severity="error">
                                    <AlertTitle>Erro</AlertTitle>
                                    Algo deu errado
                                </Alert>
                            ) : null
                        }
                        <Box m={1} display='flex' justifyContent='space-around'>
                            <Button variant="contained" color='inherit' onClick={() => setStateModal(false)}>Fechar</Button>
                            <Button variant="contained" color='success' onClick={enviarMensagens}>Enviar</Button>
                        </Box>
                    </Box>
                </Modal>
            </Container>
        </>
    )
}

export default NaoEnviados
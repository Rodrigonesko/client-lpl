import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Container, Typography, Box, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Modal, LinearProgress, Alert, AlertTitle, Paper, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import Axios from 'axios'
import { getCookie } from "react-use-cookie";
import moment from "moment";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: '80vh',
    overflowY: 'auto'
};

const Modelo1 = ({ data1, data2 }) => {
    return (
        <Typography>
            Prezado Sr.(a) NOME,<br />
            Somos da equipe de adesão da operadora de saúde Amil e para concluírmos a contratação do Plano de Saúde do Sr.(a), e dos seus dependentes (caso tenha) e precisamos confirmar alguns dados para que a contratação seja concluída. <br />
            Por gentileza escolha o *NÚMERO* referente a janela de horários para entrarmos em contato com o Sr.(a) <br />
            *{data1}* <br />
            1. Das 13:00 às 15:00 <br />
            2. Das 15:00 às 17:00 <br />
            3. Das 17:00 às 19:00 <br />
            *{data2}* <br />
            4. Das 09:00 às 11:00<br />
            5. Das 11:00 às 13:00<br />
            6. Das 13:00 às 15:00<br />
            7. Das 15:00 às 17:00<br />
            8. Das 17:00 às 19:00<br />
            Qual o melhor horário?<br />
            Informamos que vamos ligar dos números 11 42404975 ou 42403554, pedimos tirar do spam para evitar bloqueio da ligação. Desde já agradecemos.<br />
            Atenção: o preenchimento dos horários é feito em tempo real. Caso o horário informado não esteja mais disponível, apresentarei uma nova opção.<br />
        </Typography>
    )
}

const Modelo2 = ({ data1, data2 }) => {
    return (
        <Typography>
            Prezado Sr.(a) NOME,<br />
            Somos da equipe de adesão da operadora de saúde Amil e para concluírmos a contratação do Plano de Saúde do Sr.(a), e dos seus dependentes (caso tenha) e precisamos confirmar alguns dados para que a contratação seja concluída. <br />
            Por gentileza escolha o *NÚMERO* referente a janela de horários para entrarmos em contato com o Sr.(a) <br />
            *{data1}* <br />
            1. Das 09:00 às 11:00<br />
            2. Das 11:00 às 13:00<br />
            3. Das 13:00 às 15:00<br />
            4. Das 15:00 às 17:00<br />
            5. Das 17:00 às 19:00<br />
            *{data2}* <br />
            6. Das 09:00 às 11:00<br />
            7. Das 11:00 às 13:00<br />
            8. Das 13:00 às 15:00<br />
            9. Das 15:00 às 17:00<br />
            10. Das 17:00 às 19:00<br />
            Qual o melhor horário?<br />
            Informamos que vamos ligar dos números 11 42404975 ou 42403554, pedimos tirar do spam para evitar bloqueio da ligação. Desde já agradecemos.<br />
            Atenção: o preenchimento dos horários é feito em tempo real. Caso o horário informado não esteja mais disponível, apresentarei uma nova opção.<br />
        </Typography>
    )
}


const NaoEnviados = () => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)
    const [stateModal, setStateModal] = useState(false)
    const [progressValue, setProgressValue] = useState(0)
    const [error, setError] = useState(false)
    const [modeloEscolhido, setModeloEscolhido] = useState('')
    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [quantidade, setQuantidade] = useState(0)

    const enviarMensagens = async () => {
        try {

            if (!modeloEscolhido || !data1 || !data2) {
                console.log('algum campo vazio');
                setError(true)
                return
            }

            let count = 0

            for (const item of propostas) {
                if (quantidade !== 0 && count === quantidade) {
                    break
                }
                count++
                const result = await Axios.put(`${process.env.REACT_APP_API_TELE_KEY}/enviarMensagem`, {
                    proposta: item,
                    modeloEscolhido,
                    data1: moment(data1).format('DD/MM/YYYY'),
                    data2: moment(data2).format('DD/MM/YYYY')
                }, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${getCookie('token')}` }
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
                headers: { Authorization: `Bearer ${getCookie('token')}` }
            })

            setPropostas(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const voltarParaAjuste = async (id) => {
        try {
            setLoading(true)

            await Axios.put(`${process.env.REACT_APP_API_TELE_KEY}/voltarAjuste`, {
                id
            }, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${getCookie('token')}` }
            })

            buscarPropostas()
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
            <Sidebar>
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
                                        <TableCell>Voltar</TableCell>
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
                                                    <TableCell><Button variant="contained" onClick={() => voltarParaAjuste(e._id)}>Ajustar</Button></TableCell>
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
                            <Box component={Paper} p={3} display='flex'>
                                <Box mr={4}>
                                    <Box>
                                        <Typography>
                                            Escolha um modelo de mensagem
                                        </Typography>
                                        <FormControl fullWidth size="small" style={{ marginTop: '10px' }}>
                                            <InputLabel>Modelo</InputLabel>
                                            <Select
                                                label='Modelo'
                                                onChange={e => {
                                                    setModeloEscolhido(e.target.value)
                                                }}
                                                value={modeloEscolhido}
                                            >
                                                <MenuItem>
                                                    <em>Modelo</em>
                                                </MenuItem>
                                                <MenuItem value='Modelo 1'>
                                                    Modelo 1
                                                </MenuItem>
                                                <MenuItem value='Modelo 2'>
                                                    Modelo 2
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box mt={2}>
                                        <Typography>
                                            Dias para mensagem:
                                        </Typography>
                                        <TextField label='Data 1' size="small" type='date' focused style={{ marginTop: '10px' }} onChange={e => setData1(e.target.value)} />
                                        <TextField label='Data 2' size="small" type='date' focused style={{ marginTop: '10px' }} onChange={e => setData2(e.target.value)} />
                                    </Box>
                                    <Box mt={2} display={'flex'} flexDirection={'column'}>
                                        <Typography>
                                            Quantidade de propostas:
                                        </Typography>
                                        <TextField label='Quantidade' size="small" type='number' focused style={{ marginTop: '10px' }} onChange={e => setQuantidade(e.target.value)} value={quantidade} />
                                        <Button variant="contained" onClick={() => setQuantidade(propostas.length)}>Todas</Button>
                                    </Box>
                                </Box>
                                <Box ml={2}>
                                    <Typography>
                                        {
                                            modeloEscolhido === 'Modelo 1' ? (<Modelo1 data1={moment(data1).format('DD/MM/YYYY')} data2={moment(data2).format('DD/MM/YYYY')} />) : null
                                        }
                                        {
                                            modeloEscolhido === 'Modelo 2' ? (<Modelo2 data1={moment(data1).format('DD/MM/YYYY')} data2={moment(data2).format('DD/MM/YYYY')} />) : null
                                        }
                                    </Typography>
                                </Box>
                            </Box>

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
            </Sidebar>
        </>
    )
}

export default NaoEnviados
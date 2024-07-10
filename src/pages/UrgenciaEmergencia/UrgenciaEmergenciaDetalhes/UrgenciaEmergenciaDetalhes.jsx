import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import { Button, Box, Container, TextField, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Alert } from "@mui/material";
import Toast from "../../../components/Toast/Toast";
import Title from "../../../components/Title/Title";
import InfoLabel from "../../../components/InfoLabel/InfoLabel";

const UrgenciaEmergenciaDetalhes = () => {

    const { id } = useParams()

    const [proposta, setProposta] = useState({})
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [retorno, setRetorno] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [flushHook, setFlushHook] = useState(false)

    const salvarInfo = async () => {
        try {
            const obj = {
                telefone,
                email,
                retorno,
                observacoes
            }

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/salvarInfo`, {
                obj,
                id
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (result.status === 200) {
                setSeverity('success')
                setMessage('Informações salvas com sucesso!')
                setOpen(true)
                setFlushHook(true)
            }

        } catch (error) {
            console.log(error);
            setSeverity('error')
            setMessage('Erro ao salvar informações!')
            setOpen(true)
        }
    }

    const concluir = async () => {
        try {
            const obj = {
                telefone,
                email,
                retorno,
                observacoes
            }

            console.log(obj);

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/concluir`, {
                obj,
                id
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (result.status === 200) {
                setSeverity('success')
                setMessage('Concluído com sucesso!')
                setOpen(true)
                setFlushHook(true)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const atribuirContato = async (contato) => {
        try {
            const obj = {
                contato,
                telefone,
                email,
                retorno,
                observacoes
            }

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/salvarContato`, {
                obj,
                id
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (result.status === 200) {
                setSeverity('success')
                setMessage('Informações salvas com sucesso!')
                setOpen(true)
                setFlushHook(true)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const buscarInfoProposta = async () => {
            try {
                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/detalhes/${id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                setProposta(result.data.proposta)
                setEmail(result.data.proposta.email)
                setTelefone(result.data.proposta.telefone)
                setRetorno(result.data.proposta.retorno)
                setObservacoes(result.data.proposta.observacoes)

                const tel = document.getElementById('telefone')
                tel.value = result.data.proposta.telefone
                document.getElementById('email').value = result.data.proposta.email

            } catch (error) {
                console.log(error);
            }
        }
        setFlushHook(false)

        buscarInfoProposta()
    }, [id, flushHook])

    return (
        <Sidebar>
            <Container maxWidth={'xl'}>
                <Title
                    size={'medium'}
                >
                    Pedido {proposta.pedido}
                </Title>
                {/* <div className="title">
                    <h3>Pedido: {proposta.pedido} - {proposta.status} - {proposta.analista}</h3>
                </div> */}
                <Alert
                    severity={proposta.status === 'Andamento' ? 'info' : 'success'}
                    sx={{ marginBottom: '10px' }}
                    variant="filled"
                >
                    {proposta.status}
                </Alert>
                <Grid container spacing={2}>
                    <InfoLabel label='Nome' value={proposta.nomeAssociado} />
                    <InfoLabel label='MO' value={proposta.numAssociado} />
                    <InfoLabel label='Data Atendimento' value={proposta.dataAtendimento ? moment(proposta.dataAtendimento).format('DD/MM/YYYY') : null} />
                    <InfoLabel label='Data Recebimento' value={moment(proposta.dataRecebimento).format('DD/MM/YYYY')} />
                    <InfoLabel label='Data Nascimento' value={moment(proposta.dataNascimento).format('DD/MM/YYYY')} />
                    <InfoLabel label='Idade' value={proposta.idade} />
                    <InfoLabel label='Data Adesão' value={proposta.dataAdesao ? moment(proposta.dataAdesao).format('DD/MM/YYYY') : null} />
                </Grid>
                <Box
                    display='flex'
                    flexDirection={'column'}
                    mt={2}
                    gap={2}
                >
                    <TextField size="small" label="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} fullWidth />
                    <TextField size="small" label="E-mail" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
                </Box>

                <Grid container spacing={2} mt={2}>
                    <InfoLabel label='PRC' value={proposta.prc} />
                    <InfoLabel label='Nome Prestador' value={proposta.nomePrestador} xl={4} />
                    <InfoLabel label='Cid Principal' value={proposta.cidPrin} xl={4} />
                    <InfoLabel label='Info Relatório Médico' value={proposta.relatorioMedico} />
                </Grid>
                <Grid container spacing={2} mt={2} mb={2}>
                    <InfoLabel label='1° Contato' value={
                        proposta.contato1 ? (moment(proposta.contato1).format('DD/MM/YYYY HH:mm')) : <Button variant="contained" size='small' className="btn-padrao-azul" value={'contato1'} onClick={e => {
                            atribuirContato(e.target.value)
                        }
                        } >1° Contato</Button>
                    } />
                    <InfoLabel label='2° Contato' value={
                        proposta.contato2 ? (moment(proposta.contato2).format('DD/MM/YYYY HH:mm')) : <Button variant="contained" size='small' className="btn-padrao-azul" value={'contato2'} onClick={e => {
                            atribuirContato(e.target.value)
                        }
                        } >2° Contato</Button>
                    } />
                    <InfoLabel label='3° Contato' value={
                        proposta.contato3 ? (moment(proposta.contato3).format('DD/MM/YYYY HH:mm')) : <Button variant="contained" size='small' className="btn-padrao-azul" value={'contato3'} onClick={e => {
                            atribuirContato(e.target.value)
                        }
                        } >3° Contato</Button>
                    } />
                    <InfoLabel label='Responsável' value={proposta.analista} />
                </Grid>
                <FormControl sx={{ width: '400px' }}>
                    <InputLabel>Retificou?</InputLabel>
                    <Select
                        label='Retificou?'
                        value={retorno}
                        onChange={e => {
                            setRetorno(e.target.value)
                        }}
                    >
                        <MenuItem value=''>Selecione</MenuItem>
                        <MenuItem value='Sim, retificou' selected={proposta.retorno === 'Sim, retificou'} >Sim, retificou</MenuItem>
                        <MenuItem value='Não aceitou retificar' selected={proposta.retorno === 'Não aceitou retificar'} >Não aceitou retificar</MenuItem>
                        <MenuItem value='Sem sucesso de contato' selected={proposta.retorno === 'Sem sucesso de contato'} >Sem sucesso de contato</MenuItem>
                    </Select>
                </FormControl>
                <Box
                    mt={2}
                    display='flex'
                    flexDirection='column'
                    gap={1}
                >
                    <Typography>
                        Observações
                    </Typography>
                    <TextField
                        multiline
                        fullWidth
                        rows={4}
                        value={observacoes}
                        onChange={e => setObservacoes(e.target.value)}
                    />
                </Box>
                <Box mt={2}>
                    <Button variant='contained' onClick={salvarInfo} style={{ marginRight: '10px' }} >Salvar</Button>
                    {
                        proposta.status === 'Andamento' ? (
                            <Button color="success" variant='contained' onClick={concluir} >Concluir</Button>
                        ) : null
                    }
                </Box>
            </Container>
            <Toast
                open={open}
                onClose={() => setOpen(false)}
                severity={severity}
                message={message}
            />
        </Sidebar>
    )
}

export default UrgenciaEmergenciaDetalhes
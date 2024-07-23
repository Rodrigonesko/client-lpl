import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import { Button, Box, Container, TextField, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Alert, Tooltip, IconButton } from "@mui/material";
import Toast from "../../../components/Toast/Toast";
import Title from "../../../components/Title/Title";
import InfoLabel from "../../../components/InfoLabel/InfoLabel";
import { findByIdUrgenciaEmergencia, updateUrgenciaEmergencia } from "../../../_services/urgenciaEmergenciaNew.service";
import AuthContext from "../../../context/AuthContext";
import InputMask from "react-input-mask";
import { ArrowForward } from "@mui/icons-material";

const UrgenciaEmergenciaDetalhes = () => {

    const { id } = useParams()
    const { name } = useContext(AuthContext)

    const [pedido, setPedido] = useState({})
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [retorno, setRetorno] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [flushHook, setFlushHook] = useState(false)

    const salvarInfo = async () => {
        try {
            await updateUrgenciaEmergencia({
                ...pedido,
                telefone,
                email,
                retorno,
                observacoes,
                analista: name,
                whatsapp: `whatsapp:+55${whatsapp.replace(/\D/g, '')}`
            })
            setSeverity('success')
            setMessage('Informações salvas com sucesso!')
            setOpen(true)
            setFlushHook(!flushHook)
        } catch (error) {
            console.log(error);
            setSeverity('error')
            setMessage('Erro ao salvar informações!')
            setOpen(true)
        }
    }

    const concluir = async () => {
        try {
            await salvarInfo()
            await updateUrgenciaEmergencia({
                ...pedido,
                status: 'Concluído',
                dataConclusao: moment().format('YYYY-MM-DD')
            })
            setSeverity('success')
            setMessage('Pedido concluído com sucesso!')
            setOpen(true)
            setFlushHook(!flushHook)
        } catch (error) {
            console.log(error);
            setSeverity('error')
            setMessage('Erro ao concluir pedido!')
            setOpen(true)
        }
    }

    const atribuirContato = async (contato) => {
        try {
            await salvarInfo()
            await updateUrgenciaEmergencia({
                ...pedido,
                [contato]: moment().format('YYYY-MM-DD HH:mm:ss'),
                status: 'EM ANDAMENTO',
                analista: name
            })
            setSeverity('success')
            setMessage('Contato atribuído com sucesso!')
            setOpen(true)
            setFlushHook(!flushHook)
        } catch (error) {
            console.log(error);
            setSeverity('error')
            setMessage('Erro ao atribuir contato!')
            setOpen(true)
        }
    }

    useEffect(() => {
        const buscarInfoProposta = async () => {
            try {
                const result = await findByIdUrgenciaEmergencia(id)
                setPedido(result)
                setEmail(result.email)
                setTelefone(result.telefone)
                setRetorno(result.retorno)
                setObservacoes(result.observacoes)
                setWhatsapp(result?.whatsapp?.replace(/\D/g, '')?.replaceAll('5', ''))
            } catch (error) {
                console.log(error);
                setSeverity('error')
                setMessage('Erro ao buscar informações da proposta!')
                setOpen(true)
            }
        }
        if (id) {
            buscarInfoProposta()
        }
    }, [id, flushHook])

    return (
        <Sidebar>
            <Container maxWidth={'xl'}>
                <Title
                    size={'medium'}
                >
                    Pedido {pedido.pedido}
                </Title>
                <Alert
                    severity={pedido.status === 'Concluído' ? 'success' : pedido.status === 'EM ANDAMENTO' ? 'warning' : 'info'}
                    sx={{ marginBottom: '10px' }}
                    variant="filled"
                >
                    {pedido.status}
                </Alert>
                <Grid container spacing={2}>
                    <InfoLabel label='Nome' value={pedido.nomeAssociado} />
                    <InfoLabel label='MO' value={pedido.numAssociado} />
                    <InfoLabel label='Data Atendimento' value={pedido.dataAtendimento ? moment(pedido.dataAtendimento).format('DD/MM/YYYY') : null} />
                    <InfoLabel label='Data Recebimento' value={moment(pedido.dataRecebimento).format('DD/MM/YYYY')} />
                    <InfoLabel label='Data Nascimento' value={moment(pedido.dataNascimento).format('DD/MM/YYYY')} />
                    <InfoLabel label='Idade' value={pedido.idade} />
                    <InfoLabel label='Data Adesão' value={pedido.dataAdesao ? moment(pedido.dataAdesao).format('DD/MM/YYYY') : null} />
                </Grid>
                <Box
                    display='flex'
                    flexDirection={'column'}
                    mt={2}
                    gap={2}
                >
                    <TextField size="small" label="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} fullWidth />
                    <TextField size="small" label="E-mail" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
                    <Box
                        display='flex'
                        alignItems='center'
                        gap={2}
                    >
                        <InputMask
                            mask="(99) 99999-9999"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        >
                            {() => <TextField size="small" label="Whatsapp" fullWidth />}
                        </InputMask>
                        {
                            pedido.whatsapp && (
                                <Tooltip title="Ver conversa">
                                    <IconButton
                                        onClick={() => window.open(`/entrevistas/chat/${pedido.whatsapp}`, '_blank')}
                                    >
                                        <ArrowForward />
                                    </IconButton>
                                </Tooltip>
                            )
                        }

                    </Box>

                </Box>

                <Grid container spacing={2} mt={2}>
                    <InfoLabel label='PRC' value={pedido.prc} />
                    <InfoLabel label='Nome Prestador' value={pedido.nomePrestador} xl={4} />
                    <InfoLabel label='Cid Principal' value={pedido.cidPrin} xl={4} />
                    <InfoLabel label='Info Relatório Médico' value={pedido.relatorioMedico} />
                </Grid>
                <Grid container spacing={2} mt={2} mb={2}>
                    <InfoLabel label='1° Contato' value={
                        pedido.contato1 ? (moment(pedido.contato1).format('DD/MM/YYYY HH:mm')) : <Button variant="contained" size='small' className="btn-padrao-azul" value={'contato1'} onClick={e => {
                            atribuirContato(e.target.value)
                        }
                        } >1° Contato</Button>
                    } />
                    <InfoLabel label='2° Contato' value={
                        pedido.contato2 ? (moment(pedido.contato2).format('DD/MM/YYYY HH:mm')) : pedido.contato1 &&
                            <Button variant="contained" size='small' className="btn-padrao-azul" value={'contato2'} onClick={e => {
                                atribuirContato(e.target.value)
                            }
                            } >2° Contato</Button>
                    } />
                    <InfoLabel label='3° Contato' value={
                        pedido.contato3 ? (moment(pedido.contato3).format('DD/MM/YYYY HH:mm')) : pedido.contato2 && <Button variant="contained" size='small' className="btn-padrao-azul" value={'contato3'} onClick={e => {
                            atribuirContato(e.target.value)
                        }
                        } >3° Contato</Button>
                    } />
                    <InfoLabel label='Responsável' value={pedido.analista} />
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
                        <MenuItem value='Sim, retificou'>Sim, retificou</MenuItem>
                        <MenuItem value='Não aceitou retificar'>Não aceitou retificar</MenuItem>
                        <MenuItem value='Sem sucesso de contato'>Sem sucesso de contato</MenuItem>
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
                        (pedido.status === 'A INICIAR' || pedido.status === 'EM ANDAMENTO') && (
                            <Button color="success" variant='contained' onClick={concluir} >Concluir</Button>
                        )
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
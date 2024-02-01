import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import './UrgenciaEmergenciaDetalhes.css'
import { Button, Box, Container, TextField, Paper } from "@mui/material";
import Toast from "../../../components/Toast/Toast";

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
        <>
            <Sidebar>
                <Container component={Paper} >
                    <Box m={2} className="title">
                        <h3>Urgência & Emergência</h3>
                    </Box>
                    <div className="title">
                        <h3>Pedido: {proposta.pedido} - {proposta.status} - {proposta.analista}</h3>
                    </div>
                    <Box m={2} display='flex' justifyContent='space-between' >
                        <Box>
                            <label htmlFor="">Nome: </label>
                            <strong>{proposta.nomeAssociado}</strong>
                        </Box>
                        <Box>
                            <label htmlFor="">MO: </label>
                            <strong>{proposta.numAssociado}</strong>
                        </Box>
                        <Box>
                            <label htmlFor=""> <strong>Data Atendimento:</strong></label>
                            <strong>{proposta.dataAtendimento ? moment(proposta.dataAtendimento).format('DD/MM/YYYY') : null}</strong>
                        </Box>
                        <Box>
                            <label htmlFor="">Data Recebimento: </label>
                            <strong>{moment(proposta.dataRecebimento).format('DD/MM/YYYY')}</strong>
                        </Box>
                    </Box>
                    <Box m={2} display='flex' justifyContent='space-between' >
                        <Box>
                            <label htmlFor="">Data Nascimento: </label>
                            <strong>{moment(proposta.dataNascimento).format('DD/MM/YYYY')}</strong>
                        </Box>
                        <Box>
                            <label htmlFor="">Idade: </label>
                            <strong>{proposta.idade}</strong>
                        </Box>
                        <Box>
                            <label htmlFor="">Data Adesão: </label>
                            <strong>{proposta.dataAdesao ? moment(proposta.dataAdesao).format('DD/MM/YYYY') : null}</strong>
                        </Box>
                    </Box>

                    <Box m={2} display='flex' alignItems='center'>
                        <Box width='100%'>
                            <TextField focused variant='standard' size='small' style={{ width: '50%' }} label='Telefone' type="text" name="telefone" id="telefone" onKeyUp={e => { setTelefone(e.target.value) }} />
                        </Box>
                    </Box>
                    <Box m={2} display='flex' alignItems='center' >
                        <Box width='100%'>
                            <TextField focused variant='standard' size='small' label='E-mail' style={{ width: '50%' }} type="text" name="email" id="email" onKeyUp={e => { setEmail(e.target.value) }} />
                        </Box>
                    </Box>
                    <Box m={2} display='flex' justifyContent='space-between' >
                        <Box>
                            <label htmlFor="">Cod Prc: </label>
                            <strong>{proposta.prc}</strong>
                        </Box>
                    </Box>
                    <Box m={2} display='flex' justifyContent='space-between' >
                        <Box>
                            <label htmlFor="">Nome Prestador: </label>
                            <strong>{proposta.nomePrestador}</strong>
                        </Box>
                    </Box>
                    <Box m={2} display='flex' justifyContent='space-between' >
                        <Box>
                            <label htmlFor="">Cid Principal: </label>
                            <strong>{proposta.cidPrin}</strong>
                        </Box>

                    </Box>
                    <Box m={2} display='flex' justifyContent='space-between' >
                        <Box>
                            <label htmlFor="">Info Relatório Médico: </label>
                            <strong>{proposta.relatorioMedico}</strong>
                        </Box>
                    </Box>
                    <div className="box-u-e" >
                        <label htmlFor="contato-1">1° Contato: </label>
                        <strong>{proposta.contato1 ? (moment(proposta.contato1).format('DD/MM/YYYY HH:mm')) : null}</strong>
                        {
                            !proposta.contato1 ? (

                                <Button variant="contained" size='small' className="btn-padrao-azul" value={'contato1'} onClick={e => {
                                    atribuirContato(e.target.value)
                                }} >1° Contato</Button>
                            ) : null
                        }

                        <label htmlFor="contato-2">2° Contato: </label>
                        <strong>{proposta.contato2 ? (moment(proposta.contato2).format('DD/MM/YYYY HH:mm')) : null}</strong>
                        {
                            !proposta.contato2 ? (
                                <Button variant="contained" size='small' className="btn-padrao-azul" value={'contato2'} onClick={e => {
                                    atribuirContato(e.target.value)
                                }} >2° Contato</Button>
                            ) : null
                        }

                        <label htmlFor="contato-3">3° Contato: </label>
                        <strong>{proposta.contato3 ? (moment(proposta.contato3).format('DD/MM/YYYY HH:mm')) : null}</strong>
                        {
                            !proposta.contato3 ? (
                                <Button variant="contained" size='small' className="btn-padrao-azul" value={'contato3'} onClick={e => {
                                    atribuirContato(e.target.value)
                                }} >3° Contato</Button>
                            ) : null
                        }

                        <label htmlFor="retorno">Retificou? </label>
                        <select name="" id="" onChange={e => {
                            setRetorno(e.target.value)
                        }}>
                            <option value=""></option>
                            <option value="Sim, retificou" selected={proposta.retorno === 'Sim, retificou'} >Sim, retificou</option>
                            <option value="Não aceitou retificar" selected={proposta.retorno === 'Não aceitou retificar'} >Não aceitou retificar</option>
                            <option value="Sem sucesso de contato" selected={proposta.retorno === 'Sem sucesso de contato'} >Sem sucesso de contato</option>
                        </select>
                    </div>
                    <div className="box-u-e" >
                        <h4>Observações</h4>
                        <br />
                        <textarea name="" id="" cols="60" rows="5" defaultValue={proposta.observacoes} onKeyUp={e => { setObservacoes(e.target.value) }} ></textarea>
                    </div>
                    <div>
                        <Button variant='contained' onClick={salvarInfo} style={{ marginRight: '10px' }} >Salvar</Button>
                        {
                            proposta.status === 'Andamento' ? (
                                <Button color="success" variant='contained' onClick={concluir} >Concluir</Button>
                            ) : null
                        }

                    </div>
                </Container>
                <Toast
                    open={open}
                    onClose={() => setOpen(false)}
                    severity={severity}
                    message={message}
                />
            </Sidebar>
        </>
    )
}

export default UrgenciaEmergenciaDetalhes
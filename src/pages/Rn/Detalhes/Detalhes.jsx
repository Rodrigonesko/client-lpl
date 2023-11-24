import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Sidebar from "../../../components/Sidebar/Sidebar";
import './Detalhes.css'
import { Container, Button, Box, Paper, Alert, Snackbar, TextField, Divider, Typography } from "@mui/material";
import moment from "moment";
import { getInfoRn, rnDuplicada, tentativaContatoRn, updateRn } from "../../../_services/teleEntrevista.service";
import ModalCancelarRn from "./modais/ModalCancelarRn";
import { HiDuplicate } from 'react-icons/hi'
import { CiFloppyDisk } from 'react-icons/ci'
import ModalConcluirRn from "./modais/ModalConcluirRn";

const Detalhes = () => {

    const { id } = useParams()

    const [openSnack, setOpenSnack] = useState(false)

    const [dados, setDados] = useState({})
    const [email, setEmail] = useState('')
    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [data3, setData3] = useState('')
    const [horario1, setHorario1] = useState('')
    const [horario2, setHorario2] = useState('')
    const [horario3, setHorario3] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [concluido, setConcluido] = useState(false)

    const [flushHook, setFlushHook] = useState(false)

    const duplicada = async () => {
        try {

            await rnDuplicada({ id })

            search()

        } catch (error) {
            console.log(error);
        }
    }

    const update = async () => {

        console.log(id);

        try {
            await updateRn({
                id: id,
                email: email,
                dataContato1: data1,
                dataContato2: data2,
                dataContato3: data3,
                horarioContato1: horario1,
                horarioContato2: horario2,
                horarioContato3: horario3,
                observacoes: observacoes
            })

            setOpenSnack(true)

        } catch (error) {
            console.log(error);
        }

    }

    const tentativaContato = async (tentativa) => {
        try {

            await tentativaContatoRn({
                tentativa,
                id
            })

            search()
        } catch (error) {
            console.log(error);
        }
    }

    const search = async () => {

        const result = await getInfoRn(id)

        setDados(result)
        setEmail(dados.email)
        setData1(result.dataContato1)
        setData2(result.dataContato2)
        setData3(result.dataContato3)
        setHorario1(result.horarioContato1)
        setHorario2(result.horarioContato2)
        setHorario3(result.horarioContato3)
        setObservacoes(result.observacoes)

        if (result.status === 'Concluido') {
            setConcluido(true)
        }
    }

    useEffect(() => {
        const search = async () => {

            setFlushHook(false)

            const result = await getInfoRn(id)

            setDados(result)
            setEmail(dados.email)
            setData1(result.dataContato1)
            setData2(result.dataContato2)
            setData3(result.dataContato3)
            setHorario1(result.horarioContato1)
            setHorario2(result.horarioContato2)
            setHorario3(result.horarioContato3)
            setObservacoes(result.observacoes)

            if (result.status === 'Concluido') {
                setConcluido(true)
            }
        }

        search()
    }, [dados.email, id, flushHook])

    return (
        <Sidebar>
            <Container>
                {
                    concluido && (
                        <Alert severity='success'>
                            Concluido - {dados.responsavel}
                        </Alert>
                    )
                }
                <Box component={Paper} elevation={4} p={2}>

                    <h3>{dados.pedido} - Data Recebido LPL: {moment(dados.createdAt).format('DD/MM/YYYY')}</h3>

                    <Box display='flex' justifyContent='space-between' m={2}>
                        <TextField label='Beneficiario' size="small" variant='standard' value={dados.beneficiario} inputProps={{ readOnly: true }} sx={{ width: '300px' }} focused />
                        <TextField label='Marca Ótica' size="small" variant='standard' value={dados.mo} inputProps={{ readOnly: true }} focused />
                        <TextField label='Proposta' size="small" variant='standard' value={dados.proposta} inputProps={{ readOnly: true }} focused />
                    </Box>
                    <Box display='flex' justifyContent='space-between' m={2}>
                        <TextField label='Vigencia' type="date" focused size="small" variant='standard' value={dados.vigencia} inputProps={{ readOnly: true }} sx={{ width: '300px' }} />
                        <TextField label='Pedido' size="small" variant='standard' value={dados.pedido} inputProps={{ readOnly: true }} focused />
                        <TextField label='Tipo' size="small" variant='standard' value={dados.tipo} inputProps={{ readOnly: true }} focused />
                    </Box>
                    <Box display='flex' justifyContent='space-between' m={2}>
                        <TextField label='Filial' size="small" variant='standard' value={dados.filial} inputProps={{ readOnly: true }} sx={{ width: '300px' }} focused />
                        <TextField label='Idade' size="small" variant='standard' value={dados.idade} inputProps={{ readOnly: true }} focused />
                        <TextField label='Data Recebimento Pedido' size="small" variant='standard' value={dados.dataRecebimento} inputProps={{ readOnly: true }} focused />
                    </Box>
                    <Divider />
                    <Box m={2} component={Paper} p={1} >
                        <Typography variant='body2'>
                            Procedimento: <strong>{dados.procedimento}</strong>
                        </Typography>
                    </Box>
                    <Divider />
                    <Box display='flex' justifyContent='space-between' m={2}>
                        <TextField label='Doença' size="small" variant='standard' value={dados.doenca} inputProps={{ readOnly: true }} sx={{ width: '300px' }} focused />
                        <TextField label='Cid' size="small" variant='standard' value={dados.cid} inputProps={{ readOnly: true }} focused />
                        <TextField label='PRC' size="small" variant='standard' value={dados.prc} inputProps={{ readOnly: true }} focused />
                    </Box>
                    <Box m={2} component={Paper} p={1} >
                        <Typography variant='body2'>
                            Período da Doença: <strong>{dados.periodo}</strong>
                        </Typography>
                    </Box>
                    <Box display='flex' justifyContent='space-between' m={2}>
                        <TextField label='Email' size="small" variant='standard' value={email} onChange={e => setEmail(e.target.value)} sx={{ width: '300px' }} />
                        <TextField label='Telefone' size="small" variant='standard' value={dados.telefones} inputProps={{ readOnly: true }} focused />
                    </Box>

                    <div className="info-proposta">
                        <div className="info-box">
                            <label htmlFor="data-contato-1">1° Contato: </label>
                            {
                                dados.dataContato1 ? (
                                    <>
                                        <strong>{moment(dados.dataContato1).format('DD/MM/YYYY')}</strong>
                                        <strong> {dados.horarioContato1}</strong>
                                    </>
                                ) : (
                                    <Button variant="contained" onClick={() => { tentativaContato('tentativa 1') }}>1° Contato</Button>
                                )
                            }
                        </div>
                        <div className="info-box">
                            <label htmlFor="data-contato-2">2° Contato: </label>
                            {
                                dados.dataContato2 ? (
                                    <>
                                        <strong>{moment(dados.dataContato2).format('DD/MM/YYYY')}</strong>
                                        <strong> {dados.horarioContato2}</strong>
                                    </>
                                ) : (
                                    <Button variant="contained" size="small" onClick={() => { tentativaContato('tentativa 2') }}>2° Contato</Button>
                                )
                            }
                        </div>
                        <div className="info-box">
                            <label htmlFor="data-contato-3">3° Contato: </label>
                            {
                                dados.dataContato3 ? (
                                    <>
                                        <strong>{moment(dados.dataContato3).format('DD/MM/YYYY')}</strong>
                                        <strong> {dados.horarioContato3}</strong>
                                    </>
                                ) : (
                                    <Button variant="contained" size="small" onClick={() => { tentativaContato('tentativa 3') }}>3° Contato</Button>
                                )
                            }
                        </div>
                    </div>
                    <div className="info-proposta observacoes">
                        <div className="info-box observacoes">
                            <label htmlFor="observacoes">Observações</label>
                            <textarea name="observacoes" id="observacoes" cols="30" rows="10" defaultValue={dados.observacoes} onChange={e => setObservacoes(e.target.value)} ></textarea>
                        </div>
                    </div>
                    <div className="buttons">
                        <Button startIcon={<CiFloppyDisk />} onClick={update} className="salvar">Salvar</Button>
                        {
                            !concluido && (
                                <>
                                    <ModalConcluirRn id={id} email={email} observacoes={observacoes} flushHook={setFlushHook} />
                                    <Button startIcon={<HiDuplicate />} color='warning' variant="contained" style={{ marginLeft: '18px' }} onClick={duplicada} >Duplicada</Button>
                                    <ModalCancelarRn id={dados._id} proposta={dados.proposta} flushHook={setFlushHook} />
                                </>

                            )
                        }

                    </div>
                </Box>
            </Container>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Atualizado com sucesso!
                </Alert>
            </Snackbar>
        </Sidebar>


    )
}

export default Detalhes
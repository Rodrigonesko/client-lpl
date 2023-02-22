import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import './UrgenciaEmergenciaDetalhes.css'
import Modal from 'react-modal'
import { Button, Box, Container, TextField, Accordion, AccordionDetails, AccordionSummary, Typography, List, ListItem, ListItemText } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


Modal.setAppElement('#root')


const UrgenciaEmergenciaDetalhes = () => {

    const { id } = useParams()

    const [modalSalvar, setModalSalvar] = useState(false)

    const [proposta, setProposta] = useState({})
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [retorno, setRetorno] = useState('')
    const [observacoes, setObservacoes] = useState('')

    const salvarInfo = async () => {
        try {
            const obj = {
                telefone,
                email,
                retorno,
                observacoes
            }

            console.log(obj);

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/salvarInfo`, {
                obj,
                id
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                setModalSalvar(true)
            }

        } catch (error) {
            console.log(error);
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
                withCredentials: true
            })

            if (result.status === 200) {
                setModalSalvar(true)
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
                withCredentials: true
            })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const buscarInfoProposta = async () => {
            try {
                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/detalhes/${id}`, { withCredentials: true })

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

        buscarInfoProposta()
    }, [id])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-u-e-detalhes">
                <div className="u-e-detalhes-container">
                    <Box m={2} className="title">
                        <h3>Urgência & Emergência</h3>
                    </Box>
                    <Container className="u-e-detalhes" >
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
                                <label htmlFor="">Data Inclusão: </label>
                                <strong>{moment(proposta.dataInclusao).format('DD/MM/YYYY')}</strong>
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
                                <strong>{moment(proposta.dataAdesao).format('DD/MM/YYYY')}</strong>
                            </Box>
                            <Box>
                                <label htmlFor="">Data Solicitação: </label>
                                <strong>{moment(proposta.dataSolicitacao).format('DD/MM/YYYY')}</strong>
                            </Box>
                        </Box>

                        <Box m={2} display='flex' alignItems='center'>
                            <Box marginRight={2}>
                                <label htmlFor="">DDD: </label>
                                <strong>{proposta.ddd}</strong>
                            </Box>
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
                                <label htmlFor="">Nome do Plano: </label>
                                <strong>{proposta.nomePlano}</strong>
                            </Box>
                            <Box>
                                <label htmlFor="">Tipo Contrato: </label>
                                <strong>{proposta.tipoContrato}</strong>
                            </Box>
                            <Box>
                                <label htmlFor="">Cod Prc: </label>
                                <strong>{proposta.prc}</strong>
                            </Box>
                        </Box>
                        <Box>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography><strong>IND RESP</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box>
                                        <List>
                                            <ListItem>
                                                <ListItemText
                                                    primary={`1 - ${proposta.indResp1}`}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary={`2 - ${proposta.indResp2}`}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary={`3 - ${proposta.indResp3}`}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary={`4 - ${proposta.indResp4}`}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary={`5 - ${proposta.indResp5}`}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary={`6 - ${proposta.indResp6}`}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary={`7 - ${proposta.indResp7}`}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary={`8 - ${proposta.indResp8}`}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary={`9 - ${proposta.indResp9}`}
                                                />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                        <Box m={2} display='flex' justifyContent='space-between' >
                            <Box>
                                <label htmlFor="">Data Solicitação: </label>
                                <strong>{moment(proposta.dataSolicitacao).format('DD/MM/YYYY')}</strong>
                            </Box>
                            <Box>
                                <label htmlFor="">Idade na Solic: </label>
                                <strong>{proposta.idadeSolic}</strong>
                            </Box>
                            <Box>
                                <label htmlFor="">Data Autor: </label>
                                <strong>{moment(proposta.dataAutorizacao).format('DD/MM/YYYY')}</strong>
                            </Box>
                            <Box>
                                <label htmlFor="">Ind Carater: </label>
                                <strong>{proposta.indCarater}</strong>
                            </Box>
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
                            <Box>
                                <label htmlFor="">Nome Cid Principal: </label>
                                <strong>{proposta.nomeCidPrin}</strong>
                            </Box>
                        </Box>
                        <Box m={2} display='flex' justifyContent='space-between' >
                            <Box>
                                <label htmlFor="">Cid Secundario: </label>
                                <strong>{proposta.cidSec}</strong>
                            </Box>
                            <Box>
                                <label htmlFor="">Nome Cid Secundario: </label>
                                <strong>{proposta.nomeCidSec}</strong>
                            </Box>
                        </Box>
                        <Box m={2} display='flex' justifyContent='space-between' >
                            <Box>
                                <label htmlFor="">Sit Autoriz: </label>
                                <strong>{proposta.sitAutoriz}</strong>
                            </Box>
                            <Box>
                                <label htmlFor="">Nome Tratamento: </label>
                                <strong>{proposta.nomeTratamento}</strong>
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
                </div>
            </section>
            <Modal
                isOpen={modalSalvar}
                onRequestClose={() => setModalSalvar(false)}
                contentLabel="Exemplo"
                overlayClassName='modal-overlay'
                className='modal-content'
            >
                <h2>Dados Salvos com sucesso!</h2>
                <Button variant="contained" size='small' onClick={() => {
                    setModalSalvar(false)
                    window.location.reload()
                }}>Ok</Button>
            </Modal>
        </>
    )
}

export default UrgenciaEmergenciaDetalhes
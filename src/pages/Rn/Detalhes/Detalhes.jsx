import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import Modal from 'react-modal'
import './Detalhes.css'
import { Container, Button, Box, Paper, Alert } from "@mui/material";
import moment from "moment";


Modal.setAppElement('#root')

const Detalhes = () => {

    const { id } = useParams()

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [dados, setDados] = useState({})
    const [email, setEmail] = useState('')
    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [data3, setData3] = useState('')
    const [horario1, setHorario1] = useState('')
    const [horario2, setHorario2] = useState('')
    const [horario3, setHorario3] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [success, setSuccess] = useState(false)
    const [concluido, setConcluido] = useState(false)

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const duplicada = async () => {
        try {

            await Axios.put(`${process.env.REACT_APP_API_KEY}/rn/duplicada`, {
                id
            }, {
                withCredentials: true
            })

            search()

        } catch (error) {
            console.log(error);
        }
    }

    const update = async () => {

        console.log(id);

        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rn/rns/update`, {
                id: id,
                email: email,
                dataContato1: data1,
                dataContato2: data2,
                dataContato3: data3,
                horarioContato1: horario1,
                horarioContato2: horario2,
                horarioContato3: horario3,
                observacoes: observacoes
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                setSuccess(true)
            }

        } catch (error) {
            console.log(error);
        }

    }

    const concluir = async () => {

        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rn/rns/concluir`, {
                id: id,
                email: email,
                dataContato1: data1,
                dataContato2: data2,
                dataContato3: data3,
                horarioContato1: horario1,
                horarioContato2: horario2,
                horarioContato3: horario3,
                observacoes: observacoes
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                setConcluido(true)
                closeModal()
            }

        } catch (error) {
            console.log(error);
            closeModal()
        }

    }

    const tentativaContato = async (tentativa) => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rn/tentativaContato`, {
                tentativa,
                id
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                search()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const search = async () => {

        const resultado = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/rns/${id}`, { withCredentials: true })
        const data = resultado.data

        setDados(data)

        setEmail(dados.email)
        setData1(data.dataContato1)
        setData2(data.dataContato2)
        setData3(data.dataContato3)
        setHorario1(data.horarioContato1)
        setHorario2(data.horarioContato2)
        setHorario3(data.horarioContato3)
        setObservacoes(data.observacoes)

        if (data.status === 'Concluido') {
            setConcluido(true)
        }
    }

    useEffect(() => {
        const search = async () => {

            const resultado = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/rns/${id}`, { withCredentials: true })
            const data = resultado.data

            setDados(data)

            setEmail(dados.email)
            setData1(data.dataContato1)
            setData2(data.dataContato2)
            setData3(data.dataContato3)
            setHorario1(data.horarioContato1)
            setHorario2(data.horarioContato2)
            setHorario3(data.horarioContato3)
            setObservacoes(data.observacoes)

            if (data.status === 'Concluido') {
                setConcluido(true)
            }
        }

        search()
    }, [dados.email, id])

    return (
        <>
            <Sidebar />
            <Container>
                {
                    success && (
                        <div className="success">
                            Atualizado com sucesso
                        </div>
                    )

                }
                {
                    concluido && (
                        <Alert severity='success'>
                            Concluido
                        </Alert>
                    )

                }


                <Box component={Paper} elevation={4} p={2}>

                    <h3>{dados.pedido}</h3>

                    <div className="info-proposta">
                        <div className="info-box">
                            <label htmlFor="beneficiario">Beneficiario: </label>
                            <span><strong>{dados.beneficiario}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="mo">MO: </label>
                            <span><strong>{dados.mo}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="proposta">Proposta: </label>
                            <span><strong>{dados.proposta}</strong></span>
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box">
                            <label htmlFor="">Vigencia: </label>
                            <span><strong>{dados.vigencia}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="">Pedido: </label>
                            <span><strong>{dados.pedido}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="proposta">Tipo: </label>
                            <span><strong>{dados.tipo}</strong></span>
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box">
                            <label htmlFor="">Filal: </label>
                            <span><strong>{dados.filial}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="">Idade: </label>
                            <span><strong>{dados.idade}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="proposta">Data Recebimento: </label>
                            <span><strong>{dados.dataRecebimento}</strong></span>
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box procedimento">
                            <label htmlFor="">Procedimento:</label>
                            <span><strong>{dados.procedimento}</strong></span>
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box">
                            <label htmlFor="">Doença: </label>
                            <span><strong>{dados.doenca}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="">Cid: </label>
                            <span><strong>{dados.cid}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="">PRC: </label>
                            <span><strong>{dados.prc}</strong></span>
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box periodo-doenca">
                            <label htmlFor="">Período da Doença: </label>
                            <span ><strong>{dados.periodo}</strong></span>
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box">
                            <label htmlFor="">Telefones Beneficiário: </label>
                            <span><strong>{dados.telefones}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="email">Email Beneficiário: </label>
                            <input type="email" id="email" name="email" style={{ width: '60%' }} defaultValue={dados.email} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div>
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
                        <Button onClick={update} className="salvar">Salvar</Button>
                        {
                            !concluido && (
                                <>
                                    <Button onClick={openModal} className="concluir">Concluir</Button>
                                    <Button color='warning' variant="contained" style={{ marginLeft: '18px' }} onClick={duplicada} >Duplicada</Button>
                                </>

                            )
                        }

                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Exemplo"
                        overlayClassName='modal-overlay'
                        className='modal-content'
                    >
                        <h2>Anexou no SisAmil?</h2>
                        <button onClick={closeModal}>Fechar</button>
                        <button className="concluir" onClick={concluir} >Concluir</button>
                    </Modal>
                </Box>
            </Container>
        </>
    )
}

export default Detalhes
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import './UrgenciaEmergenciaDetalhes.css'
import Modal from 'react-modal'

Modal.setAppElement('#root')


const UrgenciaEmergenciaDetalhes = () => {

    const { id } = useParams()

    const [modalSalvar, setModalSalvar] = useState(false)

    const [proposta, setProposta] = useState({})
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [retorno, setRetorno] = useState('')
    const [observacoes, setObservacoes] = useState('')

    const buscarInfoProposta = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/detalhes/${id}`, { withCredentials: true })

            setProposta(result.data.proposta)
            setEmail(result.data.proposta.email)
            setTelefone(result.data.proposta.telefone)
            setRetorno(result.data.proposta.retorno)
            setObservacoes(result.data.proposta.observacoes)

        } catch (error) {
            console.log(error);
        }
    }

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
        buscarInfoProposta()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-u-e-detalhes">
                <div className="u-e-detalhes-container">
                    <div className="title">
                        <h3>Urgência & Emergência</h3>
                    </div>
                    <div className="u-e-detalhes" >
                        <div className="title">
                            <h3>Proposta: {proposta.proposta} - {proposta.status} {proposta.analista}</h3>
                        </div>
                        <div className="box-u-e" >
                            <label htmlFor="">Nome: </label>
                            <strong>{proposta.nomeAssociado}</strong>
                            <label htmlFor="">MO: </label>
                            <strong>{proposta.nomeAssociado}</strong>
                            <label htmlFor="">Data Inclusão: </label>
                            <strong>{moment(proposta.dataInclusao).format('DD/MM/YYYY')}</strong>
                            <label htmlFor="">Data Recebimento: </label>
                            <strong>{moment(proposta.dataRecebimento).format('DD/MM/YYYY')}</strong>
                        </div>
                        <div className="box-u-e"  >
                            <label htmlFor="">Data Nascimento: </label>
                            <strong>{moment(proposta.dataNascimento).format('DD/MM/YYYY')}</strong>
                            <label htmlFor="">Idade: </label>
                            <strong>{proposta.idade}</strong>
                            <label htmlFor="">Responsável: </label>
                            <strong>{proposta.responsavel}</strong>
                            <label htmlFor="">Data Solicitação: </label>
                            <strong>{moment(proposta.dataSolicitacao).format('DD/MM/YYYY')}</strong>
                        </div>
                        <div className="box-u-e"  >
                            <label htmlFor="telefone">Telefone: </label>
                            <input type="text" name="telefone" id="telefone" defaultValue={proposta.telefone} onKeyUp={e => { setTelefone(e.target.value) }} />
                            <label htmlFor="email">Email: </label>
                            <input type="text" name="email" id="" defaultValue={proposta.email} onKeyUp={e => { setEmail(e.target.value) }} />
                            <label htmlFor="">Cid: </label>
                            <strong>{proposta.cid} </strong>
                            <label htmlFor="">Descrição Cid: </label>
                            <strong>{proposta.descricaoCid} </strong>
                        </div>
                        <div className="box-u-e" >
                            <label htmlFor="">Nome Prestador: </label>
                            <strong>{proposta.nomePrestador} </strong>
                            <label htmlFor="">Sit Autoriz: </label>
                            <strong>{proposta.sitAutoriz} </strong>
                            <label htmlFor="">Relatório Médico: </label>
                            <strong>{proposta.relatorioMedico} </strong>
                            <label htmlFor="">Obs Under: </label>
                            <strong>{proposta.obsUnder} </strong>
                        </div>
                        <div className="box-u-e" >
                            <label htmlFor="contato-1">1° Contato: </label>
                            <strong>{proposta.contato1 ? (moment(proposta.contato1).format('DD/MM/YYYY HH:mm')) : null}</strong>
                            {
                                !proposta.contato1 ? (

                                    <button className="btn-padrao-azul" value={'contato1'} onClick={e => {
                                        atribuirContato(e.target.value)
                                    }} >1° Contato</button>
                                ) : null
                            }

                            <label htmlFor="contato-2">2° Contato: </label>
                            <strong>{proposta.contato2 ? (moment(proposta.contato2).format('DD/MM/YYYY HH:mm')) : null}</strong>
                            {
                                !proposta.contato2 ? (
                                    <button className="btn-padrao-azul" value={'contato2'} onClick={e => {
                                        atribuirContato(e.target.value)
                                    }} >2° Contato</button>
                                ) : null
                            }

                            <label htmlFor="contato-3">3° Contato: </label>
                            <strong>{proposta.contato3 ? (moment(proposta.contato3).format('DD/MM/YYYY HH:mm')) : null}</strong>
                            {
                                !proposta.contato3 ? (
                                    <button className="btn-padrao-azul" value={'contato3'} onClick={e => {
                                        atribuirContato(e.target.value)
                                    }} >3° Contato</button>
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
                            <button onClick={salvarInfo} >Salvar</button>
                            {
                                proposta.status === 'Andamento' ? (
                                    <button onClick={concluir} >Concluir</button>
                                ) : null
                            }

                        </div>
                    </div>
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
                <button onClick={() => {
                    setModalSalvar(false)
                    window.location.reload()
                }}>Ok</button>
            </Modal>
        </>
    )
}

export default UrgenciaEmergenciaDetalhes
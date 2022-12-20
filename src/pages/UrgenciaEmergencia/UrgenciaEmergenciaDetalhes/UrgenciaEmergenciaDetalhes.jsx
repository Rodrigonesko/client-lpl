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
    const [contato1, setContato1] = useState('')
    const [contato2, setContato2] = useState('')
    const [contato3, setContato3] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [retorno, setRetorno] = useState('')
    const [observacoes, setObservacoes] = useState('')

    const buscarInfoProposta = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/detalhes/${id}`, { withCredentials: true })

            setProposta(result.data.proposta)
            setContato1(result.data.proposta.contato1)
            setContato2(result.data.proposta.contato2)
            setContato3(result.data.proposta.contato3)
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
                contato1,
                contato2,
                contato3,
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
                contato1,
                contato2,
                contato3,
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
                            <input type="date" name="contato-1" id="contato-1" defaultValue={proposta.contato1} onChange={e => { setContato1(e.target.value) }} />
                            <label htmlFor="contato-2">2° Contato: </label>
                            <input type="date" name="contato-2" id="contato-2" defaultValue={proposta.contato2} onChange={e => { setContato2(e.target.value) }} />
                            <label htmlFor="contato-3">3° Contato: </label>
                            <input type="date" name="contato-3" id="contato-3" defaultValue={proposta.contato3} onChange={e => { setContato3(e.target.value) }} />
                            <label htmlFor="retorno">Retorno: </label>
                            <input type="text" name="retorno" id="retorno" defaultValue={proposta.retorno} onKeyUp={e => { setRetorno(e.target.value) }} />
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
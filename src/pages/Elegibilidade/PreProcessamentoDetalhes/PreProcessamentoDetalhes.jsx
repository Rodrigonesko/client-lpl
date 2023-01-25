import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import DadosPreProcessamento from "./DadosPreProcessamento";
import DocumentosTermo from "./DocumentosTermo";
import DadosAngariador from "./DadosAngariador";
import Axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";
import $ from 'jquery'
import './PreProcessamentoDetalhes.css'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const PreProcessamentoDetalhes = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalProxFase, setModalProxFase] = useState(false)

    const [proposta, setProposta] = useState({})
    const [entidade, setEntidade] = useState('')
    const [planoAmil, setPlanoAmil] = useState()
    const [dataInicioPlanoAmil, setDataInicioAmil] = useState('')
    const [dataFimPlanoAmil, setDataFimAmil] = useState('')
    const [custoPlanoAmil, setCustoAmil] = useState('')

    const [documentoIdentificacao, setDocumentoIdentificacao] = useState()
    const [declaracaoAssociado, setDeclaracaoAssociado] = useState()
    const [vinculadosSimNao, setVinculadosSimNao] = useState()
    const [vinculados, setVinculados] = useState('')
    const [planoAnterior, setPlanoAnterior] = useState()
    const [observacoes, setObservacoes] = useState('')

    const [cpfCorretor, setCpfCorretor] = useState('')
    const [nomeCorretor, setNomeCorretor] = useState('')
    const [telefoneCorretor, setTelefoneCorretor] = useState('')
    const [cpfSupervisor, setCpfSupervisor] = useState('')
    const [nomeSupervisor, setNomeSupervisor] = useState('')
    const [telefoneSupervisor, setTelefoneSupervisor] = useState('')

    const [faltaDoc, setFaltaDoc] = useState('')
    const [msg, setMsg] = useState('')

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const buscarDados = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/infoProposta/${id}`, { withCredentials: true })

            setProposta(result.data.proposta)
            setEntidade(result.data.proposta.entidade)
            setPlanoAmil(result.data.proposta.planoAmil)
            setDataInicioAmil(result.data.proposta.dataInicioPlanoAmil)
            setDataFimAmil(result.data.proposta.dataFimPlanoAmil)
            setCustoAmil(result.data.proposta.custoPlanoAmil)

            setDocumentoIdentificacao(result.data.proposta.documentoIdentificacao)
            setDeclaracaoAssociado(result.data.proposta.declaracaoAssociado)
            setVinculadosSimNao(result.data.proposta.vinculadosSimNao)
            setVinculados(result.data.proposta.vinculados)
            setPlanoAnterior(result.data.proposta.planoAnterior)
            setObservacoes(result.data.proposta.observacoes)

            setCpfCorretor(result.data.proposta.cpfCorretor)
            setNomeCorretor(result.data.proposta.nomeCorretor)
            setTelefoneCorretor(result.data.proposta.telefoneCorretor)
            setCpfSupervisor(result.data.proposta.cpfSupervisor)
            setNomeSupervisor(result.data.proposta.nomeSupervisor)
            setTelefoneSupervisor(result.data.proposta.telefoneSupervisor)

            setFaltaDoc(result.data.proposta.faltaDoc)

        } catch (error) {
            console.log(error);
        }
    }

    const salvarDados = async () => {
        try {

            console.log(entidade, planoAmil);

            const dados = {
                entidade,
                planoAmil,
                dataInicioPlanoAmil,
                dataFimPlanoAmil,
                custoPlanoAmil,
                documentoIdentificacao,
                declaracaoAssociado,
                vinculadosSimNao,
                vinculados,
                planoAnterior,
                observacoes,
                cpfCorretor,
                nomeCorretor,
                telefoneCorretor,
                cpfSupervisor,
                nomeSupervisor,
                telefoneSupervisor,
                faltaDoc
            }

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/preProcessamento/salvar`, {
                dados,
                id,
                proxFase: false
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                openModal()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const enviarProxFase = async () => {
        try {
            const dados = {
                entidade,
                planoAmil,
                dataInicioPlanoAmil,
                dataFimPlanoAmil,
                custoPlanoAmil,
                documentoIdentificacao,
                declaracaoAssociado,
                vinculadosSimNao,
                vinculados,
                planoAnterior,
                observacoes,
                cpfCorretor,
                nomeCorretor,
                telefoneCorretor,
                cpfSupervisor,
                nomeSupervisor,
                telefoneSupervisor,
                faltaDoc
            }

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/preProcessamento/salvar`, {
                dados,
                id,
                proxFase: true
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                navigate('/elegibilidade/preProcessamento')
            }
        } catch (error) {
            console.log(error.response.data.msg);
            setModalProxFase(false)
            setMsg(error.response.data.msg)

        }
    }

    useEffect(() => {
        buscarDados()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-pre-processamento-detalhes">
                <div>
                    <div className="title">
                        <h3>Pré Processamento</h3>
                    </div>
                    <div className="pre-processamento-detalhes">
                        <div className="title">
                            <h3>{proposta.proposta} - {proposta.nome}</h3>
                        </div>

                        {
                            msg !== '' ? (
                                <div className="msg">
                                    <span>{msg}</span>
                                </div>
                            ) : null
                        }

                        <DadosPreProcessamento
                            analista={proposta.analistaPreProcessamento}
                            entidade={proposta.entidade}
                            setEntidade={setEntidade}
                            planoAmil={proposta.planoAmil}
                            setPlanoAmil={setPlanoAmil}
                            dataInicio={proposta.dataInicioPlanoAmil}
                            setDataInicio={setDataInicioAmil}
                            dataFim={proposta.dataFimPlanoAmil}
                            setDataFim={setDataFimAmil}
                            custo={proposta.custoPlanoAmil}
                            setCusto={setCustoAmil}
                        />
                        <DocumentosTermo
                            documentoIdentificacao={proposta.documentoIdentificacao}
                            setDocumentoIdentificacao={setDocumentoIdentificacao}
                            declaracaoAssociado={proposta.declaracaoAssociado}
                            setDeclaracaoAssociado={setDeclaracaoAssociado}
                            vinculadosSimNao={proposta.vinculadosSimNao}
                            setVinculadosSimNao={setVinculadosSimNao}
                            vinculados={proposta.vinculados}
                            setVinculados={setVinculados}
                            planoAnterior={proposta.planoAnterior}
                            setPlanoAnterior={setPlanoAnterior}
                            observacoes={proposta.observacoes}
                            setObservacoes={setObservacoes}
                        />
                        <DadosAngariador
                            cpfCorretor={cpfCorretor}
                            setCpfCorretor={setCpfCorretor}
                            nomeCorretor={nomeCorretor}
                            setNomeCorretor={setNomeCorretor}
                            telefoneCorretor={telefoneCorretor}
                            setTelefoneCorretor={setTelefoneCorretor}
                            cpfSupervisor={cpfSupervisor}
                            setCpfSupervisor={setCpfSupervisor}
                            nomeSupervisor={nomeSupervisor}
                            setNomeSupervisor={setNomeSupervisor}
                            telefoneSupervisor={telefoneSupervisor}
                            setTelefoneSupervisor={setTelefoneSupervisor}
                        />
                        <button onClick={salvarDados}>Salvar</button>
                        <button onClick={() => setModalProxFase(true)} >Enviar</button>

                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content'
                >
                    <h2>Dados Salvos com sucesso!</h2>
                    <button onClick={closeModal}>Ok</button>
                </Modal>
                <Modal
                    isOpen={modalProxFase}
                    onRequestClose={() => setModalProxFase(false)}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content'
                >
                    <h2>Enviar proposta para próxima fase</h2>
                    <div className="falta-doc-elegi">
                        <input type="radio" name="falta-doc" id="falta-doc" value={'Sim'} onClick={e => { setFaltaDoc(e.target.value) }} />
                        <label htmlFor="falta-doc">Falta Documento</label>
                        <input type="radio" name="falta-doc" id="doc-ok" value={'Não'} onClick={e => { setFaltaDoc(e.target.value) }} />
                        <label htmlFor="doc-ok">Documentos OK</label>
                        <input type="radio" name="falta-doc" id="sem-anexos" value={'Sem Anexos'} onClick={e => { setFaltaDoc(e.target.value) }} />
                        <label htmlFor="sem-anexos">Sem Anexos</label>
                    </div>
                    <div className="anexou-amil">
                        <label htmlFor="anexou">Anexou no SisAmil?</label>
                        <input onClick={e => {
                            if (e.target.checked) {
                                $("#enviar-prox-fase").show('fast')
                            } else {
                                $("#enviar-prox-fase").hide('fast')
                            }
                        }} type="checkbox" name="anexou" id="anexou" />
                        <label htmlFor="anexou">Sim</label>
                    </div>
                    <div id="enviar-prox-fase" className="none">
                        <button onClick={() => setModalProxFase(false)}>Fechar</button>
                        <button onClick={enviarProxFase} >Enviar</button>
                    </div>

                </Modal>
            </section>
        </>
    )
}

export default PreProcessamentoDetalhes
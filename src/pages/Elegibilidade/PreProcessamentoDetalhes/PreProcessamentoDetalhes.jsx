import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import DadosPreProcessamento from "./DadosPreProcessamento";
import DocumentosTermo from "./DocumentosTermo";
import DadosAngariador from "./DadosAngariador";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import $ from 'jquery'
import './PreProcessamentoDetalhes.css'

const PreProcessamentoDetalhes = () => {

    const { id } = useParams()

    const [proposta, setProposta] = useState({})
    const [entidade, setEntidade] = useState('')
    const [planoAmil, setPlanoAmil] = useState()
    const [dataInicioAmil, setDataInicioAmil] = useState('')
    const [dataFimAmil, setDataFimAmil] = useState('')
    const [custoAmil, setCustoAmil] = useState('')

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


        } catch (error) {
            console.log(error);
        }
    }

    const teste = () => {
        console.log(entidade, planoAmil, dataInicioAmil, dataFimAmil, custoAmil);
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
                            <h3>1029381 - RODRIGO ONESKO DIAS</h3>
                        </div>
                        <DadosPreProcessamento
                            analista={proposta.analistaPreProcessamento}
                            entidade={proposta.entidade}
                            setEntidade={setEntidade}
                            planoAmil={proposta.planoAmil}
                            setPlanoAmil={setPlanoAmil}
                            dataInicio={proposta.dataInicioAmil}
                            setDataInicio={setDataInicioAmil}
                            dataFim={proposta.dataFimAmil}
                            setDataFim={setDataFimAmil}
                            custo={proposta.custoAmil}
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
                        <button onClick={teste}>teste</button>

                    </div>
                </div>
            </section>
        </>
    )
}

export default PreProcessamentoDetalhes
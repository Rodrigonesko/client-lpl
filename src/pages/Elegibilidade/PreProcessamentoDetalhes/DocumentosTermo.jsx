import React, { useEffect } from "react";
import $ from 'jquery'


const DocumentosTermo = ({ documentoIdentificacao, setDocumentoIdentificacao, declaracaoAssociado, setDeclaracaoAssociado, vinculadosSimNao, setVinculadosSimNao, vinculados, setVinculados, planoAnterior, setPlanoAnterior, observacoes, setObservacoes }) => {

    const handleChange = (set, value) => {
        set(value)
    }

    const mostrarVinculados = (value) => {
        if (value === 'Sim') {
            $("#div-select-vinculado").show('fast')
        } else {
            $("#div-select-vinculado").hide('fast')
        }
    }

    useEffect(() => {
        if (vinculadosSimNao === 'Sim') {
            $("#div-select-vinculado").show('fast')
        }
    }, [vinculadosSimNao])

    return (
        <div className="container-pre-processamento">
            <div className="title">
                <h3>Documentos Termo</h3>
            </div>
            <div className="sub-bloco-pre-processamento">
                <div class='documentos-termo'>
                    <div>
                        <div className="input-radio-box">
                            {
                                documentoIdentificacao === 'Sim' ? (
                                    <input type="radio" name="documento-identificacao" id="documento-identificacao-sim" defaultChecked={true} value={'Sim'} onChange={e => {
                                        handleChange(setDocumentoIdentificacao, e.target.value)
                                    }} />
                                ) : (
                                    <input type="radio" name="documento-identificacao" id="documento-identificacao-sim" value={'Sim'} onChange={e => {
                                        handleChange(setDocumentoIdentificacao, e.target.value)
                                    }} />
                                )
                            }
                            <label htmlFor="documento-identificacao-sim">Sim</label>
                            {
                                documentoIdentificacao === 'Não' ? (
                                    <input type="radio" name="documento-identificacao" id="documento-identificacao-nao" defaultChecked={true} value={'Não'} onChange={e => {
                                        handleChange(setDocumentoIdentificacao, e.target.value)
                                    }} />
                                ) : (
                                    <input type="radio" name="documento-identificacao" id="documento-identificacao-nao" value={'Não'} onChange={e => {
                                        handleChange(setDocumentoIdentificacao, e.target.value)
                                    }} />
                                )
                            }
                            <label htmlFor="documento-identificacao-nao">Não</label>
                            <label htmlFor=""><strong>Documento Identificação</strong></label>
                        </div>
                        <div className="input-radio-box" >
                            {
                                declaracaoAssociado === 'Sim' ? (
                                    <input type="radio" name="declaracao-associado" id="declaracao-associado-sim" defaultChecked value={'Sim'} onClick={e => {
                                        handleChange(setDeclaracaoAssociado, e.target.value)
                                    }} />
                                ) : (
                                    <input type="radio" name="declaracao-associado" id="declaracao-associado-sim" value={'Sim'} onClick={e => {
                                        handleChange(setDeclaracaoAssociado, e.target.value)
                                    }} />
                                )
                            }

                            <label htmlFor="declaracao-associado-sim">Sim</label>

                            {
                                declaracaoAssociado === 'Não' ? (
                                    <input type="radio" name="declaracao-associado" id="declaracao-associado-nao" defaultChecked value={'Não'} onClick={e => {
                                        handleChange(setDeclaracaoAssociado, e.target.value)
                                    }} />
                                ) : (
                                    <input type="radio" name="declaracao-associado" id="declaracao-associado-nao" value={'Não'} onClick={e => {
                                        handleChange(setDeclaracaoAssociado, e.target.value)
                                    }} />
                                )
                            }


                            <label htmlFor="declaracao-associado-nao">Não</label>
                            <label htmlFor=""><strong>Declaração Associado ou Carteirinha</strong></label>
                        </div>
                        <div className="input-radio-box" >

                            {
                                vinculadosSimNao === 'Sim' ? (
                                    <input type="radio" name="vinculados" id="vinculados-sim" defaultChecked value={'Sim'} onClick={e => {
                                        handleChange(setVinculadosSimNao, e.target.value)
                                        mostrarVinculados(e.target.value)
                                    }} />
                                ) : (
                                    <input type="radio" name="vinculados" id="vinculados-sim" value={'Sim'} onClick={e => {
                                        handleChange(setVinculadosSimNao, e.target.value)
                                        mostrarVinculados(e.target.value)
                                    }} />
                                )
                            }


                            <label htmlFor="vinculados-sim">Sim</label>

                            {
                                vinculadosSimNao === 'Não' ? (
                                    <input type="radio" name="vinculados" id="vinculados-nao" defaultChecked value={'Não'} onClick={e => {
                                        handleChange(setVinculadosSimNao, e.target.value)
                                        mostrarVinculados(e.target.value)
                                    }} />
                                ) : (
                                    <input type="radio" name="vinculados" id="vinculados-nao" value={'Não'} onClick={e => {
                                        handleChange(setVinculadosSimNao, e.target.value)
                                        mostrarVinculados(e.target.value)
                                    }} />
                                )
                            }


                            <label htmlFor="vinculados-nao">Não</label>
                            <label htmlFor=""><strong>Vinculados</strong></label>
                        </div>
                        <div id="div-select-vinculado" className="none">
                            <select name="select-vinculado" id="select-vinculado" onChange={e => {
                                handleChange(setVinculados, e.target.value)
                            }} >
                                <option value=""></option>
                                <option value="Declaração Matricula">Declaração Matricula</option>
                                <option value="Diploma (frente/verso)">Diploma (frente/verso)</option>
                                <option value="Classista">Classista</option>
                                <option value="Conclusão de Curso">Conclusão de Curso</option>
                                <option value="Holerite">Holerite</option>
                            </select>
                        </div>
                        <div className="input-radio-box" >

                            {
                                planoAnterior === 'Sim' ? (
                                    <input type="radio" name="plano-anterior" id="plano-anterior-sim" defaultChecked value={'Sim'} onClick={e => {
                                        handleChange(setPlanoAnterior, e.target.value)
                                    }} />
                                ) : (
                                    <input type="radio" name="plano-anterior" id="plano-anterior-sim" value={'Sim'} onClick={e => {
                                        handleChange(setPlanoAnterior, e.target.value)
                                    }} />
                                )
                            }


                            <label htmlFor="plano-anterior-sim">Sim</label>
                            {
                                planoAnterior === 'Não' ? (
                                    <input type="radio" name="plano-anterior" id="plano-anterior-nao" defaultChecked value={'Não'} onClick={e => {
                                        handleChange(setPlanoAnterior, e.target.value)
                                    }} />
                                ) : (
                                    <input type="radio" name="plano-anterior" id="plano-anterior-nao" value={'Não'} onClick={e => {
                                        handleChange(setPlanoAnterior, e.target.value)
                                    }} />
                                )
                            }

                            <label htmlFor="plano-anterior-nao">Não</label>
                            <label htmlFor=""><strong>Plano Anterior</strong></label>
                        </div>
                    </div>
                    <div>
                        <h4>Observações</h4>
                        <textarea name="observacoes" id="observacoes" cols="50" rows="5" defaultValue={observacoes} onKeyUp={e => {
                            handleChange(setObservacoes, e.target.value)
                        }} ></textarea>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DocumentosTermo
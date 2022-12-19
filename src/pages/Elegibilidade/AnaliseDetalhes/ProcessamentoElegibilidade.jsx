import React from 'react'
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs'

const ProcessamentoElegibilidade = ({
    sisAmilDeacordo,
    setSisAmilDeacordo,
    contrato,
    setContrato,
    statusContrato600,
    statusContrato118,
    prc,
    setPrc,
    prcs,
    planoAnterior,
    ligacao,
    setLigacao,
    site,
    setSite,
    observacoes,
    documentoIdentificacao,
    declaracaoAssociado,
    vinculadosSimNao,
    vinculados,
    planoAmil,
    dataInicioPlanoAmil,
    dataFimPlanoAmil,
    custoPlanoAmil,
    faltaDoc
}) => {

    const handleChange = (set, value) => {
        set(value)
    }

    return (
        <div className="container-analise-detalhes">
            <div className="title">
                <h3>Análise</h3>
            </div>
            <div className="sub-bloco-analise-detalhes">
                <div className='sub-bloco-analise'>
                    <div className='card-analise'>
                        <div>
                            <label htmlFor="sisamil-deacordo">Sisamil de Acordo com a Proposta?</label>
                            <input type="checkbox" name="sisamil-deacordo" id="sisamil-deacordo" checked={sisAmilDeacordo === 'Sim'} value='Sim' onChange={e => {
                                handleChange(setSisAmilDeacordo, e.target.value)
                                if (e.target.checked) {
                                    handleChange(setSisAmilDeacordo, 'Sim')
                                } else {
                                    handleChange(setSisAmilDeacordo, 'Não')
                                }
                            }} />
                        </div>
                        <div>
                            <label htmlFor="">Contrato: </label>
                            <input type="radio" name="contrato" id="contrato-600" value={600} defaultChecked={statusContrato600} onClick={e => {
                                handleChange(setContrato, e.target.value)
                            }} />
                            <label htmlFor="contrato-600">600</label>
                            <input type="radio" name="contrato" id="contrato-118" value={118} defaultChecked={statusContrato118} onClick={e => {
                                handleChange(setContrato, e.target.value)
                            }} />
                            <label htmlFor="contrato-118">118</label>
                        </div>
                        <div>
                            <label htmlFor="prc">PRC: </label>
                            <select name="prc" id="prc" onChange={e => {
                                handleChange(setPrc, e.target.value)
                            }} >
                                <option value=""></option>
                                {
                                    prcs.map(e => {
                                        return (
                                            < option selected={e.descricao === prc} value={e.descricao} > {e.descricao}</option>
                                        )
                                    })
                                }
                            </select>
                            <label htmlFor="">Plano Anterior: </label>
                            {
                                planoAnterior === 'Sim' ? (
                                    <BsCheckCircleFill className='color-green' />
                                ) : (
                                    <BsXCircleFill className='color-red' />
                                )
                            }
                        </div>
                        <div>
                            <label htmlFor="">Comprovação Documento: </label>
                            <input type="checkbox" name="ligacao" id="ligacao" checked={ligacao === 'Sim'} value='Sim' onClick={e => {
                                if (e.target.checked) {
                                    handleChange(setLigacao, 'Sim')
                                } else {
                                    handleChange(setLigacao, 'Não')
                                }

                            }} />
                            <label htmlFor="ligacao">Ligação</label>
                            <input type="checkbox" name="site" id="site" value='Sim' checked={site === 'Sim'} onClick={e => {
                                if (e.target.checked) {
                                    handleChange(setSite, 'Sim')
                                } else {
                                    handleChange(setSite, 'Não')
                                }
                            }} />
                            <label htmlFor="site">Site</label>
                        </div>
                        <div>
                            <label htmlFor="">Observações: </label>
                            <span>{observacoes}</span>
                        </div>
                    </div>
                    <div className='card-analise' >
                        <div>
                            <div>
                                <label htmlFor="">Documento de Identificação: </label>
                                {
                                    documentoIdentificacao === 'Sim' ? (
                                        <BsCheckCircleFill className='color-green' />
                                    ) : (
                                        <BsXCircleFill className='color-red' />
                                    )
                                }
                            </div>
                            <div>
                                <label htmlFor="">Declaração Associado ou Carteirinha </label>
                                {
                                    declaracaoAssociado === 'Sim' ? (
                                        <BsCheckCircleFill className='color-green' />
                                    ) : (
                                        <BsXCircleFill className='color-red' />
                                    )
                                }
                            </div>
                            <div>
                                <label htmlFor="">Tipo de Vinculo: </label>
                                {
                                    vinculadosSimNao === 'Sim' ? (
                                        <BsCheckCircleFill className='color-green' />
                                    ) : (
                                        <BsXCircleFill className='color-red' />
                                    )
                                }
                                <label htmlFor="">{vinculados}</label>
                            </div>
                            <div>
                                <label htmlFor="">Plano Amil: </label>
                                {
                                    planoAmil === 'Sim' ? (
                                        <BsCheckCircleFill className='color-green' />
                                    ) : (
                                        <BsXCircleFill className='color-red' />
                                    )
                                }
                            </div>
                            {
                                planoAmil === 'Sim' ? (
                                    <div id='dados-plano-amil'>
                                        <label htmlFor="">Data Inicio Plano Amil: </label>
                                        <strong>{dataInicioPlanoAmil}</strong>
                                        <label htmlFor="">Data Fim Plano Amil: </label>
                                        <strong>{dataFimPlanoAmil}</strong>
                                        <label htmlFor="">Custo: </label>
                                        <strong>{custoPlanoAmil}</strong>
                                    </div>
                                ) : null
                            }
                            <div>
                                <label htmlFor="">Pré Processamento: </label>
                                <label htmlFor="">{
                                    faltaDoc === 'Sim' ? (
                                        <strong>Falta Documentos</strong>
                                    ) : (
                                        <strong>Documentação OK</strong>
                                    )
                                }</label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default ProcessamentoElegibilidade
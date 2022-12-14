import React from "react";

const StatusGeral = ({statusProposta, status1Analise, status2Analise, status3Analise}) => {
    return (
        <div className="container-analise-detalhes">
            <div className="title">
                <h4>Status Geral</h4>
            </div>
            <div className="sub-bloco-analise-detalhes">
                <label htmlFor="status-proposta">Status Proposta: </label>
                <input type="text" name="status-proposta" id="status-proposta" value={statusProposta} readOnly />
                <label htmlFor="status-1-analise">1° Análise: </label>
                <input type="text" name="status-1-analise" id="status-1-analise" value={status1Analise} readOnly />
                <label htmlFor="status-2-analise">2° Análise: </label>
                <input type="text" name="status-2-analise" id="status-2-analise" value={status2Analise} readOnly />
                <label htmlFor="status-3-analise">3° Análise: </label>
                <input type="text" name="status-3-analise" id="status-3-analise" value={status3Analise} readOnly />
                <button className="btn-padrao-azul" >Propostas</button>
            </div>
        </div>
    )
}

export default StatusGeral
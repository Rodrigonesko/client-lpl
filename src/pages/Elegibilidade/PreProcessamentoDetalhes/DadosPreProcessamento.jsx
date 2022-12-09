import React, { useEffect } from "react";
import $ from 'jquery'

const DadosPreProcessamento = ({ analista, entidade, planoAmil, setEntidade, setPlanoAmil, dataInicio, setDataInicio, dataFim, setDataFim, custo, setCusto }) => {

    const handleChange = (set, value) => {
        set(value)
    }

    const mostrarPlanoAmil = (value) => {
        if (value === 'true') {
            $('#div-plano-amil-sim').show('fast')
        } else {
            $('#div-plano-amil-sim').hide('fast')
        }
    }

    useEffect(() => {
        if (planoAmil) {
            $('#div-plano-amil-sim').show('fast')
        }
    }, [])

    return (
        <div className="container-pre-processamento">
            <div className="title">
                <h3>Dados</h3>
            </div>
            <div className="sub-bloco-pre-processamento">
                <div className="input-box-pre-processamento">
                    <label htmlFor="analista">Analista: </label>
                    <input type="text" name="analista" id="analista" value={analista} />
                </div>
                <div className="input-box-pre-processamento">
                    <label htmlFor="entidade">Entidade: </label>
                    <input type="text" name="entidade" id="entidade" defaultValue={entidade} onKeyUp={e => {
                        handleChange(setEntidade, e.target.value)
                    }} />
                </div>
                <div>
                    <label htmlFor="">Plano Amil: </label>
                    <input type="radio" name="plano-amil" id="plano-amil-sim" defaultChecked={planoAmil} value={true} onClick={e => {
                        handleChange(setPlanoAmil, e.target.value)
                        mostrarPlanoAmil(e.target.value)
                    }} />
                    <label htmlFor="plano-amil-sim">Sim</label>
                    <input type="radio" name="plano-amil" id="plano-amil-nao" value={false} defaultChecked={(planoAmil != undefined || planoAmil === true) ? (false) : (true)} onClick={e => {
                        handleChange(setPlanoAmil, e.target.value)
                        mostrarPlanoAmil(e.target.value)
                    }} />
                    <label htmlFor="plano-amil-nao">Não</label>
                </div>
                <div className="none" id="div-plano-amil-sim">
                    <label htmlFor="data-inicio">Data Início: </label>
                    <input type="date" name="data-inicio" id="data-inicio" defaultValue={dataInicio} onChange={e => {
                        handleChange(setDataInicio, e.target.value)
                    }} />
                    <label htmlFor="data-fim">Data Fim:</label>
                    <input type="date" name="data-fim" id="data-fim" defaultValue={dataFim} onChange={e => {
                        handleChange(setDataFim, e.target.value)
                    }} />
                    <label htmlFor="custo">Custo: </label>
                    <input type="text" name="custo" id="custo" defaultValue={custo} onChange={e => {
                        handleChange(setCusto, e.target.value)
                    }} />
                </div>
            </div>
        </div>
    )
}

export default DadosPreProcessamento
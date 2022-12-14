import React from "react";

const DadosElegibilidade = ({
    proposta,
    vigencia,
    nome,
    administradora,
    numeroVidas,
    entidade,
    dataImportacao,
    tipoVinculo,
    statusMotor
}) => {
    return (
        <div className="container-analise-detalhes">
            <div className="title">
                <h3>Dados</h3>
                <div className="sub-bloco-analise-detalhes" >
                    <div>
                        <label htmlFor="proposta">Proposta: </label>
                        <input type="text" name="proposta" id="proposta" value={proposta} readOnly />
                        <label htmlFor="vigencia">Vigência: </label>
                        <input type="text" name="vigencia" id="vigencia" value={vigencia} readOnly />
                        <label htmlFor="nome">Titular: </label>
                        <input type="text" name="nome" id="nome" value={nome} readOnly />
                    </div>
                    <div>
                        <label htmlFor="administradora">Administradora: </label>
                        <input type="text" name="administradora" id="administradora" value={administradora} readOnly />
                        <label htmlFor="vidas">Vidas: </label>
                        <input type="text" name="vidas" id="vidas" value={numeroVidas} readOnly />
                        <label htmlFor="entidade">Entidade: </label>
                        <input type="text" name="entidade" id="entidade" value={entidade} readOnly />
                    </div>
                    <div>
                        <label htmlFor="data-lpl">Data LPL: </label>
                        <input type="text" name="data-lpl" id="data-lpl" value={dataImportacao} readOnly />
                        <label htmlFor="vinculo">Vinculo: </label>
                        <input type="text" name="vinculo" id="vinculo" value={tipoVinculo} readOnly />
                        <label htmlFor="motor">Motor: </label>
                        <input type="text" name="motor" id="motor" value={statusMotor} readOnly />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DadosElegibilidade
import React from "react";

const InfoAdicionais = ({
    riscoBeneficiaro,
    riscoImc,
    sinistral,
    tipoAssociado,
    grupoCarencia,
    ds1,
    ds2,
    ds3,
    ds4,
    ds5,
    ds6,
    ds7,
    ds8,
    ds9,
    peso,
    altura,
    imc,
    cidAnterior1,
    cidAnterior2,
    cidAnterior3
}) => {
    return (
        <div>
            <div className="div-pergunta">
                <label htmlFor="">Risco Beneficiário</label>
                <input type="text" className="input-pergunta" defaultValue={riscoBeneficiaro} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">Risco Imc</label>
                <input type="text" className="input-pergunta" defaultValue={riscoImc} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">Sinistral</label>
                <input type="text" className="input-pergunta" defaultValue={sinistral} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">Tipo Associado</label>
                <input type="text" className="input-pergunta" defaultValue={tipoAssociado} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">Grupo Carência</label>
                <input type="text" className="input-pergunta" defaultValue={grupoCarencia} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">DS 1</label>
                <input type="text" className="input-pergunta" defaultValue={ds1} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">DS 2</label>
                <input type="text" className="input-pergunta" defaultValue={ds2} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">DS 3</label>
                <input type="text" className="input-pergunta" defaultValue={ds3} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">DS 4</label>
                <input type="text" className="input-pergunta" defaultValue={ds4} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">DS 5</label>
                <input type="text" className="input-pergunta" defaultValue={ds5} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">DS 6</label>
                <input type="text" className="input-pergunta" defaultValue={ds6} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">DS 7</label>
                <input type="text" className="input-pergunta" defaultValue={ds7} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">DS 8</label>
                <input type="text" className="input-pergunta" defaultValue={ds8} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">DS 9</label>
                <input type="text" className="input-pergunta" defaultValue={ds9} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">Peso</label>
                <input type="text" className="input-pergunta" defaultValue={peso} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">Altura</label>
                <input type="text" className="input-pergunta" defaultValue={altura} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">IMC</label>
                <input type="text" className="input-pergunta" defaultValue={imc} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">Cid Anterior 1</label>
                <input type="text" className="input-pergunta" defaultValue={cidAnterior1} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">Cid Anterior 2</label>
                <input type="text" className="input-pergunta" defaultValue={cidAnterior2} disabled />
            </div>
            <div className="div-pergunta">
                <label htmlFor="">Cid Anterior 3</label>
                <input type="text" className="input-pergunta" defaultValue={cidAnterior3} disabled />
            </div>
        </div>
    )
}

export default InfoAdicionais
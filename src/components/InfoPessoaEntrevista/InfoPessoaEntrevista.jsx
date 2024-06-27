import React from "react";

const InfoPessoaEntrevista = ({pessoa}) => {
    return (
        <div className="info-pessoa-entrevista">
            <div>
                <label htmlFor="">Nome: </label>
                <strong>{pessoa?.nome}</strong>
            </div>
            <div>
                <label htmlFor="">Sexo: </label>
                <strong>{pessoa?.sexo}</strong>
            </div>
            <div>
                <label htmlFor="">CPF: </label>
                <strong>{pessoa?.cpf}</strong>
            </div>
            <div>
                <label htmlFor="">Proposta: </label>
                <strong>{pessoa?.proposta}</strong>
            </div>
            <div>
                <label htmlFor="">Telefone: </label>
                <strong>{pessoa?.telefone}</strong>
            </div>
            <div>
                <label htmlFor="">Data Nascimento: </label>
                <strong>{pessoa?.dataNascimento}</strong>
            </div>
        </div>
    )
}

export default InfoPessoaEntrevista
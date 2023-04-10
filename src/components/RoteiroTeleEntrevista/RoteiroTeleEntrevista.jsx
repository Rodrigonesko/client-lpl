import React from "react";

const RoteiroTeleEntrevista = () => {
    return (
        <div className="roteiro-container-entrevista">
            <p>
                Hoje é dia xx/xx/xxxx e informamos que esta ligação será gravada e arquivada. Suas respostas devem ser exatas e verdadeiras àquelas perguntas formuladas. A omissão ou falta de veracidade pode acarretar à perda de prestação ou rescisão do contrato. As informações fornecidas serão incorporadas ao seu dossiê e tratadas de forma confidencial.
            </p>
            <p>
                O/A Sr(a) nos autoriza a tratar seus/de seu filho(a) dados pessoais, inclusive os dados de saúde, e dessa forma realizar o questionário de saúde?
            </p>
            <p>
                Qual seu gênero?
            </p>
            <p>
                <div>
                    <input type="radio" name="genero" id="genero-feminino" value='feminino' />
                    <label htmlFor="genero-feminino">Gênero feminino</label>
                </div>
                <div>
                    <input type="radio" name="genero" id="genero-masculino" value='masculino' />
                    <label htmlFor="genero-masculino">Gênero masculino</label>
                </div>
                <div>
                    <input type="radio" name="genero" id="outros" value='outros' />
                    <label htmlFor="outros">Outros</label>
                </div>
            </p>
            <p>
                Em caso de divergência entre o gênero e o sexo, ler o parágrafo abaixo para cientificar o beneficiário:
            </p>
            <p>
                "Para fins de esclarecimento, o questionamento do gênero ocorre por questões clínicas relacionadas a sua saúde, para garantir sua segurança, o atendimento adequado e a correspondente autorização de exames."
            </p>
            <p>
                O(A) Sr.(a) fez algum procedimento cirúrgico de transexualização?
            </p>
            <p>
                <div>
                    <input type="radio" name="procedimento-cirurgico" id="procedimento-cirurgico-sim" />
                    <label htmlFor="procedimento-cirurgico-sim">Sim</label>
                    <input type="radio" name="procedimento-cirurgico" id="procedimento-cirurgico-nao" />
                    <label htmlFor="procedimento-cirurgico-nao">Não</label>
                </div>
            </p>
            <p>
                As perguntas realizadas neste questionário são estritamente técnicas e entendemos que algumas perguntas podem não se adequar a sua situação, fique à vontade de nos corrigir caso a pergunta não se adeque.
            </p>
        </div>
    )
}

export default RoteiroTeleEntrevista
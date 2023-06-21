import React, { useState, useEffect } from "react";
import { atualizarInformacoesMo, buscarInformacoesMo } from "../../_services/rsd.service";

const InformacoesGerais = ({ mo }) => {

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [fone1, setFone1] = useState('')
    const [fone2, setFone2] = useState('')
    const [fone3, setFone3] = useState('')
    const [contratoEmpresa, setContratoEmpresa] = useState('')
    const [msg, setMsg] = useState('')

    const buscarInformacoes = async () => {
        try {
            const result = await buscarInformacoesMo(mo)

            setNome(result.pessoa.nome)
            setCpf(result.pessoa.cpf)
            setDataNascimento(result.pessoa.dataNascimento)
            setEmail(result.pessoa.email)
            setFone1(result.pessoa.fone1)
            setFone2(result.pessoa.fone2)
            setFone3(result.pessoa.fone3)
            setContratoEmpresa(result.pessoa.contratoEmpresa)
        } catch (error) {
            console.log(error);
        }
    }

    const atualizarInformacoes = async () => {
        await atualizarInformacoesMo({
            dataNascimento,
            email,
            fone1,
            fone2,
            fone3,
            contratoEmpresa,
            mo
        })

        setMsg('Atualizado com sucesso')
    }

    useEffect(() => {
        buscarInformacoes()
    }, [])

    return (
        <div className="informacoes-gerais-container">
            <table>
                <tbody>
                    <tr>
                        <td>Marca Ótica: {mo}</td>
                        <td>Nome: {nome}</td>
                        <td>CPF: {cpf}</td>
                        <td>Data Nascimento: <input type="date" defaultValue={dataNascimento} onChange={e => setDataNascimento(e.target.value)} /></td>
                        <td>E-mail: <input type="email" name="email" id="email" defaultValue={email} onChange={e => setEmail(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Fone 1: <input type="text" defaultValue={fone1} onChange={e => setFone1(e.target.value)} /></td>
                        <td>Fone 2: <input type="text" defaultValue={fone2} onChange={e => setFone2(e.target.value)} /></td>
                        <td>Fone 3: <input type="text" defaultValue={fone3} onChange={e => setFone3(e.target.value)} /></td>
                        <td>Contrato/Empresa <input type="text" defaultValue={contratoEmpresa} onChange={e => setContratoEmpresa(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td><button onClick={atualizarInformacoes} id="atualizar-informacoes-beneficiario" >Salvar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default InformacoesGerais
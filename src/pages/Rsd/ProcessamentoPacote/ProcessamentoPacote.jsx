import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import Axios from 'axios'
import AuthContext from "../../../context/AuthContext";
import './ProcessamentoPacote.css'

const ProcessamentoPacote = () => {

    const { mo, idPacote } = useParams()

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [fone1, setFone1] = useState('')
    const [fone2, setFone2] = useState('')
    const [fone3, setFone3] = useState('')
    const [contratoEmpresa, setContratoEmpresa] = useState('')
    const [msg, setMsg] = useState('')

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-processamento-pacote-container">
                <div className="processamento-pacote-container">
                    <div className="title">
                        Processamento
                    </div>
                    <div className="titulo-informacoes-gerais">
                        <span>Infomações Gerais</span>
                    </div>
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
                                    <td><button id="atualizar-informacoes-beneficiario" >Salvar</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="titulo-informacoes-gerais">
                        <span>Pedidos de Reembolso</span>
                    </div>
                    <div className="pedidos-reembolso-container">

                    </div>
                </div>

            </section>
        </>
    )
}

export default ProcessamentoPacote


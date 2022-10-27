import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FaAngleDown } from 'react-icons/fa'
import Axios from "axios";
import AuthContext from "../../../context/AuthContext";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './FichaBeneficiario.css'
import moment from "moment/moment";

const FichaBeneficiario = () => {

    const { mo } = useParams()
    const { name } = useContext(AuthContext)

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [fone1, setFone1] = useState('')
    const [fone2, setFone2] = useState('')
    const [fone3, setFone3] = useState('')
    const [contratoEmpresa, setContratoEmpresa] = useState('')
    const [msg, setMsg] = useState('')

    const [protocolos, setProtocolos] = useState([])
    const [pedidos, setPedidos] = useState([])

    const changeState = state => {
        state = !state
        console.log(state);

        return state
    }

    const buscarMo = async () => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pessoas/${mo}`, { withCredentials: true })

        console.log(result);

        setNome(result.data.pessoa.nome)
        setCpf(result.data.pessoa.cpf)
        setDataNascimento(result.data.pessoa.dataNascimento)
        setEmail(result.data.pessoa.email)
        setFone1(result.data.pessoa.fone1)
        setFone2(result.data.pessoa.fone2)
        setFone3(result.data.pessoa.fone3)
        setContratoEmpresa(result.data.pessoa.contratoEmpresa)

    }

    const buscarPedidos = async (element, statusPedidos, protocolo, responsavel) => {
        try {
            let divPedidos = element.parentElement.nextSibling

            if (statusPedidos === true) {
                console.log(protocolo);
                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedidos/${protocolo}`, { withCredentials: true })

                console.log(result);

                divPedidos.classList.remove('none')

                result.data.pedidos.forEach(e => {

                    let tr = document.createElement('tr')

                    let tdPedido = document.createElement('td')
                    let tdStatus = document.createElement('td')
                    let tdValorApresentado = document.createElement('td')
                    let tdValorReembolsado = document.createElement('td')
                    let tdCnpj = document.createElement('td')
                    let tdClinica = document.createElement('td')
                    let tdNf = document.createElement('td')
                    let tdIrregular = document.createElement('td')
                    let tdBotoes = document.createElement('td')

                    tdPedido.textContent = e.numero
                    tdStatus.textContent = e.status
                    tdValorApresentado.textContent = e.valorApresentado
                    tdValorReembolsado.textContent = e.valorReembolsado
                    tdCnpj.textContent = e.cnpj
                    tdClinica.textContent = e.clinica
                    tdNf.textContent = e.nf
                    tdIrregular.textContent = e.irregular

                    tr.appendChild(tdPedido)
                    tr.appendChild(tdStatus)
                    tr.appendChild(tdValorApresentado)
                    tr.appendChild(tdValorReembolsado)
                    tr.appendChild(tdCnpj)
                    tr.appendChild(tdClinica)
                    tr.appendChild(tdNf)
                    tr.appendChild(tdIrregular)
                    tr.appendChild(tdBotoes)

                    if (responsavel == name) {
                        let tdEditar = document.createElement('td')
                        let tdInativar = document.createElement('td')
                        let buttonEditar = document.createElement('a')
                        buttonEditar.textContent = 'Editar'
                        buttonEditar.href = `/rsd/EditarPedido/${e.numero}`
                        let buttonInativar = document.createElement('a')
                        buttonInativar.textContent = 'Inativar'

                        tdEditar.appendChild(buttonEditar)
                        tdInativar.appendChild(buttonInativar)
                        tdBotoes.appendChild(tdEditar)
                        tdBotoes.appendChild(tdInativar)
                    }

                    divPedidos.firstChild.firstChild.firstChild.children[1].appendChild(tr)

                })


            } else {
                console.log('fecha');
                divPedidos.classList.add('none')
                let trPedidos = divPedidos.firstChild.firstChild.firstChild.children[1]
                Object.values(trPedidos.children).forEach(e => {
                    trPedidos.removeChild(e)
                })

            }

        } catch (error) {
            console.log(error);
        }
    }

    const buscarProtocolos = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/protocolos/${mo}`, { withCredentials: true })

            setProtocolos(result.data.protocolos)

            console.log(result);
        } catch (error) {

        }
    }

    const buscarPacotes = async () => {
        try {

        } catch (error) {

        }
    }

    const assumirPedido = async (protocolo) => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/protocolos/assumir`, { analista: name, protocolo: protocolo }, { withCredentials: true })

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    const atualizarInformacoes = async () => {
        console.log(dataNascimento, email, fone1, fone2, fone3, contratoEmpresa, mo);

        const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/pessoas/editar`, {
            dataNascimento,
            email,
            fone1,
            fone2,
            fone3,
            contratoEmpresa,
            mo
        }, {
            withCredentials: true
        })

        if (result.status === 200) {
            setMsg('Atualizado com sucesso')
        }

    }

    useEffect(() => {
        buscarMo()
        buscarProtocolos()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-cadastro-beneficiario-container">
                <div className="cadastro-beneficiario-container">
                    <div className="title">
                        <h2>CADASTRO BENEFICIÁRIO</h2>
                    </div>
                    <div className="titulo-informacoes-gerais">
                        <span>Informações Gerais</span>
                    </div>
                    <div className="informacoes-gerais">
                        {
                            msg && (
                                <div className="success">
                                    Atualizado com sucesso
                                </div>
                            )
                        }
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
                                    <td><button id="atualizar-informacoes-beneficiario" onClick={atualizarInformacoes} >Salvar</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="titulo-pedidos-reembolso">
                        <span>Pedidos de Reembolso</span>
                    </div>
                    <div className="pedidos-reembolso">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Numero Protocolo</th>
                                    <th>Data Solicitação</th>
                                    <th>Data Pagamento</th>
                                    <th>Status</th>
                                    <th>Data Status</th>
                                    <th>Analista</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    protocolos.map(e => {

                                        let statusPedidos = false
                                        let responsavel = false

                                        if (e.analista == name) {
                                            responsavel = true
                                        }

                                        if (e.idStatus === 'A iniciar') {
                                            return (
                                                <>
                                                    <tr key={e._id}>
                                                        <td onClick={x => {
                                                            statusPedidos = changeState(statusPedidos)
                                                            buscarPedidos(x.target, statusPedidos, e.numero, e.analista)

                                                        }} className="numero-protocolo"><FaAngleDown /> {e.numero}</td>
                                                        <td>{moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>
                                                        <td>{moment(e.dataPagamento).format('DD/MM/YYYY')}</td>
                                                        <td>{e.idStatus}</td>
                                                        <td></td>
                                                        <td>{e.analista}</td>
                                                        <td><button onClick={() => { assumirPedido(e.numero) }}>Assumir</button></td>
                                                    </tr>
                                                    <tr key={e.numero} className='none'>
                                                        <td colSpan={10}>
                                                            <div>
                                                                <table className="table">
                                                                    <thead className="table-header">
                                                                        <tr>
                                                                            <th>pedido</th>
                                                                            <th>Status</th>
                                                                            <th>R$ Apresentado</th>
                                                                            <th>R$ Reembolsado</th>
                                                                            <th>CNPJ</th>
                                                                            <th>Clínica</th>
                                                                            <th>NF</th>
                                                                            <th>Irregular</th>
                                                                            <th></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                    </tbody>
                                                                    {
                                                                        responsavel && (
                                                                            <Link to={`/rsd/CriarPedido/${e.numero}`} >Novo Pedido</Link>
                                                                        )
                                                                    }
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                        <div>
                            <Link to={`/rsd/CriarProtocolo/${mo}`}>Novo Protocolo</Link>
                            <button>Criar Pacote</button>
                        </div>
                    </div>

                    <div>
                        <span>Pacotes</span>
                    </div>
                    <div className="pacotes">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID LPL</th>
                                    <th>ANS</th>
                                    <th>Status</th>
                                    <th>Analista</th>

                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FichaBeneficiario

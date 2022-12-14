import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FaAngleDown } from 'react-icons/fa'
import Axios from "axios";
import AuthContext from "../../../context/AuthContext";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './FichaBeneficiario.css'
import moment from "moment/moment";
import TabelaProtocolo from "../../../components/TabelaProtocolo/TabelaProtocolo";
import TabelaPedido from "../../../components/TabelaPedido/TabelaPedido";
import { IMaskInput } from "react-imask";
import $ from 'jquery'
import Modal from 'react-modal'

Modal.setAppElement('#root')


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

    const [pedidos, setPedidos] = useState([])
    const [protocolos, setProtocolos] = useState([])
    const [pacotes, setPacotes] = useState([])

    const [modalInativarPacote, setModalInativarPacote] = useState(false)
    const [inativarPacote, setInativarPacote] = useState('')

    const buscarMo = async () => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pessoas/${mo}`, { withCredentials: true })

        setNome(result.data.pessoa.nome)
        setCpf(result.data.pessoa.cpf)
        setDataNascimento(result.data.pessoa.dataNascimento)
        setEmail(result.data.pessoa.email)
        setFone1(result.data.pessoa.fone1)
        setFone2(result.data.pessoa.fone2)
        setFone3(result.data.pessoa.fone3)
        setContratoEmpresa(result.data.pessoa.contratoEmpresa)

        const resultPedidos = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedidos/mo/${mo}`, { withCredentials: true })

        setPedidos(resultPedidos.data.pedidos)

        let auxProtocolos = resultPedidos.data.pedidos.filter((item, pos, array) => {
            return item.status === 'A iniciar'
        })

        console.log(auxProtocolos);

        let arrAuxProtocolos = auxProtocolos.filter((item, pos, array) => {
            return array.map(x => x.protocolo).indexOf(item.protocolo) === pos
        })

        setProtocolos(arrAuxProtocolos)

        let arrAuxPacotes = resultPedidos.data.pedidos.filter((item, pos, array) => {
            return array.map(x => x.pacote).indexOf(item.pacote) === pos
        })

        setPacotes(arrAuxPacotes)

        console.log(arrAuxPacotes);


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
            mo,
            cpf
        }, {
            withCredentials: true
        })

        if (result.status === 200) {
            setMsg('Atualizado com sucesso')
        }

    }

    const mostrarPedidos = e => {
        let trPedidos = e.target.parentElement.nextSibling

        if (!trPedidos.classList.contains('data')) {
            $(trPedidos).toggle('fast')
        } else {
            $(trPedidos.parentElement.nextSibling).toggle('fast')
        }
    }

    const marcarProtocolo = e => {

        let colecaoPedidos = e.target.parentElement.parentElement.nextSibling.firstChild.firstChild.firstChild.children[1].children

        if (e.target.checked) {

            for (const tr of colecaoPedidos) {
                tr.lastChild.firstChild.checked = true
            }

        } else {
            for (const tr of colecaoPedidos) {
                tr.lastChild.firstChild.checked = false
            }
        }
    }

    const criarPacote = async e => {
        try {

            let checkboxs = document.getElementsByClassName('checkbox-pedido')

            let arrPedidos = []

            for (const item of checkboxs) {
                if (item.checked) {
                    arrPedidos.push(item.value)
                }
            }

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/rsd/pacote/criar`, { arrPedidos }, { withCredentials: true })

            if (result.status === 200) {
                window.location.reload();
            }

        } catch (error) {
            console.log(error);
        }
    }

    const assumirPacote = async e => {
        try {

            console.log(e.target.value, name);

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/pacote/assumir`, { name: name, pacote: e.target.value }, { withCredentials: true })

            if (result.status == 200) {
                window.location.reload();
            }


        } catch (error) {
            console.log(error);
        }
    }

    const devolverPacote = async e => {
        try {

            const motivoInativo = document.getElementById('motivo-inativo-pacote').value

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/pacote/devolver`, {
                pacote: e,
                motivoInativo
            }, {
                withCredentials: true,
            })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarMo()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-cadastro-beneficiario-container">
                <div className="cadastro-beneficiario-container">
                    <div className="title">
                        <h2>CADASTRO BENEFICI??RIO</h2>
                    </div>
                    <div className="titulo-informacoes-gerais">
                        <span>Informa????es Gerais</span>
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
                                    <td>Marca ??tica: {mo}</td>
                                    <td>Nome: {nome}</td>
                                    <td>CPF: <IMaskInput
                                        mask="000.000.000-00"
                                        placeholder="Digite o seu CPF"
                                        name="cpf" id="cpf"
                                        defaultValue={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    /></td>
                                    <td>Data Nascimento: <input type="date" defaultValue={dataNascimento} onChange={e => setDataNascimento(e.target.value)} /></td>
                                    <td>E-mail: <input type="email" name="email" id="email" defaultValue={email} onChange={e => setEmail(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <td>Fone 1: <IMaskInput
                                        mask="(00)00000-0000"
                                        placeholder="Telefone"
                                        name="fone1" id="fone1"
                                        defaultValue={fone1}
                                        onKeyUp={e => setFone1(e.target.value)}
                                    /></td>
                                    <td>Fone 2: <IMaskInput
                                        mask="(00)00000-0000"
                                        placeholder="Telefone"
                                        name="fone2" id="fone2"
                                        defaultValue={fone2}
                                        onKeyUp={e => setFone2(e.target.value)}
                                    /></td>
                                    <td>Fone 3: <IMaskInput
                                        mask="(00)00000-0000"
                                        placeholder="Telefone"
                                        name="fone3" id="fone3"
                                        defaultValue={fone3}
                                        onKeyUp={e => setFone3(e.target.value)}
                                    /></td>
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
                                    <th>Data Solicita????o</th>
                                    <th>Data Pagamento</th>
                                    <th>Status</th>
                                    <th>Data Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    protocolos.map(e => {

                                        if (e.status === 'A iniciar') {
                                            return (
                                                <>
                                                    <tr key={e.protocolo}>
                                                        <td onClick={e => {
                                                            mostrarPedidos(e)
                                                        }} className="td-protocolo"> <FaAngleDown />{e.protocolo}</td>
                                                        <td className="data">{moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>
                                                        <td>{moment(e.dataPagamento).format('DD/MM/YYYY')}</td>
                                                        <td>{e.status}</td>
                                                        <td>{moment(e.updatedAt).format('DD/MM/YYYY')}</td>
                                                        <td> <input type="checkbox" value={e.protocolo} className='checkbox-protocolo' onClick={marcarProtocolo} /> </td>
                                                    </tr>
                                                    <tr key={e._id} className="none">
                                                        <TabelaPedido className='' protocolo={e.protocolo} pedidos={pedidos}>

                                                        </TabelaPedido>
                                                    </tr>

                                                </>

                                            )
                                        }

                                    })
                                }
                            </tbody>
                        </table>
                        <div>
                            <Link className="btn-criar-protocolo" to={`/rsd/CriarProtocolo/${mo}`}>Novo Protocolo</Link>
                            <button className="btn-criar-pacote" onClick={criarPacote} >Criar Pacote</button>
                        </div>
                    </div>

                    <div className="titulo-informacoes-gerais">
                        <span>Pacotes</span>
                    </div>
                    <div className="pacotes">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>ID LPL</th>
                                    <th>ANS</th>
                                    <th>Status</th>
                                    <th>Analista</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pacotes.map(e => {
                                        if (e.statusPacote !== 'N??o iniciado' && e.statusPacote !== 'Finalizado' && e.statusPacote !== 'Cancelado' && e.statusPacote !== 'Comprovante Correto') {
                                            return (
                                                <>
                                                    <tr>
                                                        <td className="td-pacote" onClick={mostrarPedidos} > <FaAngleDown /> {e.pacote}</td>
                                                        <td className="data">{moment(e.createdAt).format('DD/MM/YYYY')}</td>
                                                        <td>{e.statusPacote}</td>
                                                        <td>{e.analista}</td>
                                                        <td><button value={e.pacote} onClick={assumirPacote} className='btn-assumir-pacote' >Assumir</button></td>
                                                        <td><Link to={`/rsd/ProcessamentoPacote/${mo}/${e.pacote}`} className="btn-verificar-processamento">Verificar Processamento</Link> <button onClick={() => {
                                                            setModalInativarPacote(true)
                                                            setInativarPacote(e.pacote)
                                                        }} className="botao-padrao-cinza">Inativar</button></td>
                                                    </tr>
                                                    <tr className="none teste">
                                                        <TabelaProtocolo pedidos={pedidos} pacote={e.pacote} verificaPacote={true} finalizados={false} >

                                                        </TabelaProtocolo>
                                                    </tr>
                                                </>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <Modal
                isOpen={modalInativarPacote}
                onRequestClose={() => { setModalInativarPacote(false) }}
                contentLabel="Exemplo"
                overlayClassName='modal-overlay'
                className='modal-content'
            >
                <div className="title titulo-modal-agenda">
                    <h2>Motivo de inativa????o</h2>
                </div>
                <div>
                    <select name="motivo-inativo-pacote" id="motivo-inativo-pacote">
                        <option value="devolvido">devolvido</option>
                        <option value="duplicidade">duplicidade</option>
                    </select>
                </div>
                <div>
                    <button value={inativarPacote} onClick={e => {
                        devolverPacote(e.target.value)
                    }} >Inativar</button>
                </div>
            </Modal>
        </>
    )
}

export default FichaBeneficiario

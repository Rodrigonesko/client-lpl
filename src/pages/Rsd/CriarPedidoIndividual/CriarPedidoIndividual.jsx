import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import './CriarPedidoIndividual.css'

const CriarPedidoIndividual = () => {

    const navigate = useNavigate()

    const [mo, setMo] = useState('')
    const [nome, setNome] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [fone1, setFone1] = useState('')
    const [fone2, setFone2] = useState('')
    const [fone3, setFone3] = useState('')
    const [cpf, setCpf] = useState('')
    const [operadoraBeneficiario, setOperadoraBeneficiario] = useState('')
    const [operadoresBeneficiario, setOperadorasBeneficiario] = useState([])
    const [protocolo, setProtocolo] = useState('')
    const [dataSolicitacao, setDataSolicitacao] = useState('')
    const [dataPagamento, setDataPagamento] = useState('')
    const [pedido, setPedido] = useState('')
    const [fila, setFila] = useState('')

    const buscarMo = async (marcaOtica) => {
        try {

            if (marcaOtica) {
                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pessoas/${marcaOtica}`, { withCredentials: true })

                if (result.data.pessoa) {
                    setNome(result.data.pessoa.nome)
                    setDataNascimento(result.data.pessoa.dataNascimento)
                    setEmail(result.data.pessoa.email)
                    setFone1(result.data.pessoa.fone1)
                    setFone2(result.data.pessoa.fone2)
                    setFone3(result.data.pessoa.fone3)
                    setCpf(result.data.pessoa.cpf)
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    const criarPedido = async e => {
        try {
            e.preventDefault()

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/rsd/pedido/criar/individual`, {
                mo,
                nome,
                dataNascimento,
                email,
                fone1,
                fone2,
                fone3,
                cpf,
                operadoraBeneficiario,
                protocolo,
                dataSolicitacao,
                dataPagamento,
                pedido,
                fila
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                navigate(`/rsd/FichaBeneficiario/${mo}`)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const buscarOperadoras = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/operadoras`, { withCredentials: true })

            setOperadorasBeneficiario(result.data.operadoras)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarOperadoras()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-criar-pedido-protocolo-container">
                <div className="criar-pedido-protocolo-container">
                    <div className="title">
                        <h3>Novo Protocolo/Pedido</h3>
                    </div>
                    <form action="">
                        <div className="input-marca-otica">
                            <label htmlFor="mo">Marca Ótica</label>
                            <input type="text" id="mo" placeholder="Marca Ótica" onChange={e => {
                                setMo(e.target.value)
                                buscarMo(e.target.value)
                            }} />
                        </div>
                        <div className="container-dados-beneficiario">
                            <div>
                                <div className="input-box-criar-pedido">
                                    <label htmlFor="nome">Nome</label>
                                    <input type="text" id="nome" placeholder="Nome" defaultValue={nome} onChange={e => {
                                        setNome(e.target.value)
                                    }} />
                                </div>
                                <div className="input-box-criar-pedido">
                                    <label htmlFor="data-nascimento">Data Nascimento</label>
                                    <input type="date" id="data-nascimento" placeholder="Data Nascimento" defaultValue={dataNascimento} onChange={e => {
                                        setDataNascimento(e.target.value)
                                    }} />
                                </div>
                                <div className="input-box-criar-pedido">
                                    <label htmlFor="email">E-mail</label>
                                    <input type="text" id="email" placeholder="E-mail" defaultValue={email} onChange={e => {
                                        setEmail(e.target.value)
                                    }} />
                                </div>
                                <div className="input-box-criar-pedido">
                                    <label htmlFor="fone-2">Fone 2</label>
                                    <input type="text" id="fone-2" placeholder="Fone 2" defaultValue={fone2} onChange={e => {
                                        setFone2(e.target.value)
                                    }} />
                                </div>
                            </div>
                            <div>
                                <div className="input-box-criar-pedido">
                                    <label htmlFor="cpf">CPF</label>
                                    <input type="text" id="cpf" placeholder="CPF" defaultValue={cpf} onChange={e => {
                                        setCpf(e.target.value)
                                    }} />
                                </div>
                                <div className="input-box-criar-pedido">
                                    <select name="operadora-beneficiario" id="operadora-beneficiario" onChange={e => {
                                        setOperadoraBeneficiario(e.target.value)
                                    }} >
                                        <option value="">Operadora Beneficiário</option>
                                        {
                                            operadoresBeneficiario.map(e => {
                                                return (
                                                    <option key={e._id} value={e.descricao}>{e.descricao}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="input-box-criar-pedido">
                                    <label htmlFor="fone-1">Fone 1</label>
                                    <input type="text" id="fone-1" placeholder="Fone 1" defaultValue={fone1} onChange={e => {
                                        setFone1(e.target.value)
                                    }} />
                                </div>
                                <div className="input-box-criar-pedido">
                                    <label htmlFor="fone-3">Fone 3</label>
                                    <input type="text" id="fone-3" placeholder="Fone 3" defaultValue={fone3} onChange={e => {
                                        setFone3(e.target.value)
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="input-box-criar-pedido">
                                <label htmlFor="protocolo">Número do Protocolo</label>
                                <input type="text" id="protocolo" placeholder="Número do Protocolo" onChange={e => {
                                    setProtocolo(e.target.value)
                                }} />
                            </div>
                            <div className="input-box-criar-pedido">
                                <label htmlFor="data-solicitacao">Data Solicitação</label>
                                <input type="date" id="data-solicitacao" placeholder="Data Solicitação" onChange={e => {
                                    setDataSolicitacao(e.target.value)
                                }} />
                            </div>
                            <div className="input-box-criar-pedido">
                                <label htmlFor="data-pagamento">Data Pagamento</label>
                                <input type="date" id="data-pagamento" placeholder="Data Pagamento" onChange={e => {
                                    setDataPagamento(e.target.value)
                                }} />
                            </div>
                            <div className="input-box-criar-pedido">
                                <label htmlFor="pedido">Número do Pedido</label>
                                <input type="text" id="pedido" placeholder="Número do Pedido" onChange={e => {
                                    setPedido(e.target.value)
                                }} />
                            </div>
                            <div className="input-box-criar-pedido">
                                <label htmlFor="fila">Fila: </label>
                                <select name="fila" id="fila" style={{width: '300px'}} onChange={(e)=>{
                                    setFila(e.target.value)
                                }}>
                                    <option value=""></option>
                                    <option value="RSD">RSD</option>
                                    <option value="Quarentena">Quarentena</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button onClick={criarPedido} className="criar-pedido-botao">Criar</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CriarPedidoIndividual
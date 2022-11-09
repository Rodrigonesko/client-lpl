import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import Axios from 'axios'
import AuthContext from "../../../context/AuthContext";
import InformacoesGerais from "../../../components/InformacoesGerais/InformacoesGerais";
import TabelaProtocolo from "../../../components/TabelaProtocolo/TabelaProtocolo";
import TabelaPedido from "../../../components/TabelaPedido/TabelaPedido";
import Modal from 'react-modal'
import './ProcessamentoPacote.css'
import moment from "moment";

Modal.setAppElement('#root')

let motivoContato = new Map()
let confirmacaoServico = new Map()
let finalizacao = new Map()

const ProcessamentoPacote = () => {

    const { mo, idPacote } = useParams()

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalAgenda, setModalAgenda] = useState(false)
    const [pedidos, setPedidos] = useState([])
    const [protocolos, setProtocolos] = useState([])
    const [gravacao, setGravacao] = useState()
    const [arquivos, setArquivos] = useState([])
    const [formasPagamento, setFormasPagamento] = useState([])
    const [statusFinalizacao, setStatusFinalizacao] = useState([])
    const [houveSucesso, setHouveSucesso] = useState('')
    const [agenda, setAgenda] = useState([])
    const [finalizado, setFinalizado] = useState(true)
    const [parecer, setParecer] = useState('')

    const openModal = () => {
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }

    const openModalAgenda = () => {
        setModalAgenda(true)
    }

    const closeModalAgenda = () => {
        setModalAgenda(false)
    }

    const buscarPedidos = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedidos/pacote/${idPacote}`, { withCredentials: true })

            setPedidos(result.data.pedidos)

            let arrAuxProtocolos = result.data.pedidos.filter((item, pos, array) => {
                return array.map(x => x.protocolo).indexOf(item.protocolo) === pos
            })

            setProtocolos(arrAuxProtocolos)

            if (result.data.pedidos[0].statusPacote === 'Finalizado') {
                setFinalizado(false)
            }

        } catch (error) {
            console.log(error);
        }
    }
    const anexarGravacao = async e => {

        e.preventDefault()

        try {

            let formData = new FormData()

            formData.append('file', gravacao, gravacao.name)

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/rsd/gravacao/anexar/${idPacote}`, formData, { headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` }, withCredentials: true })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }
    const buscarArquivos = async e => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/arquivos/${idPacote}`, { withCredentials: true })

            setArquivos(result.data.arquivos)

        } catch (error) {
            console.log(error);
        }
    }
    const download = (url, filename) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                link.click();
            })
            .catch(console.error);
    }
    const buscarFormasPagamento = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/formasPagamento`, { withCredentials: true })

            setFormasPagamento(result.data.formasPagamento)

        } catch (error) {
            console.log(error);
        }
    }
    const buscarStatusFinalizacao = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/statusFinalizacoes`, { withCredentials: true })

            setStatusFinalizacao(result.data.statusFinalizacoes)

        } catch (error) {
            console.log(error);
        }
    }
    const mostrarPedidos = e => {
        let trPedidos = e.target.parentElement.nextSibling

        trPedidos.classList.toggle('none')
    }
    const mostrarProcessamento = () => {

        document.getElementById('tr-processamento-1').classList.remove('none')

    }
    const salvar = async () => {
        try {

            let motivosContato = []
            let servicos = []
            let finalizacoes = []

            motivoContato.forEach((item, chave) => {
                motivosContato.push([chave, item])
            })

            confirmacaoServico.forEach((item, chave) => {
                servicos.push([chave, item])
            })

            finalizacao.forEach((item, chave) => {
                finalizacoes.push([chave, item])
            })

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/pedido/atualizar`, {
                pacote: idPacote,
                sucesso: houveSucesso,
                motivoContato: motivosContato,
                confirmacaoServico: servicos,
                finalizacao: finalizacoes
            }, {
                withCredentials: true
            })

            window.location.reload()

        } catch (error) {
            console.log(error);
        }
    }
    const verificarMotivoContato = e => {

        let valor = e.target.value
        let nome = e.target.name
        let split = nome.split('-')
        let pedido = split[1]

        motivoContato.set(pedido, valor)

    }
    const verificarServico = e => {

        let valor = e.target.value
        let split = e.target.name.split('-')
        let pedido = split[2]

        confirmacaoServico.set(pedido, valor)

    }
    const verificarFinalizacao = e => {

        let valor = e.target.value
        let split = e.target.name.split('-')
        let pedido = split[1]

        finalizacao.set(pedido, valor)

    }
    const buscarAgenda = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/agenda/${idPacote}`, { withCredentials: true })

            setAgenda(result.data.agenda)

        } catch (error) {
            console.log(error);
        }
    }
    const verificarStatusPacote = async () => {
        pedidos.map(e => {
            console.log(e);
        })
    }

    const enviarComentarioAgenda = async e => {
        try {

            e.preventDefault()

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/rsd/agenda/novoParecer`, {
                pacote: idPacote,
                parecer
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarPedidos()
        buscarArquivos()
        buscarFormasPagamento()
        buscarStatusFinalizacao()
        buscarAgenda()
        verificarStatusPacote()
    }, [])

    return (
        <>
            <Sidebar />
            <section className="section-processamento-pacote-container">
                <div className="processamento-pacote-container">
                    <div className="title">
                        Processamento
                    </div>
                    <div className="titulo-informacoes-gerais">
                        <span>Infomações Gerais</span>
                    </div>
                    <InformacoesGerais
                        mo={mo}
                    />
                    <div className="titulo-informacoes-gerais">
                        <span>Pedidos de Reembolso</span>
                    </div>
                    <div className="pedidos-reembolso-container">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Protocolo</th>
                                    <th>Data Solicitação</th>
                                    <th>Data Pagamento</th>
                                    <th>Status</th>
                                    <th>Data Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    protocolos.map(e => {

                                        return (
                                            <>
                                                <tr key={e.protocolo}>
                                                    <td className="td-protocolo" onClick={mostrarPedidos} > <FaAngleDown /> {e.protocolo}</td>
                                                    <td>{moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>
                                                    <td>{moment(e.dataPagamento).format('DD/MM/YYYY')}</td>
                                                    <td>{e.statusPacote}</td>
                                                    <td>{moment(e.updatedAt).format('DD/MM/YYYY')}</td>
                                                </tr>
                                                <tr className="none" >
                                                    <TabelaPedido pedidos={pedidos} protocolo={e.protocolo} pacote={idPacote} />
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="btns-processamento">
                        {
                            finalizado ? (
                                <button onClick={mostrarProcessamento} className="iniciar-processamento-btn">Iniciar Processamento</button>
                            ) : null
                        }

                        <input type="checkbox" name="prioridade-dossie" id="prioridade-dossie" />
                        <label htmlFor="prioridade-dossie">Prioridade para Dossie?</label>
                    </div>
                    <div className="roteiro-container">
                        <div className="roteiro">
                            <div className="titulo-informacoes-gerais">
                                <span>Roteiro</span>
                            </div>
                            <div className="table-roteiro">
                                <table className="table tabela-roteiro">
                                    <tbody>
                                        <tr className="none" id="tr-processamento-1">
                                            <td>1°</td>
                                            <td>
                                                <p>Houve sucesso no Contato com o beneficiário?</p>
                                                <input type="radio" name="contato-beneficiario" id="contato-beneficiario-sim" value={`Sim`} onClick={e => {
                                                    setHouveSucesso(e.target.value)
                                                }} />
                                                <label htmlFor="contato-beneficiario-sim">Sim</label>
                                                <input type="radio" name="contato-beneficiario" id="contato-beneficiario-nao" value={`Não`} onClick={e => {
                                                    setHouveSucesso(e.target.value)
                                                }} />
                                                <label htmlFor="contato-beneficiario-nao">Não</label>
                                                <input type="radio" name="contato-beneficiario" id="contato-beneficiario-agendar" value={`Necessário Agendar Horario`} onClick={e => {
                                                    setHouveSucesso(e.target.value)
                                                }} />
                                                <label htmlFor="contato-beneficiario-agendar">Necessário Agendar Horario</label>
                                                <input type="radio" name="contato-beneficiario" id="contato-beneficiario-sem-retorno" value={`Sem Retorno de Contato`} onClick={e => {
                                                    setHouveSucesso(e.target.value)
                                                }} />
                                                <label htmlFor="contato-beneficiario-sem-retorno">Sem Retorno de Contato</label>
                                            </td>
                                            <td>
                                                <input type="checkbox" name="" id="" onClick={() => {
                                                    document.getElementById('tr-processamento-2').classList.toggle('none')
                                                }} />
                                            </td>
                                        </tr>
                                        <tr className="none" id="tr-processamento-2">
                                            <td>2°</td>
                                            <td>
                                                <p><strong>SELO CONTATO</strong></p>
                                                <p>Informar nome completo do beneficiário no início do contato. Se identifique como funcionário da Operadora Informar que a ligação é gravada e pedir para confirmar algumas informações, como 3 últimos números do CPF, ano de nascimento e idade.</p>
                                            </td>
                                            <td>
                                                <input type="checkbox" name="" id="" onClick={() => {
                                                    document.getElementById('tr-processamento-3').classList.toggle('none')
                                                }} />
                                            </td>
                                        </tr>
                                        <tr className="none" id="tr-processamento-3">
                                            <td>3°</td>
                                            <td>
                                                <p><strong>MOTIVO CONTATO</strong></p>
                                                <p>Reembolso referente ao atendimento da clínica TAL, realizado no dia XX, no valor de R$ XX. Confirmar se o beneficiário reconhece esse atendimento e cobrança?</p>
                                                {
                                                    pedidos.map(e => {

                                                        if (e.fase !== 'Finalizado') {
                                                            return (
                                                                <>
                                                                    <p>Pedido <strong>{e.numero}</strong>, NF <strong>{e.nf}</strong>, Clínica <strong>{e.clinica}</strong>, Valor Apresentado <strong>R$ {e.valorApresentado}</strong></p>
                                                                    <input type="radio" name={`confirma-${e.numero}`} id={`confirma-sim-${e.numero}`} onClick={verificarMotivoContato} value='Sim' defaultChecked={e.reconhece} />
                                                                    <label htmlFor={`confirma-sim-${e.numero}`}>Sim</label>
                                                                    <input type="radio" name={`confirma-${e.numero}`} id={`confirma-nao-${e.numero}`} onClick={verificarMotivoContato} value='Não' />
                                                                    <label htmlFor={`confirma-nao-${e.numero}`}>Não</label>
                                                                </>
                                                            )
                                                        }


                                                    })
                                                }
                                            </td>
                                            <td>
                                                <input type="checkbox" name="" id="" onClick={() => {
                                                    document.getElementById('tr-processamento-4').classList.toggle('none')
                                                }} />
                                            </td>
                                        </tr>
                                        <tr className="none" id="tr-processamento-4">
                                            <td>4°</td>
                                            <td>
                                                <p><strong>CONFIRMAÇÃO SERVIÇO</strong></p>
                                                <p>Questionar como foi realizado e solicitar envio do comprovante/declaração em até 5 dias úteis e deixa-lo ciente que o pedido poderá ser cancelado caso a documentação não seja enviada. Questionar ao beneficiário como ficou acordado o pagamento destes serviços junto a clínica:</p>
                                                {
                                                    pedidos.map(e => {

                                                        if (e.fase !== 'Finalizado') {
                                                            return (
                                                                <>
                                                                    <p>Pedido: <strong>{e.numero}</strong></p>
                                                                    {
                                                                        formasPagamento.map(formaPagamento => {

                                                                            let checkFormaPagameto = false

                                                                            if (e.formaPagamento === formaPagamento.nome) {
                                                                                checkFormaPagameto = true
                                                                            }

                                                                            return (
                                                                                <>
                                                                                    <input type="radio" name={`forma-pagamento-${e.numero}`} id={`forma-pagamento-${e.numero}-${formaPagamento.nome}`} value={formaPagamento.nome} onClick={verificarServico} defaultChecked={checkFormaPagameto} />
                                                                                    <label htmlFor={`forma-pagamento-${e.numero}-${formaPagamento.nome}`}>{formaPagamento.nome}</label>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                    })
                                                }
                                            </td>
                                            <td>
                                                <input type="checkbox" name="" id="" onClick={() => {
                                                    document.getElementById('tr-processamento-5').classList.toggle('none')
                                                }} />
                                            </td>
                                        </tr>
                                        <tr className="none" id="tr-processamento-5">
                                            <td>5°</td>
                                            <td>
                                                <p><strong>FINALIZAÇÃO</strong></p>
                                                {
                                                    pedidos.map(e => {
                                                        if (e.fase !== 'Finalizado') {
                                                            return (
                                                                <>
                                                                    <p>Pedido: <strong>{e.numero}</strong></p>
                                                                    {
                                                                        statusFinalizacao.map(statusFinalizacao => {
                                                                            return (
                                                                                <>
                                                                                    <input type="radio" name={`finalizacao-${e.numero}`} id={`finalizacao-${e.numero}-${statusFinalizacao.descricao}`} value={statusFinalizacao.descricao} onClick={verificarFinalizacao} />
                                                                                    <label htmlFor={`finalizacao-${e.numero}-${statusFinalizacao.descricao}`}>{statusFinalizacao.descricao}</label>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                    })
                                                }
                                            </td>
                                            <td>
                                                <input type="checkbox" name="" id="" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="agenda-processamento">
                            <div className="titulo-informacoes-gerais">
                                <span>Agenda</span>
                            </div>
                            <div className="table-agenda">
                                <table className="table">
                                    <thead className="table-header">
                                        <tr>
                                            <th>Data</th>
                                            <th>Analista</th>
                                            <th>Parecer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            agenda.map(e => {
                                                return (
                                                    <tr key={e._id}>
                                                        <td>{moment(e.createdAt).format('DD/MM/YYYY')}</td>
                                                        <td>{e.usuario}</td>
                                                        <td>{e.parecer}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <button onClick={openModalAgenda} >Escrevar na Agenda</button>
                            </div>
                            <div className="titulo-informacoes-gerais">
                                <span>Arquivos</span>
                            </div>
                            <div className="tabela-arquivos">
                                <table className="table">
                                    <thead className="table-header">
                                        <tr>
                                            <th>Nome</th>
                                            <th>Data</th>
                                            <th>Tipo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arquivos.map(e => {
                                                return (
                                                    <tr key={e._id}>
                                                        <td> <span className="link-arquivo" onClick={() => {
                                                            download(`${process.env.REACT_APP_API_KEY}/uploads/rsd/gravacoes/${idPacote}`, e.arquivo)
                                                        }} >{e.arquivo}</span></td>
                                                        <td>{moment(e.createdAt).format('DD/MM/YYYY')}</td>
                                                        <td>{e.tipo}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <button onClick={openModal} >Anexar Arquivo</button>
                                <button onClick={salvar} >Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content'>
                    <div className="title">
                        <h2>Anexar Gravação</h2>
                    </div>
                    <form action="" encType="multipart/form-data" method="post">
                        <div className="content-modal-gravacao">
                            <input type="file" name="gravacao" id="gravacao" onChange={e => setGravacao(e.target.files[0])} />
                        </div>
                        <div className="btns-modal">
                            <button onClick={anexarGravacao} >Anexar</button>
                            <button onClick={() => {
                                closeModal()
                            }}>Fechar</button>
                        </div>
                    </form>
                </Modal>
                <Modal
                    isOpen={modalAgenda}
                    onRequestClose={closeModalAgenda}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content'>
                    <div className="title titulo-modal-agenda">
                        <h2>Agenda</h2>
                    </div>
                    <form action="" encType="multipart/form-data" method="post" className="form-agenda">
                        <textarea name="comentario" id="comentario" cols="40" rows="6" onChange={e => setParecer(e.target.value)}>
                        </textarea>
                        <button onClick={enviarComentarioAgenda}>Salvar</button>

                    </form>

                </Modal>
            </section>
        </>
    )
}

export default ProcessamentoPacote


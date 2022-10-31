import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import Axios from 'axios'
import AuthContext from "../../../context/AuthContext";
import InformacoesGerais from "../../../components/InformacoesGerais/InformacoesGerais";
import TabelaProtocolo from "../../../components/TabelaProtocolo/TabelaProtocolo";
import TabelaPedido from "../../../components/TabelaPedido/TabelaPedido";
import Modal from '../../../components/Modal/Modal'
import './ProcessamentoPacote.css'
import moment from "moment";

const ProcessamentoPacote = () => {

    const { mo, idPacote } = useParams()

    const [pedidos, setPedidos] = useState([])
    const [protocolos, setProtocolos] = useState([])

    const buscarPedidos = async () => {
        try {

            console.log(idPacote);

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedidos/pacote/${idPacote}`, { withCredentials: true })

            setPedidos(result.data.pedidos)

            let arrAuxProtocolos = result.data.pedidos.filter((item, pos, array) => {
                return array.map(x => x.protocolo).indexOf(item.protocolo) === pos
            })

            setProtocolos(arrAuxProtocolos)

            console.log(arrAuxProtocolos);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarPedidos()
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
                                                    <td> <FaAngleDown /> {e.protocolo}</td>
                                                    <td>{moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>
                                                    <td>{moment(e.dataPagamento).format('DD/MM/YYYY')}</td>
                                                    <td>{e.statusPacote}</td>
                                                    <td>{moment(e.updatedAt).format('DD/MM/YYYY')}</td>
                                                </tr>
                                                <tr>
                                                    <TabelaPedido pedidos={pedidos} protocolo={e.protocolo} />
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="btns-processamento">
                        <button>Iniciar Processamento</button>
                        <button>Reapresentação de Protocolo Indefirido</button>
                        <input type="checkbox" name="prioridade-dossie" id="prioridade-dossie" />
                        <label htmlFor="prioridade-dossie">Prioridade para Dossie?</label>
                    </div>
                    <div className="roteiro-container">
                        <div className="roteiro">
                            <div className="titulo-informacoes-gerais">
                                <span>Roteiro</span>
                            </div>
                            <div className="table-roteiro">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>1°</td>
                                            <td>
                                                <p>Houve sucesso no Contato com o beneficiário?</p>
                                                <input type="radio" name="contato-beneficiario" id="contato-beneficiario-sim" value={`Sim`} />
                                                <label htmlFor="contato-beneficiario-sim">Sim</label>
                                                <input type="radio" name="contato-beneficiario" id="contato-beneficiario-nao" value={`Não`} />
                                                <label htmlFor="contato-beneficiario-nao">Não</label>
                                                <input type="radio" name="contato-beneficiario" id="contato-beneficiario-agendar" value={`Necessário Agendar Horario`} />
                                                <label htmlFor="contato-beneficiario-agendar">Necessário Agendar Horario</label>
                                                <input type="radio" name="contato-beneficiario" id="contato-beneficiario-sem-retorno" value={`Sem Retorno de Contato`} />
                                                <label htmlFor="contato-beneficiario-sem-retorno">Sem Retorno de Contato</label>
                                            </td>
                                            <td>
                                                <input type="checkbox" name="" id="" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2°</td>
                                            <td>
                                                <p><strong>SELO CONTATO</strong></p>
                                                <p>Informar nome completo do beneficiário no início do contato. Se identifique como funcionário da Operadora Informar que a ligação é gravada e pedir para confirmar algumas informações, como 3 últimos números do CPF, ano de nascimento e idade.</p>
                                            </td>
                                            <td>
                                                <input type="checkbox" name="" id="" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3°</td>
                                            <td>
                                                <p><strong>MOTIVO CONTATO</strong></p>
                                                <p>Reembolso referente ao atendimento da clínica TAL, realizado no dia XX, no valor de R$ XX. Confirmar se o beneficiário reconhece esse atendimento e cobrança?</p>
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

                                    </tbody>
                                </table>
                                <button>Escrevar na Agenda</button>
                            </div>
                            <div className="titulo-informacoes-gerais">
                                <span>Arquivos</span>
                            </div>
                            <div className="tabela-arquivos">
                                <table className="table">
                                    <thead className="table-header">
                                        <tr>
                                            <th>nome</th>
                                            <th>Data</th>
                                            <th>Tipo</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                                <button>Anexar Gravação</button>
                                <button>Anexar arquivo</button>
                                <button>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default ProcessamentoPacote


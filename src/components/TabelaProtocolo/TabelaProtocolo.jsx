import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import moment from "moment/moment";
import TabelaPedido from "../TabelaPedido/TabelaPedido";
import $ from 'jquery'
import Axios from 'axios'
import Modal from 'react-modal'
import { devolverProtocoloInativo, getPedidosPorPacote } from "../../_services/rsd.service";

Modal.setAppElement('#root')

const TabelaProtocolo = ({ pedidos, pacote, verificaPacote = false, finalizados, todos }) => {

    const [protocolos, setProtocolos] = useState([])
    const [modalInativarProtocolo, setModalInativarProtocolo] = useState(false)
    const [inativarProtocolo, setInativarProtocolo] = useState('')
    const [inativarPacote, setInativarPacote] = useState('')

    const mostrarPedidos = e => {
        let trPedidos = e.target.parentElement.nextSibling

        if (!trPedidos.classList.contains('data')) {
            $(trPedidos).toggle('fast')
        } else {
            $(trPedidos.parentElement.nextSibling).toggle('fast')
        }
    }

    const devolverProtocolo = async (protocolo, pacote) => {
        try {

            const motivoInativo = document.getElementById('motivo-inativo-protocolo').value

            await devolverProtocoloInativo({
                protocolo,
                pacote,
                motivoInativo
            })

            window.location.reload()

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        let protocolos = []

        // Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedidos/pacote/${pacote}`, { withCredentials: true }).then(e => {
        //     console.log(e.data.pedidos);
        //     protocolos = e.data.pedidos

        //     protocolos = protocolos.filter((item, pos, array) => {
        //         return array.map(x => x.protocolo).indexOf(item.protocolo) === pos
        //     })

        //     console.log(protocolos);

        //     setProtocolos(protocolos)
        // })

        getPedidosPorPacote().then(value => {
            protocolos = value.pedidos
            protocolos = protocolos.filter((item, pos, array) => {
                return array.map(x => x.protocolo).indexOf(item.protocolo) === pos
            })

            setProtocolos(protocolos)
        })
    }, [])

    return (
        <>
            <td colSpan={10}>
                <div>
                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th>Número Protocolo</th>
                                <th>Data Solicitação</th>
                                <th>Data Pagamento</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                protocolos.map(e => {
                                    console.log(finalizados, e.statusProtocolo);
                                    if (e.pacote === pacote) {
                                        if (finalizados && e.statusProtocolo === 'Finalizado') {
                                            return (
                                                <>
                                                    <tr>
                                                        <td onClick={mostrarPedidos} className="td-protocolo" ><FaAngleDown></FaAngleDown> {e.protocolo}</td>
                                                        <td className="data">{moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>
                                                        <td>{moment(e.dataPagamento).format('DD/MM/YYYY')}</td>
                                                        <td>{e.statusProtocolo}</td>
                                                    </tr>
                                                    <tr className="none">
                                                        <TabelaPedido pedidos={pedidos} protocolo={e.protocolo} pacote={pacote} verificaPacote={verificaPacote} finalizados={finalizados} todos={todos} >

                                                        </TabelaPedido>
                                                    </tr>
                                                </>
                                            )
                                        }

                                        if (!finalizados && e.statusProtocolo !== 'Finalizado') {
                                            return (
                                                <>
                                                    <tr>
                                                        <td onClick={mostrarPedidos} className="td-protocolo" ><FaAngleDown></FaAngleDown> {e.protocolo}</td>
                                                        <td className="data">{moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>
                                                        <td>{moment(e.dataPagamento).format('DD/MM/YYYY')}</td>
                                                        <td>{e.statusProtocolo}</td>
                                                        <td><button onClick={() => {
                                                            setModalInativarProtocolo(e.protocolo)
                                                            setInativarPacote(e.pacote)
                                                            setInativarProtocolo(e.protocolo)
                                                        }} className="botao-padrao-cinza" >Inativar</button></td>
                                                    </tr>
                                                    <tr className="none">
                                                        <TabelaPedido pedidos={pedidos} protocolo={e.protocolo} pacote={pacote} verificaPacote={verificaPacote} finalizados={finalizados} todos={todos} >

                                                        </TabelaPedido>
                                                    </tr>
                                                </>
                                            )
                                        }

                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </td>
            <Modal
                isOpen={modalInativarProtocolo}
                onRequestClose={() => { setModalInativarProtocolo(false) }}
                contentLabel="Exemplo"
                overlayClassName='modal-overlay'
                className='modal-content'
            >
                <div className="title titulo-modal-agenda">
                    <h2>Motivo de inativação</h2>
                </div>
                <div>
                    <select name="motivo-inativo-protocolo" id="motivo-inativo-protocolo">
                        <option value="devolvido">devolvido</option>
                        <option value="duplicidade">duplicidade</option>
                        <option value="VIP">VIP</option>
                    </select>
                </div>
                <div>
                    <button value={inativarProtocolo} onClick={e => {
                        devolverProtocolo(e.target.value, inativarPacote)
                    }} >Inativar</button>
                </div>
            </Modal>
        </>
    )
}

export default TabelaProtocolo
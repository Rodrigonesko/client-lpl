import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import moment from "moment/moment";
import TabelaPedido from "../TabelaPedido/TabelaPedido";

const TabelaProtocolo = ({ pedidos, pacote, verificaPacote = false, finalizados, todos }) => {

    const [protocolos, setProtocolos] = useState([])

    console.log(`O pacote é: ${verificaPacote}`);


    const mostrarPedidos = e => {
        let trPedidos = e.target.parentElement.nextSibling

        if (!trPedidos.classList.contains('data')) {
            trPedidos.classList.toggle('none')
        } else {
            console.log(trPedidos.parentElement.nextSibling.classList.toggle('none'));
        }
    }


    useEffect(() => {
        let protocolosFiltrados = pedidos.filter((item, pos, array) => {
            return array.map(x => x.protocolo).indexOf(item.protocolo) === pos
        })

        setProtocolos(protocolosFiltrados)
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                protocolos.map(e => {

                                    if (e.pacote === pacote) {
                                        return (
                                            <>
                                                <tr>
                                                    <td onClick={mostrarPedidos} className="td-protocolo" ><FaAngleDown></FaAngleDown> {e.protocolo}</td>
                                                    <td className="data">{moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>
                                                    <td>{moment(e.dataPagamento).format('DD/MM/YYYY')}</td>
                                                    <td>{e.status}</td>
                                                </tr>
                                                <tr className="none">
                                                    <TabelaPedido pedidos={pedidos} protocolo={e.protocolo} pacote={pacote} verificaPacote={verificaPacote} finalizados={finalizados} todos={todos} >

                                                    </TabelaPedido>
                                                </tr>
                                            </>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </td>
        </>
    )
}

export default TabelaProtocolo
import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import TabelaPedido from "../TabelaPedido/TabelaPedido";

const TabelaProtocolo = ({ pedidos }) => {

    const [protocolos, setProtocolos] = useState([])

    useEffect(() => {
        let protocolosFiltrados = pedidos.filter((item, pos, array) => {
            return array.map(x => x.protocolo).indexOf(item.protocolo) === pos
        })

        setProtocolos(protocolosFiltrados)
    }, [])

    return (
        <>
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
                            return (
                                <>
                                    <tr>
                                        <td>{e.protocolo}</td>
                                        <td>{moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>
                                        <td>{moment(e.dataPagamento).format('DD/MM/YYYY')}</td>
                                        <td>{e.status}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={10}>
                                            <div>
                                                <TabelaPedido pedidos={pedidos} protocolo={e.protocolo}>

                                                </TabelaPedido>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default TabelaProtocolo
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import moment from "moment/moment";
import TabelaPedido from "../TabelaPedido/TabelaPedido";
import $ from 'jquery'
import Axios from 'axios'

const TabelaProtocolo = ({ pedidos, pacote, verificaPacote = false, finalizados, todos }) => {

    const [protocolos, setProtocolos] = useState([])

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

            console.log(protocolo, pacote);

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/protocolo/devolver`, {
                protocolo,
                pacote
            }, {
                withCredentials: true
            })

            if(result.status === 200){
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        let protocolosFiltrados = pedidos.filter((item, pos, array) => {
            return array.map(x => x.protocolo).indexOf(item.protocolo) === pos
        })

        console.log(protocolosFiltrados);

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
                                                        <td><button onClick={() => devolverProtocolo(e.protocolo, e.pacote)} className="botao-padrao-cinza" >Devolvido Amil</button></td>
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
        </>
    )
}

export default TabelaProtocolo
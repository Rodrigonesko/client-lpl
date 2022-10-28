import React from "react";

const TabelaPedido = ({ pedidos, protocolo }) => {

    console.log(pedidos);

    return (
        <>
            <table className="table">
                <thead className="table-header">
                    <tr>
                        <th>Pedido</th>
                        <th>Status</th>
                        <th>R$ Apresentado</th>
                        <th>R$ Reembolsado</th>
                        <th>CNPJ</th>
                        <th>Clínica</th>
                        <th>NF</th>
                        <th>Irregular</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pedidos.map(e => {

                            if (protocolo === e.protocolo) {
                                return (
                                    <tr>
                                        <td>{e.numero}</td>
                                        <td>{e.status}</td>
                                        <td>{e.valorApresentado}</td>
                                        <td>{e.valorReembolsado}</td>
                                        <td>{e.cnpj}</td>
                                        <td>{e.clinica}</td>
                                        <td>{e.nf}</td>
                                        <td>{e.irregular}</td>
                                    </tr>
                                )
                            }



                        })
                    }
                </tbody>

            </table>
        </>
    )
}

export default TabelaPedido
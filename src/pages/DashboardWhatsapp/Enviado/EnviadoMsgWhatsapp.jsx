import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import moment from "moment/moment";

const EnviadoMsgWhatsapp = () => {

    const [reembolsos, setReembolsos] = useState([])

    const buscarReembolsos = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_WPP}/whatsappapi/showSendedAndNotFinished`, { withCredentials: true })

            setReembolsos(result.data.reembolsos)

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        buscarReembolsos()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-padrao-elegi">
                <div className="div-padrao-elegi">
                    <div className="title">
                        <h3>Enviados e não finalizados</h3>
                    </div>
                    <div className="filtros-padrao-elegi">
                       
                    </div>
                    <div>
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Data</th>
                                    <th>Caso</th>
                                    <th>Reembolso</th>
                                    <th>Protocolo</th>
                                    <th>MO</th>
                                    <th>Nome</th>
                                    <th>Telefone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reembolsos.map(e => {
                                        return (
                                            <tr>
                                                <td>{moment(e.data).format('DD/MM/YYYY')}</td>
                                                <td>{e.caso}</td>
                                                <td>{e.reembolso}</td>
                                                <td>{e.protocolo}</td>
                                                <td>{e.mo}</td>
                                                <td>{e.nome}</td>
                                                <td>{e.telefone}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EnviadoMsgWhatsapp
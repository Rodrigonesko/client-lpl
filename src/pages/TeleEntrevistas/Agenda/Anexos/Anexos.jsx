import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Axios from 'axios'

const Anexos = () => {

    const [propostas, setPropostas] = useState([])

    const buscarPropostas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/anexar`, { withCredentials: true })

            setPropostas(result.data.propostas)

        } catch (error) {
            console.log(error);
        }
    }

    const anexar = async (id) => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/anexar`, { id }, { withCredentials: true })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarPropostas()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-anexos-container">
                <div className="anexos-container">
                    <div className="title">
                        <h3>Anexar SisAmil</h3>
                    </div>
                    <div className="anexos-sisamil">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Vigência</th>
                                    <th>Proposta</th>
                                    <th>Nome</th>
                                    <th>TipoContrato</th>
                                    <th>Houve Divergência</th>
                                    <th>Cids</th>
                                    <th>Divergência</th>
                                    <th>Concluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    propostas.map(e => {
                                        return (
                                            <tr key={e._id}>
                                                <td>{e.vigencia}</td>
                                                <td>{e.proposta}</td>
                                                <td>{e.nome}</td>
                                                <td>{e.tipoContrato}</td>
                                                <td>{e.houveDivergencia}</td>
                                                <td>{e.cids}</td>
                                                <td>{e.divergencia}</td>
                                                <td><button onClick={() => { anexar(e._id) }} >Concluir</button></td>
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

export default Anexos